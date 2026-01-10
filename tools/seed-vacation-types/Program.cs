using System;
using Npgsql;

class Program
{
    static void Main()
    {
        string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

        try
        {
            Console.WriteLine("Connecting to database...");
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();

            // Check if vacation types exist
            Console.WriteLine("Checking existing vacation types...");
            using var checkCommand = new NpgsqlCommand(
                "SELECT COUNT(*) FROM \"VacationTypes\" WHERE \"IsDeleted\" = false",
                connection);
            var count = Convert.ToInt32(checkCommand.ExecuteScalar());
            Console.WriteLine($"Found {count} active vacation types");

            if (count > 0)
            {
                Console.WriteLine("Vacation types already exist. Skipping insertion.");
                return;
            }

            Console.WriteLine("Inserting vacation types...");

            var vacationTypes = new[]
            {
                ("Annual Leave", "إجازة سنوية"),
                ("Sick Leave", "إجازة مرضية"),
                ("Unpaid Leave", "إجازة بدون راتب"),
                ("Emergency Leave", "إجازة طارئة"),
                ("Maternity Leave", "إجازة أمومة"),
                ("Paternity Leave", "إجازة أبوة"),
                ("Bereavement Leave", "إجازة عزاء"),
                ("Marriage Leave", "إجازة زواج")
            };

            foreach (var (name, nameAr) in vacationTypes)
            {
                using var insertCommand = new NpgsqlCommand(@"
                    INSERT INTO ""VacationTypes""
                    (""Name"", ""NameAr"", ""IsActive"", ""IsDeleted"", ""CreatedBy"", ""CreatedAtUtc"")
                    VALUES (@name, @nameAr, true, false, 'SYSTEM', @createdAt)",
                    connection);

                insertCommand.Parameters.AddWithValue("@name", name);
                insertCommand.Parameters.AddWithValue("@nameAr", nameAr);
                insertCommand.Parameters.AddWithValue("@createdAt", DateTime.UtcNow);

                insertCommand.ExecuteNonQuery();
                Console.WriteLine($"  ✓ Added: {name}");
            }

            Console.WriteLine("\n✅ Successfully inserted 8 vacation types!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error: {ex.Message}");
            Console.WriteLine($"Details: {ex}");
            Environment.Exit(1);
        }
    }
}
