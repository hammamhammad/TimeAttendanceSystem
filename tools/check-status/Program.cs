using Npgsql;

var connStr = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";
using var conn = new NpgsqlConnection(connStr);
conn.Open();

var testDate = DateTime.Today;
Console.WriteLine($"Testing attendance generation for date: {testDate:yyyy-MM-dd}");
Console.WriteLine();

// Get a sample employee
Console.WriteLine("=== Sample Employee ===");
long? testEmployeeId = null;
long? testBranchId = null;
long? testDeptId = null;

using (var cmd = new NpgsqlCommand(@"
    SELECT ""Id"", ""FirstName"", ""LastName"", ""BranchId"", ""DepartmentId"", ""HireDate""
    FROM ""Employees""
    WHERE NOT ""IsDeleted"" AND ""IsActive"" = true
    AND ""EmploymentStatus"" NOT IN (7, 8)
    ORDER BY ""Id""
    LIMIT 1", conn))
using (var reader = cmd.ExecuteReader())
{
    if (reader.Read())
    {
        testEmployeeId = reader.GetInt64(0);
        testBranchId = reader.IsDBNull(3) ? null : reader.GetInt64(3);
        testDeptId = reader.IsDBNull(4) ? null : reader.GetInt64(4);
        var hireDate = reader.GetDateTime(5);
        Console.WriteLine($"  Employee ID: {testEmployeeId}");
        Console.WriteLine($"  Name: {reader.GetString(1)} {reader.GetString(2)}");
        Console.WriteLine($"  BranchId: {testBranchId}");
        Console.WriteLine($"  DepartmentId: {testDeptId}");
        Console.WriteLine($"  HireDate: {hireDate:yyyy-MM-dd}");
        Console.WriteLine($"  Test Date >= HireDate: {testDate >= hireDate.Date}");
    }
}

if (!testEmployeeId.HasValue)
{
    Console.WriteLine("ERROR: No eligible employee found!");
    return;
}

// Check shift assignments that would match this employee
Console.WriteLine();
Console.WriteLine("=== Shift Assignments Query (as the service would run) ===");
Console.WriteLine($"Looking for assignments with:");
Console.WriteLine($"  - Status = 2 (Active)");
Console.WriteLine($"  - EffectiveFromDate <= {testDate:yyyy-MM-dd}");
Console.WriteLine($"  - EffectiveToDate is NULL or >= {testDate:yyyy-MM-dd}");
Console.WriteLine($"  - (AssignmentType=1 AND EmployeeId={testEmployeeId})");
Console.WriteLine($"    OR (AssignmentType=2 AND DepartmentId={testDeptId})");
Console.WriteLine($"    OR (AssignmentType=3 AND BranchId={testBranchId})");
Console.WriteLine();

using (var cmd = new NpgsqlCommand($@"
    SELECT sa.""Id"", sa.""ShiftId"", sa.""AssignmentType"", sa.""BranchId"", sa.""DepartmentId"", sa.""EmployeeId"",
           sa.""Status"", sa.""EffectiveFromDate"", sa.""EffectiveToDate"", s.""Name"" as ShiftName, sa.""Priority""
    FROM ""ShiftAssignments"" sa
    JOIN ""Shifts"" s ON sa.""ShiftId"" = s.""Id""
    WHERE NOT sa.""IsDeleted""
      AND sa.""Status"" = 2
      AND sa.""EffectiveFromDate"" <= @testDate
      AND (sa.""EffectiveToDate"" IS NULL OR sa.""EffectiveToDate"" >= @testDate)
      AND (
        (sa.""AssignmentType"" = 1 AND sa.""EmployeeId"" = @empId)
        OR (sa.""AssignmentType"" = 2 AND sa.""DepartmentId"" = @deptId)
        OR (sa.""AssignmentType"" = 3 AND sa.""BranchId"" = @branchId)
      )
    ORDER BY sa.""Priority"" DESC, sa.""AssignmentType"" DESC", conn))
{
    cmd.Parameters.AddWithValue("testDate", testDate);
    cmd.Parameters.AddWithValue("empId", testEmployeeId ?? (object)DBNull.Value);
    cmd.Parameters.AddWithValue("deptId", testDeptId ?? (object)DBNull.Value);
    cmd.Parameters.AddWithValue("branchId", testBranchId ?? (object)DBNull.Value);

    using var reader = cmd.ExecuteReader();
    var count = 0;
    while (reader.Read())
    {
        count++;
        var assignmentType = reader.GetInt32(2) switch { 1 => "Employee", 2 => "Department", 3 => "Branch", _ => "Unknown" };
        Console.WriteLine($"  Match #{count}:");
        Console.WriteLine($"    ID: {reader.GetInt64(0)}, Shift: {reader.GetString(9)}");
        Console.WriteLine($"    Type: {assignmentType}, Priority: {reader.GetInt32(10)}");
        Console.WriteLine($"    BranchId: {(reader.IsDBNull(3) ? "NULL" : reader.GetInt64(3))}");
        Console.WriteLine($"    DepartmentId: {(reader.IsDBNull(4) ? "NULL" : reader.GetInt64(4))}");
        Console.WriteLine($"    EmployeeId: {(reader.IsDBNull(5) ? "NULL" : reader.GetInt64(5))}");
        Console.WriteLine($"    EffectiveFrom: {reader.GetDateTime(7):yyyy-MM-dd}");
        Console.WriteLine($"    EffectiveTo: {(reader.IsDBNull(8) ? "NULL" : reader.GetDateTime(8).ToString("yyyy-MM-dd"))}");
    }

    if (count == 0)
    {
        Console.WriteLine("  NO MATCHES FOUND!");
        Console.WriteLine();
        Console.WriteLine("Let's check why...");
        Console.WriteLine();
    }
    else
    {
        Console.WriteLine();
        Console.WriteLine($"Total matches: {count}");
    }
}

// Check all shift assignments to understand why no match
Console.WriteLine();
Console.WriteLine("=== All Shift Assignments ===");
using (var cmd = new NpgsqlCommand(@"
    SELECT sa.""Id"", sa.""ShiftId"", sa.""AssignmentType"", sa.""BranchId"", sa.""DepartmentId"", sa.""EmployeeId"",
           sa.""Status"", sa.""EffectiveFromDate"", sa.""EffectiveToDate"", sa.""IsDeleted"", s.""Name"", s.""IsDeleted"" as ShiftIsDeleted
    FROM ""ShiftAssignments"" sa
    JOIN ""Shifts"" s ON sa.""ShiftId"" = s.""Id""
    ORDER BY sa.""Id""", conn))
using (var reader = cmd.ExecuteReader())
{
    while (reader.Read())
    {
        var assignmentType = reader.GetInt32(2) switch { 1 => "Employee", 2 => "Department", 3 => "Branch", _ => "Unknown" };
        var status = reader.GetInt32(6) switch { 1 => "Pending", 2 => "Active", 3 => "Inactive", 4 => "Expired", 5 => "Cancelled", _ => "Unknown" };
        var isDeleted = reader.GetBoolean(9);
        var shiftIsDeleted = reader.GetBoolean(11);
        var effectiveFrom = reader.GetDateTime(7);
        var effectiveTo = reader.IsDBNull(8) ? (DateTime?)null : reader.GetDateTime(8);

        Console.WriteLine($"Assignment ID: {reader.GetInt64(0)}");
        Console.WriteLine($"  Shift: {reader.GetString(10)} (ID: {reader.GetInt64(1)}, Deleted: {shiftIsDeleted})");
        Console.WriteLine($"  Type: {assignmentType}, Status: {status}, IsDeleted: {isDeleted}");
        Console.WriteLine($"  BranchId: {(reader.IsDBNull(3) ? "NULL" : reader.GetInt64(3))}");
        Console.WriteLine($"  DepartmentId: {(reader.IsDBNull(4) ? "NULL" : reader.GetInt64(4))}");
        Console.WriteLine($"  EmployeeId: {(reader.IsDBNull(5) ? "NULL" : reader.GetInt64(5))}");
        Console.WriteLine($"  EffectiveFrom: {effectiveFrom:yyyy-MM-dd}, EffectiveTo: {(effectiveTo.HasValue ? effectiveTo.Value.ToString("yyyy-MM-dd") : "NULL")}");

        // Check why it might not match
        var issues = new List<string>();
        if (isDeleted) issues.Add("IsDeleted=true");
        if (reader.GetInt32(6) != 2) issues.Add($"Status={status} (not Active)");
        if (effectiveFrom > testDate) issues.Add($"EffectiveFromDate > TestDate");
        if (effectiveTo.HasValue && effectiveTo < testDate) issues.Add($"EffectiveToDate < TestDate");

        if (issues.Any())
            Console.WriteLine($"  EXCLUSION REASONS: {string.Join(", ", issues)}");
        else
            Console.WriteLine($"  Date filter: OK");

        Console.WriteLine();
    }
}

// Check existing attendance records
Console.WriteLine("=== Existing Attendance Records for Today ===");
using (var cmd = new NpgsqlCommand($@"
    SELECT COUNT(*) FROM ""AttendanceRecords""
    WHERE ""AttendanceDate"" = @testDate", conn))
{
    cmd.Parameters.AddWithValue("testDate", testDate);
    Console.WriteLine($"Records for {testDate:yyyy-MM-dd}: {cmd.ExecuteScalar()}");
}

// Check the default shift
Console.WriteLine();
Console.WriteLine("=== Default Shift ===");
using (var cmd = new NpgsqlCommand(@"
    SELECT ""Id"", ""Name"", ""IsDefault"", ""Status"", ""IsDeleted"",
           ""IsSunday"", ""IsMonday"", ""IsTuesday"", ""IsWednesday"", ""IsThursday"", ""IsFriday"", ""IsSaturday""
    FROM ""Shifts""
    WHERE ""IsDefault"" = true", conn))
using (var reader = cmd.ExecuteReader())
{
    if (reader.Read())
    {
        var status = reader.GetInt32(3) switch { 1 => "Active", 2 => "Inactive", 3 => "Draft", 4 => "Archived", _ => "Unknown" };
        Console.WriteLine($"  ID: {reader.GetInt64(0)}");
        Console.WriteLine($"  Name: {reader.GetString(1)}");
        Console.WriteLine($"  Status: {status}");
        Console.WriteLine($"  IsDeleted: {reader.GetBoolean(4)}");
        Console.WriteLine($"  Working Days: Sun={reader.GetBoolean(5)}, Mon={reader.GetBoolean(6)}, Tue={reader.GetBoolean(7)}, Wed={reader.GetBoolean(8)}, Thu={reader.GetBoolean(9)}, Fri={reader.GetBoolean(10)}, Sat={reader.GetBoolean(11)}");
        Console.WriteLine($"  Today ({testDate.DayOfWeek}): {testDate.DayOfWeek switch { DayOfWeek.Sunday => reader.GetBoolean(5), DayOfWeek.Monday => reader.GetBoolean(6), DayOfWeek.Tuesday => reader.GetBoolean(7), DayOfWeek.Wednesday => reader.GetBoolean(8), DayOfWeek.Thursday => reader.GetBoolean(9), DayOfWeek.Friday => reader.GetBoolean(10), DayOfWeek.Saturday => reader.GetBoolean(11), _ => false }}");
    }
    else
    {
        Console.WriteLine("  NO DEFAULT SHIFT FOUND!");
    }
}

Console.WriteLine();
Console.WriteLine("=== Summary ===");
Console.WriteLine($"Test Employee ID: {testEmployeeId}");
Console.WriteLine($"Test Employee BranchId: {testBranchId}");
Console.WriteLine($"Test Date: {testDate:yyyy-MM-dd} ({testDate.DayOfWeek})");

// Check attendance record status distribution
Console.WriteLine();
Console.WriteLine("=== Attendance Record Status Distribution ===");
using (var cmd = new NpgsqlCommand($@"
    SELECT ""Status"", COUNT(*) as cnt
    FROM ""AttendanceRecords""
    WHERE ""AttendanceDate"" = @testDate
    GROUP BY ""Status""
    ORDER BY ""Status""", conn))
{
    cmd.Parameters.AddWithValue("testDate", testDate);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
        var status = reader.GetInt32(0);
        var count = reader.GetInt64(1);
        var statusName = status switch
        {
            1 => "Present",
            2 => "Absent",
            3 => "Late",
            4 => "EarlyLeave",
            5 => "OnLeave",
            6 => "DayOff",
            7 => "Overtime",
            8 => "Incomplete",
            9 => "Holiday",
            10 => "SickLeave",
            11 => "Pending",
            12 => "OnDuty",
            13 => "Excused",
            14 => "RemoteWork",
            _ => $"Unknown({status})"
        };
        Console.WriteLine($"  {statusName}: {count}");
    }
}

// Check a sample attendance record
Console.WriteLine();
Console.WriteLine("=== Sample Attendance Record Details ===");
using (var cmd = new NpgsqlCommand($@"
    SELECT ar.""Id"", ar.""EmployeeId"", ar.""Status"", ar.""ShiftAssignmentId"",
           ar.""ScheduledHours"", ar.""WorkingHours"", ar.""Notes""
    FROM ""AttendanceRecords"" ar
    WHERE ar.""AttendanceDate"" = @testDate
    ORDER BY ar.""Id""
    LIMIT 3", conn))
{
    cmd.Parameters.AddWithValue("testDate", testDate);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
        Console.WriteLine($"  Record ID: {reader.GetInt64(0)}");
        Console.WriteLine($"    EmployeeId: {reader.GetInt64(1)}");
        Console.WriteLine($"    Status: {reader.GetInt32(2)}");
        Console.WriteLine($"    ShiftAssignmentId: {(reader.IsDBNull(3) ? "NULL" : reader.GetInt64(3))}");
        Console.WriteLine($"    ScheduledHours: {reader.GetDecimal(4)}");
        Console.WriteLine($"    WorkingHours: {reader.GetDecimal(5)}");
        Console.WriteLine($"    Notes: {(reader.IsDBNull(6) ? "NULL" : reader.GetString(6))}");
        Console.WriteLine();
    }
}
