using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Infrastructure.Services;

public class DeviceService : IDeviceService
{
    private readonly IApplicationDbContext _context;

    public DeviceService(IApplicationDbContext context)
    {
        _context = context;
    }

    public string GenerateDeviceFingerprint(string userAgent, string ipAddress, Dictionary<string, string>? additionalInfo = null)
    {
        var deviceInfo = ParseUserAgent(userAgent);
        
        var fingerprintData = new StringBuilder();
        fingerprintData.Append(deviceInfo.Platform);
        fingerprintData.Append(deviceInfo.Browser);
        fingerprintData.Append(ipAddress);
        fingerprintData.Append(userAgent);
        
        if (additionalInfo != null)
        {
            foreach (var item in additionalInfo.OrderBy(x => x.Key))
            {
                fingerprintData.Append($"{item.Key}:{item.Value}");
            }
        }

        using var sha256 = SHA256.Create();
        var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(fingerprintData.ToString()));
        return Convert.ToBase64String(hash);
    }

    public DeviceInfo ParseUserAgent(string userAgent)
    {
        if (string.IsNullOrEmpty(userAgent))
        {
            return new DeviceInfo("Unknown", "Unknown", "Unknown Device", userAgent);
        }

        var platform = ExtractPlatform(userAgent);
        var browser = ExtractBrowser(userAgent);
        var deviceName = GenerateDeviceName(platform, browser);

        return new DeviceInfo(platform, browser, deviceName, userAgent);
    }

    public string GenerateSessionId()
    {
        return Guid.NewGuid().ToString("N");
    }

    public async Task<UserSession> CreateSessionAsync(long userId, string deviceFingerprint, DeviceInfo deviceInfo, string ipAddress, CancellationToken cancellationToken = default)
    {
        var sessionId = GenerateSessionId();
        var now = DateTime.UtcNow;
        
        var session = new UserSession
        {
            UserId = userId,
            SessionId = sessionId,
            DeviceFingerprint = deviceFingerprint,
            DeviceName = deviceInfo.DeviceName,
            IpAddress = ipAddress,
            UserAgent = deviceInfo.UserAgent,
            Platform = deviceInfo.Platform,
            Browser = deviceInfo.Browser,
            Location = await GetLocationFromIpAsync(ipAddress),
            LastAccessedAtUtc = now,
            ExpiresAtUtc = now.AddDays(30), // 30 days session expiry
            IsActive = true,
            IsCurrentSession = true,
            CreatedAtUtc = now,
            CreatedBy = "System"
        };

        // Mark all other sessions for this user as not current
        var otherSessions = await _context.UserSessions
            .Where(s => s.UserId == userId && s.IsActive)
            .ToListAsync(cancellationToken);

        foreach (var otherSession in otherSessions)
        {
            otherSession.IsCurrentSession = false;
        }

        _context.UserSessions.Add(session);
        return session;
    }

    public async Task UpdateSessionActivityAsync(string sessionId, CancellationToken cancellationToken = default)
    {
        var session = await _context.UserSessions
            .FirstOrDefaultAsync(s => s.SessionId == sessionId && s.IsActive, cancellationToken);

        if (session != null)
        {
            session.LastAccessedAtUtc = DateTime.UtcNow;
            session.ModifiedAtUtc = DateTime.UtcNow;
            session.ModifiedBy = "System";
        }
    }

    public async Task DeactivateSessionAsync(string sessionId, CancellationToken cancellationToken = default)
    {
        var session = await _context.UserSessions
            .FirstOrDefaultAsync(s => s.SessionId == sessionId, cancellationToken);

        if (session != null)
        {
            session.IsActive = false;
            session.IsCurrentSession = false;
            session.ModifiedAtUtc = DateTime.UtcNow;
            session.ModifiedBy = "System";
        }
    }

    public async Task DeactivateAllUserSessionsAsync(long userId, string? exceptSessionId = null, CancellationToken cancellationToken = default)
    {
        var sessions = await _context.UserSessions
            .Where(s => s.UserId == userId && s.IsActive)
            .ToListAsync(cancellationToken);

        foreach (var session in sessions)
        {
            if (exceptSessionId == null || session.SessionId != exceptSessionId)
            {
                session.IsActive = false;
                session.IsCurrentSession = false;
                session.ModifiedAtUtc = DateTime.UtcNow;
                session.ModifiedBy = "System";
            }
        }
    }

    public async Task CleanupExpiredSessionsAsync(CancellationToken cancellationToken = default)
    {
        var expiredSessions = await _context.UserSessions
            .Where(s => s.ExpiresAtUtc < DateTime.UtcNow || s.LastAccessedAtUtc < DateTime.UtcNow.AddDays(-30))
            .ToListAsync(cancellationToken);

        foreach (var session in expiredSessions)
        {
            session.IsActive = false;
            session.IsCurrentSession = false;
            session.ModifiedAtUtc = DateTime.UtcNow;
            session.ModifiedBy = "System";
        }
    }

    private string ExtractPlatform(string userAgent)
    {
        if (userAgent.Contains("Windows NT")) return "Windows";
        if (userAgent.Contains("Mac OS X")) return "macOS";
        if (userAgent.Contains("Linux")) return "Linux";
        if (userAgent.Contains("Android")) return "Android";
        if (userAgent.Contains("iPhone") || userAgent.Contains("iPad")) return "iOS";
        return "Unknown";
    }

    private string ExtractBrowser(string userAgent)
    {
        if (userAgent.Contains("Edg/")) return "Microsoft Edge";
        if (userAgent.Contains("Chrome/")) return "Google Chrome";
        if (userAgent.Contains("Firefox/")) return "Mozilla Firefox";
        if (userAgent.Contains("Safari/") && !userAgent.Contains("Chrome")) return "Safari";
        if (userAgent.Contains("Opera/") || userAgent.Contains("OPR/")) return "Opera";
        return "Unknown";
    }

    private string GenerateDeviceName(string platform, string browser)
    {
        return $"{browser} on {platform}";
    }

    private async Task<string> GetLocationFromIpAsync(string ipAddress)
    {
        // Placeholder for IP geolocation
        // In production, you would integrate with a geolocation service
        await Task.CompletedTask;
        
        if (ipAddress == "127.0.0.1" || ipAddress == "::1")
        {
            return "Local";
        }
        
        return "Unknown Location";
    }
}