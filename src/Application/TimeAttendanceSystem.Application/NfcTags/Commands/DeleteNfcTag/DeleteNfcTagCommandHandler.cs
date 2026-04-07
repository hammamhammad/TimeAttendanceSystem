using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.NfcTags.Commands.DeleteNfcTag;

/// <summary>
/// Handler for soft-deleting an NFC tag.
/// </summary>
public class DeleteNfcTagCommandHandler : BaseHandler<DeleteNfcTagCommand, Result>
{
    public DeleteNfcTagCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(DeleteNfcTagCommand request, CancellationToken cancellationToken)
    {
        var nfcTag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (nfcTag == null)
        {
            return Result.Failure("NFC tag not found");
        }

        nfcTag.IsDeleted = true;
        nfcTag.IsActive = false;
        nfcTag.ModifiedAtUtc = DateTime.UtcNow;
        nfcTag.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
