using System;
using Npgsql;

class Program
{
    static void Main()
    {
        string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

        try
        {
            Console.WriteLine("Connecting to database...\n");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            // Check workflow instances
            Console.WriteLine("=== WORKFLOW INSTANCES ===");
            using (var cmd = new NpgsqlCommand(@"
                SELECT wi.""Id"", wi.""EntityType"", wi.""EntityId"", wi.""Status"", wi.""RequestedByUserId"",
                       wi.""CurrentStepId"", wi.""RequestedAt""
                FROM ""WorkflowInstances"" wi
                WHERE wi.""IsDeleted"" = false
                ORDER BY wi.""Id"" DESC
                LIMIT 10", connection))
            {
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine($"  ID: {reader["Id"]}, Type: {reader["EntityType"]}, EntityId: {reader["EntityId"]}, Status: {reader["Status"]}, RequestedBy: {reader["RequestedByUserId"]}, CurrentStep: {reader["CurrentStepId"]}");
                }
            }

            Console.WriteLine("\n=== WORKFLOW STEP EXECUTIONS (Pending) ===");
            using (var cmd = new NpgsqlCommand(@"
                SELECT wse.""Id"", wse.""WorkflowInstanceId"", wse.""StepId"", wse.""AssignedToUserId"",
                       wse.""Action"", wse.""AssignedAt"", wse.""DueAt""
                FROM ""WorkflowStepExecutions"" wse
                WHERE wse.""Action"" IS NULL AND wse.""IsDeleted"" = false
                ORDER BY wse.""Id"" DESC
                LIMIT 10", connection))
            {
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine($"  ID: {reader["Id"]}, WorkflowInstance: {reader["WorkflowInstanceId"]}, Step: {reader["StepId"]}, AssignedTo: {reader["AssignedToUserId"]}, DueAt: {reader["DueAt"]}");
                }
            }

            Console.WriteLine("\n=== EMPLOYEE USER LINKS (Sample) ===");
            using (var cmd = new NpgsqlCommand(@"
                SELECT eul.""EmployeeId"", eul.""UserId"", e.""FirstName"", e.""LastName"", e.""ManagerEmployeeId""
                FROM ""EmployeeUserLinks"" eul
                JOIN ""Employees"" e ON eul.""EmployeeId"" = e.""Id""
                WHERE e.""Id"" IN (1023, 1047)
                ORDER BY e.""Id""", connection))
            {
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine($"  Employee {reader["EmployeeId"]}: {reader["FirstName"]} {reader["LastName"]}, UserId: {reader["UserId"]}, ManagerEmpId: {reader["ManagerEmployeeId"]}");
                }
            }

            Console.WriteLine("\n=== VACATION REQUESTS (Recent) ===");
            using (var cmd = new NpgsqlCommand(@"
                SELECT ev.""Id"", ev.""EmployeeId"", ev.""StartDate"", ev.""EndDate"", ev.""IsApproved"",
                       ev.""WorkflowInstanceId"", e.""FirstName"", e.""LastName""
                FROM ""EmployeeVacations"" ev
                JOIN ""Employees"" e ON ev.""EmployeeId"" = e.""Id""
                WHERE ev.""IsDeleted"" = false
                ORDER BY ev.""Id"" DESC
                LIMIT 5", connection))
            {
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine($"  ID: {reader["Id"]}, Employee: {reader["FirstName"]} {reader["LastName"]} ({reader["EmployeeId"]}), Dates: {reader["StartDate"]:yyyy-MM-dd} to {reader["EndDate"]:yyyy-MM-dd}, Approved: {reader["IsApproved"]}, WorkflowId: {reader["WorkflowInstanceId"]}");
                }
            }

            Console.WriteLine("\n=== USER LOGIN INFO ===");
            using (var cmd = new NpgsqlCommand(@"
                SELECT u.""Id"" as user_id, u.""Username"", eul.""EmployeeId"", e.""FirstName"", e.""LastName"",
                       (SELECT COUNT(*) FROM ""Employees"" e2 WHERE e2.""ManagerEmployeeId"" = e.""Id"" AND e2.""IsDeleted"" = false) as direct_reports
                FROM ""Users"" u
                LEFT JOIN ""EmployeeUserLinks"" eul ON u.""Id"" = eul.""UserId""
                LEFT JOIN ""Employees"" e ON eul.""EmployeeId"" = e.""Id""
                WHERE u.""Id"" IN (1023, 1047) AND u.""IsDeleted"" = false
                ORDER BY u.""Id""", connection))
            {
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    var directReports = reader["direct_reports"];
                    Console.WriteLine($"  User {reader["user_id"]}: {reader["Username"]} -> Employee: {reader["FirstName"]} {reader["LastName"]} (EmpId: {reader["EmployeeId"]}), DirectReports: {directReports}");
                }
            }

            Console.WriteLine("\n=== WORKFLOW DEFINITION STEPS ===");
            using (var cmd = new NpgsqlCommand(@"
                SELECT wd.""Id"" as def_id, wd.""Name"", wd.""EntityType"", ws.""Id"" as step_id, ws.""Name"" as step_name, ws.""ApproverType"", ws.""TimeoutHours""
                FROM ""WorkflowDefinitions"" wd
                JOIN ""WorkflowSteps"" ws ON wd.""Id"" = ws.""WorkflowDefinitionId""
                WHERE wd.""IsDeleted"" = false AND ws.""IsDeleted"" = false AND wd.""EntityType"" = 1
                ORDER BY wd.""Id"", ws.""StepOrder""", connection))
            {
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine($"  Workflow {reader["def_id"]}: {reader["Name"]} ({reader["EntityType"]}), Step {reader["step_id"]}: {reader["step_name"]}, ApproverType: {reader["ApproverType"]}, Timeout: {reader["TimeoutHours"]}h");
                }
            }

            Console.WriteLine("\n✅ Diagnosis complete!");
            Console.WriteLine("\n📝 SUMMARY:");
            Console.WriteLine("   - User 1047 (abdulaziz.anazi) submitted vacation requests");
            Console.WriteLine("   - Workflow assigned to User 1023 (majed.ruwaili) who is the manager");
            Console.WriteLine("   - Manager (User 1023) should login with username: majed.ruwaili / password: Emp@123!");
            Console.WriteLine("   - Then navigate to Pending Approvals to see the requests");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error: {ex.Message}");
            Console.WriteLine($"Details: {ex}");
            Environment.Exit(1);
        }
    }
}
