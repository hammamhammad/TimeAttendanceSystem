using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

var httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:5099") };

// Test with an employee account
Console.WriteLine("Testing login with employee (salma.khaldi)...");

var loginRequest = new { username = "salma.khaldi", password = "Emp@123!" };
var response = await httpClient.PostAsJsonAsync("/api/v1/auth/login", loginRequest);

if (response.IsSuccessStatusCode)
{
    var content = await response.Content.ReadAsStringAsync();
    var jsonDoc = JsonDocument.Parse(content);
    var root = jsonDoc.RootElement;

    if (root.TryGetProperty("accessToken", out var tokenElement))
    {
        var token = tokenElement.GetString();
        Console.WriteLine($"✅ Login successful!");
        Console.WriteLine($"Token: {token?[..50]}...");

        // Now test the vacation types endpoint
        Console.WriteLine("\nTesting vacation types dropdown endpoint...");
        httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
        var vtResponse = await httpClient.GetAsync("/api/v1/vacation-types/dropdown");

        if (vtResponse.IsSuccessStatusCode)
        {
            var vtContent = await vtResponse.Content.ReadAsStringAsync();
            Console.WriteLine($"✅ Vacation types: {vtContent}");
        }
        else
        {
            Console.WriteLine($"❌ Vacation types failed: {vtResponse.StatusCode}");
            Console.WriteLine(await vtResponse.Content.ReadAsStringAsync());
        }
    }
    else
    {
        Console.WriteLine($"Response (no token): {content}");
    }
}
else
{
    Console.WriteLine($"❌ Login failed: {response.StatusCode}");
    Console.WriteLine(await response.Content.ReadAsStringAsync());
}
