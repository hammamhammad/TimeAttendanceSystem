using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTags;

/// <summary>
/// Handler for getting paginated NFC tags list.
/// </summary>
public class GetNfcTagsQueryHandler : BaseHandler<GetNfcTagsQuery, Result<PagedResult<NfcTagDto>>>
{
    public GetNfcTagsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PagedResult<NfcTagDto>>> Handle(GetNfcTagsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.NfcTags
            .Include(t => t.Branch)
            .AsQueryable();

        // Apply filters
        if (request.BranchId.HasValue)
        {
            query = query.Where(t => t.BranchId == request.BranchId.Value);
        }

        if (request.IsActive.HasValue)
        {
            query = query.Where(t => t.IsActive == request.IsActive.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(t => t.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(t => new NfcTagDto(
                t.Id,
                t.TagUid,
                t.BranchId,
                t.Branch.Name,
                t.Description,
                t.IsWriteProtected,
                t.LockedAt,
                t.IsActive,
                t.CreatedAtUtc
            ))
            .ToListAsync(cancellationToken);

        var result = new PagedResult<NfcTagDto>(items, totalCount, request.Page, request.PageSize);
        return Result<PagedResult<NfcTagDto>>.Success(result);
    }
}
