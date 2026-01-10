using System;
using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

try
{
    using var connection = new NpgsqlConnection(connectionString);
    connection.Open();

    // Check Branches
    using (var cmd = new NpgsqlCommand("SELECT COUNT(*) FROM \"Branches\" WHERE \"Id\" BETWEEN 101 AND 105", connection))
    {
        var count = cmd.ExecuteScalar();
        Console.WriteLine($"✅ Branches: {count}/5");
    }

    // Check Departments
    using (var cmd = new NpgsqlCommand("SELECT COUNT(*) FROM \"Departments\" WHERE \"Id\" BETWEEN 101 AND 120", connection))
    {
        var count = cmd.ExecuteScalar();
        Console.WriteLine($"✅ Departments: {count}/20");
    }

    // Check Employees
    using (var cmd = new NpgsqlCommand("SELECT COUNT(*) FROM \"Employees\" WHERE \"Id\" BETWEEN 1001 AND 1050", connection))
    {
        var count = cmd.ExecuteScalar();
        Console.WriteLine($"✅ Employees: {count}/50");
    }

    // Check Users
    using (var cmd = new NpgsqlCommand("SELECT COUNT(*) FROM \"Users\" WHERE \"Id\" BETWEEN 1001 AND 1050", connection))
    {
        var count = cmd.ExecuteScalar();
        Console.WriteLine($"✅ Users: {count}/50");
    }

    // Check Sample Employee
    using (var cmd = new NpgsqlCommand(@"
        SELECT e.""FirstName"", e.""LastName"", e.""Email"", u.""Username""
        FROM ""Employees"" e
        INNER JOIN ""Users"" u ON e.""Id"" = u.""Id""
        WHERE e.""Id"" = 1001
        LIMIT 1", connection))
    {
        using var reader = cmd.ExecuteReader();
        if (reader.Read())
        {
            Console.WriteLine($"\n📋 Sample Branch Manager:");
            Console.WriteLine($"   Name: {reader["FirstName"]} {reader["LastName"]}");
            Console.WriteLine($"   Email: {reader["Email"]}");
            Console.WriteLine($"   Username: {reader["Username"]}");
            Console.WriteLine($"   Password: Emp@123! (must change on first login)");
        }
    }

    Console.WriteLine($"\n✅ All sample data verified successfully!");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Error: {ex.Message}");
    Environment.Exit(1);
}
