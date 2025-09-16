SET QUOTED_IDENTIFIER ON;

-- Add missing shift permissions
INSERT INTO Permissions ([Key], [Group], [Description], [CreatedAtUtc], [CreatedBy], [IsDeleted])
VALUES
('shift.read', 'Shift Management', 'View and read data work shifts and time periods', GETUTCDATE(), 'SYSTEM', 0),
('shift.create', 'Shift Management', 'Create new records work shifts and time periods', GETUTCDATE(), 'SYSTEM', 0),
('shift.update', 'Shift Management', 'Modify existing records work shifts and time periods', GETUTCDATE(), 'SYSTEM', 0),
('shift.delete', 'Shift Management', 'Remove records permanently work shifts and time periods', GETUTCDATE(), 'SYSTEM', 0),
('shift.export', 'Shift Management', 'Export data to external formats work shifts and time periods', GETUTCDATE(), 'SYSTEM', 0),
('shift.import', 'Shift Management', 'Import data from external sources work shifts and time periods', GETUTCDATE(), 'SYSTEM', 0),
('shift.assign', 'Shift Management', 'Assign resources or relationships work shifts and time periods', GETUTCDATE(), 'SYSTEM', 0),
('shift.unassign', 'Shift Management', 'Remove resource assignments work shifts and time periods', GETUTCDATE(), 'SYSTEM', 0);

-- Now assign all shift permissions to SystemAdmin role
INSERT INTO RolePermissions (RoleId, PermissionId)
SELECT r.Id, p.Id
FROM Roles r
CROSS JOIN Permissions p
WHERE r.Name = 'SystemAdmin' AND p.[Key] LIKE 'shift.%';

GO