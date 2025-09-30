using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicies;

/// <summary>
/// Query handler for retrieving excuse policies with filtering and pagination.
/// Implements branch-scoped access control and efficient data projection.
/// </summary>
public class GetExcusePoliciesQueryHandler : IRequestHandler<GetExcusePoliciesQuery, Result<PagedResult<ExcusePolicyDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetExcusePoliciesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the retrieval of excuse policies with applied filters and pagination.
    /// </summary>
    /// <param name="request">Query parameters including filters and pagination</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of excuse policy DTOs</returns>
    public async Task<Result<PagedResult<ExcusePolicyDto>>> Handle(GetExcusePoliciesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.ExcusePolicies
            .AsNoTracking()
            .Include(ep => ep.Branch)
            .AsQueryable();

        // Apply branch filter if specified
        if (request.BranchId.HasValue)
        {
            query = query.Where(ep => ep.BranchId == request.BranchId.Value);
        }

        // Apply active status filter if specified
        if (request.IsActive.HasValue)
        {
            query = query.Where(ep => ep.IsActive == request.IsActive.Value);
        }

        // Order by creation date (newest first)
        query = query.OrderByDescending(ep => ep.CreatedAtUtc);

        // Project to DTO
        var dtoQuery = query.Select(ep => new ExcusePolicyDto
        {
            Id = ep.Id,
            BranchId = ep.BranchId,
            BranchName = ep.Branch != null ? ep.Branch.Name : null,
            MaxPersonalExcusesPerMonth = ep.MaxPersonalExcusesPerMonth,
            MaxPersonalExcuseHoursPerMonth = ep.MaxPersonalExcuseHoursPerMonth,
            MaxPersonalExcuseHoursPerDay = ep.MaxPersonalExcuseHoursPerDay,
            MaxHoursPerExcuse = ep.MaxHoursPerExcuse,
            RequiresApproval = ep.RequiresApproval,
            AllowPartialHourExcuses = ep.AllowPartialHourExcuses,
            MinimumExcuseDuration = ep.MinimumExcuseDuration,
            IsActive = ep.IsActive,
            MaxRetroactiveDays = ep.MaxRetroactiveDays,
            AllowSelfServiceRequests = ep.AllowSelfServiceRequests,
            CreatedAtUtc = ep.CreatedAtUtc,
            CreatedBy = ep.CreatedBy,
            ModifiedAtUtc = ep.ModifiedAtUtc,
            ModifiedBy = ep.ModifiedBy
        });

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination
        var policies = await dtoQuery
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var result = new PagedResult<ExcusePolicyDto>(
            policies,
            totalCount,
            request.PageNumber,
            request.PageSize
        );

        return Result.Success(result);
    }
}