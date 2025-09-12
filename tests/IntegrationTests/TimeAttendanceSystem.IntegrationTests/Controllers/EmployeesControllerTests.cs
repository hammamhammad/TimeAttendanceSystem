using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using System.Net;
using TimeAttendanceSystem.Api;
using TimeAttendanceSystem.Api.Controllers;
using TimeAttendanceSystem.Domain.Common;
using Xunit;
using FluentAssertions;

namespace TimeAttendanceSystem.IntegrationTests.Controllers;

public class EmployeesControllerTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly TestWebApplicationFactory<Program> _factory;

    public EmployeesControllerTests(TestWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetEmployees_WithAuth_ReturnsSuccess()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Act
        var response = await _client.GetAsync("/api/v1/employees");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetEmployees_WithFilters_ReturnsFilteredResults()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Act
        var response = await _client.GetAsync("/api/v1/employees?page=1&pageSize=5&isActive=true");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task CreateEmployee_WithValidData_ReturnsCreated()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);
        var request = new CreateEmployeeRequest(
            1, // Branch ID
            "EMP001",
            "John",
            "Doe",
            "جون",
            "دو",
            "1234567890",
            "john.doe@example.com",
            "+1234567890",
            new DateTime(1990, 1, 1),
            Gender.Male,
            new DateTime(2024, 1, 1),
            EmploymentStatus.Active,
            "Software Developer",
            "مطور برامج",
            null, // Department ID
            null, // Manager ID
            WorkLocationType.Onsite
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/employees", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task CreateEmployee_WithDuplicateEmployeeNumber_ReturnsBadRequest()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);
        
        // Create first employee
        var firstRequest = new CreateEmployeeRequest(
            1, "DUPLICATE001", "First", "Employee", null, null, "1111111111",
            "first@example.com", "+1111111111", null, null,
            new DateTime(2024, 1, 1), EmploymentStatus.Active,
            "Position 1", null, null, null, WorkLocationType.Onsite
        );
        await _client.PostAsJsonAsync("/api/v1/employees", firstRequest);

        // Try to create duplicate
        var duplicateRequest = new CreateEmployeeRequest(
            1, "DUPLICATE001", "Second", "Employee", null, null, "2222222222",
            "second@example.com", "+2222222222", null, null,
            new DateTime(2024, 1, 1), EmploymentStatus.Active,
            "Position 2", null, null, null, WorkLocationType.Onsite
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/employees", duplicateRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task GetEmployeeById_WithValidId_ReturnsEmployee()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Create an employee first
        var createRequest = new CreateEmployeeRequest(
            1, "GETTEST001", "Get", "Test", null, null, "9999999999",
            "gettest@example.com", "+9999999999", null, null,
            new DateTime(2024, 1, 1), EmploymentStatus.Active,
            "Test Position", null, null, null, WorkLocationType.Onsite
        );
        var createResponse = await _client.PostAsJsonAsync("/api/v1/employees", createRequest);
        var createResult = await createResponse.Content.ReadFromJsonAsync<dynamic>();
        var employeeId = createResult?.id;

        // Act
        var response = await _client.GetAsync($"/api/v1/employees/{employeeId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task UpdateEmployee_WithValidData_ReturnsNoContent()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Create an employee first
        var createRequest = new CreateEmployeeRequest(
            1, "UPDATE001", "Update", "Test", null, null, "8888888888",
            "update@example.com", "+8888888888", null, null,
            new DateTime(2024, 1, 1), EmploymentStatus.Active,
            "Original Position", null, null, null, WorkLocationType.Onsite
        );
        var createResponse = await _client.PostAsJsonAsync("/api/v1/employees", createRequest);
        var createResult = await createResponse.Content.ReadFromJsonAsync<dynamic>();
        var employeeId = createResult?.id;

        var updateRequest = new UpdateEmployeeRequest(
            "Updated",
            "Employee",
            "محدث",
            "موظف",
            "updated@example.com",
            "+7777777777",
            new DateTime(1985, 5, 15),
            Gender.Male,
            EmploymentStatus.Active,
            "Updated Position",
            "منصب محدث",
            null,
            null,
            WorkLocationType.Remote,
            null
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/v1/employees/{employeeId}", updateRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }

    [Fact]
    public async Task DeleteEmployee_WithValidId_ReturnsNoContent()
    {
        // Arrange
        await _factory.AuthenticateAsync(_client);

        // Create an employee first
        var createRequest = new CreateEmployeeRequest(
            1, "DELETE001", "Delete", "Test", null, null, "7777777777",
            "delete@example.com", "+7777777777", null, null,
            new DateTime(2024, 1, 1), EmploymentStatus.Active,
            "Delete Position", null, null, null, WorkLocationType.Onsite
        );
        var createResponse = await _client.PostAsJsonAsync("/api/v1/employees", createRequest);
        var createResult = await createResponse.Content.ReadFromJsonAsync<dynamic>();
        var employeeId = createResult?.id;

        // Act
        var response = await _client.DeleteAsync($"/api/v1/employees/{employeeId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }
}