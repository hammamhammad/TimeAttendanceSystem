using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.LeaveManagement;

namespace TimeAttendanceSystem.Application.LeaveManagement.Commands.SetLeaveEntitlement;

/// <summary>
/// Command handler for setting or updating employee leave entitlements.
/// Implements business rules, security checks, and automatic leave balance initialization.
/// </summary>
public class SetLeaveEntitlementCommandHandler : BaseHandler<SetLeaveEntitlementCommand, Result<long>>
{
    private readonly ILeaveAccrualService _leaveAccrualService;
    private readonly ILogger<SetLeaveEntitlementCommandHandler> _logger;

    public SetLeaveEntitlementCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILeaveAccrualService leaveAccrualService,
        ILogger<SetLeaveEntitlementCommandHandler> logger)
        : base(context, currentUser)
    {
        _leaveAccrualService = leaveAccrualService;
        _logger = logger;
    }

    public override async Task<Result<long>> Handle(SetLeaveEntitlementCommand request, CancellationToken cancellationToken)
    {
        // Validate employee exists and is active
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee does not exist.");

        if (employee.EmploymentStatus != Domain.Common.EmploymentStatus.Active)
            return Result.Failure<long>("Cannot set entitlement for inactive employee.");

        // Enforce branch-scoped access control
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        // Validate vacation type exists and is active
        var vacationType = await Context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.Id == request.VacationTypeId, cancellationToken);

        if (vacationType == null)
            return Result.Failure<long>("Vacation type does not exist.");

        if (!vacationType.IsActive)
            return Result.Failure<long>("Cannot set entitlement for inactive vacation type.");

        // Check if entitlement already exists for this employee, vacation type, and year
        var existingEntitlement = await Context.LeaveEntitlements
            .FirstOrDefaultAsync(le =>
                le.EmployeeId == request.EmployeeId &&
                le.VacationTypeId == request.VacationTypeId &&
                le.Year == request.Year,
                cancellationToken);

        LeaveEntitlement entitlement;

        if (existingEntitlement != null)
        {
            // Update existing entitlement
            existingEntitlement.AnnualDays = request.AnnualDays;
            existingEntitlement.CarryOverDays = request.CarryOverDays;
            existingEntitlement.MaxCarryOverDays = request.MaxCarryOverDays;
            existingEntitlement.ExpiresAtYearEnd = request.ExpiresAtYearEnd;
            existingEntitlement.EffectiveStartDate = request.EffectiveStartDate;
            existingEntitlement.EffectiveEndDate = request.EffectiveEndDate;
            existingEntitlement.Notes = request.Notes;
            existingEntitlement.ModifiedAtUtc = DateTime.UtcNow;
            existingEntitlement.ModifiedBy = CurrentUser.Username;

            entitlement = existingEntitlement;

            _logger.LogInformation(
                "Updated leave entitlement for Employee {EmployeeId}, VacationType {VacationTypeId}, Year {Year}",
                request.EmployeeId, request.VacationTypeId, request.Year);
        }
        else
        {
            // Create new entitlement
            entitlement = new LeaveEntitlement
            {
                EmployeeId = request.EmployeeId,
                VacationTypeId = request.VacationTypeId,
                Year = request.Year,
                AnnualDays = request.AnnualDays,
                CarryOverDays = request.CarryOverDays,
                MaxCarryOverDays = request.MaxCarryOverDays,
                ExpiresAtYearEnd = request.ExpiresAtYearEnd,
                EffectiveStartDate = request.EffectiveStartDate,
                EffectiveEndDate = request.EffectiveEndDate,
                Notes = request.Notes,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username
            };

            await Context.LeaveEntitlements.AddAsync(entitlement, cancellationToken);

            _logger.LogInformation(
                "Created leave entitlement for Employee {EmployeeId}, VacationType {VacationTypeId}, Year {Year}",
                request.EmployeeId, request.VacationTypeId, request.Year);
        }

        // Save entitlement
        await Context.SaveChangesAsync(cancellationToken);

        // Initialize leave balance for the year if it doesn't exist
        var initializeResult = await _leaveAccrualService.InitializeLeaveBalanceForYearAsync(
            request.EmployeeId,
            request.Year,
            cancellationToken);

        if (!initializeResult.IsSuccess)
        {
            _logger.LogWarning(
                "Failed to initialize leave balance after setting entitlement: {Error}",
                initializeResult.Error);
        }

        return Result.Success(entitlement.Id);
    }
}
