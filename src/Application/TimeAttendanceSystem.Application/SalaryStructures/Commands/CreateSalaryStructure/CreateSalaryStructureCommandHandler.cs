using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.SalaryStructures.Commands.CreateSalaryStructure;

public class CreateSalaryStructureCommandHandler : BaseHandler<CreateSalaryStructureCommand, Result<long>>
{
    public CreateSalaryStructureCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateSalaryStructureCommand request, CancellationToken cancellationToken)
    {
        var structure = new SalaryStructure
        {
            Name = request.Name.Trim(),
            NameAr = request.NameAr?.Trim(),
            Description = request.Description?.Trim(),
            DescriptionAr = request.DescriptionAr?.Trim(),
            BranchId = request.BranchId,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        Context.SalaryStructures.Add(structure);
        await Context.SaveChangesAsync(cancellationToken);

        if (request.Components is { Count: > 0 })
        {
            foreach (var c in request.Components)
            {
                var component = new SalaryComponent
                {
                    SalaryStructureId = structure.Id,
                    Name = c.Name.Trim(),
                    NameAr = c.NameAr?.Trim(),
                    ComponentType = (SalaryComponentType)c.ComponentType,
                    CalculationType = (CalculationType)c.CalculationType,
                    Amount = c.Amount,
                    Percentage = c.Percentage,
                    IsRecurring = c.IsRecurring,
                    IsTaxable = c.IsTaxable,
                    IsSocialInsurable = c.IsSocialInsurable,
                    DisplayOrder = c.DisplayOrder,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = CurrentUser.Username ?? "SYSTEM"
                };
                Context.SalaryComponents.Add(component);
            }
            await Context.SaveChangesAsync(cancellationToken);
        }

        return Result.Success(structure.Id);
    }
}
