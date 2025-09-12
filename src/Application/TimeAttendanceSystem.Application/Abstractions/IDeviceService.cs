using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Abstractions;

public interface IDeviceService
{
    string GenerateDeviceFingerprint(string userAgent, string ipAddress, Dictionary<string, string>? additionalInfo = null);
    DeviceInfo ParseUserAgent(string userAgent);
    string GenerateSessionId();
    Task<UserSession> CreateSessionAsync(long userId, string deviceFingerprint, DeviceInfo deviceInfo, string ipAddress, CancellationToken cancellationToken = default);
    Task UpdateSessionActivityAsync(string sessionId, CancellationToken cancellationToken = default);
    Task DeactivateSessionAsync(string sessionId, CancellationToken cancellationToken = default);
    Task DeactivateAllUserSessionsAsync(long userId, string? exceptSessionId = null, CancellationToken cancellationToken = default);
    Task CleanupExpiredSessionsAsync(CancellationToken cancellationToken = default);
}

public record DeviceInfo(
    string Platform,
    string Browser,
    string DeviceName,
    string UserAgent
);