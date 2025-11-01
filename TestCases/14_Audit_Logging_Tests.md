# Audit Logging Tests

## Overview
This test suite covers audit log creation, field-level change tracking, query capabilities, and compliance requirements.

---

## Test Case AUDIT-001: Create Action Logging

**Priority:** High
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that entity creation actions are properly logged with all details.

### Preconditions
- User logged in with create permission
- Audit logging enabled

### Test Steps
1. Create new employee:
   ```json
   POST /api/v1/employees
   {
     "code": "EMP999",
     "firstNameEn": "John",
     "lastNameEn": "Doe",
     "departmentId": 1
   }
   ```
2. Query audit logs:
   - GET `/api/v1/audit-logs?entityType=Employee&action=Create`

### Expected Results
- AuditLog record created:
  - EntityType = "Employee"
  - EntityId = [new employee ID]
  - Action = "Create"
  - Actor = current user ID
  - ActorName = current username
  - Timestamp = current UTC time
  - IPAddress = request IP
  - UserAgent = browser/client info
  - Result = "Success"
- New entity data captured
- No "old values" (create action)

---

## Test Case AUDIT-002: Update Action with Field-Level Changes

**Priority:** High
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that update actions track field-level changes (old value → new value).

### Preconditions
- Employee exists (ID: 10, JobTitle: "Developer", DepartmentId: 1)
- User logged in

### Test Steps
1. Update employee:
   ```json
   PUT /api/v1/employees/10
   {
     "jobTitle": "Senior Developer",
     "departmentId": 2
   }
   ```
2. Query audit log for this update
3. Check AuditChanges table

### Expected Results
- AuditLog record:
  - Action = "Update"
  - EntityType = "Employee"
  - EntityId = 10
- AuditChanges records (2):
  1. Field: "JobTitle"
     - OldValue: "Developer"
     - NewValue: "Senior Developer"
  2. Field: "DepartmentId"
     - OldValue: "1"
     - NewValue: "2"
- Unchanged fields not logged
- Timestamp accurate
- Actor identified

---

## Test Case AUDIT-003: Delete Action Logging

**Priority:** High
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that delete (soft delete) actions are logged properly.

### Preconditions
- Employee exists (ID: 15, IsActive: true)
- User logged in with delete permission

### Test Steps
1. DELETE `/api/v1/employees/15`
2. Query audit log

### Expected Results
- AuditLog record:
  - Action = "Delete" or "Deactivate"
  - EntityType = "Employee"
  - EntityId = 15
  - Result = "Success"
- AuditChanges:
  - Field: "IsActive"
  - OldValue: "true"
  - NewValue: "false"
- Soft delete captured
- Historical record preserved

---

## Test Case AUDIT-004: Failed Action Logging

**Priority:** Medium
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that failed actions (errors, validation failures) are also logged.

### Preconditions
- User logged in

### Test Steps
1. Attempt to create employee with duplicate code:
   ```json
   POST /api/v1/employees
   {
     "code": "EMP001",  // already exists
     "firstNameEn": "Test"
   }
   ```
2. Query audit log for failed action

### Expected Results
- AuditLog record:
  - Action = "Create"
  - EntityType = "Employee"
  - Result = "Failed"
  - ErrorMessage = "Employee code already exists"
  - Actor = current user
  - Timestamp recorded
- Failed attempts tracked for security
- Helps identify attack attempts or user errors

---

## Test Case AUDIT-005: Query Audit Logs by Entity

**Priority:** Medium
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that audit logs can be queried by entity type and ID.

### Preconditions
- Employee ID: 20 has multiple changes over time
- Admin logged in

### Test Steps
1. GET `/api/v1/audit-logs?entityType=Employee&entityId=20`
2. Observe results

### Expected Results
- Returns all audit logs for Employee 20:
  - Create action (initial creation)
  - Multiple update actions
  - Field-level changes for each update
- Ordered by timestamp (newest first)
- Includes actor information
- Shows complete history of entity

---

## Test Case AUDIT-006: Query Audit Logs by Actor

**Priority:** Medium
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that audit logs can be queried by actor (user who performed action).

### Preconditions
- User "Alice" performed 15 actions
- Admin logged in

### Test Steps
1. GET `/api/v1/audit-logs?actor=alice-user-id&pageSize=20`
2. Observe results

### Expected Results
- Returns all actions performed by Alice:
  - Various entity types
  - Create, Update, Delete actions
  - Success and failed results
- Ordered by timestamp
- Useful for user activity monitoring
- Compliance and forensic analysis

---

## Test Case AUDIT-007: Query Audit Logs by Date Range

**Priority:** Medium
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that audit logs can be filtered by date range.

### Preconditions
- Audit logs exist for multiple dates
- Admin logged in

### Test Steps
1. GET `/api/v1/audit-logs?startDate=2024-02-01&endDate=2024-02-28`
2. Verify filtering

### Expected Results
- Returns logs only from February 2024
- Date range filtering accurate
- Pagination works with filters
- Useful for monthly compliance reports
- Export capability for archives

---

## Test Case AUDIT-008: Sensitive Data Masking

**Priority:** High
**Type:** Security
**Module:** Audit Logging

### Description
Verify that sensitive data (passwords, tokens) is masked in audit logs.

### Preconditions
- User updates password
- User resets 2FA

### Test Steps
1. Change password:
   ```json
   PUT /api/v1/users/profile/password
   {
     "currentPassword": "OldPass123!",
     "newPassword": "NewPass456!"
   }
   ```
2. Query audit log
3. Check AuditChanges

### Expected Results
- AuditLog shows password change action
- AuditChanges:
  - Field: "PasswordHash"
  - OldValue: "[REDACTED]" or hash representation
  - NewValue: "[REDACTED]" or hash representation
  - No plaintext passwords logged
- Sensitive fields masked:
  - Passwords
  - Tokens
  - API keys
  - Personal identifiable information (based on policy)

---

## Test Case AUDIT-009: Audit Log Retention and Cleanup

**Priority:** Low
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that audit logs are retained per policy and old logs can be archived/cleaned.

### Preconditions
- Audit log retention policy: 1 year
- Logs older than 1 year exist

### Test Steps
1. Run audit log cleanup job (manual trigger)
2. Verify old logs handled per policy

### Expected Results
- Logs older than 1 year:
  - Archived to separate storage OR
  - Deleted if policy allows
- Recent logs (< 1 year) preserved
- Cleanup job logs its own actions
- Compliance with data retention policies

---

## Test Case AUDIT-010: Export Audit Logs for Compliance

**Priority:** Medium
**Type:** Functional
**Module:** Audit Logging

### Description
Verify that audit logs can be exported for compliance and auditing purposes.

### Preconditions
- Multiple audit logs exist
- Admin logged in with export permission

### Test Steps
1. Apply filters:
   - Date range: January 2024
   - Entity type: Employee
   - Action: Update
2. Export audit logs:
   - GET `/api/v1/audit-logs/export?format=csv`
   - GET `/api/v1/audit-logs/export?format=pdf`

### Expected Results
- CSV export:
  - All filtered logs included
  - Columns: Timestamp, Actor, Action, EntityType, EntityId, Result, Changes
  - Downloadable file
- PDF export:
  - Formatted report
  - Company header
  - Summary statistics
  - Detailed log entries
- Both formats include all relevant data
- Used for compliance audits
- Tamper-evident (checksums/signatures optional)

---

## Test Execution Notes

### Test Data Requirements
- Multiple users performing actions
- Various entity types with CRUD operations
- Successful and failed actions
- Sensitive data changes

### Environment Setup
- Backend: http://localhost:5099
- Audit logging middleware configured
- Database with audit tables
- Admin account with audit access

### Dependencies
- AuditLog entity and repository
- AuditChanges entity
- Middleware for automatic logging
- Export functionality

### Compliance Considerations
- GDPR compliance (data retention)
- SOX compliance (financial systems)
- HIPAA compliance (healthcare, if applicable)
- ISO 27001 (information security)

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| AUDIT-001 | Create Logging | High | ⬜ Not Run |
| AUDIT-002 | Update Field Tracking | High | ⬜ Not Run |
| AUDIT-003 | Delete Logging | High | ⬜ Not Run |
| AUDIT-004 | Failed Action Logging | Medium | ⬜ Not Run |
| AUDIT-005 | Query by Entity | Medium | ⬜ Not Run |
| AUDIT-006 | Query by Actor | Medium | ⬜ Not Run |
| AUDIT-007 | Date Range Query | Medium | ⬜ Not Run |
| AUDIT-008 | Sensitive Data Masking | High | ⬜ Not Run |
| AUDIT-009 | Log Retention | Low | ⬜ Not Run |
| AUDIT-010 | Export for Compliance | Medium | ⬜ Not Run |
