using Npgsql;

string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213";

await using var conn = new NpgsqlConnection(connectionString);
await conn.OpenAsync();

Console.WriteLine("Inserting workflow definitions...\n");

// WorkflowEntityType values:
// 0 = Vacation
// 1 = Excuse
// 2 = RemoteWork
// 3 = FingerprintRequest

// StepType values:
// 0 = Approval
// 1 = Notification
// 2 = Condition
// 3 = Automatic

// ApproverType values:
// 0 = Role
// 1 = User
// 2 = Manager
// 3 = DirectManager
// 4 = DepartmentHead

// Insert Vacation Workflow Definition
long vacationWorkflowId;
await using (var cmd = new NpgsqlCommand(@"
    INSERT INTO ""WorkflowDefinitions"" (
        ""Name"", ""NameAr"", ""Description"", ""EntityType"", ""IsActive"", ""IsDefault"", ""BranchId"",
        ""Version"", ""Priority"", ""CreatedAtUtc"", ""CreatedBy"", ""IsDeleted""
    ) VALUES (
        'Vacation Approval Workflow', 'سير عمل الموافقة على الإجازات',
        'Standard approval workflow for vacation requests',
        0, true, true, NULL,
        1, 1, @now, 'SYSTEM', false
    ) RETURNING ""Id""", conn))
{
    cmd.Parameters.AddWithValue("now", DateTime.UtcNow);
    vacationWorkflowId = (long)(await cmd.ExecuteScalarAsync())!;
    Console.WriteLine($"✅ Created Vacation Workflow Definition (ID: {vacationWorkflowId})");
}

// Insert Vacation Workflow Step (Direct Manager Approval)
await using (var cmd = new NpgsqlCommand(@"
    INSERT INTO ""WorkflowSteps"" (
        ""WorkflowDefinitionId"", ""StepOrder"", ""Name"", ""NameAr"", ""StepType"", ""ApproverType"",
        ""ApproverRoleId"", ""ApproverUserId"", ""TimeoutHours"", ""AllowDelegation"",
        ""NotifyOnAction"", ""NotifyRequesterOnReach"", ""RequireCommentsOnApprove"", ""RequireCommentsOnReject"",
        ""TimeoutAction"", ""CreatedAtUtc"", ""CreatedBy"", ""IsDeleted""
    ) VALUES (
        @workflowId, 1, 'Direct Manager Approval', 'موافقة المدير المباشر', 0, 3,
        NULL, NULL, 48, true,
        true, true, false, true,
        0, @now, 'SYSTEM', false
    )", conn))
{
    cmd.Parameters.AddWithValue("workflowId", vacationWorkflowId);
    cmd.Parameters.AddWithValue("now", DateTime.UtcNow);
    await cmd.ExecuteNonQueryAsync();
    Console.WriteLine("  ✅ Added Step 1: Direct Manager Approval");
}

// Insert Excuse Workflow Definition
long excuseWorkflowId;
await using (var cmd = new NpgsqlCommand(@"
    INSERT INTO ""WorkflowDefinitions"" (
        ""Name"", ""NameAr"", ""Description"", ""EntityType"", ""IsActive"", ""IsDefault"", ""BranchId"",
        ""Version"", ""Priority"", ""CreatedAtUtc"", ""CreatedBy"", ""IsDeleted""
    ) VALUES (
        'Excuse Approval Workflow', 'سير عمل الموافقة على الأعذار',
        'Standard approval workflow for excuse requests',
        1, true, true, NULL,
        1, 1, @now, 'SYSTEM', false
    ) RETURNING ""Id""", conn))
{
    cmd.Parameters.AddWithValue("now", DateTime.UtcNow);
    excuseWorkflowId = (long)(await cmd.ExecuteScalarAsync())!;
    Console.WriteLine($"\n✅ Created Excuse Workflow Definition (ID: {excuseWorkflowId})");
}

// Insert Excuse Workflow Step (Direct Manager Approval)
await using (var cmd = new NpgsqlCommand(@"
    INSERT INTO ""WorkflowSteps"" (
        ""WorkflowDefinitionId"", ""StepOrder"", ""Name"", ""NameAr"", ""StepType"", ""ApproverType"",
        ""ApproverRoleId"", ""ApproverUserId"", ""TimeoutHours"", ""AllowDelegation"",
        ""NotifyOnAction"", ""NotifyRequesterOnReach"", ""RequireCommentsOnApprove"", ""RequireCommentsOnReject"",
        ""TimeoutAction"", ""CreatedAtUtc"", ""CreatedBy"", ""IsDeleted""
    ) VALUES (
        @workflowId, 1, 'Direct Manager Approval', 'موافقة المدير المباشر', 0, 3,
        NULL, NULL, 48, true,
        true, true, false, true,
        0, @now, 'SYSTEM', false
    )", conn))
{
    cmd.Parameters.AddWithValue("workflowId", excuseWorkflowId);
    cmd.Parameters.AddWithValue("now", DateTime.UtcNow);
    await cmd.ExecuteNonQueryAsync();
    Console.WriteLine("  ✅ Added Step 1: Direct Manager Approval");
}

// Insert Remote Work Workflow Definition
long remoteWorkWorkflowId;
await using (var cmd = new NpgsqlCommand(@"
    INSERT INTO ""WorkflowDefinitions"" (
        ""Name"", ""NameAr"", ""Description"", ""EntityType"", ""IsActive"", ""IsDefault"", ""BranchId"",
        ""Version"", ""Priority"", ""CreatedAtUtc"", ""CreatedBy"", ""IsDeleted""
    ) VALUES (
        'Remote Work Approval Workflow', 'سير عمل الموافقة على العمل عن بعد',
        'Standard approval workflow for remote work requests',
        2, true, true, NULL,
        1, 1, @now, 'SYSTEM', false
    ) RETURNING ""Id""", conn))
{
    cmd.Parameters.AddWithValue("now", DateTime.UtcNow);
    remoteWorkWorkflowId = (long)(await cmd.ExecuteScalarAsync())!;
    Console.WriteLine($"\n✅ Created Remote Work Workflow Definition (ID: {remoteWorkWorkflowId})");
}

// Insert Remote Work Workflow Step (Direct Manager Approval)
await using (var cmd = new NpgsqlCommand(@"
    INSERT INTO ""WorkflowSteps"" (
        ""WorkflowDefinitionId"", ""StepOrder"", ""Name"", ""NameAr"", ""StepType"", ""ApproverType"",
        ""ApproverRoleId"", ""ApproverUserId"", ""TimeoutHours"", ""AllowDelegation"",
        ""NotifyOnAction"", ""NotifyRequesterOnReach"", ""RequireCommentsOnApprove"", ""RequireCommentsOnReject"",
        ""TimeoutAction"", ""CreatedAtUtc"", ""CreatedBy"", ""IsDeleted""
    ) VALUES (
        @workflowId, 1, 'Direct Manager Approval', 'موافقة المدير المباشر', 0, 3,
        NULL, NULL, 48, true,
        true, true, false, true,
        0, @now, 'SYSTEM', false
    )", conn))
{
    cmd.Parameters.AddWithValue("workflowId", remoteWorkWorkflowId);
    cmd.Parameters.AddWithValue("now", DateTime.UtcNow);
    await cmd.ExecuteNonQueryAsync();
    Console.WriteLine("  ✅ Added Step 1: Direct Manager Approval");
}

// Insert Fingerprint Request Workflow Definition
long fingerprintWorkflowId;
await using (var cmd = new NpgsqlCommand(@"
    INSERT INTO ""WorkflowDefinitions"" (
        ""Name"", ""NameAr"", ""Description"", ""EntityType"", ""IsActive"", ""IsDefault"", ""BranchId"",
        ""Version"", ""Priority"", ""CreatedAtUtc"", ""CreatedBy"", ""IsDeleted""
    ) VALUES (
        'Fingerprint Request Workflow', 'سير عمل طلب البصمة',
        'Standard approval workflow for fingerprint requests',
        3, true, true, NULL,
        1, 1, @now, 'SYSTEM', false
    ) RETURNING ""Id""", conn))
{
    cmd.Parameters.AddWithValue("now", DateTime.UtcNow);
    fingerprintWorkflowId = (long)(await cmd.ExecuteScalarAsync())!;
    Console.WriteLine($"\n✅ Created Fingerprint Request Workflow Definition (ID: {fingerprintWorkflowId})");
}

// Insert Fingerprint Request Workflow Step (Direct Manager Approval)
await using (var cmd = new NpgsqlCommand(@"
    INSERT INTO ""WorkflowSteps"" (
        ""WorkflowDefinitionId"", ""StepOrder"", ""Name"", ""NameAr"", ""StepType"", ""ApproverType"",
        ""ApproverRoleId"", ""ApproverUserId"", ""TimeoutHours"", ""AllowDelegation"",
        ""NotifyOnAction"", ""NotifyRequesterOnReach"", ""RequireCommentsOnApprove"", ""RequireCommentsOnReject"",
        ""TimeoutAction"", ""CreatedAtUtc"", ""CreatedBy"", ""IsDeleted""
    ) VALUES (
        @workflowId, 1, 'Direct Manager Approval', 'موافقة المدير المباشر', 0, 3,
        NULL, NULL, 48, true,
        true, true, false, true,
        0, @now, 'SYSTEM', false
    )", conn))
{
    cmd.Parameters.AddWithValue("workflowId", fingerprintWorkflowId);
    cmd.Parameters.AddWithValue("now", DateTime.UtcNow);
    await cmd.ExecuteNonQueryAsync();
    Console.WriteLine("  ✅ Added Step 1: Direct Manager Approval");
}

Console.WriteLine("\n=== Summary ===");
Console.WriteLine($"Vacation Workflow ID: {vacationWorkflowId}");
Console.WriteLine($"Excuse Workflow ID: {excuseWorkflowId}");
Console.WriteLine($"Remote Work Workflow ID: {remoteWorkWorkflowId}");
Console.WriteLine($"Fingerprint Workflow ID: {fingerprintWorkflowId}");
Console.WriteLine("\n✅ All workflow definitions created successfully!");
