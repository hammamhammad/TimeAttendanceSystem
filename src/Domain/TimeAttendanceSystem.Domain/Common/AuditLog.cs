namespace TimeAttendanceSystem.Domain.Common;

public class AuditLog : BaseEntity
{
    public long? ActorUserId { get; set; }
    public AuditAction Action { get; set; }
    public string EntityName { get; set; } = string.Empty;
    public string EntityId { get; set; } = string.Empty;
    public string? PayloadJson { get; set; }
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
}