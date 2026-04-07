using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Queries.ValidateNfcTag;

/// <summary>
/// Query to validate an NFC tag UID for check-in at a specific branch.
/// Returns true if the tag is valid (registered, active, and belongs to the branch).
/// </summary>
[RequiresModule(SystemModule.TimeAttendance, AllowReadWhenDisabled = true)]
public record ValidateNfcTagQuery(string TagUid, long BranchId) : IRequest<Result<bool>>;
