using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.ToggleEmployeeVacationStatus;

/// <summary>
/// Command handler for toggling employee vacation approval status.
/// Handles status changes with database updates and attendance record integration.
/// </summary>
public class ToggleEmployeeVacationStatusCommandHandler : IRequestHandler<ToggleEmployeeVacationStatusCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public ToggleEmployeeVacationStatusCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the toggling of employee vacation approval status.
    /// </summary>
    /// <param name="request">Command containing vacation ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    public async Task<Result> Handle(ToggleEmployeeVacationStatusCommand request, CancellationToken cancellationToken)
    {
        // Find the vacation record
        var vacation = await _context.EmployeeVacations
            .FirstOrDefaultAsync(v => v.Id == request.Id && !v.IsDeleted, cancellationToken);

        if (vacation == null)
        {
            return Result.Failure("Employee vacation not found");
        }

        // Toggle the approval status
        vacation.IsApproved = !vacation.IsApproved;
        vacation.ModifiedAtUtc = DateTime.UtcNow;

        // Update the record in the database
        _context.EmployeeVacations.Update(vacation);

        // Save changes
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}