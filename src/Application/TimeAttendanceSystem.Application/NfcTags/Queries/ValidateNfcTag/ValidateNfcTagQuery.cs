using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Queries.ValidateNfcTag;

/// <summary>
/// Query to validate an NFC tag UID for check-in at a specific branch.
/// Returns true if the tag is valid (registered, active, and belongs to the branch).
/// </summary>
public record ValidateNfcTagQuery(string TagUid, long BranchId) : IRequest<Result<bool>>;
