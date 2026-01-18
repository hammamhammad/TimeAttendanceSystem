using System.Net.Http.Json;
using System.Text.Json;
using Npgsql;

var baseUrl = "http://localhost:5099/api/v1";
var connStr = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

Console.WriteLine("Testing different date formats for attendance generation");
Console.WriteLine();

using var httpClient = new HttpClient();

var loginRequest = new { username = "systemadmin", password = "TempP@ssw0rd123!" };
var loginResponse = await httpClient.PostAsJsonAsync($"{baseUrl}/auth/login", loginRequest);
var loginResult = JsonDocument.Parse(await loginResponse.Content.ReadAsStringAsync());
var token = loginResult.RootElement.GetProperty("accessToken").GetString();
httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
Console.WriteLine("Login successful!");
Console.WriteLine();

// Test different date formats
var dateStrings = new[] {
    "2026-01-17",
    "01-17-2026",
    "2026/01/17",
};

using var conn = new NpgsqlConnection(connStr);
conn.Open();

foreach (var dateStr in dateStrings)
{
    var url = $"{baseUrl}/attendance/calculate/date/{dateStr}";
    Console.WriteLine($"Testing: {url}");
    
    try
    {
        var response = await httpClient.PostAsync(url, null);
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"  Status: {response.StatusCode}");
        
        if (response.IsSuccessStatusCode)
        {
            var json = JsonDocument.Parse(content);
            var recordsGenerated = json.RootElement.GetProperty("recordsGenerated").GetInt32();
            var dateValue = json.RootElement.GetProperty("date").GetString();
            Console.WriteLine($"  Date returned: {dateValue}");
            Console.WriteLine($"  Records generated: {recordsGenerated}");
        }
        else
        {
            Console.WriteLine($"  Error: {content.Substring(0, Math.Min(200, content.Length))}");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"  Exception: {ex.Message}");
    }
    Console.WriteLine();
}

// Check what dates have records
Console.WriteLine("=== Records by date ===");
using (var cmd = new NpgsqlCommand(@"
    SELECT ""AttendanceDate"", COUNT(*) 
    FROM ""AttendanceRecords"" 
    GROUP BY ""AttendanceDate"" 
    ORDER BY ""AttendanceDate"" DESC 
    LIMIT 5", conn))
using (var reader = cmd.ExecuteReader())
{
    while (reader.Read())
    {
        Console.WriteLine($"  {reader.GetDateTime(0):yyyy-MM-dd}: {reader.GetInt64(1)} records");
    }
}
