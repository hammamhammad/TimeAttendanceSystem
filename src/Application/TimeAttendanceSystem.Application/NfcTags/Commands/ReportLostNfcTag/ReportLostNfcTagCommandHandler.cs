using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Application.NfcTags.Commands.ReportLostNfcTag;

/// <summary>
/// Handler for reporting an NFC tag as lost or stolen.
/// Permanently disables the tag - it cannot be re-enabled.
/// </summary>
public class ReportLostNfcTagCommandHandler : BaseHandler<ReportLostNfcTagCommand, Result>
{
    public ReportLostNfcTagCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(ReportLostNfcTagCommand request, CancellationToken cancellationToken)
    {
        var tag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);

        if (tag == null)
        {
            return Result.Failure("NFC tag not found");
        }

        if (tag.Status == NfcTagStatus.Lost)
        {
            return Result.Failure("NFC tag is already reported as lost");
        }

        tag.Status = NfcTagStatus.Lost;
        tag.IsActive = false;
        tag.ModifiedAtUtc = DateTime.UtcNow;
        tag.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
