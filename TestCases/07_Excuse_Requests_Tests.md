# Excuse Requests Tests

## Overview
This test suite covers employee excuse request functionality including creation, approval workflow, policy enforcement, file attachment handling, and portal integration.

---

## Test Case EXCUSE-001: Create Personal Excuse Request Within Policy Limits

**Priority:** High
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that employees can create personal excuse requests within configured policy limits.

### Preconditions
- Employee exists (ID: 10) with portal access
- Excuse policy exists:
  - MaxPersonalExcusesPerMonth = 3
  - MaxHoursPerExcuse = 4
  - RequireApproval = true
- Current month: Employee has used 1 excuse
- Employee is logged in to portal

### Test Steps
1. Navigate to `/portal/excuse-requests/create`
2. Fill form:
   ```json
   {
     "date": "2024-02-15",
     "startTime": "10:00:00",
     "endTime": "12:00:00",
     "excuseType": "Personal",
     "reason": "Medical appointment",
     "attachmentFile": null
   }
   ```
3. Submit POST to `/api/v1/excuse-requests`
4. Verify response and database record

### Expected Results
- HTTP Status Code: 201 Created
- EmployeeExcuse record created:
  - Status = "Pending"
  - ExcuseType = "Personal"
  - DurationHours = 2.0
  - Date = 2024-02-15
  - Reason saved
- Policy validation passed:
  - Employee has 1 excuse this month, limit is 3 (allowed)
  - Duration 2 hours < max 4 hours (allowed)
- Request appears in employee's portal list
- Manager notified for approval (if configured)

---

## Test Case EXCUSE-002: Reject Excuse Request Exceeding Monthly Limit

**Priority:** High
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that excuse requests exceeding monthly policy limits are rejected.

### Preconditions
- Employee exists (ID: 12)
- Excuse policy: MaxPersonalExcusesPerMonth = 3
- Current month (February 2024): Employee has already used 3 excuses
- Employee is logged in

### Test Steps
1. Attempt to create 4th personal excuse request:
   ```json
   {
     "date": "2024-02-20",
     "startTime": "14:00:00",
     "endTime": "16:00:00",
     "excuseType": "Personal",
     "reason": "Personal matter"
   }
   ```
2. Submit request
3. Observe error response

### Expected Results
- HTTP Status Code: 400 Bad Request
- Error message: "Monthly personal excuse limit exceeded. You have used 3 out of 3 allowed excuses this month."
- No EmployeeExcuse record created
- Validation enforces policy limits
- Employee informed of limit in error message

---

## Test Case EXCUSE-003: Create Official Excuse (No Policy Limits)

**Priority:** High
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that official excuses bypass personal excuse policy limits.

### Preconditions
- Employee exists (ID: 15)
- Employee has used all personal excuses this month
- Official excuses have no monthly limit
- Employee is logged in

### Test Steps
1. Create excuse request:
   ```json
   {
     "date": "2024-02-18",
     "startTime": "09:00:00",
     "endTime": "11:00:00",
     "excuseType": "Official",
     "reason": "Government errand for company",
     "attachmentFile": "official_document.pdf"
   }
   ```
2. Submit request with file attachment

### Expected Results
- HTTP Status Code: 201 Created
- ExcuseType = "Official"
- Policy limits not applied (official excuses exempt)
- File attachment uploaded successfully
- Request created even though personal limit exceeded
- Official excuse flagged differently in reports

---

## Test Case EXCUSE-004: Excuse Request with File Attachment

**Priority:** High
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that file attachments can be uploaded with excuse requests and validated correctly.

### Preconditions
- Employee logged in to portal
- File upload configured
- Allowed file types: PDF, DOC, DOCX, JPG, PNG
- Max file size: 5 MB

### Test Steps
1. Navigate to create excuse form
2. Fill excuse details
3. Upload file: "medical_certificate.pdf" (2 MB, valid type)
4. Submit request
5. View excuse details and download attachment

### Expected Results
- File upload successful
- EmployeeExcuseAttachment record created:
  - FileName = "medical_certificate.pdf"
  - FileSize = 2 MB
  - ContentType = "application/pdf"
  - FilePath stored securely
- Excuse request created with attachment link
- View page shows download link
- Download returns correct file with proper headers
- File stored in secure location

---

## Test Case EXCUSE-005: Invalid File Type Rejection

**Priority:** Medium
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that invalid file types are rejected during upload.

### Preconditions
- Allowed types: PDF, DOC, DOCX, JPG, PNG
- Employee logged in

### Test Steps
1. Attempt to upload "script.exe" file
2. Attempt to upload "data.zip" file
3. Observe validation errors

### Expected Results
- Both uploads rejected
- HTTP Status Code: 400 Bad Request
- Error message: "Invalid file type. Allowed types: PDF, DOC, DOCX, JPG, PNG"
- File not saved to server
- Security validation prevents malicious file uploads
- Frontend also validates (double validation: client + server)

---

## Test Case EXCUSE-006: Approve Excuse Request

**Priority:** High
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that managers/admins can approve excuse requests and attendance is updated.

### Preconditions
- Excuse request exists (ID: 50, Status: Pending)
- Employee: ID 10
- Date: 2024-02-15, Duration: 2 hours (10:00-12:00)
- Manager logged in with approval permission

### Test Steps
1. GET `/api/v1/excuse-requests?status=Pending`
2. PUT `/api/v1/excuse-requests/50/approve`:
   ```json
   {
     "approverComments": "Approved - medical reason"
   }
   ```
3. Verify excuse status updated
4. Check attendance record for 2024-02-15

### Expected Results
- Step 1: Returns pending excuse requests
- Step 2:
  - HTTP Status Code: 200 OK
  - Status changed to "Approved"
  - ApprovedBy = manager ID
  - ApprovedAt = current timestamp
  - ApproverComments saved
- Step 4:
  - Attendance record updated
  - Excuse hours deducted from required hours OR
  - Status reflects excused absence for that period
  - Worked hours adjusted accordingly
- Employee notified of approval

---

## Test Case EXCUSE-007: Reject Excuse Request

**Priority:** High
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that excuse requests can be rejected with reason provided.

### Preconditions
- Excuse request exists (ID: 55, Status: Pending)
- Manager logged in

### Test Steps
1. PUT `/api/v1/excuse-requests/55/reject`:
   ```json
   {
     "rejectionReason": "Insufficient documentation provided"
   }
   ```
2. Verify status and notification

### Expected Results
- HTTP Status Code: 200 OK
- Status changed to "Rejected"
- RejectedBy = manager ID
- RejectedAt = current timestamp
- RejectionReason = "Insufficient documentation provided"
- Employee notified with rejection reason
- Attendance not adjusted
- Employee can resubmit with corrections

---

## Test Case EXCUSE-008: Edit Pending Excuse Request

**Priority:** Medium
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that employees can edit pending excuse requests.

### Preconditions
- Excuse request exists (ID: 60, Status: Pending)
- Request date: 2024-02-20
- Employee owns this request
- Employee logged in

### Test Steps
1. Navigate to `/portal/excuse-requests/60/edit`
2. Modify details:
   ```json
   {
     "startTime": "14:00:00",
     "endTime": "15:00:00",
     "reason": "Updated reason - shorter duration",
     "attachmentFile": "new_document.pdf"
   }
   ```
3. Submit update

### Expected Results
- HTTP Status Code: 200 OK
- Excuse request updated:
  - StartTime = 14:00
  - EndTime = 15:00
  - DurationHours = 1.0 (recalculated)
  - Reason updated
  - New attachment replaces old (or adds to it)
- Only pending requests can be edited
- Audit log records modification

---

## Test Case EXCUSE-009: Cancel Excuse Request

**Priority:** Medium
**Type:** Functional
**Module:** Excuse Requests

### Description
Verify that employees can cancel their own pending excuse requests.

### Preconditions
- Excuse request exists (ID: 65, Status: Pending)
- Employee owns this request
- Employee logged in

### Test Steps
1. PUT `/api/v1/excuse-requests/65/cancel`
2. Verify cancellation

### Expected Results
- HTTP Status Code: 200 OK
- Status changed to "Cancelled"
- CancelledAt = current timestamp
- CancelledBy = employee ID
- Request no longer appears in pending lists
- Cannot be approved/rejected after cancellation
- Employee can create new request if needed

---

## Test Case EXCUSE-010: Portal List View with Filtering

**Priority:** Medium
**Type:** Functional
**Module:** Excuse Requests - Frontend

### Description
Verify that portal excuse list displays correctly with filters and status badges.

### Preconditions
- Employee has 5 excuse requests:
  - 2 Pending, 2 Approved, 1 Rejected
- Employee logged in to portal

### Test Steps
1. Navigate to `/portal/excuse-requests`
2. Observe default list view
3. Filter by status: "Pending"
4. Filter by type: "Personal"
5. Filter by date range

### Expected Results
- Step 2:
  - DataTable displays all 5 requests
  - Status badges shown (color-coded):
    - Pending: yellow/warning
    - Approved: green/success
    - Rejected: red/danger
  - Type badges shown (Personal/Official)
  - Date, duration, reason displayed
- Step 3:
  - Shows 2 pending requests only
  - Filter applied correctly
- Step 4:
  - Shows only personal excuses
- Step 5:
  - Date range filter works
  - Pagination if many records
- Actions: View, Edit (pending only), Cancel (pending only)

---

## Test Execution Notes

### Test Data Requirements
- Multiple employees with portal access
- Excuse policy configured
- Test excuse requests in various statuses
- File upload directory configured
- Manager accounts for approval testing

### Environment Setup
- Backend: http://localhost:5099
- Frontend: http://localhost:4200
- File storage configured
- Database with seed data
- Email notifications (optional)

### Dependencies
- Employee portal
- File upload service
- Attendance system
- Notification service
- Approval workflow

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| EXCUSE-001 | Create Personal Excuse | High | ⬜ Not Run |
| EXCUSE-002 | Policy Limit Enforcement | High | ⬜ Not Run |
| EXCUSE-003 | Official Excuse | High | ⬜ Not Run |
| EXCUSE-004 | File Attachment | High | ⬜ Not Run |
| EXCUSE-005 | File Validation | Medium | ⬜ Not Run |
| EXCUSE-006 | Approve Request | High | ⬜ Not Run |
| EXCUSE-007 | Reject Request | High | ⬜ Not Run |
| EXCUSE-008 | Edit Pending | Medium | ⬜ Not Run |
| EXCUSE-009 | Cancel Request | Medium | ⬜ Not Run |
| EXCUSE-010 | Portal List View | Medium | ⬜ Not Run |
