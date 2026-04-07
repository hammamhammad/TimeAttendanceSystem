using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Commands.DisableNfcTag;

/// <summary>
/// Command to temporarily disable an NFC tag. Tag can be re-enabled later.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record DisableNfcTagCommand(long Id) : ICommand<Result>;
