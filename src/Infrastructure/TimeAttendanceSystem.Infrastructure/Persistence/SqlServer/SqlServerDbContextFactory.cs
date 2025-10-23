using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer;

/// <summary>
/// Design-time factory for SQL Server DbContext to support EF Core tooling (migrations, scaffolding, etc.)
/// This factory is automatically discovered by Entity Framework Core design-time tools.
/// </summary>
/// <remarks>
/// Purpose:
/// - Enables EF Core CLI tools to create DbContext instances at design time
/// - Required for migration generation and database update commands
/// - Configured specifically for SQL Server provider
///
/// Usage:
/// - Used automatically by commands like: dotnet ef migrations add, dotnet ef database update
/// - Reads configuration from appsettings.json in the API project
/// - Uses SqlServerConnection string from configuration
///
/// Example Commands:
/// dotnet ef migrations add MigrationName --project Infrastructure --startup-project Api
/// dotnet ef database update --project Infrastructure --startup-project Api
/// </remarks>
public class SqlServerDbContextFactory : IDesignTimeDbContextFactory<TimeAttendanceDbContext>
{
    public TimeAttendanceDbContext CreateDbContext(string[] args)
    {
        // Build configuration to read connection string
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../TimeAttendanceSystem.Api"))
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
            .Build();

        // Configure DbContext options for SQL Server
        var optionsBuilder = new DbContextOptionsBuilder<TimeAttendanceDbContext>();

        var connectionString = configuration.GetConnectionString("SqlServerConnection")
            ?? configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException(
                "SQL Server connection string not found. " +
                "Please ensure 'SqlServerConnection' or 'DefaultConnection' is configured in appsettings.json");
        }

        optionsBuilder.UseSqlServer(connectionString, sqlOptions =>
        {
            sqlOptions.MigrationsAssembly(typeof(TimeAttendanceDbContext).Assembly.FullName);
            sqlOptions.MigrationsHistoryTable("__EFMigrationsHistory");
        });

        return new TimeAttendanceDbContext(optionsBuilder.Options);
    }
}
