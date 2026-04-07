using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTags;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTagsByBranch;

/// <summary>
/// Query to get all NFC tags registered to a specific branch.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance, AllowReadWhenDisabled = true)]
public record GetNfcTagsByBranchQuery(long BranchId) : IRequest<Result<List<NfcTagDto>>>;
