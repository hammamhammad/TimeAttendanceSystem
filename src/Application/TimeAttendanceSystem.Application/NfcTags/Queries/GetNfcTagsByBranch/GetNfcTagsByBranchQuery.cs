using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTags;

namespace TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTagsByBranch;

/// <summary>
/// Query to get all NFC tags registered to a specific branch.
/// </summary>
public record GetNfcTagsByBranchQuery(long BranchId) : IRequest<Result<List<NfcTagDto>>>;
