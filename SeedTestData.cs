using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using TimeAttendanceSystem.Infrastructure.Persistence;

// Simple console application to seed comprehensive test data
Console.WriteLine("🚀 Starting Test Data Seeding...");
Console.WriteLine("This will create:");
Console.WriteLine("  📍 10 Branches (Saudi cities)");
Console.WriteLine("  🏬 20 Departments (4 core departments × 5 branches)");
Console.WriteLine("  👥 50 Employees (with Arabic names)");
Console.WriteLine();

try
{
    // Build configuration
    var configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json", optional: false)
        .Build();

    // Setup services
    var services = new ServiceCollection();
    services.AddDbContext<TimeAttendanceDbContext>(options =>
        options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

    var serviceProvider = services.BuildServiceProvider();

    // Get database context
    using var scope = serviceProvider.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();

    // Ensure database exists
    await context.Database.EnsureCreatedAsync();

    // Seed test data
    await TestDataSeeder.SeedTestDataAsync(context);

    Console.WriteLine();
    Console.WriteLine("🎉 Test data seeding completed successfully!");
    Console.WriteLine("🔗 You can now test the system with comprehensive data:");
    Console.WriteLine("   • Backend: http://localhost:5099");
    Console.WriteLine("   • Frontend: http://localhost:4200");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Error during seeding: {ex.Message}");
    Console.WriteLine($"Details: {ex.InnerException?.Message}");
    Environment.Exit(1);
}