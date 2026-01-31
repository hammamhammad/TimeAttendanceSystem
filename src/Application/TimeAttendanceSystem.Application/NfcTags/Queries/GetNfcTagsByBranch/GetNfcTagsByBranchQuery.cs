using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTags;

namespace TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTagsByBranch;

/// <summary>
/// Query to get all NFC tags registered to a specific branch.
/// </summary>
public record GetNfcTagsByBranchQuery(long BranchId) : IRequest<Result<List<NfcTagDto>>>;
