using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("Checking RowVersion column in EmployeeVacations...");

// Check current column status
await using var checkCmd = new NpgsqlCommand(@"
    SELECT column_name, column_default, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'EmployeeVacations' AND column_name = 'RowVersion'", conn);

await using var reader = await checkCmd.ExecuteReaderAsync();
if (await reader.ReadAsync())
{
    Console.WriteLine($"  Column: {reader["column_name"]}");
    Console.WriteLine($"  Default: {reader["column_default"] ?? "(null)"}");
    Console.WriteLine($"  Nullable: {reader["is_nullable"]}");
}
await reader.CloseAsync();

Console.WriteLine("\nFixing RowVersion default value...");

// Set default value for RowVersion column
await using var fixCmd = new NpgsqlCommand(@"
    ALTER TABLE ""EmployeeVacations""
    ALTER COLUMN ""RowVersion"" SET DEFAULT E'\\x01'::bytea;", conn);
await fixCmd.ExecuteNonQueryAsync();

Console.WriteLine("✅ Default value set!");

// Verify the fix
await using var verifyCmd = new NpgsqlCommand(@"
    SELECT column_name, column_default, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'EmployeeVacations' AND column_name = 'RowVersion'", conn);

await using var reader2 = await verifyCmd.ExecuteReaderAsync();
if (await reader2.ReadAsync())
{
    Console.WriteLine($"\nAfter fix:");
    Console.WriteLine($"  Column: {reader2["column_name"]}");
    Console.WriteLine($"  Default: {reader2["column_default"] ?? "(null)"}");
    Console.WriteLine($"  Nullable: {reader2["is_nullable"]}");
}

Console.WriteLine("\n✅ RowVersion column fixed! You can now create vacation requests.");
