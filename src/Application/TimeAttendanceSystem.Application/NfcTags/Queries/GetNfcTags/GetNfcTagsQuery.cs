using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTags;

/// <summary>
/// Query to get a paginated list of NFC tags.
/// </summary>
public record GetNfcTagsQuery(
    int Page,
    int PageSize,
    long? BranchId,
    bool? IsActive
) : IRequest<Result<PagedResult<NfcTagDto>>>;

public record NfcTagDto(
    long Id,
    string TagUid,
    long BranchId,
    string BranchName,
    string? Description,
    bool IsWriteProtected,
    DateTime? LockedAt,
    bool IsActive,
    NfcTagStatus Status,
    DateTime? LastScannedAt,
    int ScanCount,
    DateTime CreatedAtUtc
);
