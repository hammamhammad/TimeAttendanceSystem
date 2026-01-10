using System;
using Npgsql;

class Program
{
    static void Main()
    {
        string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

        try
        {
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            Console.WriteLine("Checking for WorkflowDefinitions table...");
            using (var cmd = new NpgsqlCommand(@"
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'WorkflowDefinitions'", connection))
            {
                var result = cmd.ExecuteScalar();
                if (result == null)
                {
                    Console.WriteLine("❌ WorkflowDefinitions table does not exist!");
                    Console.WriteLine("The database needs to be migrated. Please run migrations first.");
                    Environment.Exit(1);
                }
                Console.WriteLine("✅ WorkflowDefinitions table exists");
            }

            // Check Workflow Definitions
            Console.WriteLine("\nChecking default workflows...");
            using (var cmd = new NpgsqlCommand(@"
                SELECT
                    ""Id"",
                    ""Name"",
                    ""EntityType"",
                    ""IsDefault"",
                    ""IsActive""
                FROM ""WorkflowDefinitions""
                WHERE ""IsDefault"" = true
                ORDER BY ""EntityType""", connection))
            {
                using var reader = cmd.ExecuteReader();
                int count = 0;
                Console.WriteLine("\nDefault Workflows:");
                Console.WriteLine("─────────────────────────────────────────────────────");

                while (reader.Read())
                {
                    count++;
                    Console.WriteLine($"  {count}. {reader["Name"]} (Type: {reader["EntityType"]})");
                    Console.WriteLine($"     ID: {reader["Id"]} | Active: {reader["IsActive"]}");
                }

                Console.WriteLine("─────────────────────────────────────────────────────");

                if (count == 0)
                {
                    Console.WriteLine("\n⚠️  No default workflows found!");
                    Console.WriteLine("Expected 4 default workflows:");
                    Console.WriteLine("  1. Vacation Request");
                    Console.WriteLine("  2. Excuse Request");
                    Console.WriteLine("  3. Remote Work Request");
                    Console.WriteLine("  4. Fingerprint Request");
                }
                else
                {
                    Console.WriteLine($"\n✅ Found {count} default workflow(s)");
                    if (count < 4)
                    {
                        Console.WriteLine($"⚠️  Expected 4 workflows but found {count}");
                    }
                }
            }

            // Check Workflow Steps
            Console.WriteLine("\n\nChecking workflow steps...");
            using (var cmd = new NpgsqlCommand(@"
                SELECT
                    wd.""Name"" as WorkflowName,
                    ws.""Name"" as StepName,
                    ws.""ApproverType"",
                    ws.""StepOrder""
                FROM ""WorkflowDefinitions"" wd
                INNER JOIN ""WorkflowSteps"" ws ON wd.""Id"" = ws.""WorkflowDefinitionId""
                WHERE wd.""IsDefault"" = true
                ORDER BY wd.""EntityType"", ws.""StepOrder""", connection))
            {
                using var reader = cmd.ExecuteReader();
                Console.WriteLine("\nWorkflow Steps:");
                Console.WriteLine("─────────────────────────────────────────────────────");

                while (reader.Read())
                {
                    Console.WriteLine($"  {reader["WorkflowName"]}");
                    Console.WriteLine($"    Step {reader["StepOrder"]}: {reader["StepName"]} ({reader["ApproverType"]})");
                }
                Console.WriteLine("─────────────────────────────────────────────────────");
            }

        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error: {ex.Message}");
            Console.WriteLine($"\nFull error:\n{ex}");
            Environment.Exit(1);
        }
    }
}
