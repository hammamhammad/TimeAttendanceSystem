using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Application.NfcTags.Queries.GetNfcWriteData;

/// <summary>
/// Handler for generating NFC tag write data with HMAC-signed payload.
/// </summary>
public class GetNfcWriteDataQueryHandler : BaseHandler<GetNfcWriteDataQuery, Result<NfcWriteDataDto>>
{
    private readonly INfcTagEncryptionService _encryptionService;

    public GetNfcWriteDataQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        INfcTagEncryptionService encryptionService)
        : base(context, currentUser)
    {
        _encryptionService = encryptionService;
    }

    public override async Task<Result<NfcWriteDataDto>> Handle(GetNfcWriteDataQuery request, CancellationToken cancellationToken)
    {
        var tag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.Id == request.TagId, cancellationToken);

        if (tag == null)
        {
            return Result.Failure<NfcWriteDataDto>("NFC tag not found");
        }

        if (tag.Status == NfcTagStatus.Active && tag.EncryptedPayload != null)
        {
            return Result.Failure<NfcWriteDataDto>("NFC tag is already provisioned");
        }

        if (tag.Status == NfcTagStatus.Lost)
        {
            return Result.Failure<NfcWriteDataDto>("Cannot provision a lost NFC tag");
        }

        var payload = _encryptionService.GenerateSignedPayload(tag);

        return Result.Success(new NfcWriteDataDto(
            TagId: tag.Id,
            BranchId: tag.BranchId,
            VerificationCode: payload.SignedPayload,
            Timestamp: payload.Timestamp
        ));
    }
}
