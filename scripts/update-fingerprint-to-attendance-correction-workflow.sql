-- Update the "Default Fingerprint Request Approval" workflow to "Default Attendance Correction Approval"
-- FingerprintRequest = 7, AttendanceCorrection = 5

UPDATE "WorkflowDefinitions"
SET
    "Name" = 'Default Attendance Correction Approval',
    "NameAr" = 'موافقة تصحيح الحضور الافتراضية',
    "Description" = 'Default workflow for attendance correction requests - requires direct manager approval',
    "DescriptionAr" = 'مسار العمل الافتراضي لطلبات تصحيح الحضور - يتطلب موافقة المدير المباشر',
    "EntityType" = 5,
    "UpdatedAtUtc" = NOW(),
    "UpdatedBy" = 'SYSTEM'
WHERE "Name" = 'Default Fingerprint Request Approval'
  AND "EntityType" = 7;

-- Verify the update
SELECT "Id", "Name", "NameAr", "EntityType", "IsActive", "IsDefault"
FROM "WorkflowDefinitions"
WHERE "EntityType" = 5;
