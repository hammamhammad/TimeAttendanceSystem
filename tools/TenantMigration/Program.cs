using Npgsql;

/// <summary>
/// Migrates data from the shared TimeAttendanceSystem database to per-tenant databases.
///
/// Usage: dotnet run
///
/// Prerequisites:
/// 1. Backend must have been run at least once (to seed data and run migrations)
/// 2. The tenant must have been provisioned (POST /api/v1/tenants/{id}/provision)
/// 3. This tool copies ALL data from the shared DB where Branch.TenantId matches
/// </summary>

// Configuration
var sharedDbConnStr = "Host=localhost;Port=5432;Database=tecaxle_master;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

Console.WriteLine("=== TecAxle HRMS: Shared DB → Per-Tenant DB Migration Tool ===");
Console.WriteLine();

// Step 1: Get all tenants that have a dedicated database
await using var sharedConn = new NpgsqlConnection(sharedDbConnStr);
await sharedConn.OpenAsync();

Console.WriteLine("Reading tenants from shared database...");
await using var tenantCmd = sharedConn.CreateCommand();
tenantCmd.CommandText = """
    SELECT "Id", "Name", "DatabaseName", "EncryptedConnectionString"
    FROM "Tenants"
    WHERE "IsDeleted" = false AND "IsActive" = true AND "DatabaseName" IS NOT NULL
""";

var tenants = new List<(long Id, string Name, string DatabaseName)>();
await using (var reader = await tenantCmd.ExecuteReaderAsync())
{
    while (await reader.ReadAsync())
    {
        tenants.Add((reader.GetInt64(0), reader.GetString(1), reader.GetString(2)));
    }
}

if (tenants.Count == 0)
{
    Console.WriteLine("No tenants with dedicated databases found.");
    Console.WriteLine("First provision a tenant: POST /api/v1/tenants/{id}/provision");
    return;
}

Console.WriteLine($"Found {tenants.Count} tenant(s) with dedicated databases.");
Console.WriteLine();

foreach (var (tenantId, tenantName, dbName) in tenants)
{
    Console.WriteLine($"--- Migrating Tenant {tenantId}: {tenantName} → {dbName} ---");

    var tenantConnStr = $"Host=localhost;Port=5432;Database={dbName};Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

    try
    {
        await using var tenantConn = new NpgsqlConnection(tenantConnStr);
        await tenantConn.OpenAsync();

        // Get branch IDs for this tenant
        await using var branchCmd = sharedConn.CreateCommand();
        branchCmd.CommandText = $"SELECT \"Id\" FROM \"Branches\" WHERE \"TenantId\" = {tenantId} AND \"IsDeleted\" = false";
        var branchIds = new List<long>();
        await using (var br = await branchCmd.ExecuteReaderAsync())
        {
            while (await br.ReadAsync()) branchIds.Add(br.GetInt64(0));
        }

        if (branchIds.Count == 0)
        {
            Console.WriteLine($"  No branches found for tenant {tenantId}, skipping.");
            continue;
        }

        var branchIdList = string.Join(",", branchIds);
        Console.WriteLine($"  Branches: {branchIds.Count} (IDs: {branchIdList})");

        // Tables to migrate in dependency order
        // We use INSERT ... SELECT via dblink or pg_dump approach
        // Simpler: read from shared, write to tenant

        // 1. Branches (strip TenantId — it's implicit in the tenant DB)
        await MigrateTableAsync(sharedConn, tenantConn, "Branches",
            $"SELECT * FROM \"Branches\" WHERE \"TenantId\" = {tenantId}");

        // 2. Departments
        await MigrateTableAsync(sharedConn, tenantConn, "Departments",
            $"SELECT * FROM \"Departments\" WHERE \"BranchId\" IN ({branchIdList})");

        // 3. Roles, Permissions, RolePermissions (system-wide, copy all)
        await MigrateTableAsync(sharedConn, tenantConn, "Permissions",
            "SELECT * FROM \"Permissions\"");
        await MigrateTableAsync(sharedConn, tenantConn, "Roles",
            "SELECT * FROM \"Roles\"");
        await MigrateTableAsync(sharedConn, tenantConn, "RolePermissions",
            "SELECT * FROM \"RolePermissions\"");

        // 4. Users (via branch scope)
        await MigrateTableAsync(sharedConn, tenantConn, "Users",
            $"SELECT DISTINCT u.* FROM \"Users\" u INNER JOIN \"UserBranchScopes\" ubs ON u.\"Id\" = ubs.\"UserId\" WHERE ubs.\"BranchId\" IN ({branchIdList})");

        // 5. UserRoles
        await MigrateTableAsync(sharedConn, tenantConn, "UserRoles",
            $"SELECT DISTINCT ur.* FROM \"UserRoles\" ur INNER JOIN \"UserBranchScopes\" ubs ON ur.\"UserId\" = ubs.\"UserId\" WHERE ubs.\"BranchId\" IN ({branchIdList})");

        // 6. UserBranchScopes
        await MigrateTableAsync(sharedConn, tenantConn, "UserBranchScopes",
            $"SELECT * FROM \"UserBranchScopes\" WHERE \"BranchId\" IN ({branchIdList})");

        // 7. Employees
        await MigrateTableAsync(sharedConn, tenantConn, "Employees",
            $"SELECT * FROM \"Employees\" WHERE \"BranchId\" IN ({branchIdList})");

        // 8. EmployeeUserLinks
        await MigrateTableAsync(sharedConn, tenantConn, "EmployeeUserLinks",
            $"SELECT eul.* FROM \"EmployeeUserLinks\" eul INNER JOIN \"Employees\" e ON eul.\"EmployeeId\" = e.\"Id\" WHERE e.\"BranchId\" IN ({branchIdList})");

        // 9. Shifts, ShiftPeriods, OffDays (system-wide)
        await MigrateTableAsync(sharedConn, tenantConn, "Shifts",
            "SELECT * FROM \"Shifts\"");
        await MigrateTableAsync(sharedConn, tenantConn, "ShiftPeriods",
            "SELECT * FROM \"ShiftPeriods\"");
        await MigrateTableAsync(sharedConn, tenantConn, "OffDays",
            "SELECT * FROM \"OffDays\"");

        // 10. ShiftAssignments
        await MigrateTableAsync(sharedConn, tenantConn, "ShiftAssignments",
            $"SELECT * FROM \"ShiftAssignments\" WHERE \"BranchId\" IN ({branchIdList}) OR \"EmployeeId\" IN (SELECT \"Id\" FROM \"Employees\" WHERE \"BranchId\" IN ({branchIdList}))");

        // 11. VacationTypes, ExcusePolicies (system-wide config)
        await MigrateTableAsync(sharedConn, tenantConn, "VacationTypes",
            "SELECT * FROM \"VacationTypes\"");
        await MigrateTableAsync(sharedConn, tenantConn, "ExcusePolicies",
            "SELECT * FROM \"ExcusePolicies\"");

        // 12. TenantSettings
        await MigrateTableAsync(sharedConn, tenantConn, "TenantSettings",
            $"SELECT * FROM \"TenantSettings\" WHERE \"TenantId\" = {tenantId}");

        // 13. WorkflowDefinitions, WorkflowSteps (system-wide)
        await MigrateTableAsync(sharedConn, tenantConn, "WorkflowDefinitions",
            "SELECT * FROM \"WorkflowDefinitions\"");
        await MigrateTableAsync(sharedConn, tenantConn, "WorkflowSteps",
            "SELECT * FROM \"WorkflowSteps\"");

        // 14. Attendance records for employees in this tenant
        await MigrateTableAsync(sharedConn, tenantConn, "AttendanceRecords",
            $"SELECT * FROM \"AttendanceRecords\" WHERE \"EmployeeId\" IN (SELECT \"Id\" FROM \"Employees\" WHERE \"BranchId\" IN ({branchIdList}))");

        // 15. Reset sequences to max ID
        await ResetSequencesAsync(tenantConn);

        Console.WriteLine($"  ✅ Migration complete for tenant {tenantId}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"  ❌ Error migrating tenant {tenantId}: {ex.Message}");
    }

    Console.WriteLine();
}

Console.WriteLine("=== Migration Complete ===");

// --- Helper Methods ---

static async Task MigrateTableAsync(NpgsqlConnection source, NpgsqlConnection target, string tableName, string sourceQuery)
{
    try
    {
        // Check if target table already has data
        await using var countCmd = target.CreateCommand();
        countCmd.CommandText = $"SELECT COUNT(*) FROM \"{tableName}\"";
        var existingCount = (long)(await countCmd.ExecuteScalarAsync() ?? 0);
        if (existingCount > 0)
        {
            Console.WriteLine($"  {tableName}: skipped ({existingCount} rows already exist)");
            return;
        }

        // Read from source
        await using var readCmd = source.CreateCommand();
        readCmd.CommandText = sourceQuery;
        await using var reader = await readCmd.ExecuteReaderAsync();

        if (!reader.HasRows)
        {
            Console.WriteLine($"  {tableName}: 0 rows (no data in source)");
            return;
        }

        var columns = new List<string>();
        for (int i = 0; i < reader.FieldCount; i++)
            columns.Add(reader.GetName(i));

        var columnList = string.Join(", ", columns.Select(c => $"\"{c}\""));
        var paramList = string.Join(", ", columns.Select((_, i) => $"@p{i}"));

        var rowCount = 0;
        while (await reader.ReadAsync())
        {
            await using var insertCmd = target.CreateCommand();
            insertCmd.CommandText = $"INSERT INTO \"{tableName}\" ({columnList}) VALUES ({paramList}) ON CONFLICT DO NOTHING";

            for (int i = 0; i < columns.Count; i++)
            {
                var value = reader.IsDBNull(i) ? DBNull.Value : reader.GetValue(i);
                insertCmd.Parameters.AddWithValue($"p{i}", value);
            }

            await insertCmd.ExecuteNonQueryAsync();
            rowCount++;
        }

        Console.WriteLine($"  {tableName}: {rowCount} rows migrated");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"  {tableName}: ERROR - {ex.Message}");
    }
}

static async Task ResetSequencesAsync(NpgsqlConnection conn)
{
    // Find all sequences and reset to max(id) + 1
    await using var cmd = conn.CreateCommand();
    cmd.CommandText = """
        DO $$
        DECLARE
            seq RECORD;
            max_val BIGINT;
        BEGIN
            FOR seq IN
                SELECT s.relname AS seq_name, t.relname AS table_name, a.attname AS column_name
                FROM pg_class s
                JOIN pg_depend d ON d.objid = s.oid
                JOIN pg_class t ON d.refobjid = t.oid
                JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = d.refobjsubid
                WHERE s.relkind = 'S'
            LOOP
                EXECUTE format('SELECT COALESCE(MAX(%I), 0) FROM %I', seq.column_name, seq.table_name) INTO max_val;
                IF max_val > 0 THEN
                    EXECUTE format('SELECT setval(''%I'', %s)', seq.seq_name, max_val);
                END IF;
            END LOOP;
        END $$;
    """;
    await cmd.ExecuteNonQueryAsync();
    Console.WriteLine("  Sequences reset to max IDs");
}
