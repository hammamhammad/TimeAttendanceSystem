using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("=== Vacation Types ===");
await using (var cmd = new NpgsqlCommand("SELECT \"Id\", \"Name\" FROM \"VacationTypes\" WHERE NOT \"IsDeleted\" ORDER BY \"Id\"", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    while (await reader.ReadAsync())
    {
        Console.WriteLine($"  ID: {reader.GetInt64(0)}, Name: {reader.GetString(1)}");
    }
}

Console.WriteLine("\n=== Sample Leave Balances (employee 1026 - salma.khaldi) ===");
await using (var cmd = new NpgsqlCommand(@"
    SELECT lb.""VacationTypeId"", vt.""Name"", lb.""Year"", lb.""EntitledDays"", lb.""AccruedDays"", lb.""UsedDays""
    FROM ""LeaveBalances"" lb
    JOIN ""VacationTypes"" vt ON lb.""VacationTypeId"" = vt.""Id""
    WHERE lb.""EmployeeId"" = 1026
    ORDER BY lb.""Year"", lb.""VacationTypeId""", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    while (await reader.ReadAsync())
    {
        var vtId = reader.GetInt64(0);
        var vtName = reader.GetString(1);
        var year = reader.GetInt32(2);
        var entitled = reader.GetDecimal(3);
        var accrued = reader.GetDecimal(4);
        var used = reader.GetDecimal(5);
        Console.WriteLine($"  Year {year}: VT ID {vtId} ({vtName}): Entitled={entitled}, Accrued={accrued}, Used={used}");
    }
}

Console.WriteLine("\n=== Leave Balance Count ===");
await using (var countCmd = new NpgsqlCommand("SELECT COUNT(*) FROM \"LeaveBalances\"", conn))
{
    var count = (long)(await countCmd.ExecuteScalarAsync())!;
    Console.WriteLine($"  Total leave balances: {count}");
}
