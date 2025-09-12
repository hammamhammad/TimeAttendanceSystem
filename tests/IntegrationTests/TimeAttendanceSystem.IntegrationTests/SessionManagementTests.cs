using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using TimeAttendanceSystem.Api;
using TimeAttendanceSystem.Api.Controllers;
using TimeAttendanceSystem.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace TimeAttendanceSystem.IntegrationTests;

public class SessionManagementTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    private readonly TestWebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public SessionManagementTests(TestWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task Login_ShouldCreateUserSession()
    {
        // Arrange
        var loginRequest = new LoginRequest("systemadmin", "TempP@ssw0rd123!", "TestDevice-Chrome");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        // Verify session was created in database
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var session = await context.UserSessions
            .FirstOrDefaultAsync(s => s.DeviceInfo == "TestDevice-Chrome" && s.IsActive);
        
        session.Should().NotBeNull();
        session!.DeviceInfo.Should().Be("TestDevice-Chrome");
        session.IsActive.Should().BeTrue();
        session.CreatedAtUtc.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromMinutes(1));
    }

    [Fact]
    public async Task GetActiveSessions_WithValidToken_ShouldReturnUserSessions()
    {
        // Arrange - Create multiple sessions
        await LoginWithDevice("Device1");
        await LoginWithDevice("Device2");
        
        var (accessToken, _) = await LoginWithDevice("Device3");
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        // Act
        var response = await _client.GetAsync("/api/v1/sessions/active");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("sessions", out var sessions).Should().BeTrue();
        
        var sessionArray = sessions.EnumerateArray().ToArray();
        sessionArray.Length.Should().BeGreaterOrEqualTo(3);

        // Verify session details
        var deviceInfos = sessionArray.Select(s => s.GetProperty("deviceInfo").GetString()).ToArray();
        deviceInfos.Should().Contain("Device1");
        deviceInfos.Should().Contain("Device2");
        deviceInfos.Should().Contain("Device3");
    }

    [Fact]
    public async Task RevokeSession_WithValidSessionId_ShouldInactivateSession()
    {
        // Arrange - Create a session and get its ID
        var (accessToken, _) = await LoginWithDevice("DeviceToRevoke");
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var sessionsResponse = await _client.GetAsync("/api/v1/sessions/active");
        var sessionsContent = await sessionsResponse.Content.ReadAsStringAsync();
        var sessionsResult = JsonSerializer.Deserialize<JsonElement>(sessionsContent);
        
        var session = sessionsResult.GetProperty("sessions").EnumerateArray()
            .First(s => s.GetProperty("deviceInfo").GetString() == "DeviceToRevoke");
        var sessionId = session.GetProperty("id").GetInt64();

        // Act
        var response = await _client.DeleteAsync($"/api/v1/sessions/{sessionId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        // Verify session was inactivated
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var revokedSession = await context.UserSessions
            .FirstOrDefaultAsync(s => s.Id == sessionId);
        
        revokedSession.Should().NotBeNull();
        revokedSession!.IsActive.Should().BeFalse();
        revokedSession.RevokedAtUtc.Should().NotBeNull();
        revokedSession.RevokedAtUtc.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromMinutes(1));
    }

    [Fact]
    public async Task RevokeAllSessions_ShouldInactivateAllUserSessions()
    {
        // Arrange - Create multiple sessions
        await LoginWithDevice("Device1");
        await LoginWithDevice("Device2");
        var (accessToken, _) = await LoginWithDevice("Device3");
        
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        // Act
        var response = await _client.DeleteAsync("/api/v1/sessions/revoke-all");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        // Verify all sessions were inactivated
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var user = await context.Users.FirstAsync(u => u.Username == "systemadmin");
        var activeSessions = await context.UserSessions
            .Where(s => s.UserId == user.Id && s.IsActive)
            .ToListAsync();
        
        activeSessions.Should().BeEmpty();
    }

    [Fact]
    public async Task RefreshToken_ShouldUpdateLastActivityTime()
    {
        // Arrange
        var (accessToken, refreshToken) = await LoginWithDevice("RefreshTestDevice");

        // Wait a moment to see time difference
        await Task.Delay(100);

        var refreshRequest = new RefreshTokenRequest(refreshToken, "RefreshTestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/refresh", refreshRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        // Verify last activity was updated
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var session = await context.UserSessions
            .FirstOrDefaultAsync(s => s.DeviceInfo == "RefreshTestDevice" && s.IsActive);
        
        session.Should().NotBeNull();
        session!.LastActivityUtc.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromMinutes(1));
    }

    [Fact]
    public async Task Logout_WithLogoutFromAllDevices_ShouldRevokeAllSessions()
    {
        // Arrange - Create multiple sessions
        await LoginWithDevice("Device1");
        await LoginWithDevice("Device2");
        var (accessToken, refreshToken) = await LoginWithDevice("Device3");
        
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var logoutRequest = new LogoutRequest(refreshToken, LogoutFromAllDevices: true);

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/logout", logoutRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        // Verify all sessions were revoked
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var user = await context.Users.FirstAsync(u => u.Username == "systemadmin");
        var activeSessions = await context.UserSessions
            .Where(s => s.UserId == user.Id && s.IsActive)
            .ToListAsync();
        
        activeSessions.Should().BeEmpty();
    }

    [Fact]
    public async Task Logout_WithoutLogoutFromAllDevices_ShouldRevokeOnlyCurrentSession()
    {
        // Arrange - Create multiple sessions
        await LoginWithDevice("Device1");
        await LoginWithDevice("Device2");
        var (accessToken, refreshToken) = await LoginWithDevice("Device3");
        
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var logoutRequest = new LogoutRequest(refreshToken, LogoutFromAllDevices: false);

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/logout", logoutRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        // Verify only current session was revoked
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var user = await context.Users.FirstAsync(u => u.Username == "systemadmin");
        var activeSessions = await context.UserSessions
            .Where(s => s.UserId == user.Id && s.IsActive)
            .ToListAsync();
        
        // Should have 2 active sessions remaining (Device1 and Device2)
        activeSessions.Should().HaveCount(2);
        activeSessions.Select(s => s.DeviceInfo).Should().Contain("Device1");
        activeSessions.Select(s => s.DeviceInfo).Should().Contain("Device2");
        activeSessions.Select(s => s.DeviceInfo).Should().NotContain("Device3");
    }

    [Fact]
    public async Task GetActiveSessions_ShouldShowLocationAndDeviceDetails()
    {
        // Arrange
        var (accessToken, _) = await LoginWithDevice("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        // Act
        var response = await _client.GetAsync("/api/v1/sessions/active");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        var session = result.GetProperty("sessions").EnumerateArray().First();
        
        session.TryGetProperty("deviceInfo", out var deviceInfo).Should().BeTrue();
        session.TryGetProperty("ipAddress", out var ipAddress).Should().BeTrue();
        session.TryGetProperty("createdAtUtc", out var createdAt).Should().BeTrue();
        session.TryGetProperty("lastActivityUtc", out var lastActivity).Should().BeTrue();
        
        deviceInfo.GetString().Should().Contain("Mozilla");
        ipAddress.GetString().Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task Login_FromSameDevice_ShouldReuseExistingSession()
    {
        // Arrange
        var deviceInfo = "UniqueTestDevice";
        
        // First login
        await LoginWithDevice(deviceInfo);

        // Act - Login again from same device
        await LoginWithDevice(deviceInfo);

        // Assert - Should have only one active session for this device
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var sessions = await context.UserSessions
            .Where(s => s.DeviceInfo == deviceInfo && s.IsActive)
            .ToListAsync();
        
        sessions.Should().HaveCount(1);
    }

    private async Task<(string accessToken, string refreshToken)> LoginWithDevice(string deviceInfo)
    {
        // Create a new client to avoid header conflicts
        using var tempClient = _factory.CreateClient();
        
        var loginRequest = new LoginRequest("systemadmin", "TempP@ssw0rd123!", deviceInfo);
        var response = await tempClient.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<JsonElement>(content);

        var accessToken = result.GetProperty("accessToken").GetString()!;
        
        // Extract refresh token from cookies
        var refreshTokenCookie = response.Headers
            .FirstOrDefault(h => h.Key == "Set-Cookie")
            .Value?.FirstOrDefault(c => c.StartsWith("refreshToken="));
        var refreshToken = refreshTokenCookie!.Split('=')[1].Split(';')[0];

        return (accessToken, refreshToken);
    }
}