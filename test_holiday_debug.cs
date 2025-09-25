// Test script to debug holiday detection for 2025-09-23
// This will help us understand if the holiday is Annual vs OneTime type

using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Infrastructure.Persistence;
using TimeAttendanceSystem.Domain.Settings;

Console.WriteLine("=== Holiday Debug Test for 2025-09-23 ===");

// Set up the database context (using the same connection string as the API)
var connectionString = "Server=(localdb)\\MSSQLLocalDB;Database=TimeAttendanceSystem;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true";
var options = new DbContextOptionsBuilder<TimeAttendanceDbContext>()
    .UseSqlServer(connectionString)
    .Options;

using var context = new TimeAttendanceDbContext(options);

Console.WriteLine("Testing date: 2025-09-23");
var testDate = new DateTime(2025, 9, 23);

// Get all active holidays
var holidays = await context.PublicHolidays
    .Where(h => h.IsActive && !h.IsDeleted)
    .ToListAsync();

Console.WriteLine($"\nFound {holidays.Count} active holidays:");

foreach (var holiday in holidays)
{
    Console.WriteLine($"- {holiday.Name}");
    Console.WriteLine($"  HolidayType: {holiday.HolidayType} ({(int)holiday.HolidayType})");
    Console.WriteLine($"  SpecificDate: {holiday.SpecificDate?.ToString("yyyy-MM-dd") ?? "null"}");
    Console.WriteLine($"  Month: {holiday.Month}, Day: {holiday.Day}, Year: {holiday.Year}");
    Console.WriteLine($"  IsNational: {holiday.IsNational}");

    // Test if this holiday matches our test date
    var holidayDateForYear = holiday.GetHolidayDateForYear(2025);
    Console.WriteLine($"  GetHolidayDateForYear(2025): {holidayDateForYear?.ToString("yyyy-MM-dd") ?? "null"}");

    if (holidayDateForYear.HasValue && holidayDateForYear.Value.Date == testDate.Date)
    {
        Console.WriteLine($"  *** MATCH! This holiday matches {testDate:yyyy-MM-dd} ***");
    }
    else
    {
        Console.WriteLine($"  No match for {testDate:yyyy-MM-dd}");
    }
    Console.WriteLine();
}

// Also check specifically for September 23 patterns
Console.WriteLine("=== Checking specifically for September 23 patterns ===");

var september23Holidays = holidays.Where(h =>
    (h.HolidayType == HolidayType.OneTime && h.SpecificDate?.Date == testDate.Date) ||
    (h.HolidayType == HolidayType.Annual && h.Month == 9 && h.Day == 23)
).ToList();

if (september23Holidays.Any())
{
    Console.WriteLine($"Found {september23Holidays.Count} holidays that could match September 23:");
    foreach (var holiday in september23Holidays)
    {
        Console.WriteLine($"- {holiday.Name} (Type: {holiday.HolidayType})");
    }
}
else
{
    Console.WriteLine("No holidays found that match September 23 pattern!");
    Console.WriteLine("This explains why the attendance calculation is not detecting the holiday.");
}

Console.WriteLine("\n=== Holiday Type Explanation ===");
Console.WriteLine($"OneTime (0): Uses SpecificDate field - exact date match");
Console.WriteLine($"Annual (1): Uses Month and Day fields - recurring yearly");
Console.WriteLine($"Monthly (2): Recurring monthly");
Console.WriteLine($"Floating (3): Complex calculation based on rules");

Console.WriteLine("\n=== Summary ===");
if (september23Holidays.Any())
{
    Console.WriteLine("✅ Holiday configuration found for September 23");
    Console.WriteLine("The issue may be in the holiday matching logic in PublicHolidayService.cs");
}
else
{
    Console.WriteLine("❌ No holiday configuration found for September 23");
    Console.WriteLine("You need to create a holiday record for September 23, 2025");
    Console.WriteLine("Either:");
    Console.WriteLine("1. OneTime holiday: HolidayType=0, SpecificDate='2025-09-23'");
    Console.WriteLine("2. Annual holiday: HolidayType=1, Month=9, Day=23");
}