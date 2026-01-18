using Npgsql;

var connStr = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";
using var conn = new NpgsqlConnection(connStr);
conn.Open();

// Check if shift periods are deleted
Console.WriteLine("Checking Shift Periods for Shift 1...\n");

using var cmd = new NpgsqlCommand(@"
    SELECT ""Id"", ""ShiftId"", ""StartTime"", ""EndTime"", ""PeriodOrder"", ""IsDeleted""
    FROM ""ShiftPeriods""
    WHERE ""ShiftId"" = 1", conn);

using var reader = cmd.ExecuteReader();
while (reader.Read())
{
    Console.WriteLine($"Period ID: {reader.GetInt64(0)}, ShiftId: {reader.GetInt64(1)}, Start: {reader.GetTimeSpan(2)}, End: {reader.GetTimeSpan(3)}, Order: {reader.GetInt32(4)}, IsDeleted: {reader.GetBoolean(5)}");
}
reader.Close();

// Double check by getting ALL shift periods
Console.WriteLine("\n--- ALL Shift Periods ---");
using var cmd2 = new NpgsqlCommand(@"
    SELECT sp.""Id"", sp.""ShiftId"", s.""Name"", sp.""StartTime"", sp.""EndTime"", sp.""IsDeleted""
    FROM ""ShiftPeriods"" sp
    JOIN ""Shifts"" s ON sp.""ShiftId"" = s.""Id""", conn);
using var reader2 = cmd2.ExecuteReader();
while (reader2.Read())
{
    Console.WriteLine($"Period ID: {reader2.GetInt64(0)}, ShiftId: {reader2.GetInt64(1)}, Shift: {reader2.GetString(2)}, Start: {reader2.GetTimeSpan(3)}, End: {reader2.GetTimeSpan(4)}, IsDeleted: {reader2.GetBoolean(5)}");
}
