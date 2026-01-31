using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.DeleteNfcTag;

/// <summary>
/// Command to deactivate (soft delete) an NFC tag.
/// </summary>
public record DeleteNfcTagCommand(long Id) : ICommand<Result>;
