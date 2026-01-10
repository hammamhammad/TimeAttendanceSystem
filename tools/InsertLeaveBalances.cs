using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("Inserting leave balances for employees...");

// Get all employees
var employeeIds = new List<long>();
await using (var cmd = new NpgsqlCommand("SELECT \"Id\" FROM \"Employees\" WHERE NOT \"IsDeleted\" ORDER BY \"Id\"", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    while (await reader.ReadAsync())
    {
        employeeIds.Add(reader.GetInt64(0));
    }
}

Console.WriteLine($"Found {employeeIds.Count} employees");

// Get all active vacation types
var vacationTypeIds = new List<long>();
await using (var cmd = new NpgsqlCommand("SELECT \"Id\" FROM \"VacationTypes\" WHERE NOT \"IsDeleted\" AND \"IsActive\" ORDER BY \"Id\"", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    while (await reader.ReadAsync())
    {
        vacationTypeIds.Add(reader.GetInt64(0));
    }
}

Console.WriteLine($"Found {vacationTypeIds.Count} active vacation types");

int insertedCount = 0;
int skippedCount = 0;

// Insert balances for both 2025 and 2026
int[] years = [2025, 2026];

foreach (var year in years)
{
    foreach (var employeeId in employeeIds)
    {
        foreach (var vacationTypeId in vacationTypeIds)
        {
            // Check if balance already exists
            await using var checkCmd = new NpgsqlCommand(
                "SELECT COUNT(*) FROM \"LeaveBalances\" WHERE \"EmployeeId\" = @empId AND \"VacationTypeId\" = @vtId AND \"Year\" = @year", conn);
            checkCmd.Parameters.AddWithValue("@empId", employeeId);
            checkCmd.Parameters.AddWithValue("@vtId", vacationTypeId);
            checkCmd.Parameters.AddWithValue("@year", year);

            var exists = (long)(await checkCmd.ExecuteScalarAsync())! > 0;
            if (exists)
            {
                skippedCount++;
                continue;
            }

            // Determine entitled days based on vacation type
            decimal entitledDays = vacationTypeId switch
            {
                1 => 21, // Annual Leave - 21 days
                2 => 10, // Sick Leave - 10 days
                3 => 5,  // Personal Leave - 5 days
                4 => 0,  // Unpaid Leave - 0 days (no balance needed)
                5 => 3,  // Bereavement Leave - 3 days
                6 => 90, // Maternity Leave - 90 days
                7 => 5,  // Paternity Leave - 5 days
                8 => 30, // Hajj Leave - 30 days
                _ => 10  // Default - 10 days
            };

            if (entitledDays == 0) continue; // Skip unpaid leave

            // Insert leave balance
            await using var insertCmd = new NpgsqlCommand(@"
                INSERT INTO ""LeaveBalances"" (""EmployeeId"", ""VacationTypeId"", ""Year"", ""EntitledDays"", ""AccruedDays"", ""UsedDays"", ""PendingDays"", ""AdjustedDays"", ""CreatedAtUtc"", ""ModifiedAtUtc"")
                VALUES (@empId, @vtId, @year, @entitled, @accrued, 0, 0, 0, @now, @now)", conn);

            insertCmd.Parameters.AddWithValue("@empId", employeeId);
            insertCmd.Parameters.AddWithValue("@vtId", vacationTypeId);
            insertCmd.Parameters.AddWithValue("@year", year);
            insertCmd.Parameters.AddWithValue("@entitled", entitledDays);
            insertCmd.Parameters.AddWithValue("@accrued", entitledDays); // Give full accrued balance
            insertCmd.Parameters.AddWithValue("@now", DateTime.UtcNow);

            await insertCmd.ExecuteNonQueryAsync();
            insertedCount++;
        }
    }
}

Console.WriteLine($"\n✅ Leave balances created: {insertedCount}");
Console.WriteLine($"⏭️ Already existing (skipped): {skippedCount}");

// Verify by showing a sample
Console.WriteLine("\n📋 Sample leave balances for employee 1024 (dalal.ajmi):");
await using var verifyCmd = new NpgsqlCommand(@"
    SELECT lb.""VacationTypeId"", vt.""Name"", lb.""EntitledDays"", lb.""AccruedDays"", lb.""UsedDays""
    FROM ""LeaveBalances"" lb
    JOIN ""VacationTypes"" vt ON lb.""VacationTypeId"" = vt.""Id""
    WHERE lb.""EmployeeId"" = 1024 AND lb.""Year"" = 2025
    ORDER BY lb.""VacationTypeId""", conn);

await using var verifyReader = await verifyCmd.ExecuteReaderAsync();
while (await verifyReader.ReadAsync())
{
    var vtName = verifyReader.GetString(1);
    var entitled = verifyReader.GetDecimal(2);
    var accrued = verifyReader.GetDecimal(3);
    var used = verifyReader.GetDecimal(4);
    Console.WriteLine($"  - {vtName}: Entitled: {entitled}, Accrued: {accrued}, Used: {used}");
}
