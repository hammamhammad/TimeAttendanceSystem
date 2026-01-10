using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("Checking existing vacation types...");

// Check if all vacation types exist
await using var checkCmd = new NpgsqlCommand("SELECT COUNT(*) FROM \"VacationTypes\" WHERE NOT \"IsDeleted\"", conn);
var count = (long)(await checkCmd.ExecuteScalarAsync() ?? 0);

Console.WriteLine($"Found {count} vacation types");

if (count < 8)
{
    Console.WriteLine("Inserting missing vacation types...");

    var vacationTypes = new List<(string Name, string NameAr)>
    {
        ("Annual Leave", "إجازة سنوية"),
        ("Sick Leave", "إجازة مرضية"),
        ("Unpaid Leave", "إجازة بدون راتب"),
        ("Emergency Leave", "إجازة طارئة"),
        ("Maternity Leave", "إجازة أمومة"),
        ("Paternity Leave", "إجازة أبوة"),
        ("Bereavement Leave", "إجازة عزاء"),
        ("Marriage Leave", "إجازة زواج")
    };

    foreach (var (name, nameAr) in vacationTypes)
    {
        // Check if this vacation type already exists
        await using var existsCmd = new NpgsqlCommand(
            "SELECT COUNT(*) FROM \"VacationTypes\" WHERE \"Name\" = @name AND NOT \"IsDeleted\"", conn);
        existsCmd.Parameters.AddWithValue("name", name);
        var exists = (long)(await existsCmd.ExecuteScalarAsync() ?? 0) > 0;

        if (!exists)
        {
            await using var insertCmd = new NpgsqlCommand(@"
                INSERT INTO ""VacationTypes"" (""Name"", ""NameAr"", ""IsActive"", ""BranchId"", ""CreatedBy"", ""CreatedAtUtc"", ""IsDeleted"", ""RowVersion"")
                VALUES (@name, @nameAr, true, NULL, 'SYSTEM', @now, false, E'\\x00')", conn);
            insertCmd.Parameters.AddWithValue("name", name);
            insertCmd.Parameters.AddWithValue("nameAr", nameAr);
            insertCmd.Parameters.AddWithValue("now", DateTime.UtcNow);
            await insertCmd.ExecuteNonQueryAsync();
            Console.WriteLine($"  ✅ Inserted: {name}");
        }
        else
        {
            Console.WriteLine($"  ⏭️ Skipped (exists): {name}");
        }
    }
}

// Verify final count
await using var finalCmd = new NpgsqlCommand("SELECT COUNT(*) FROM \"VacationTypes\" WHERE NOT \"IsDeleted\"", conn);
var finalCount = (long)(await finalCmd.ExecuteScalarAsync() ?? 0);
Console.WriteLine($"\n✅ Total vacation types now: {finalCount}");
