using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.AuditLogs.Queries.GetAuditLogs;

public record GetAuditLogsResponse(
    List<AuditLogDto> AuditLogs,
    int TotalCount,
    int PageNumber,
    int PageSize,
    int TotalPages
);

public record AuditLogDto(
    long Id,
    long? ActorUserId,
    string? ActorUsername,
    string? ActorEmail,
    AuditAction Action,
    string ActionDisplayName,
    string EntityName,
    string EntityId,
    string? PayloadJson,
    string? IpAddress,
    string? UserAgent,
    DateTime CreatedAtUtc,
    string CreatedBy
);
