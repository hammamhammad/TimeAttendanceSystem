using Npgsql;

var connStr = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";
using var conn = new NpgsqlConnection(connStr);
conn.Open();

// Check shift assignments
Console.WriteLine("=== Shift Assignments ===");
using (var cmd = new NpgsqlCommand(@"
    SELECT sa.""Id"", sa.""ShiftId"", sa.""AssignmentType"", sa.""BranchId"", sa.""DepartmentId"", sa.""EmployeeId"",
           sa.""Status"", sa.""EffectiveFromDate"", s.""Name"" as ShiftName
    FROM ""ShiftAssignments"" sa
    JOIN ""Shifts"" s ON sa.""ShiftId"" = s.""Id""
    WHERE NOT sa.""IsDeleted""", conn))
using (var reader = cmd.ExecuteReader())
{
    while (reader.Read())
    {
        var assignmentType = reader.GetInt32(2) switch { 1 => "Employee", 2 => "Department", 3 => "Branch", _ => "Unknown" };
        var status = reader.GetInt32(6) switch { 1 => "Pending", 2 => "Active", 3 => "Inactive", _ => "Unknown" };
        Console.WriteLine($"  ID: {reader.GetInt64(0)}, Shift: {reader.GetString(8)}, Type: {assignmentType}, BranchId: {(reader.IsDBNull(3) ? "NULL" : reader.GetInt64(3))}, Status: {status}, From: {reader.GetDateTime(7):d}");
    }
}

// Check employees and their branches
Console.WriteLine("\n=== Sample Employees (first 5) ===");
using (var cmd = new NpgsqlCommand(@"
    SELECT e.""Id"", e.""FirstName"", e.""LastName"", e.""BranchId"", b.""Name"" as BranchName
    FROM ""Employees"" e
    JOIN ""Branches"" b ON e.""BranchId"" = b.""Id""
    WHERE NOT e.""IsDeleted""
    ORDER BY e.""Id""
    LIMIT 5", conn))
using (var reader = cmd.ExecuteReader())
{
    while (reader.Read())
    {
        Console.WriteLine($"  Employee ID: {reader.GetInt64(0)}, Name: {reader.GetString(1)} {reader.GetString(2)}, BranchId: {reader.GetInt64(3)}, Branch: {reader.GetString(4)}");
    }
}

// Count active employees
Console.WriteLine("\n=== Counts ===");
using (var cmd = new NpgsqlCommand(@"SELECT COUNT(*) FROM ""Employees"" WHERE NOT ""IsDeleted""", conn))
    Console.WriteLine($"  Total Employees (not deleted): {cmd.ExecuteScalar()}");

using (var cmd = new NpgsqlCommand(@"SELECT COUNT(*) FROM ""Employees"" WHERE NOT ""IsDeleted"" AND ""IsActive"" = true", conn))
    Console.WriteLine($"  Employees with IsActive=true: {cmd.ExecuteScalar()}");

using (var cmd = new NpgsqlCommand(@"SELECT COUNT(*) FROM ""Employees"" WHERE NOT ""IsDeleted"" AND ""EmploymentStatus"" NOT IN (7, 8)", conn))
    Console.WriteLine($"  Employees not Terminated/Inactive status: {cmd.ExecuteScalar()}");

using (var cmd = new NpgsqlCommand(@"SELECT COUNT(*) FROM ""Employees"" WHERE NOT ""IsDeleted"" AND ""IsActive"" = true AND ""EmploymentStatus"" NOT IN (7, 8)", conn))
    Console.WriteLine($"  Employees eligible for attendance: {cmd.ExecuteScalar()}");

using (var cmd = new NpgsqlCommand(@"SELECT COUNT(*) FROM ""ShiftAssignments"" WHERE NOT ""IsDeleted"" AND ""Status"" = 2", conn))
    Console.WriteLine($"  Active Shift Assignments: {cmd.ExecuteScalar()}");
