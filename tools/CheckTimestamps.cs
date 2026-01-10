using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

using var conn = new NpgsqlConnection(connectionString);
conn.Open();

// Check latest vacation with workflow step
var cmd = new NpgsqlCommand(@"
    SELECT 
        ev.id as vacation_id,
        ev.""CreatedAtUtc"" as vacation_created,
        wse.""AssignedAt"" as step_assigned,
        wse.""CreatedAtUtc"" as step_created
    FROM ""EmployeeVacations"" ev
    JOIN ""WorkflowInstances"" wi ON ev.""WorkflowInstanceId"" = wi.""Id""
    JOIN ""WorkflowStepExecutions"" wse ON wse.""WorkflowInstanceId"" = wi.""Id""
    ORDER BY ev.id DESC LIMIT 1
", conn);

using var reader = cmd.ExecuteReader();
if (reader.Read())
{
    Console.WriteLine($"Vacation ID: {reader["vacation_id"]}");
    Console.WriteLine($"Vacation CreatedAtUtc (DB): {reader["vacation_created"]}");
    Console.WriteLine($"Step AssignedAt (DB): {reader["step_assigned"]}");
    Console.WriteLine($"Step CreatedAtUtc (DB): {reader["step_created"]}");
}
else
{
    Console.WriteLine("No vacation with workflow found");
}
