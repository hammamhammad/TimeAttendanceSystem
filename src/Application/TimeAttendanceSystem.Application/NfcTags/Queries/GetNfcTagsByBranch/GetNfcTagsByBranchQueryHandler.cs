using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTags;

namespace TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTagsByBranch;

/// <summary>
/// Handler for getting all NFC tags for a specific branch.
/// </summary>
public class GetNfcTagsByBranchQueryHandler : BaseHandler<GetNfcTagsByBranchQuery, Result<List<NfcTagDto>>>
{
    public GetNfcTagsByBranchQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<List<NfcTagDto>>> Handle(GetNfcTagsByBranchQuery request, CancellationToken cancellationToken)
    {
        // Check if branch exists
        var branchExists = await Context.Branches
            .AnyAsync(b => b.Id == request.BranchId, cancellationToken);

        if (!branchExists)
        {
            return Result.Failure<List<NfcTagDto>>("Branch not found");
        }

        var nfcTags = await Context.NfcTags
            .Include(t => t.Branch)
            .Where(t => t.BranchId == request.BranchId && t.IsActive)
            .OrderBy(t => t.Description)
            .ThenBy(t => t.TagUid)
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

        return Result.Success(nfcTags);
    }
}
