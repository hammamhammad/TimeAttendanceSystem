using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Application.NfcTags.Commands.ConfirmWriteProtection;

/// <summary>
/// Handler for confirming NFC tag provisioning.
/// Marks the tag as Active, stores the encrypted payload, and sets write protection.
/// </summary>
public class ConfirmWriteProtectionCommandHandler : BaseHandler<ConfirmWriteProtectionCommand, Result>
{
    public ConfirmWriteProtectionCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(ConfirmWriteProtectionCommand request, CancellationToken cancellationToken)
    {
        var tag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.Id == request.TagId, cancellationToken);

        if (tag == null)
        {
            return Result.Failure("NFC tag not found");
        }

        if (tag.Status == NfcTagStatus.Lost)
        {
            return Result.Failure("Cannot provision a lost NFC tag");
        }

        // Store the encrypted payload and its hash for verification during check-in
        if (!string.IsNullOrWhiteSpace(request.EncryptedPayload))
        {
            tag.EncryptedPayload = request.EncryptedPayload;
            tag.VerificationHash = ComputeSha256(request.EncryptedPayload);
        }

        tag.Status = NfcTagStatus.Active;
        tag.IsActive = true;
        tag.IsWriteProtected = true;
        tag.LockedAt = DateTime.UtcNow;
        tag.LockedByUserId = CurrentUser.UserId;
        tag.ModifiedAtUtc = DateTime.UtcNow;
        tag.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }

    private static string ComputeSha256(string input)
    {
        var hash = SHA256.HashData(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(hash);
    }
}
