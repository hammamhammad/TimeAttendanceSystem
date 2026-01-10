using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("=== Workflow Definitions ===");
await using (var cmd = new NpgsqlCommand(@"
    SELECT ""Id"", ""Name"", ""EntityType"", ""IsActive"", ""BranchId""
    FROM ""WorkflowDefinitions""
    WHERE NOT ""IsDeleted""
    ORDER BY ""EntityType"", ""Id""", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    var found = false;
    while (await reader.ReadAsync())
    {
        found = true;
        var id = reader.GetInt64(0);
        var name = reader.GetString(1);
        var entityType = reader.GetInt32(2);
        var isActive = reader.GetBoolean(3);
        var branchId = reader.IsDBNull(4) ? "NULL" : reader.GetInt64(4).ToString();
        Console.WriteLine($"  ID: {id}, Name: {name}, EntityType: {entityType}, Active: {isActive}, BranchId: {branchId}");
    }
    if (!found)
    {
        Console.WriteLine("  (No workflow definitions found)");
    }
}

Console.WriteLine("\n=== Workflow Steps ===");
await using (var cmd = new NpgsqlCommand(@"
    SELECT ws.""Id"", ws.""WorkflowDefinitionId"", ws.""StepName"", ws.""StepOrder"", ws.""StepType"", ws.""ApproverType""
    FROM ""WorkflowSteps"" ws
    JOIN ""WorkflowDefinitions"" wd ON ws.""WorkflowDefinitionId"" = wd.""Id""
    WHERE NOT ws.""IsDeleted"" AND NOT wd.""IsDeleted""
    ORDER BY ws.""WorkflowDefinitionId"", ws.""StepOrder""", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    var found = false;
    while (await reader.ReadAsync())
    {
        found = true;
        var id = reader.GetInt64(0);
        var defId = reader.GetInt64(1);
        var name = reader.GetString(2);
        var order = reader.GetInt32(3);
        var stepType = reader.GetInt32(4);
        var approverType = reader.IsDBNull(5) ? "NULL" : reader.GetInt32(5).ToString();
        Console.WriteLine($"  Step ID: {id}, Def ID: {defId}, Name: {name}, Order: {order}, StepType: {stepType}, ApproverType: {approverType}");
    }
    if (!found)
    {
        Console.WriteLine("  (No workflow steps found)");
    }
}

Console.WriteLine("\n=== Workflow Instances ===");
await using (var cmd = new NpgsqlCommand(@"
    SELECT ""Id"", ""WorkflowDefinitionId"", ""EntityType"", ""EntityId"", ""Status""
    FROM ""WorkflowInstances""
    WHERE NOT ""IsDeleted""
    LIMIT 10", conn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    var found = false;
    while (await reader.ReadAsync())
    {
        found = true;
        var id = reader.GetInt64(0);
        var defId = reader.GetInt64(1);
        var entityType = reader.GetInt32(2);
        var entityId = reader.GetInt64(3);
        var status = reader.GetInt32(4);
        Console.WriteLine($"  Instance ID: {id}, Def ID: {defId}, EntityType: {entityType}, EntityId: {entityId}, Status: {status}");
    }
    if (!found)
    {
        Console.WriteLine("  (No workflow instances found)");
    }
}
