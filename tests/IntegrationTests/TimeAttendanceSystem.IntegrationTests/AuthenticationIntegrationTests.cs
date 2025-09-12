using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using TimeAttendanceSystem.Api;
using TimeAttendanceSystem.Api.Controllers;
using TimeAttendanceSystem.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace TimeAttendanceSystem.IntegrationTests;

public class AuthenticationIntegrationTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    private readonly TestWebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public AuthenticationIntegrationTests(TestWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task Login_WithValidCredentials_ShouldReturnAccessToken()
    {
        // Arrange
        var loginRequest = new LoginRequest("systemadmin", "TempP@ssw0rd123!", "TestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("accessToken", out var accessToken).Should().BeTrue();
        result.TryGetProperty("expiresAt", out var expiresAt).Should().BeTrue();
        result.TryGetProperty("mustChangePassword", out var mustChangePassword).Should().BeTrue();
        result.TryGetProperty("user", out var user).Should().BeTrue();
        
        accessToken.GetString().Should().NotBeNullOrEmpty();
        mustChangePassword.GetBoolean().Should().BeTrue();
        
        user.TryGetProperty("username", out var username).Should().BeTrue();
        username.GetString().Should().Be("systemadmin");
    }

    [Fact]
    public async Task Login_WithInvalidCredentials_ShouldReturnBadRequest()
    {
        // Arrange
        var loginRequest = new LoginRequest("systemadmin", "WrongPassword", "TestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("error", out var error).Should().BeTrue();
        error.GetString().Should().Contain("Invalid username or password");
    }

    [Fact]
    public async Task Register_WithValidData_ShouldCreateUser()
    {
        // Arrange
        var registerRequest = new RegisterRequest(
            "newuser", 
            "newuser@test.com", 
            "NewP@ssw0rd123!", 
            "NewP@ssw0rd123!", 
            "en");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/register", registerRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("message", out var message).Should().BeTrue();
        result.TryGetProperty("userId", out var userId).Should().BeTrue();
        result.TryGetProperty("username", out var username).Should().BeTrue();
        result.TryGetProperty("email", out var email).Should().BeTrue();
        
        message.GetString().Should().Contain("Registration successful");
        username.GetString().Should().Be("newuser");
        email.GetString().Should().Be("newuser@test.com");

        // Verify email verification was called
        _factory.MockEmailService.Verify(x => 
            x.SendEmailVerificationAsync("newuser@test.com", "newuser", It.IsAny<string>(), It.IsAny<CancellationToken>()), 
            Times.Once);
    }

    [Fact]
    public async Task Register_WithDuplicateUsername_ShouldReturnBadRequest()
    {
        // Arrange
        var registerRequest = new RegisterRequest(
            "systemadmin", 
            "duplicate@test.com", 
            "NewP@ssw0rd123!", 
            "NewP@ssw0rd123!", 
            "en");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/register", registerRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("error", out var error).Should().BeTrue();
        error.GetString().Should().Contain("Username is already taken");
    }

    [Fact]
    public async Task Register_WithDuplicateEmail_ShouldReturnBadRequest()
    {
        // Arrange
        var registerRequest = new RegisterRequest(
            "newuser2", 
            "admin@timeattendance.com", 
            "NewP@ssw0rd123!", 
            "NewP@ssw0rd123!", 
            "en");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/register", registerRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("error", out var error).Should().BeTrue();
        error.GetString().Should().Contain("Email is already registered");
    }

    [Fact]
    public async Task Register_WithWeakPassword_ShouldReturnBadRequest()
    {
        // Arrange
        var registerRequest = new RegisterRequest(
            "weakpassuser", 
            "weak@test.com", 
            "123", 
            "123", 
            "en");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/register", registerRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("error", out var error).Should().BeTrue();
        error.GetString().Should().Contain("Password must be at least");
    }

    [Fact]
    public async Task VerifyEmail_WithValidToken_ShouldActivateUser()
    {
        // Arrange - First register a user
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var testUser = new TimeAttendanceSystem.Domain.Users.User
        {
            Username = "testverify",
            Email = "verify@test.com",
            PasswordHash = "hash",
            PasswordSalt = "salt",
            EmailConfirmed = false,
            EmailConfirmationToken = "test-token",
            IsActive = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "Test"
        };
        
        context.Users.Add(testUser);
        await context.SaveChangesAsync();

        var verifyRequest = new VerifyEmailRequest("verify@test.com", "test-token");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/verify-email", verifyRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("message", out var message).Should().BeTrue();
        message.GetString().Should().Contain("Email verified successfully");

        // Verify user is now active and email confirmed
        var updatedUser = await context.Users.FirstOrDefaultAsync(u => u.Email == "verify@test.com");
        updatedUser.Should().NotBeNull();
        updatedUser!.EmailConfirmed.Should().BeTrue();
        updatedUser.IsActive.Should().BeTrue();
    }

    [Fact]
    public async Task VerifyEmail_WithInvalidToken_ShouldReturnBadRequest()
    {
        // Arrange
        var verifyRequest = new VerifyEmailRequest("verify@test.com", "invalid-token");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/verify-email", verifyRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("error", out var error).Should().BeTrue();
        error.GetString().Should().Contain("Invalid verification token");
    }

    [Fact]
    public async Task ResendEmailVerification_WithExistingUnverifiedUser_ShouldSendEmail()
    {
        // Arrange - First register a user
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();
        
        var testUser = new TimeAttendanceSystem.Domain.Users.User
        {
            Username = "testresend",
            Email = "resend@test.com",
            PasswordHash = "hash",
            PasswordSalt = "salt",
            EmailConfirmed = false,
            EmailConfirmationToken = "old-token",
            IsActive = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "Test"
        };
        
        context.Users.Add(testUser);
        await context.SaveChangesAsync();

        var resendRequest = new ResendEmailVerificationRequest("resend@test.com");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/resend-email-verification", resendRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("message", out var message).Should().BeTrue();
        message.GetString().Should().Contain("verification email has been sent");

        // Verify email service was called
        _factory.MockEmailService.Verify(x => 
            x.SendEmailVerificationAsync("resend@test.com", "testresend", It.IsAny<string>(), It.IsAny<CancellationToken>()), 
            Times.AtLeastOnce);
    }

    [Fact]
    public async Task RequestPasswordReset_WithExistingUser_ShouldSendResetEmail()
    {
        // Arrange
        var resetRequest = new PasswordResetRequest("admin@timeattendance.com");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/request-password-reset", resetRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("message", out var message).Should().BeTrue();
        message.GetString().Should().Contain("password reset link has been sent");

        // Verify password reset email was called
        _factory.MockEmailService.Verify(x => 
            x.SendPasswordResetEmailAsync("admin@timeattendance.com", "systemadmin", It.IsAny<string>(), It.IsAny<CancellationToken>()), 
            Times.Once);
    }

    [Fact]
    public async Task RefreshToken_WithValidToken_ShouldReturnNewAccessToken()
    {
        // Arrange - First login to get refresh token
        var loginRequest = new LoginRequest("systemadmin", "TempP@ssw0rd123!", "TestDevice");
        var loginResponse = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        loginResponse.StatusCode.Should().Be(HttpStatusCode.OK);

        // Extract refresh token from cookies
        var refreshTokenCookie = loginResponse.Headers
            .FirstOrDefault(h => h.Key == "Set-Cookie")
            .Value?.FirstOrDefault(c => c.StartsWith("refreshToken="));
        
        refreshTokenCookie.Should().NotBeNull();
        
        var refreshTokenValue = refreshTokenCookie!.Split('=')[1].Split(';')[0];
        
        var refreshRequest = new RefreshTokenRequest(refreshTokenValue, "TestDevice");

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/refresh", refreshRequest);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(content);
        result.TryGetProperty("accessToken", out var accessToken).Should().BeTrue();
        result.TryGetProperty("expiresAt", out var expiresAt).Should().BeTrue();
        
        accessToken.GetString().Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task Logout_WithValidToken_ShouldInvalidateSession()
    {
        // Arrange - First login to get refresh token
        var loginRequest = new LoginRequest("systemadmin", "TempP@ssw0rd123!", "TestDevice");
        var loginResponse = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        loginResponse.StatusCode.Should().Be(HttpStatusCode.OK);

        var content = await loginResponse.Content.ReadAsStringAsync();
        var loginResult = JsonSerializer.Deserialize<JsonElement>(content);
        var accessToken = loginResult.GetProperty("accessToken").GetString();

        // Extract refresh token from cookies
        var refreshTokenCookie = loginResponse.Headers
            .FirstOrDefault(h => h.Key == "Set-Cookie")
            .Value?.FirstOrDefault(c => c.StartsWith("refreshToken="));
        
        var refreshTokenValue = refreshTokenCookie!.Split('=')[1].Split(';')[0];
        
        // Add Authorization header
        _client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var logoutRequest = new LogoutRequest(refreshTokenValue, false);

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/logout", logoutRequest);
        var logoutContent = await response.Content.ReadAsStringAsync();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var result = JsonSerializer.Deserialize<JsonElement>(logoutContent);
        result.TryGetProperty("message", out var message).Should().BeTrue();
        message.GetString().Should().Contain("Logged out successfully");
        
        // Verify refresh token cookie is cleared
        var clearCookie = response.Headers
            .FirstOrDefault(h => h.Key == "Set-Cookie")
            .Value?.FirstOrDefault(c => c.StartsWith("refreshToken="));
        
        clearCookie.Should().NotBeNull();
        clearCookie.Should().Contain("expires=");
    }
}