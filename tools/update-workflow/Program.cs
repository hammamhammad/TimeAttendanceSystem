using Npgsql;

// Update the "Default Fingerprint Request Approval" workflow to "Default Attendance Correction Approval"
string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

string updateSql = @"
UPDATE ""WorkflowDefinitions""
SET
    ""Name"" = 'Default Attendance Correction Approval',
    ""NameAr"" = 'موافقة تصحيح الحضور الافتراضية',
    ""Description"" = 'Default workflow for attendance correction requests - requires direct manager approval',
    ""DescriptionAr"" = 'مسار العمل الافتراضي لطلبات تصحيح الحضور - يتطلب موافقة المدير المباشر',
    ""EntityType"" = 5
WHERE ""Name"" = 'Default Fingerprint Request Approval'
  AND ""EntityType"" = 7;
";

string verifySql = @"
SELECT ""Id"", ""Name"", ""NameAr"", ""EntityType"", ""IsActive"", ""IsDefault""
FROM ""WorkflowDefinitions""
WHERE ""EntityType"" = 5;
";

try
{
    Console.WriteLine("Connecting to database...");
    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync();

    Console.WriteLine("Updating workflow from Fingerprint Request to Attendance Correction...");
    await using var updateCmd = new NpgsqlCommand(updateSql, connection);
    var rowsAffected = await updateCmd.ExecuteNonQueryAsync();
    Console.WriteLine($"Rows affected: {rowsAffected}");

    Console.WriteLine("\nVerifying update...");
    await using var verifyCmd = new NpgsqlCommand(verifySql, connection);
    await using var reader = await verifyCmd.ExecuteReaderAsync();

    if (await reader.ReadAsync())
    {
        Console.WriteLine($"  ID: {reader.GetInt64(0)}");
        Console.WriteLine($"  Name: {reader.GetString(1)}");
        Console.WriteLine($"  NameAr: {reader.GetString(2)}");
        Console.WriteLine($"  EntityType: {reader.GetInt32(3)} (AttendanceCorrection = 5)");
        Console.WriteLine($"  IsActive: {reader.GetBoolean(4)}");
        Console.WriteLine($"  IsDefault: {reader.GetBoolean(5)}");
        Console.WriteLine("\n✅ Workflow updated successfully!");
    }
    else
    {
        Console.WriteLine("No workflow found with EntityType = 5 (AttendanceCorrection).");
        Console.WriteLine("The workflow may not have been in the database or already had a different EntityType.");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    Environment.Exit(1);
}
