using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.AuditLogs.Queries.GetAuditLogs;

public class GetAuditLogsQuery : IRequest<Result<GetAuditLogsResponse>>
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public List<AuditAction>? Actions { get; set; }
    public string? EntityName { get; set; }
    public string? EntityId { get; set; }
    public long? ActorUserId { get; set; }
    public string? SearchTerm { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public string? SortBy { get; set; } = "CreatedAtUtc";
    public string? SortDirection { get; set; } = "desc";
}
