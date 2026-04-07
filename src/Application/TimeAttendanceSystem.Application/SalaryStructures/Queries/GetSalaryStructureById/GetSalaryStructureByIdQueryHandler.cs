using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SalaryStructures.Queries.Common;

namespace TecAxle.Hrms.Application.SalaryStructures.Queries.GetSalaryStructureById;

public class GetSalaryStructureByIdQueryHandler : BaseHandler<GetSalaryStructureByIdQuery, Result<SalaryStructureDto>>
{
    public GetSalaryStructureByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<SalaryStructureDto>> Handle(GetSalaryStructureByIdQuery request, CancellationToken cancellationToken)
    {
        var dto = await Context.SalaryStructures
            .Where(s => s.Id == request.Id && !s.IsDeleted)
            .Select(s => new SalaryStructureDto
            {
                Id = s.Id,
                Name = s.Name,
                NameAr = s.NameAr,
                Description = s.Description,
                DescriptionAr = s.DescriptionAr,
                BranchId = s.BranchId,
                BranchName = s.Branch != null ? s.Branch.Name : null,
                IsActive = s.IsActive,
                CreatedAtUtc = s.CreatedAtUtc,
                Components = s.Components.Where(c => !c.IsDeleted).OrderBy(c => c.DisplayOrder).Select(c => new SalaryComponentDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    NameAr = c.NameAr,
                    ComponentType = (int)c.ComponentType,
                    CalculationType = (int)c.CalculationType,
                    Amount = c.Amount,
                    Percentage = c.Percentage,
                    IsRecurring = c.IsRecurring,
                    IsTaxable = c.IsTaxable,
                    IsSocialInsurable = c.IsSocialInsurable,
                    DisplayOrder = c.DisplayOrder
                }).ToList()
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<SalaryStructureDto>("Salary structure not found.");

        return Result.Success(dto);
    }
}
