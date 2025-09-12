using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Sessions.Commands.TerminateSession;

public class TerminateSessionCommandHandler : BaseHandler<TerminateSessionCommand, Result<bool>>
{
    private readonly IDeviceService _deviceService;

    public TerminateSessionCommandHandler(
        IApplicationDbContext context, 
        ICurrentUser currentUser,
        IDeviceService deviceService) 
        : base(context, currentUser)
    {
        _deviceService = deviceService;
    }

    public override async Task<Result<bool>> Handle(TerminateSessionCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = CurrentUser.UserId;
        if (!currentUserId.HasValue)
            return Result.Failure<bool>("User not authenticated.");

        // Verify the session belongs to the current user
        var session = await Context.UserSessions
            .FirstOrDefaultAsync(s => s.SessionId == request.SessionId && s.UserId == currentUserId.Value, cancellationToken);

        if (session == null)
            return Result.Failure<bool>("Session not found or does not belong to current user.");

        // Deactivate the session
        await _deviceService.DeactivateSessionAsync(request.SessionId, cancellationToken);

        // Invalidate associated refresh tokens
        var refreshTokens = await Context.RefreshTokens
            .Where(rt => rt.UserId == currentUserId.Value && rt.DeviceInfo == session.DeviceName)
            .ToListAsync(cancellationToken);

        foreach (var token in refreshTokens)
        {
            token.RevokedAtUtc = DateTime.UtcNow;
            token.ModifiedAtUtc = DateTime.UtcNow;
            token.ModifiedBy = CurrentUser.Username ?? "System";
        }

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = currentUserId.Value,
            Action = AuditAction.SessionTerminated,
            EntityName = "UserSession",
            EntityId = session.Id.ToString(),
            PayloadJson = $"{{\"sessionId\":\"{request.SessionId}\",\"deviceName\":\"{session.DeviceName}\"}}",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "System"
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}