namespace TimeAttendanceSystem.Application.Sessions.Queries.GetUserSessions;

public record GetUserSessionsResponse(
    List<UserSessionDto> Sessions
);

public record UserSessionDto(
    string SessionId,
    string DeviceName,
    string Platform,
    string Browser,
    string IpAddress,
    string Location,
    DateTime LastAccessedAtUtc,
    DateTime CreatedAtUtc,
    bool IsCurrentSession,
    bool IsActive
);