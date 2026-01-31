using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.LockNfcTag;

/// <summary>
/// Command to apply permanent write-protection to an NFC tag.
/// WARNING: This action is irreversible!
/// </summary>
public record LockNfcTagCommand(long Id) : ICommand<Result>;
