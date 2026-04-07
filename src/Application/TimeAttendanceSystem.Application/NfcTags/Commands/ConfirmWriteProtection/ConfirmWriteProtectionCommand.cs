using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Commands.ConfirmWriteProtection;

/// <summary>
/// Command to confirm that an NFC tag has been physically provisioned with the encrypted payload.
/// Sets the tag status to Active and stores the payload for verification.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record ConfirmWriteProtectionCommand(
    long TagId,
    string? EncryptedPayload
) : ICommand<Result>;
