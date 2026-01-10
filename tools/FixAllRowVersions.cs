using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("Finding all tables with RowVersion columns missing defaults...\n");

// Find all RowVersion columns without defaults
await using var findCmd = new NpgsqlCommand(@"
    SELECT table_name, column_default, is_nullable
    FROM information_schema.columns
    WHERE column_name = 'RowVersion'
    AND table_schema = 'public'
    ORDER BY table_name", conn);

var tablesToFix = new List<string>();
await using var reader = await findCmd.ExecuteReaderAsync();
while (await reader.ReadAsync())
{
    var tableName = reader["table_name"].ToString()!;
    var columnDefault = reader["column_default"]?.ToString() ?? "(null)";
    var isNullable = reader["is_nullable"].ToString();

    Console.WriteLine($"Table: {tableName,-40} Default: {columnDefault,-25} Nullable: {isNullable}");

    if (string.IsNullOrEmpty(columnDefault) || columnDefault == "(null)")
    {
        tablesToFix.Add(tableName);
    }
}
await reader.CloseAsync();

if (tablesToFix.Count == 0)
{
    Console.WriteLine("\n✅ All RowVersion columns already have default values!");
    return;
}

Console.WriteLine($"\nFixing {tablesToFix.Count} tables with missing RowVersion defaults...\n");

foreach (var table in tablesToFix)
{
    try
    {
        await using var fixCmd = new NpgsqlCommand($@"
            ALTER TABLE ""{table}""
            ALTER COLUMN ""RowVersion"" SET DEFAULT E'\\x01'::bytea;", conn);
        await fixCmd.ExecuteNonQueryAsync();
        Console.WriteLine($"  ✅ Fixed: {table}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"  ❌ Error fixing {table}: {ex.Message}");
    }
}

Console.WriteLine("\n✅ All RowVersion columns fixed!");
