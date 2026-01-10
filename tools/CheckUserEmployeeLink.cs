using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

// First check table structure
Console.WriteLine("=== EmployeeUserLinks Table Structure ===");
await using var schemaCmd = new NpgsqlCommand(@"
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'EmployeeUserLinks'
    ORDER BY ordinal_position", conn);

await using var schemaReader = await schemaCmd.ExecuteReaderAsync();
while (await schemaReader.ReadAsync())
{
    Console.WriteLine($"  {schemaReader.GetString(0)}: {schemaReader.GetString(1)}");
}
await schemaReader.CloseAsync();

// Check for user dalal.ajmi
Console.WriteLine("\n=== Checking user 'dalal.ajmi' ===");
await using var userCmd = new NpgsqlCommand(@"
    SELECT u.""Id"", u.""Username"", u.""Email"", u.""IsActive"", u.""IsDeleted""
    FROM ""Users"" u
    WHERE u.""Username"" = 'dalal.ajmi'", conn);

await using var userReader = await userCmd.ExecuteReaderAsync();
if (await userReader.ReadAsync())
{
    var userId = userReader.GetInt64(0);
    var username = userReader.GetString(1);
    var email = userReader.GetString(2);
    var isActive = userReader.GetBoolean(3);
    var isDeleted = userReader.GetBoolean(4);
    Console.WriteLine($"User found: ID={userId}, Username={username}, Email={email}, Active={isActive}, Deleted={isDeleted}");
    await userReader.CloseAsync();

    // Check EmployeeUserLink
    Console.WriteLine("\n=== Checking EmployeeUserLink ===");
    await using var linkCmd = new NpgsqlCommand(@"
        SELECT eul.*, e.""FirstName"", e.""LastName""
        FROM ""EmployeeUserLinks"" eul
        LEFT JOIN ""Employees"" e ON e.""Id"" = eul.""EmployeeId""
        WHERE eul.""UserId"" = @userId", conn);
    linkCmd.Parameters.AddWithValue("userId", userId);

    await using var linkReader = await linkCmd.ExecuteReaderAsync();
    if (await linkReader.ReadAsync())
    {
        Console.WriteLine("✅ Link found!");
        for (int i = 0; i < linkReader.FieldCount; i++)
        {
            var name = linkReader.GetName(i);
            var value = linkReader.IsDBNull(i) ? "(null)" : linkReader.GetValue(i).ToString();
            Console.WriteLine($"   {name}: {value}");
        }
    }
    else
    {
        Console.WriteLine("❌ No EmployeeUserLink found for this user!");
    }
}
else
{
    Console.WriteLine("❌ User 'dalal.ajmi' not found!");
}

// Show total counts
Console.WriteLine("\n=== Counts ===");
await using var countCmd = new NpgsqlCommand(@"
    SELECT
        (SELECT COUNT(*) FROM ""Users"" WHERE NOT ""IsDeleted"") as users,
        (SELECT COUNT(*) FROM ""Employees"" WHERE NOT ""IsDeleted"") as employees,
        (SELECT COUNT(*) FROM ""EmployeeUserLinks"") as links", conn);

await using var countReader = await countCmd.ExecuteReaderAsync();
if (await countReader.ReadAsync())
{
    Console.WriteLine($"Total Users: {countReader.GetInt64(0)}");
    Console.WriteLine($"Total Employees: {countReader.GetInt64(1)}");
    Console.WriteLine($"Total EmployeeUserLinks: {countReader.GetInt64(2)}");
}
