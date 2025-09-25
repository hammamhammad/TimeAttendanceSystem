using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CreateHolidayApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var connectionString = "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=TimeAttendanceSystem;Integrated Security=true;TrustServerCertificate=true";

            Console.WriteLine("=== Creating OneTime Holiday for September 23, 2025 ===");

            try
            {
                using var connection = new SqlConnection(connectionString);
                await connection.OpenAsync();
                Console.WriteLine("✅ Connected to database successfully");

                // Check if holiday already exists
                var checkSql = @"
                    SELECT COUNT(*) FROM PublicHolidays
                    WHERE HolidayType = 0
                    AND SpecificDate = '2025-09-23'
                    AND IsActive = 1
                    AND IsDeleted = 0";

                using var checkCmd = new SqlCommand(checkSql, connection);
                var existingCount = (int)await checkCmd.ExecuteScalarAsync();

                if (existingCount > 0)
                {
                    Console.WriteLine("⚠️  OneTime holiday for 2025-09-23 already exists");
                    return;
                }

                // Create the holiday
                var insertSql = @"
                    INSERT INTO PublicHolidays (
                        Name,
                        NameAr,
                        HolidayType,
                        Month,
                        Day,
                        SpecificDate,
                        IsActive,
                        IsNational,
                        BranchId,
                        Description,
                        Priority,
                        CreatedAtUtc,
                        CreatedBy,
                        IsDeleted
                    ) VALUES (
                        'September 23, 2025 National Holiday',
                        N'العطلة الوطنية 23 سبتمبر 2025',
                        0,
                        NULL,
                        NULL,
                        '2025-09-23',
                        1,
                        1,
                        NULL,
                        'OneTime national holiday on September 23, 2025 - Created to fix attendance calculation issue',
                        100,
                        GETUTCDATE(),
                        'ATTENDANCE_FIX_ONETIME',
                        0
                    )";

                using var insertCmd = new SqlCommand(insertSql, connection);
                var rowsAffected = await insertCmd.ExecuteNonQueryAsync();

                if (rowsAffected > 0)
                {
                    Console.WriteLine("✅ OneTime holiday created successfully!");

                    // Verify creation
                    var verifySql = @"
                        SELECT Id, Name, HolidayType, SpecificDate, IsNational
                        FROM PublicHolidays
                        WHERE HolidayType = 0 AND SpecificDate = '2025-09-23' AND IsActive = 1 AND IsDeleted = 0";

                    using var verifyCmd = new SqlCommand(verifySql, connection);
                    using var reader = await verifyCmd.ExecuteReaderAsync();

                    if (reader.Read())
                    {
                        Console.WriteLine($"Created Holiday: ID={reader["Id"]}, Name={reader["Name"]}, Date={reader["SpecificDate"]}");
                    }
                }
                else
                {
                    Console.WriteLine("❌ Failed to create holiday");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error: {ex.Message}");
            }

            Console.WriteLine("");
            Console.WriteLine("=== Next Steps ===");
            Console.WriteLine("1. Trigger attendance recalculation for 2025-09-23");
            Console.WriteLine("2. Check that employees show Holiday status instead of Absent");
            Console.WriteLine("3. Monitor API logs for holiday detection messages");
        }
    }
}