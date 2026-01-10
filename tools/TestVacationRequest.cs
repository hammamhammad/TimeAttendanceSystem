using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

var httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5099") };

// First login
Console.WriteLine("Logging in as salma.khaldi...");
var loginRequest = new { username = "salma.khaldi", password = "Emp@123!" };
var loginResponse = await httpClient.PostAsJsonAsync("/api/v1/auth/login", loginRequest);

if (!loginResponse.IsSuccessStatusCode)
{
    Console.WriteLine($"❌ Login failed: {loginResponse.StatusCode}");
    Console.WriteLine(await loginResponse.Content.ReadAsStringAsync());
    return;
}

var loginContent = await loginResponse.Content.ReadAsStringAsync();
var loginJson = JsonDocument.Parse(loginContent);
var token = loginJson.RootElement.GetProperty("accessToken").GetString();
var employeeId = loginJson.RootElement.GetProperty("user").GetProperty("employeeId").GetInt64();

Console.WriteLine($"✅ Login successful! EmployeeId: {employeeId}");

// Set auth header
httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

// Create a vacation request for next week
var startDate = DateTime.Today.AddDays(7);
var endDate = startDate.AddDays(2);

Console.WriteLine($"\nCreating vacation request...");
Console.WriteLine($"  Employee ID: {employeeId}");
Console.WriteLine($"  Vacation Type: 1 (Annual Leave)");
Console.WriteLine($"  Start Date: {startDate:yyyy-MM-dd}");
Console.WriteLine($"  End Date: {endDate:yyyy-MM-dd}");

var vacationRequest = new
{
    employeeId = employeeId,
    vacationTypeId = 1, // Annual Leave
    startDate = startDate.ToString("yyyy-MM-dd"),
    endDate = endDate.ToString("yyyy-MM-dd"),
    notes = "Test vacation request from tool"
};

var json = JsonSerializer.Serialize(vacationRequest);
Console.WriteLine($"\nRequest JSON: {json}");

var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await httpClient.PostAsync("/api/v1/employee-vacations", content);

Console.WriteLine($"\nResponse Status: {response.StatusCode}");
var responseContent = await response.Content.ReadAsStringAsync();
Console.WriteLine($"Response Content: {responseContent}");

if (response.IsSuccessStatusCode)
{
    Console.WriteLine("\n✅ Vacation request created successfully!");
}
else
{
    Console.WriteLine("\n❌ Vacation request failed!");
}
