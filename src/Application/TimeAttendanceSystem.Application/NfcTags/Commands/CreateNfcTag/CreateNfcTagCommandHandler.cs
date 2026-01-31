using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.CreateNfcTag;

/// <summary>
/// Handler for registering a new NFC tag.
/// Validates that the tag UID is unique and the branch exists.
/// </summary>
public class CreateNfcTagCommandHandler : BaseHandler<CreateNfcTagCommand, Result<long>>
{
    public CreateNfcTagCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateNfcTagCommand request, CancellationToken cancellationToken)
    {
        // Validate tag UID is not empty
        if (string.IsNullOrWhiteSpace(request.TagUid))
        {
            return Result.Failure<long>("Tag UID is required");
        }

        // Check if branch exists
        var branchExists = await Context.Branches
            .AnyAsync(b => b.Id == request.BranchId, cancellationToken);

        if (!branchExists)
        {
            return Result.Failure<long>("Branch not found");
        }

        // Check if tag UID already exists
        var tagExists = await Context.NfcTags
            .AnyAsync(t => t.TagUid == request.TagUid, cancellationToken);

        if (tagExists)
        {
            return Result.Failure<long>("NFC tag with this UID is already registered");
        }

        var nfcTag = new NfcTag
        {
            TagUid = request.TagUid.Trim(),
            BranchId = request.BranchId,
            Description = request.Description?.Trim(),
            IsActive = true,
            IsWriteProtected = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "System"
        };

        Context.NfcTags.Add(nfcTag);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(nfcTag.Id);
    }
}
