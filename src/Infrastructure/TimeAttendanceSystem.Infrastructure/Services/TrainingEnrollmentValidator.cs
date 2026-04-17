using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Phase 2 (v14.2) completion: implementation of <see cref="ITrainingEnrollmentValidator"/>.
/// </summary>
public sealed class TrainingEnrollmentValidator : ITrainingEnrollmentValidator
{
    private readonly IApplicationDbContext _db;

    public TrainingEnrollmentValidator(IApplicationDbContext db) => _db = db;

    public async Task<Result> ValidateAsync(
        long employeeId,
        long? trainingSessionId,
        long? trainingProgramId,
        CancellationToken ct = default)
    {
        var violations = new List<string>();

        // Program-level duplicate prevention — when enrolling by program id (without a specific
        // session), refuse to create a second non-terminal enrollment in the same program.
        if (trainingProgramId.HasValue)
        {
            var hasActiveProgramEnrollment = await _db.TrainingEnrollments.AsNoTracking()
                .AnyAsync(e => e.EmployeeId == employeeId
                            && e.TrainingProgramId == trainingProgramId.Value
                            && !e.IsDeleted
                            && e.Status != TrainingEnrollmentStatus.Cancelled
                            && e.Status != TrainingEnrollmentStatus.Rejected
                            && e.Status != TrainingEnrollmentStatus.Completed, ct);
            if (hasActiveProgramEnrollment)
                violations.Add("Employee already has an active enrollment in this program.");
        }

        // Program-sequence prerequisite check — applies when we can link the session's course
        // to one or more programs.
        if (trainingSessionId.HasValue)
        {
            var session = await _db.TrainingSessions.AsNoTracking()
                .Where(s => s.Id == trainingSessionId.Value && !s.IsDeleted)
                .Select(s => new { s.Id, s.TrainingCourseId })
                .FirstOrDefaultAsync(ct);

            if (session != null)
            {
                // Find every TrainingProgramCourse row that mentions this course.
                // For each, check that every earlier IsRequired=true course is either completed
                // or currently enrolled (approved/in-progress/pending) by the employee.
                var programMemberships = await _db.TrainingProgramCourses.AsNoTracking()
                    .Where(pc => pc.TrainingCourseId == session.TrainingCourseId && !pc.IsDeleted)
                    .Select(pc => new
                    {
                        pc.TrainingProgramId,
                        pc.SequenceOrder
                    })
                    .ToListAsync(ct);

                foreach (var membership in programMemberships)
                {
                    var prereqCourseIds = await _db.TrainingProgramCourses.AsNoTracking()
                        .Where(pc => pc.TrainingProgramId == membership.TrainingProgramId
                                  && pc.SequenceOrder < membership.SequenceOrder
                                  && pc.IsRequired
                                  && !pc.IsDeleted)
                        .Select(pc => pc.TrainingCourseId)
                        .ToListAsync(ct);

                    if (prereqCourseIds.Count == 0) continue;

                    // For each required prerequisite course, does the employee have a qualifying
                    // enrollment (Completed OR currently In-Progress/Approved/Pending)?
                    var satisfiedCourseIds = await _db.TrainingEnrollments.AsNoTracking()
                        .Include(e => e.Session)
                        .Where(e => e.EmployeeId == employeeId
                                 && !e.IsDeleted
                                 && e.Session != null
                                 && prereqCourseIds.Contains(e.Session.TrainingCourseId)
                                 && (e.Status == TrainingEnrollmentStatus.Completed
                                     || e.Status == TrainingEnrollmentStatus.Approved
                                     || e.Status == TrainingEnrollmentStatus.InProgress
                                     || e.Status == TrainingEnrollmentStatus.Pending))
                        .Select(e => e.Session!.TrainingCourseId)
                        .Distinct()
                        .ToListAsync(ct);

                    var missing = prereqCourseIds.Except(satisfiedCourseIds).ToList();
                    if (missing.Count > 0)
                    {
                        var missingCodes = await _db.TrainingCourses.AsNoTracking()
                            .Where(c => missing.Contains(c.Id))
                            .Select(c => new { c.Code, c.Title })
                            .ToListAsync(ct);
                        var list = string.Join(", ",
                            missingCodes.Select(c => $"{c.Code} ({c.Title})"));
                        violations.Add(
                            $"Program prerequisites not satisfied. Missing: {list}.");
                    }
                }
            }
        }

        return violations.Count == 0
            ? Result.Success()
            : Result.Failure("Training prerequisite check failed: " + string.Join(" ", violations));
    }
}
