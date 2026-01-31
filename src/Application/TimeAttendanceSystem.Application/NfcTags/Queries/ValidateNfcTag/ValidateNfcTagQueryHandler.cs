using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Queries.ValidateNfcTag;

/// <summary>
/// Handler for validating NFC tag during check-in.
/// Checks if the tag is registered, active, and belongs to the specified branch.
/// </summary>
public class ValidateNfcTagQueryHandler : BaseHandler<ValidateNfcTagQuery, Result<bool>>
{
    public ValidateNfcTagQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<bool>> Handle(ValidateNfcTagQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.TagUid))
        {
            return Result.Failure<bool>("Tag UID is required");
        }

        var nfcTag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.TagUid == request.TagUid, cancellationToken);

        if (nfcTag == null)
        {
            return Result.Failure<bool>("NFC tag is not registered in the system");
        }

        if (!nfcTag.IsActive)
        {
            return Result.Failure<bool>("NFC tag is inactive");
        }

        if (nfcTag.BranchId != request.BranchId)
        {
            return Result.Failure<bool>("NFC tag is not registered for this branch");
        }

        return Result.Success(true);
    }
}
