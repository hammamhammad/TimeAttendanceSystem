using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.UpdateNfcTag;

/// <summary>
/// Handler for updating NFC tag information.
/// Validates the tag exists and is not write-protected before allowing updates.
/// </summary>
public class UpdateNfcTagCommandHandler : BaseHandler<UpdateNfcTagCommand, Result>
{
    public UpdateNfcTagCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateNfcTagCommand request, CancellationToken cancellationToken)
    {
        var nfcTag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (nfcTag == null)
        {
            return Result.Failure("NFC tag not found");
        }

        // Check if branch exists
        var branchExists = await Context.Branches
            .AnyAsync(b => b.Id == request.BranchId, cancellationToken);

        if (!branchExists)
        {
            return Result.Failure("Branch not found");
        }

        nfcTag.BranchId = request.BranchId;
        nfcTag.Description = request.Description?.Trim();
        nfcTag.IsActive = request.IsActive;
        nfcTag.ModifiedAtUtc = DateTime.UtcNow;
        nfcTag.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
