using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTags;

namespace TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTagById;

/// <summary>
/// Handler for getting a specific NFC tag by ID.
/// </summary>
public class GetNfcTagByIdQueryHandler : BaseHandler<GetNfcTagByIdQuery, Result<NfcTagDto>>
{
    public GetNfcTagByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<NfcTagDto>> Handle(GetNfcTagByIdQuery request, CancellationToken cancellationToken)
    {
        var nfcTag = await Context.NfcTags
            .Include(t => t.Branch)
            .Where(t => t.Id == request.Id)
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
            .FirstOrDefaultAsync(cancellationToken);

        if (nfcTag == null)
        {
            return Result.Failure<NfcTagDto>("NFC tag not found");
        }

        return Result.Success(nfcTag);
    }
}
