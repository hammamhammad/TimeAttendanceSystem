using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";

Console.WriteLine("Checking workflows in database...");

using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();

// Count workflows
using var countCmd = new NpgsqlCommand("SELECT COUNT(*) FROM \"WorkflowDefinitions\" WHERE \"IsDeleted\" = false", connection);
var count = await countCmd.ExecuteScalarAsync();
Console.WriteLine($"Total workflows (not deleted): {count}");

// List workflow details
using var listCmd = new NpgsqlCommand("SELECT \"Id\", \"Name\", \"EntityType\", \"IsActive\", \"IsDefault\", \"IsDeleted\" FROM \"WorkflowDefinitions\"", connection);
using var reader = await listCmd.ExecuteReaderAsync();

Console.WriteLine("\nWorkflow details:");
Console.WriteLine("ID\tName\t\t\t\t\tEntityType\tIsActive\tIsDefault\tIsDeleted");
Console.WriteLine(new string('-', 100));
while (await reader.ReadAsync())
{
    var id = reader.GetInt64(0);
    var name = reader.GetString(1);
    var entityType = reader.GetInt32(2);
    var isActive = reader.GetBoolean(3);
    var isDefault = reader.GetBoolean(4);
    var isDeleted = reader.GetBoolean(5);
    Console.WriteLine($"{id}\t{name,-35}\t{entityType}\t\t{isActive}\t\t{isDefault}\t\t{isDeleted}");
}

Console.WriteLine("\nDone!");
