using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.ConfirmWriteProtection;

/// <summary>
/// Command to confirm that an NFC tag has been physically provisioned with the encrypted payload.
/// Sets the tag status to Active and stores the payload for verification.
/// </summary>
public record ConfirmWriteProtectionCommand(
    long TagId,
    string? EncryptedPayload
) : ICommand<Result>;
