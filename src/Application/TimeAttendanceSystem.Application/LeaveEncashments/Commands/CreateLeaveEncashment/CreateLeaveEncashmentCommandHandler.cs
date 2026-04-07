using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.CreateLeaveEncashment;

public class CreateLeaveEncashmentCommandHandler : BaseHandler<CreateLeaveEncashmentCommand, Result<long>>
{
    public CreateLeaveEncashmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateLeaveEncashmentCommand request, CancellationToken cancellationToken)
    {
        if (request.DaysEncashed <= 0)
            return Result.Failure<long>("Days to encash must be greater than zero.");

        // Validate employee exists
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        // Branch scope
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            if (!CurrentUser.BranchIds.Contains(employee.BranchId))
                return Result.Failure<long>("Access denied. Employee is not in your branch scope.");
        }

        // Validate vacation type allows encashment
        var vacationType = await Context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.Id == request.VacationTypeId && !vt.IsDeleted, cancellationToken);

        if (vacationType == null)
            return Result.Failure<long>("Vacation type not found.");

        if (!vacationType.AllowEncashment)
            return Result.Failure<long>("This vacation type does not allow encashment.");

        var currentYear = DateTime.UtcNow.Year;

        // Check for duplicate pending request for same employee + vacation type + year
        var duplicateExists = await Context.LeaveEncashments
            .AnyAsync(le => !le.IsDeleted
                && le.EmployeeId == request.EmployeeId
                && le.VacationTypeId == request.VacationTypeId
                && le.Year == currentYear
                && (le.Status == LeaveEncashmentStatus.Pending || le.Status == LeaveEncashmentStatus.Approved),
                cancellationToken);

        if (duplicateExists)
            return Result.Failure<long>("A pending or approved encashment request already exists for this employee, vacation type, and year.");

        // Validate leave balance
        var balance = await Context.LeaveBalances
            .FirstOrDefaultAsync(lb => lb.EmployeeId == request.EmployeeId
                && lb.VacationTypeId == request.VacationTypeId
                && lb.Year == currentYear, cancellationToken);

        if (balance == null)
            return Result.Failure<long>("No leave balance found for this employee and vacation type.");

        if (balance.CurrentBalance < request.DaysEncashed)
            return Result.Failure<long>($"Insufficient leave balance. Available: {balance.CurrentBalance}, Requested: {request.DaysEncashed}");

        // Validate against EncashmentMaxDays
        if (vacationType.EncashmentMaxDays.HasValue)
        {
            var alreadyEncashed = await Context.LeaveEncashments
                .Where(le => !le.IsDeleted
                    && le.EmployeeId == request.EmployeeId
                    && le.VacationTypeId == request.VacationTypeId
                    && le.Year == currentYear
                    && le.Status != LeaveEncashmentStatus.Rejected
                    && le.Status != LeaveEncashmentStatus.Cancelled)
                .SumAsync(le => le.DaysEncashed, cancellationToken);

            if (alreadyEncashed + request.DaysEncashed > vacationType.EncashmentMaxDays.Value)
                return Result.Failure<long>($"Exceeds maximum encashment days. Max: {vacationType.EncashmentMaxDays.Value}, Already encashed: {alreadyEncashed}, Requested: {request.DaysEncashed}");
        }

        // Calculate AmountPerDay from employee salary (BaseSalary / 30)
        var salary = await Context.EmployeeSalaries
            .FirstOrDefaultAsync(es => es.EmployeeId == request.EmployeeId && es.IsCurrent && !es.IsDeleted, cancellationToken);

        decimal amountPerDay = 0;
        if (salary != null)
        {
            amountPerDay = salary.BaseSalary / 30m;
        }

        var totalAmount = request.DaysEncashed * amountPerDay;

        var encashment = new LeaveEncashment
        {
            EmployeeId = request.EmployeeId,
            VacationTypeId = request.VacationTypeId,
            Year = currentYear,
            DaysEncashed = request.DaysEncashed,
            AmountPerDay = amountPerDay,
            TotalAmount = totalAmount,
            Status = LeaveEncashmentStatus.Pending,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.LeaveEncashments.Add(encashment);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(encashment.Id);
    }
}
