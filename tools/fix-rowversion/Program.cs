using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

Console.WriteLine("Fixing RowVersion column defaults for workflow tables...");

try
{
    string sql = @"
-- Fix RowVersion column defaults for workflow-related tables

-- Update WorkflowDefinitions table
ALTER TABLE ""WorkflowDefinitions""
ALTER COLUMN ""RowVersion"" SET DEFAULT E'\\x01'::bytea;

UPDATE ""WorkflowDefinitions""
SET ""RowVersion"" = E'\\x01'::bytea
WHERE ""RowVersion"" IS NULL;

-- Update WorkflowSteps table
ALTER TABLE ""WorkflowSteps""
ALTER COLUMN ""RowVersion"" SET DEFAULT E'\\x01'::bytea;

UPDATE ""WorkflowSteps""
SET ""RowVersion"" = E'\\x01'::bytea
WHERE ""RowVersion"" IS NULL;

-- Update WorkflowInstances table
ALTER TABLE ""WorkflowInstances""
ALTER COLUMN ""RowVersion"" SET DEFAULT E'\\x01'::bytea;

UPDATE ""WorkflowInstances""
SET ""RowVersion"" = E'\\x01'::bytea
WHERE ""RowVersion"" IS NULL;

-- Update WorkflowStepExecutions table
ALTER TABLE ""WorkflowStepExecutions""
ALTER COLUMN ""RowVersion"" SET DEFAULT E'\\x01'::bytea;

UPDATE ""WorkflowStepExecutions""
SET ""RowVersion"" = E'\\x01'::bytea
WHERE ""RowVersion"" IS NULL;

-- Update ApprovalDelegations table
ALTER TABLE ""ApprovalDelegations""
ALTER COLUMN ""RowVersion"" SET DEFAULT E'\\x01'::bytea;

UPDATE ""ApprovalDelegations""
SET ""RowVersion"" = E'\\x01'::bytea
WHERE ""RowVersion"" IS NULL;

-- Update EmployeeVacations table
ALTER TABLE ""EmployeeVacations""
ALTER COLUMN ""RowVersion"" SET DEFAULT E'\\x01'::bytea;

UPDATE ""EmployeeVacations""
SET ""RowVersion"" = E'\\x01'::bytea
WHERE ""RowVersion"" IS NULL;
";

    using var connection = new NpgsqlConnection(connectionString);
    Console.WriteLine("Connecting to database...");
    connection.Open();

    using var command = new NpgsqlCommand(sql, connection);
    command.CommandTimeout = 60;

    Console.WriteLine("Executing SQL script...");
    command.ExecuteNonQuery();

    Console.WriteLine("RowVersion defaults fixed successfully!");
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    Console.WriteLine($"Stack trace: {ex.StackTrace}");
}
