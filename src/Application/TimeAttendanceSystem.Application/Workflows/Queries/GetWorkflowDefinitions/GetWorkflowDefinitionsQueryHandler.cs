using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowDefinitions;

/// <summary>
/// Handler for GetWorkflowDefinitionsQuery.
/// </summary>
public class GetWorkflowDefinitionsQueryHandler : IRequestHandler<GetWorkflowDefinitionsQuery, Result<PagedResult<WorkflowDefinitionDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetWorkflowDefinitionsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PagedResult<WorkflowDefinitionDto>>> Handle(GetWorkflowDefinitionsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.WorkflowDefinitions
            .Include(w => w.Branch)
            .Include(w => w.Steps.Where(s => !s.IsDeleted))
            .Where(w => !w.IsDeleted)
            .AsQueryable();

        // Apply filters
        if (request.EntityType.HasValue)
        {
            query = query.Where(w => w.EntityType == request.EntityType.Value);
        }

        if (request.BranchId.HasValue)
        {
            query = query.Where(w => w.BranchId == request.BranchId.Value);
        }

        if (request.IsActive.HasValue)
        {
            query = query.Where(w => w.IsActive == request.IsActive.Value);
        }

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchTerm = request.SearchTerm.ToLower();
            query = query.Where(w => w.Name.ToLower().Contains(searchTerm) ||
                                    (w.NameAr != null && w.NameAr.ToLower().Contains(searchTerm)));
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination and project to DTO
        var items = await query
            .OrderByDescending(w => w.IsDefault)
            .ThenByDescending(w => w.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(w => new WorkflowDefinitionDto
            {
                Id = w.Id,
                Name = w.Name,
                NameAr = w.NameAr,
                Description = w.Description,
                DescriptionAr = w.DescriptionAr,
                EntityType = w.EntityType,
                EntityTypeName = w.EntityType.ToString(),
                BranchId = w.BranchId,
                BranchName = w.Branch != null ? w.Branch.Name : null,
                IsActive = w.IsActive,
                IsDefault = w.IsDefault,
                Version = w.Version,
                StepCount = w.Steps.Count(s => !s.IsDeleted),
                CreatedAt = w.CreatedAtUtc,
                ModifiedAt = w.ModifiedAtUtc
            })
            .ToListAsync(cancellationToken);

        var pagedResult = new PagedResult<WorkflowDefinitionDto>(items, totalCount, request.Page, request.PageSize);

        return Result.Success(pagedResult);
    }
}
