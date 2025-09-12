using System.Net.Http.Json;
using System.Net.Http.Headers;

namespace TimeAttendanceSystem.IntegrationTests;

public static class TestWebApplicationFactoryExtensions
{
    public static async Task AuthenticateAsync(this TestWebApplicationFactory<Program> factory, HttpClient client)
    {
        var loginRequest = new
        {
            Username = "systemadmin",
            Password = "TempP@ssw0rd123!"
        };

        var loginResponse = await client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        var loginResult = await loginResponse.Content.ReadFromJsonAsync<dynamic>();
        var accessToken = loginResult?.accessToken?.ToString();

        if (!string.IsNullOrEmpty(accessToken))
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        }
    }

    public static async Task<string> GetAuthTokenAsync(this TestWebApplicationFactory<Program> factory, HttpClient client)
    {
        var loginRequest = new
        {
            Username = "systemadmin",
            Password = "TempP@ssw0rd123!"
        };

        var loginResponse = await client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        var loginResult = await loginResponse.Content.ReadFromJsonAsync<dynamic>();
        return loginResult?.accessToken?.ToString() ?? string.Empty;
    }

    public static async Task<(string accessToken, string refreshToken)> GetTokensAsync(
        this TestWebApplicationFactory<Program> factory, 
        HttpClient client, 
        string username = "systemadmin", 
        string password = "TempP@ssw0rd123!")
    {
        var loginRequest = new
        {
            Username = username,
            Password = password
        };

        var loginResponse = await client.PostAsJsonAsync("/api/v1/auth/login", loginRequest);
        var loginResult = await loginResponse.Content.ReadFromJsonAsync<dynamic>();
        
        return (
            loginResult?.accessToken?.ToString() ?? string.Empty,
            loginResult?.refreshToken?.ToString() ?? string.Empty
        );
    }
}