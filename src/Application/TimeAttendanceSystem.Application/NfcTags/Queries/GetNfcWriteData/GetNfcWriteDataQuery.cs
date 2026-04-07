using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Queries.GetNfcWriteData;

/// <summary>
/// Query to generate an HMAC-signed payload for provisioning an NFC tag.
/// The payload is written to the tag's NDEF memory during the provisioning step.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance, AllowReadWhenDisabled = true)]
public record GetNfcWriteDataQuery(long TagId) : IRequest<Result<NfcWriteDataDto>>;

/// <summary>
/// DTO containing the signed payload to write to an NFC tag.
/// </summary>
public record NfcWriteDataDto(
    long TagId,
    long BranchId,
    string VerificationCode,
    long Timestamp
);
