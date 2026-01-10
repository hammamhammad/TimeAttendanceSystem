using System;
using System.IO;
using Npgsql;

class Program
{
    static void Main()
    {
        string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";
        string sqlFilePath = "../scripts/sample-data-with-users.sql";

        try
        {
            Console.WriteLine("Reading SQL file...");
            string sqlScript = File.ReadAllText(sqlFilePath);

            Console.WriteLine("Connecting to database...");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            Console.WriteLine("Executing SQL script...");
            using var command = new NpgsqlCommand(sqlScript, connection);
            command.CommandTimeout = 120; // 2 minutes timeout

            command.ExecuteNonQuery();

            Console.WriteLine("✅ Sample data inserted successfully!");
            Console.WriteLine("Created: 5 Branches, 20 Departments, 50 Employees with User Accounts");
            Console.WriteLine("Default password for all employees: Emp@123!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error: {ex.Message}");
            Console.WriteLine($"Details: {ex}");
            Environment.Exit(1);
        }
    }
}
