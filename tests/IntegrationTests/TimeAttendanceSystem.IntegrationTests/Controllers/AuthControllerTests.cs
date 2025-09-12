using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using System.Net;
using TimeAttendanceSystem.Api;
using Xunit;
using FluentAssertions;

namespace TimeAttendanceSystem.IntegrationTests.Controllers;

public class AuthControllerTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly TestWebApplicationFactory<Program> _factory;

    public AuthControllerTests(TestWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Login_WithValidCredentials_ReturnsSuccess()
    {
        // Arrange
        var loginRequest = new
        {
            Username = "systemadmin",
            Password = "TempP@ssw0rd123!"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var responseContent = await response.Content.ReadFromJsonAsync<dynamic>();
        responseContent?.accessToken.Should().NotBeNull();
        responseContent?.refreshToken.Should().NotBeNull();
    }

    [Fact]
    public async Task Login_WithInvalidCredentials_ReturnsUnauthorized()
    {
        // Arrange
        var loginRequest = new
        {
            Username = "systemadmin",
            Password = "WrongPassword"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task Login_WithMissingFields_ReturnsBadRequest()
    {
        // Arrange
        var loginRequest = new
        {
            Username = "systemadmin"
            // Missing password
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task Register_WithValidData_ReturnsSuccess()
    {
        // Arrange
        var registerRequest = new
        {
            Username = "newuser",
            Email = "newuser@example.com",
            Password = "NewUserP@ssw0rd123!",
            ConfirmPassword = "NewUserP@ssw0rd123!",
            Phone = "+1234567890",
            PreferredLanguage = "en"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/register", registerRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Register_WithDuplicateEmail_ReturnsBadRequest()
    {
        // Arrange
        var registerRequest = new
        {
            Username = "duplicateuser",
            Email = "admin@timeattendance.com", // This should already exist
            Password = "DuplicateP@ssw0rd123!",
            ConfirmPassword = "DuplicateP@ssw0rd123!",
            Phone = "+9876543210",
            PreferredLanguage = "en"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/register", registerRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task RefreshToken_WithValidToken_ReturnsNewTokens()
    {
        // Arrange
        var loginRequest = new
        {
            Username = "systemadmin",
            Password = "TempP@ssw0rd123!"
        };

        var loginResponse = await _client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        var loginResult = await loginResponse.Content.ReadFromJsonAsync<dynamic>();
        var refreshToken = loginResult?.refreshToken?.ToString();

        var refreshRequest = new
        {
            RefreshToken = refreshToken
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/refresh", refreshRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var refreshResult = await response.Content.ReadFromJsonAsync<dynamic>();
        refreshResult?.accessToken.Should().NotBeNull();
        refreshResult?.refreshToken.Should().NotBeNull();
    }

    [Fact]
    public async Task Logout_WithValidToken_ReturnsSuccess()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Act
        var response = await _client.PostAsync("/api/v1/auth/logout", null);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task RequestPasswordReset_WithValidEmail_ReturnsSuccess()
    {
        // Arrange
        var request = new
        {
            Email = "admin@timeattendance.com"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/request-password-reset", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task RequestPasswordReset_WithInvalidEmail_ReturnsBadRequest()
    {
        // Arrange
        var request = new
        {
            Email = "nonexistent@example.com"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/auth/request-password-reset", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }
}