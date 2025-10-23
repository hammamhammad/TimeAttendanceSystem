using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql;

/// <summary>
/// Design-time factory for PostgreSQL DbContext to support EF Core tooling (migrations, scaffolding, etc.)
/// This factory is ONLY used when DatabaseProvider environment variable is set to "PostgreSql"
/// </summary>
/// <remarks>
/// Purpose:
/// - Enables EF Core CLI tools to create DbContext instances at design time for PostgreSQL
/// - Required for migration generation and database update commands
/// - Configured specifically for PostgreSQL (Npgsql) provider
///
/// Usage - Set environment variable BEFORE running EF commands:
///
/// PowerShell:
/// $env:USE_POSTGRESQL="true"
/// dotnet ef migrations add MigrationName --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api --output-dir Persistence/PostgreSql/Migrations
/// dotnet ef database update --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api
///
/// Command Prompt:
/// set USE_POSTGRESQL=true
/// dotnet ef migrations add MigrationName --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api --output-dir Persistence/PostgreSql/Migrations
///
/// If USE_POSTGRESQL is not set, this factory will NOT be used (SQL Server factory will be used instead)
/// </remarks>
public class PostgreSqlDbContextFactory : IDesignTimeDbContextFactory<TimeAttendanceDbContext>
{
    public TimeAttendanceDbContext CreateDbContext(string[] args)
    {
        // Check if PostgreSQL should be used via environment variable
        var usePostgreSql = Environment.GetEnvironmentVariable("USE_POSTGRESQL");

        // If not explicitly set to use PostgreSQL, return null to let SQL Server factory handle it
        if (string.IsNullOrEmpty(usePostgreSql) || usePostgreSql.ToLower() != "true")
        {
            // Return null - EF Core will try the next factory (SqlServerDbContextFactory)
            return null!;
        }

        // Build configuration to read connection string
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../../Api/TimeAttendanceSystem.Api"))
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
            .AddJsonFile("appsettings.PostgreSql.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();

        // Configure DbContext options for PostgreSQL
        var optionsBuilder = new DbContextOptionsBuilder<TimeAttendanceDbContext>();

        var connectionString = configuration.GetConnectionString("PostgreSqlConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException(
                "PostgreSQL connection string not found. " +
                "Please ensure 'PostgreSqlConnection' is configured in appsettings.json or appsettings.PostgreSql.json");
        }

        optionsBuilder.UseNpgsql(connectionString, npgsqlOptions =>
        {
            npgsqlOptions.MigrationsAssembly(typeof(TimeAttendanceDbContext).Assembly.FullName);
            npgsqlOptions.MigrationsHistoryTable("__EFMigrationsHistory");
        });

        return new TimeAttendanceDbContext(optionsBuilder.Options);
    }
}
