using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using System.Net;
using TimeAttendanceSystem.Api;
using TimeAttendanceSystem.Api.Controllers;
using Xunit;
using FluentAssertions;

namespace TimeAttendanceSystem.IntegrationTests.Controllers;

public class UsersControllerTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly TestWebApplicationFactory<Program> _factory;

    public UsersControllerTests(TestWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetUsers_WithoutAuth_ReturnsUnauthorized()
    {
        // Act
        var response = await _client.GetAsync("/api/v1/users");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task GetUsers_WithAuth_ReturnsSuccess()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Act
        var response = await _client.GetAsync("/api/v1/users");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task CreateUser_WithValidData_ReturnsCreated()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);
        var request = new CreateUserRequest(
            "testuser",
            "test@example.com",
            "+1234567890",
            "en",
            new List<long> { 1 }, // Assuming role ID 1 exists
            new List<long> { 1 }  // Assuming branch ID 1 exists
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/users", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task CreateUser_WithDuplicateEmail_ReturnsBadRequest()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);
        var request = new CreateUserRequest(
            "testuser2",
            "admin@timeattendance.com", // This email should already exist from seeding
            "+1234567890",
            "en",
            new List<long> { 1 },
            new List<long> { 1 }
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/users", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task GetUserById_WithValidId_ReturnsUser()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Act
        var response = await _client.GetAsync("/api/v1/users/1"); // Assuming user ID 1 exists

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetUserById_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Act
        var response = await _client.GetAsync("/api/v1/users/999999");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task UpdateUser_WithValidData_ReturnsNoContent()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);
        var request = new UpdateUserRequest(
            "updated@example.com",
            "+9876543210",
            "ar",
            true
        );

        // Act
        var response = await _client.PutAsJsonAsync("/api/v1/users/1", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }

    [Fact]
    public async Task DeleteUser_WithValidId_ReturnsNoContent()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Create a user first
        var createRequest = new CreateUserRequest(
            "deleteme",
            "deleteme@example.com",
            "+1111111111",
            "en",
            new List<long> { 2 }, // Non-system admin role
            new List<long> { 1 }
        );
        var createResponse = await _client.PostAsJsonAsync("/api/v1/users", createRequest);
        var createResult = await createResponse.Content.ReadFromJsonAsync<dynamic>();
        var userId = createResult?.id;

        // Act
        var response = await _client.DeleteAsync($"/api/v1/users/{userId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }
}