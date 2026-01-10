using System;
using Npgsql;

class Program
{
    static void Main()
    {
        // Connect to postgres database (default) to drop the target database
        string masterConnectionString = "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";
        string databaseName = "TimeAttendanceSystem";

        try
        {
            Console.WriteLine($"Connecting to PostgreSQL server...");
            using var connection = new NpgsqlConnection(masterConnectionString);
            connection.Open();

            // Terminate all connections to the target database
            Console.WriteLine($"Terminating existing connections to {databaseName}...");
            using (var terminateCmd = new NpgsqlCommand($@"
                SELECT pg_terminate_backend(pg_stat_activity.pid)
                FROM pg_stat_activity
                WHERE pg_stat_activity.datname = '{databaseName}'
                AND pid <> pg_backend_pid();", connection))
            {
                terminateCmd.ExecuteNonQuery();
            }

            // Drop the database
            Console.WriteLine($"Dropping database {databaseName}...");
            using (var dropCmd = new NpgsqlCommand($"DROP DATABASE IF EXISTS \"{databaseName}\";", connection))
            {
                dropCmd.ExecuteNonQuery();
            }

            Console.WriteLine($"Database {databaseName} dropped successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            Console.WriteLine($"Details: {ex}");
            Environment.Exit(1);
        }
    }
}
