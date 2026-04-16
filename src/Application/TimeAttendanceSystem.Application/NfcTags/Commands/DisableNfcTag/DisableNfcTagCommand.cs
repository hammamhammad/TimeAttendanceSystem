using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.NfcTags.Commands.DisableNfcTag;

/// <summary>
/// Command to temporarily disable an NFC tag. Tag can be re-enabled later.
/// </summary>
public record DisableNfcTagCommand(long Id) : ICommand<Result>;
