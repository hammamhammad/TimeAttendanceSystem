using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using TimeAttendanceSystem.Api;
using TimeAttendanceSystem.Api.Controllers;
using TimeAttendanceSystem.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using OtpNet;

namespace TimeAttendanceSystem.IntegrationTests;

public class TwoFactorAuthenticationTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    private readonly TestWebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public TwoFactorAuthenticationTests(TestWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task EnableTwoFactor_WithValidUser_ShouldReturnSecretAndQrCode()
    {
        // Arrange - First login to get access token
        var (accessToken, _) = await LoginAndGetTokens();
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        // Act
        var response = await _client.PostAsync("/api/v1/auth/enable-2fa", null);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("secretKey", out var secretKey).Should().BeTrue();
        result.TryGetProperty("qrCodeUri", out var qrCodeUri).Should().BeTrue();
        result.TryGetProperty("backupCodes", out var backupCodes).Should().BeTrue();
        
        secretKey.GetString().Should().NotBeNullOrEmpty();
        qrCodeUri.GetString().Should().Contain("otpauth://totp/");
        backupCodes.GetArrayLength().Should().Be(10);
    }

    [Fact]
    public async Task ConfirmTwoFactor_WithValidCode_ShouldEnableTwoFactor()
    {
        // Arrange - First enable 2FA to get secret
        var (accessToken, _) = await LoginAndGetTokens();
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var enableResponse = await _client.PostAsync("/api/v1/auth/enable-2fa", null);
        var enableContent = await enableResponse.Content.ReadAsStringAsync();
        var enableResult = JsonSerializer.Deserialize<JsonElement>(enableContent);
        var secretKey = enableResult.GetProperty("secretKey").GetString()!;

        // Generate TOTP code
        var keyBytes = Base32Encoding.ToBytes(secretKey);
        var totp = new Totp(keyBytes);
        var code = totp.ComputeTotp();

        var confirmRequest = new ConfirmTwoFactorRequest(code);

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/confirm-2fa", confirmRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("message", out var message).Should().BeTrue();
        message.GetString().Should().Contain("Two-factor authentication has been enabled successfully");

        // Verify user now has 2FA enabled
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        var user = await context.Users.FirstOrDefaultAsync(u => u.Username == "systemadmin");
        user.Should().NotBeNull();
        user!.TwoFactorEnabled.Should().BeTrue();
        user.TwoFactorSecret.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task ConfirmTwoFactor_WithInvalidCode_ShouldReturnBadRequest()
    {
        // Arrange - First enable 2FA
        var (accessToken, _) = await LoginAndGetTokens();
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        await _client.PostAsync("/api/v1/auth/enable-2fa", null);

        var confirmRequest = new ConfirmTwoFactorRequest("000000");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/confirm-2fa", confirmRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("error", out var error).Should().BeTrue();
        error.GetString().Should().Contain("Invalid verification code");
    }

    [Fact]
    public async Task Login_WithTwoFactorEnabled_ShouldRequireTwoFactorVerification()
    {
        // Arrange - Enable 2FA for user first
        await EnableTwoFactorForUser();

        // Reset client to remove authentication header
        _client.DefaultRequestHeaders.Authorization = null;

        var loginRequest = new LoginRequest("systemadmin", "TempP@ssw0rd123!", "TestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("requiresTwoFactor", out var requiresTwoFactor).Should().BeTrue();
        result.TryGetProperty("message", out var message).Should().BeTrue();
        
        requiresTwoFactor.GetBoolean().Should().BeTrue();
        message.GetString().Should().Contain("Two-factor authentication required");
    }

    [Fact]
    public async Task VerifyTwoFactor_WithValidCode_ShouldReturnAccessToken()
    {
        // Arrange - Enable 2FA and get secret
        var secretKey = await EnableTwoFactorForUser();

        // Reset client authentication
        _client.DefaultRequestHeaders.Authorization = null;

        // Generate valid TOTP code
        var keyBytes = Base32Encoding.ToBytes(secretKey);
        var totp = new Totp(keyBytes);
        var code = totp.ComputeTotp();

        var verifyRequest = new VerifyTwoFactorRequest("systemadmin", code, "TestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/verify-2fa", verifyRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("accessToken", out var accessToken).Should().BeTrue();
        result.TryGetProperty("expiresAt", out var expiresAt).Should().BeTrue();
        result.TryGetProperty("user", out var user).Should().BeTrue();
        
        accessToken.GetString().Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task VerifyTwoFactor_WithInvalidCode_ShouldReturnBadRequest()
    {
        // Arrange - Enable 2FA first
        await EnableTwoFactorForUser();

        // Reset client authentication
        _client.DefaultRequestHeaders.Authorization = null;

        var verifyRequest = new VerifyTwoFactorRequest("systemadmin", "000000", "TestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/verify-2fa", verifyRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("error", out var error).Should().BeTrue();
        error.GetString().Should().Contain("Invalid verification code");
    }

    [Fact]
    public async Task VerifyTwoFactor_WithBackupCode_ShouldReturnAccessToken()
    {
        // Arrange - Enable 2FA and get backup codes
        var backupCodes = await EnableTwoFactorForUserWithBackupCodes();

        // Reset client authentication
        _client.DefaultRequestHeaders.Authorization = null;

        var verifyRequest = new VerifyTwoFactorRequest("systemadmin", backupCodes[0], "TestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/verify-2fa", verifyRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("accessToken", out var accessToken).Should().BeTrue();
        
        accessToken.GetString().Should().NotBeNullOrEmpty();

        // Verify backup code was consumed
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        var backupCode = await context.TwoFactorBackupCodes
            .FirstOrDefaultAsync(bc => bc.Code == backupCodes[0]);
        backupCode.Should().NotBeNull();
        backupCode!.IsUsed.Should().BeTrue();
    }

    [Fact]
    public async Task VerifyTwoFactor_WithUsedBackupCode_ShouldReturnBadRequest()
    {
        // Arrange - Enable 2FA and use a backup code
        var backupCodes = await EnableTwoFactorForUserWithBackupCodes();

        // Use the backup code once
        _client.DefaultRequestHeaders.Authorization = null;
        await _client.PostAsJsonAsync("/api/v1/auth/verify-2fa", 
            new VerifyTwoFactorRequest("systemadmin", backupCodes[0], "TestDevice"));

        // Try to use the same backup code again
        var verifyRequest = new VerifyTwoFactorRequest("systemadmin", backupCodes[0], "TestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/verify-2fa", verifyRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("error", out var error).Should().BeTrue();
        error.GetString().Should().Contain("Invalid verification code");
    }

    private async Task<(string accessToken, string refreshToken)> LoginAndGetTokens()
    {
        var loginRequest = new LoginRequest("systemadmin", "TempP@ssw0rd123!", "TestDevice");
        var response = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
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

    private async Task<string> EnableTwoFactorForUser()
    {
        var (accessToken, _) = await LoginAndGetTokens();
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        // Enable 2FA
        var enableResponse = await _client.PostAsync("/api/v1/auth/enable-2fa", null);
        var enableContent = await enableResponse.Content.ReadAsStringAsync();
        var enableResult = JsonSerializer.Deserialize<JsonElement>(enableContent);
        var secretKey = enableResult.GetProperty("secretKey").GetString()!;

        // Confirm 2FA
        var keyBytes = Base32Encoding.ToBytes(secretKey);
        var totp = new Totp(keyBytes);
        var code = totp.ComputeTotp();

        await _client.PostAsJsonAsync("/api/v1/auth/confirm-2fa", new ConfirmTwoFactorRequest(code));

        return secretKey;
    }

    private async Task<string[]> EnableTwoFactorForUserWithBackupCodes()
    {
        var (accessToken, _) = await LoginAndGetTokens();
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        // Enable 2FA
        var enableResponse = await _client.PostAsync("/api/v1/auth/enable-2fa", null);
        var enableContent = await enableResponse.Content.ReadAsStringAsync();
        var enableResult = JsonSerializer.Deserialize<JsonElement>(enableContent);
        var secretKey = enableResult.GetProperty("secretKey").GetString()!;
        
        var backupCodesArray = enableResult.GetProperty("backupCodes").EnumerateArray();
        var backupCodes = backupCodesArray.Select(bc => bc.GetString()!).ToArray();

        // Confirm 2FA
        var keyBytes = Base32Encoding.ToBytes(secretKey);
        var totp = new Totp(keyBytes);
        var code = totp.ComputeTotp();

        await _client.PostAsJsonAsync("/api/v1/auth/confirm-2fa", new ConfirmTwoFactorRequest(code));

        return backupCodes;
    }
}