using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("\nVacation Types in Database (including deleted):");
Console.WriteLine("================================================");

await using var cmd = new NpgsqlCommand("SELECT \"Id\", \"Name\", \"NameAr\", \"IsActive\", \"BranchId\", \"IsDeleted\" FROM \"VacationTypes\" ORDER BY \"Id\"", conn);
await using var reader = await cmd.ExecuteReaderAsync();

int count = 0;
while (await reader.ReadAsync())
{
    count++;
    var id = reader.GetInt64(0);
    var name = reader.GetString(1);
    var nameAr = reader.IsDBNull(2) ? "(null)" : reader.GetString(2);
    var isActive = reader.GetBoolean(3);
    var branchId = reader.IsDBNull(4) ? "(null/global)" : reader.GetInt64(4).ToString();
    var isDeleted = reader.GetBoolean(5);

    Console.WriteLine($"  {id}: {name} | {nameAr} | Active: {isActive} | Branch: {branchId} | Deleted: {isDeleted}");
}

Console.WriteLine($"\n✅ Total vacation types: {count}");
