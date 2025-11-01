# Fingerprint Requests Tests

## Overview
This test suite covers fingerprint enrollment and maintenance request functionality including request types, scheduling, technician assignment, and completion tracking.

---

## Test Case FP-001: Create New Enrollment Request

**Priority:** High
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that employees can create new fingerprint enrollment requests.

### Preconditions
- Employee exists (ID: 10) with portal access
- Employee does not have fingerprint enrolled
- Employee logged in to portal

### Test Steps
1. Navigate to `/portal/fingerprint-requests/create`
2. Submit request:
   ```json
   {
     "requestType": "NewEnrollment",
     "description": "New employee - need fingerprint registration",
     "preferredDate": "2024-02-20",
     "preferredTime": "10:00:00"
   }
   ```
3. Verify request created

### Expected Results
- HTTP Status Code: 201 Created
- FingerprintRequest record:
  - RequestType = "NewEnrollment"
  - Status = "Pending"
  - PreferredDate = 2024-02-20
  - PreferredTime = 10:00
  - EmployeeId = 10
- Request appears in employee's portal list
- Admin/HR notified of new request

---

## Test Case FP-002: Create Fingerprint Issue Request

**Priority:** High
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that employees can report fingerprint recognition issues.

### Preconditions
- Employee has enrolled fingerprint
- Employee experiencing recognition problems
- Employee logged in

### Test Steps
1. Create request:
   ```json
   {
     "requestType": "Issue",
     "description": "Fingerprint reader not recognizing my fingerprint for the past 3 days",
     "preferredDate": "2024-02-21",
     "preferredTime": "14:00:00"
   }
   ```

### Expected Results
- HTTP Status Code: 201 Created
- RequestType = "Issue"
- Status = "Pending"
- Description captures problem details
- Request routed to technical team
- Employee can track resolution

---

## Test Case FP-003: One Active Request Per Employee Constraint

**Priority:** High
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that employees cannot have multiple active fingerprint requests simultaneously.

### Preconditions
- Employee (ID: 12) has existing request (Status: Pending)
- Employee logged in

### Test Steps
1. Attempt to create second request:
   ```json
   {
     "requestType": "Update",
     "description": "Need to update fingerprint",
     "preferredDate": "2024-02-22"
   }
   ```

### Expected Results
- HTTP Status Code: 400 Bad Request
- Error: "You already have an active fingerprint request (ID: XXX). Please wait for it to be completed or cancel it."
- No duplicate request created
- Constraint enforces one-at-a-time processing

---

## Test Case FP-004: Schedule Fingerprint Appointment

**Priority:** High
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that admins can schedule fingerprint appointments and assign technicians.

### Preconditions
- Fingerprint request exists (ID: 100, Status: Pending)
- Admin logged in
- Technician "John Smith" available

### Test Steps
1. PUT `/api/v1/fingerprint-requests/100/schedule`:
   ```json
   {
     "scheduledDate": "2024-02-20",
     "scheduledTime": "11:00:00",
     "technicianName": "John Smith",
     "schedulerComments": "Scheduled for Tuesday morning"
   }
   ```
2. Verify update

### Expected Results
- Status changed: "Pending" → "Scheduled"
- ScheduledDate = 2024-02-20
- ScheduledTime = 11:00
- TechnicianName = "John Smith"
- SchedulerComments saved
- Employee notified of appointment
- Calendar entry created (if integrated)

---

## Test Case FP-005: Complete Fingerprint Request

**Priority:** High
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that technicians can mark requests as completed with notes.

### Preconditions
- Request exists (ID: 105, Status: Scheduled)
- Appointment date reached
- Technician completed enrollment
- Admin logged in

### Test Steps
1. PUT `/api/v1/fingerprint-requests/105/complete`:
   ```json
   {
     "completionNotes": "Successfully enrolled 2 fingerprints. Device tested and working.",
     "completedAt": "2024-02-20T11:30:00Z"
   }
   ```

### Expected Results
- Status changed: "Scheduled" → "Completed"
- CompletedAt = 2024-02-20 11:30
- CompletionNotes saved
- Employee constraint released (can create new request if needed)
- Employee notified of completion

---

## Test Case FP-006: Cancel Fingerprint Request

**Priority:** Medium
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that employees can cancel their pending fingerprint requests.

### Preconditions
- Request exists (ID: 110, Status: Pending)
- Employee owns this request
- Employee logged in

### Test Steps
1. PUT `/api/v1/fingerprint-requests/110/cancel`
2. Verify cancellation

### Expected Results
- HTTP Status Code: 200 OK
- Status changed to "Cancelled"
- CancelledAt timestamp recorded
- Employee can create new request
- Cancellation only allowed for Pending status (not Scheduled or Completed)

---

## Test Case FP-007: Reject Fingerprint Request

**Priority:** Medium
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that admins can reject inappropriate requests.

### Preconditions
- Request exists (ID: 115, Status: Pending)
- Admin logged in

### Test Steps
1. PUT `/api/v1/fingerprint-requests/115/reject`:
   ```json
   {
     "rejectionReason": "Duplicate request - employee already enrolled"
   }
   ```

### Expected Results
- Status: "Rejected"
- RejectionReason saved
- RejectedAt timestamp recorded
- Employee notified with reason
- Employee can create new request if needed

---

## Test Case FP-008: Multiple Request Types Support

**Priority:** Medium
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that all fingerprint request types are supported.

### Preconditions
- Employee logged in
- No active requests

### Test Steps
Create requests for each type:
1. NewEnrollment
2. Update
3. Issue
4. AdditionalFingers
5. LocationChange

### Expected Results
- All 5 request types accepted
- Each type has appropriate handling:
  - NewEnrollment: First-time setup
  - Update: Re-enrollment
  - Issue: Troubleshooting
  - AdditionalFingers: Enroll more fingers
  - LocationChange: Register at new branch/device
- Different request types may have different SLAs
- Proper categorization for reporting

---

## Test Case FP-009: Edit Pending Request

**Priority:** Low
**Type:** Functional
**Module:** Fingerprint Requests

### Description
Verify that employees can edit pending requests (preferred date/time).

### Preconditions
- Request exists (ID: 120, Status: Pending)
- Employee owns request
- Employee logged in

### Test Steps
1. PUT `/api/v1/fingerprint-requests/120`:
   ```json
   {
     "preferredDate": "2024-02-25",
     "preferredTime": "15:00:00",
     "description": "Updated - need later appointment"
   }
   ```

### Expected Results
- HTTP Status Code: 200 OK
- PreferredDate updated
- PreferredTime updated
- Description updated
- Edit only allowed for Pending status
- Once scheduled, employee cannot edit (must contact admin)

---

## Test Case FP-010: Portal List View with Status Tracking

**Priority:** Medium
**Type:** Functional
**Module:** Fingerprint Requests - Frontend

### Description
Verify that portal displays fingerprint requests with clear status indicators.

### Preconditions
- Employee has 3 requests:
  - 1 Completed
  - 1 Scheduled
  - 1 Pending
- Employee logged in to portal

### Test Steps
1. Navigate to `/portal/fingerprint-requests`
2. Observe list display
3. View individual request details

### Expected Results
- DataTable shows all requests with:
  - Request type badge
  - Status badge (color-coded):
    - Pending: yellow
    - Scheduled: blue
    - Completed: green
    - Rejected: red
    - Cancelled: gray
  - Preferred/Scheduled date
  - Technician name (if scheduled)
  - Actions: View, Edit (pending), Cancel (pending)
- Completed request shows completion notes
- Scheduled request shows appointment details
- Responsive design

---

## Test Execution Notes

### Test Data Requirements
- Employees with and without fingerprint enrollment
- Admin accounts
- Test fingerprint requests in various statuses
- Technician names/IDs

### Environment Setup
- Backend: http://localhost:5099
- Frontend: http://localhost:4200
- Database with seed data
- Notification system configured

### Dependencies
- Employee portal
- Fingerprint device integration (optional for testing)
- Notification service
- Admin panel

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| FP-001 | New Enrollment | High | ⬜ Not Run |
| FP-002 | Issue Request | High | ⬜ Not Run |
| FP-003 | One Active Request | High | ⬜ Not Run |
| FP-004 | Schedule Appointment | High | ⬜ Not Run |
| FP-005 | Complete Request | High | ⬜ Not Run |
| FP-006 | Cancel Request | Medium | ⬜ Not Run |
| FP-007 | Reject Request | Medium | ⬜ Not Run |
| FP-008 | Request Types | Medium | ⬜ Not Run |
| FP-009 | Edit Pending | Low | ⬜ Not Run |
| FP-010 | Portal List View | Medium | ⬜ Not Run |
