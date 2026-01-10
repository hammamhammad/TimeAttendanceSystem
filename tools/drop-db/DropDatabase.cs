using System;
using Npgsql;

class Program
{
    static void Main()
    {
        // Connect to postgres database (default admin database) to drop TimeAttendanceSystem
        string connectionString = "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

        try
        {
            Console.WriteLine("Connecting to PostgreSQL...");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            // First, terminate all connections to the database
            Console.WriteLine("Terminating existing connections to TimeAttendanceSystem...");
            using (var terminateCmd = new NpgsqlCommand(@"
                SELECT pg_terminate_backend(pg_stat_activity.pid)
                FROM pg_stat_activity
                WHERE pg_stat_activity.datname = 'TimeAttendanceSystem'
                AND pid <> pg_backend_pid();", connection))
            {
                terminateCmd.ExecuteNonQuery();
            }

            // Now drop the database
            Console.WriteLine("Dropping database TimeAttendanceSystem...");
            using (var dropCmd = new NpgsqlCommand("DROP DATABASE IF EXISTS \"TimeAttendanceSystem\";", connection))
            {
                dropCmd.ExecuteNonQuery();
            }

            Console.WriteLine("✅ Database dropped successfully!");
            Console.WriteLine("Now start the backend to recreate the database with migrations.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error: {ex.Message}");
            Console.WriteLine($"Details: {ex}");
            Environment.Exit(1);
        }
    }
}
