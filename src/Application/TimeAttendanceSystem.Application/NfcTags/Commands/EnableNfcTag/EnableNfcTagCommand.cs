using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.EnableNfcTag;

/// <summary>
/// Command to re-enable a previously disabled NFC tag.
/// </summary>
public record EnableNfcTagCommand(long Id) : ICommand<Result>;
