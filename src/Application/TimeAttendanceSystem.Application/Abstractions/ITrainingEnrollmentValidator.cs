using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Phase 2 (v14.2) completion: Validates a prospective training enrollment against business rules
/// derived from the existing domain model.
///
/// Structured prerequisite-enforcement rules (using only fields that already exist):
///   - <b>Program-level sequence prerequisites</b>: when enrolling in a session whose course belongs
///     to a <c>TrainingProgram</c>, every earlier <c>TrainingProgramCourse</c> row in the program
///     with <c>IsRequired=true</c> and a smaller <c>SequenceOrder</c> must be either already
///     completed by the employee (via an approved+completed enrollment) OR the employee must be
///     currently enrolled in that prerequisite. This mirrors the typical "Level 1 before Level 2"
///     training flow the program model already supports.
///   - <b>Program-level duplicate prevention</b>: when <c>TrainingProgramId</c> is supplied
///     instead of (or in addition to) a session id, prevent a second active enrollment in the
///     same program.
///
/// Session-level duplicate prevention and capacity enforcement are already implemented in the
/// controller. This validator does NOT duplicate them — it only adds the pieces that were missing.
///
/// The free-text <c>TrainingCourse.Prerequisites</c> field is intentionally not parsed: it has no
/// structured semantics and could say anything in any language. Program-sequence prerequisites
/// are the only structured signal the domain provides.
/// </summary>
public interface ITrainingEnrollmentValidator
{
    /// <summary>
    /// Returns <see cref="Result.Failure"/> with an aggregated, actionable message if any rule is
    /// violated; <see cref="Result.Success"/> otherwise.
    /// </summary>
    Task<Result> ValidateAsync(
        long employeeId,
        long? trainingSessionId,
        long? trainingProgramId,
        CancellationToken ct = default);
}
