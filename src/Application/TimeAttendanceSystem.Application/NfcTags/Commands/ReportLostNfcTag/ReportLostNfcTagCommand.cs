using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.NfcTags.Commands.ReportLostNfcTag;

/// <summary>
/// Command to report an NFC tag as lost or stolen.
/// This is a permanent action - the tag cannot be re-enabled.
/// </summary>
public record ReportLostNfcTagCommand(long Id) : ICommand<Result>;
