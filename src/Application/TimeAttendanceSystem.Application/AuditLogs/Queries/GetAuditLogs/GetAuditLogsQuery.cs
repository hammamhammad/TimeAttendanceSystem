using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.AuditLogs.Queries.GetAuditLogs;

public class GetAuditLogsQuery : IRequest<Result<GetAuditLogsResponse>>
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public List<AuditAction>? Actions { get; set; }
    public string? EntityName { get; set; }
    public long? ActorUserId { get; set; }
    public string? SearchTerm { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public string? SortBy { get; set; } = "CreatedAtUtc";
    public string? SortDirection { get; set; } = "desc";
}
