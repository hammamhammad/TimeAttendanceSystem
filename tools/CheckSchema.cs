using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("=== WorkflowDefinitions Columns ===");
await using (var cmd = new NpgsqlCommand(@"
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = 'WorkflowDefinitions'
    ORDER BY ordinal_position", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    while (await reader.ReadAsync())
    {
        var name = reader.GetString(0);
        var type = reader.GetString(1);
        var nullable = reader.GetString(2);
        var def = reader.IsDBNull(3) ? "(null)" : reader.GetString(3);
        Console.WriteLine($"  {name,-30} {type,-20} {nullable,-5} {def}");
    }
}

Console.WriteLine("\n=== WorkflowSteps Columns ===");
await using (var cmd = new NpgsqlCommand(@"
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_name = 'WorkflowSteps'
    ORDER BY ordinal_position", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    while (await reader.ReadAsync())
    {
        var name = reader.GetString(0);
        var type = reader.GetString(1);
        var nullable = reader.GetString(2);
        var def = reader.IsDBNull(3) ? "(null)" : reader.GetString(3);
        Console.WriteLine($"  {name,-30} {type,-20} {nullable,-5} {def}");
    }
}
