using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SalaryStructures.Queries.Common;

namespace TecAxle.Hrms.Application.SalaryStructures.Queries.GetSalaryStructures;

public class GetSalaryStructuresQueryHandler : BaseHandler<GetSalaryStructuresQuery, Result<object>>
{
    public GetSalaryStructuresQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<object>> Handle(GetSalaryStructuresQuery request, CancellationToken cancellationToken)
    {
        var query = Context.SalaryStructures
            .Where(s => !s.IsDeleted)
            .AsQueryable();

        if (request.BranchId.HasValue)
            query = query.Where(s => s.BranchId == request.BranchId.Value);

        if (request.IsActive.HasValue)
            query = query.Where(s => s.IsActive == request.IsActive.Value);

        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(s => s.Name.Contains(request.Search) ||
                                     (s.NameAr != null && s.NameAr.Contains(request.Search)));

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Include(s => s.Branch)
            .Include(s => s.Components.Where(c => !c.IsDeleted))
            .OrderBy(s => s.Name)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
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
            .ToListAsync(cancellationToken);

        return Result.Success<object>(new
        {
            items,
            totalCount,
            page = request.Page,
            pageSize = request.PageSize
        });
    }
}
