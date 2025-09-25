using MediatR;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.PublicHolidays.Commands.DeletePublicHoliday;

/// <summary>
/// Command for deleting a public holiday from the system.
/// Provides safe deletion functionality with validation and integrity checks.
/// </summary>
/// <param name="Id">The unique identifier of the holiday to delete</param>
/// <remarks>
/// Command Features:
/// - Safe deletion with existence validation
/// - Integration with attendance system impact checking
/// - Audit trail preservation for compliance
/// - Cascade handling for dependent calculations
/// - Rollback support for operational safety
///
/// Deletion Validation:
/// - Holiday existence verification
/// - Usage impact assessment (future/historical)
/// - Attendance calculation dependency checking
/// - Permission validation for deletion rights
/// - System integrity preservation
///
/// Business Rules:
/// - Cannot delete holidays with pending attendance calculations
/// - Historical holidays maintain audit trail references
/// - Future holiday deletions trigger recalculation notifications
/// - System holidays may have additional deletion restrictions
/// - Cascade deletion impacts overtime calculation results
///
/// Safety Considerations:
/// - Soft delete option for audit compliance
/// - Impact assessment before permanent deletion
/// - Backup and rollback procedures
/// - User confirmation for destructive operations
/// - Integration with change management workflows
///
/// Usage Scenarios:
/// - Removing incorrectly created holidays
/// - Cleaning up obsolete or duplicate entries
/// - Regulatory compliance for data retention
/// - System maintenance and optimization
/// - Correcting erroneous holiday configurations
/// </remarks>
public record DeletePublicHolidayCommand(long Id) : IRequest<Result>;

/// <summary>
/// Command handler for deleting public holidays.
/// Validates business rules and safely removes public holiday entities using the PublicHolidayService.
/// </summary>
public class DeletePublicHolidayCommandHandler : BaseHandler<DeletePublicHolidayCommand, Result>
{
    private readonly IPublicHolidayService _publicHolidayService;

    public DeletePublicHolidayCommandHandler(
        IPublicHolidayService publicHolidayService,
        IApplicationDbContext context,
        ICurrentUser currentUser) : base(context, currentUser)
    {
        _publicHolidayService = publicHolidayService;
    }

    /// <summary>
    /// Handles the deletion of a public holiday with safety checks and validation.
    /// </summary>
    /// <param name="request">Command containing the holiday ID to delete</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result indicating success or failure of the deletion operation</returns>
    public override async Task<Result> Handle(
        DeletePublicHolidayCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            // Delete holiday using service (includes validation and impact checking)
            var deleted = await _publicHolidayService.DeleteHolidayAsync(request.Id, cancellationToken);

            if (!deleted)
            {
                return Result.Failure("Holiday not found or could not be deleted");
            }

            return Result.Success();
        }
        catch (ArgumentException ex)
        {
            return Result.Failure($"Validation failed: {ex.Message}");
        }
        catch (Exception ex)
        {
            return Result.Failure($"Failed to delete public holiday: {ex.Message}");
        }
    }
}