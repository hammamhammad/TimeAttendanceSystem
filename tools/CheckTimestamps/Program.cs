using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

using var conn = new NpgsqlConnection(connectionString);
conn.Open();

// Check raw values as text with timezone info
var cmd = new NpgsqlCommand(@"
    SELECT 
        ev.""Id"" as vacation_id,
        ev.""CreatedAtUtc""::text as vacation_created_text,
        wse.""AssignedAt""::text as step_assigned_text,
        wse.""CreatedAtUtc""::text as step_created_text,
        (ev.""CreatedAtUtc"" AT TIME ZONE 'UTC')::text as vacation_created_utc,
        (wse.""AssignedAt"" AT TIME ZONE 'UTC')::text as step_assigned_utc
    FROM ""EmployeeVacations"" ev
    JOIN ""WorkflowInstances"" wi ON ev.""WorkflowInstanceId"" = wi.""Id""
    JOIN ""WorkflowStepExecutions"" wse ON wse.""WorkflowInstanceId"" = wi.""Id""
    ORDER BY ev.""Id"" DESC LIMIT 1
", conn);

using var reader = cmd.ExecuteReader();
if (reader.Read())
{
    Console.WriteLine($"Vacation ID: {reader["vacation_id"]}");
    Console.WriteLine($"");
    Console.WriteLine($"Vacation CreatedAtUtc (stored): {reader["vacation_created_text"]}");
    Console.WriteLine($"Vacation CreatedAtUtc (as UTC): {reader["vacation_created_utc"]}");
    Console.WriteLine($"");
    Console.WriteLine($"Step AssignedAt (stored): {reader["step_assigned_text"]}");
    Console.WriteLine($"Step AssignedAt (as UTC): {reader["step_assigned_utc"]}");
    Console.WriteLine($"");
    Console.WriteLine($"Step CreatedAtUtc (stored): {reader["step_created_text"]}");
}
else
{
    Console.WriteLine("No vacation with workflow found");
}
