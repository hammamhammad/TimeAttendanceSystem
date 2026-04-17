using Microsoft.EntityFrameworkCore;
using Npgsql;
using TecAxle.Hrms.Infrastructure.Persistence;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 6 (v14.6): Real-Postgres integration harness. Replaces the removed Phase 1
/// SqliteTestHarness, which could not materialize the Postgres-configured
/// <see cref="TecAxleDbContext"/> (jsonb, timestamp with time zone, NOW() defaults,
/// column comments all fail under SQLite).
///
/// Each harness instance provisions a disposable <c>tecaxle_test_{guid}</c> database on
/// the Postgres cluster pointed to by <c>HRMS_INTEGRATION_DB</c> (falls back to the
/// default dev connection). EF migrations run inside the new database so the schema
/// matches production exactly. On dispose the database is dropped.
///
/// <para><b>Environment:</b> set <c>HRMS_INTEGRATION_DB</c> to any superuser-capable
/// Postgres connection string (the user must have <c>CREATEDB</c> privilege). Example:</para>
/// <code>
///   set HRMS_INTEGRATION_DB=Host=localhost;Port=5432;Username=postgres;Password=...
/// </code>
///
/// <para><b>Skip behavior:</b> when the env var is unset AND the default dev cluster is
/// not reachable, <see cref="IsAvailable"/> returns false and callers are expected to
/// skip. This keeps the suite green in offline-developer and no-Docker CI environments.</para>
/// </summary>
public sealed class PostgresTestHarness : IAsyncDisposable, IDisposable
{
    private const string DefaultAdminConnection =
        "Host=localhost;Port=5432;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

    private readonly string _adminConnectionString;
    private readonly string _testDatabaseName;
    private readonly string _testConnectionString;
    private bool _disposed;

    public PostgresTestHarness()
    {
        _adminConnectionString = Environment.GetEnvironmentVariable("HRMS_INTEGRATION_DB")
            ?? DefaultAdminConnection;

        // Unique DB per harness so parallel xUnit test classes don't collide. Short
        // prefix keeps the identifier under Postgres's 63-char limit.
        _testDatabaseName = $"tecaxle_test_{Guid.NewGuid():N}".Substring(0, 30);

        var b = new NpgsqlConnectionStringBuilder(_adminConnectionString)
        {
            Database = _testDatabaseName
        };
        _testConnectionString = b.ConnectionString;

        ProvisionDatabase();
        ApplyMigrations();
    }

    /// <summary>Best-effort probe: can this machine reach the admin Postgres cluster?</summary>
    public static bool IsAvailable()
    {
        var cs = Environment.GetEnvironmentVariable("HRMS_INTEGRATION_DB") ?? DefaultAdminConnection;
        try
        {
            using var conn = new NpgsqlConnection(cs);
            conn.Open();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public TecAxleDbContext NewDb()
    {
        var options = new DbContextOptionsBuilder<TecAxleDbContext>()
            .UseNpgsql(_testConnectionString, o => o.CommandTimeout(30))
            .EnableSensitiveDataLogging(false)
            .Options;
        return new TecAxleDbContext(options);
    }

    private void ProvisionDatabase()
    {
        using var conn = new NpgsqlConnection(_adminConnectionString);
        conn.Open();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = $"CREATE DATABASE \"{_testDatabaseName}\"";
        cmd.ExecuteNonQuery();
    }

    private void ApplyMigrations()
    {
        using var db = NewDb();
        db.Database.Migrate();
    }

    private void DropDatabase()
    {
        // Close all pools on the test DB so the DROP isn't blocked by a stale pool.
        NpgsqlConnection.ClearAllPools();

        using var conn = new NpgsqlConnection(_adminConnectionString);
        conn.Open();

        // Terminate any lingering connections (paranoid but free) before dropping.
        using (var killCmd = conn.CreateCommand())
        {
            killCmd.CommandText = $@"
                SELECT pg_terminate_backend(pid)
                FROM pg_stat_activity
                WHERE datname = '{_testDatabaseName}' AND pid <> pg_backend_pid();";
            killCmd.ExecuteNonQuery();
        }

        using (var dropCmd = conn.CreateCommand())
        {
            dropCmd.CommandText = $"DROP DATABASE IF EXISTS \"{_testDatabaseName}\" WITH (FORCE)";
            dropCmd.ExecuteNonQuery();
        }
    }

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        try { DropDatabase(); } catch { /* best-effort; leaving a stray DB is fine */ }
    }

    public ValueTask DisposeAsync()
    {
        Dispose();
        return ValueTask.CompletedTask;
    }
}
