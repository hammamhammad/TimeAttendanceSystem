using Npgsql;

var connStr = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";
using var conn = new NpgsqlConnection(connStr);
conn.Open();

using var cmd = new NpgsqlCommand("UPDATE \"ShiftAssignments\" SET \"Status\" = 2 WHERE \"Status\" = 1", conn);
var rows = cmd.ExecuteNonQuery();
Console.WriteLine($"Updated {rows} shift assignments from Pending to Active");
