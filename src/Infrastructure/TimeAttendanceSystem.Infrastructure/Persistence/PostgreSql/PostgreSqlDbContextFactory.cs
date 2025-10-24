using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql;

/// <summary>
/// Design-time factory for PostgreSQL DbContext to support EF Core tooling (migrations, scaffolding, etc.)
/// </summary>
/// <remarks>
/// Purpose:
/// - Enables EF Core CLI tools to create DbContext instances at design time for PostgreSQL
/// - Required for migration generation and database update commands
/// - Configured specifically for PostgreSQL (Npgsql) provider
///
/// Usage:
/// dotnet ef migrations add MigrationName --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api --output-dir Persistence/PostgreSql/Migrations
/// dotnet ef database update --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api
/// </remarks>
public class PostgreSqlDbContextFactory : IDesignTimeDbContextFactory<TimeAttendanceDbContext>
{
    public TimeAttendanceDbContext CreateDbContext(string[] args)
    {
        // Build configuration to read connection string
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../../Api/TimeAttendanceSystem.Api"))
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();

        // Configure DbContext options for PostgreSQL
        var optionsBuilder = new DbContextOptionsBuilder<TimeAttendanceDbContext>();

        var connectionString = configuration.GetConnectionString("PostgreSqlConnection")
            ?? configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException(
                "PostgreSQL connection string not found. " +
                "Please ensure 'PostgreSqlConnection' or 'DefaultConnection' is configured in appsettings.json");
        }

        optionsBuilder.UseNpgsql(connectionString, npgsqlOptions =>
        {
            npgsqlOptions.MigrationsAssembly(typeof(TimeAttendanceDbContext).Assembly.FullName);
            npgsqlOptions.MigrationsHistoryTable("__EFMigrationsHistory");
        });

        return new TimeAttendanceDbContext(optionsBuilder.Options);
    }
}
