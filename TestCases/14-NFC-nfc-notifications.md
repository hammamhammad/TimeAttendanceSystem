# TC-NFC: NFC Tags & Notifications — Test Cases

## Module Overview

This module covers two related subsystems: NFC Tag management for mobile attendance verification, and the real-time notification system. NFC tags follow a lifecycle (Unregistered -> Registered -> Active -> Disabled/Lost) with HMAC-SHA256 signed payloads for tamper detection. The notification system uses SignalR for real-time delivery with 8 notification types, bilingual content, and admin broadcast capabilities.

**Admin Pages**: `/nfc-tags`, `/nfc-tags/create`, `/nfc-tags/:id/view`, `/nfc-tags/:id/edit`, `/notifications/send`, `/notifications/history`
**API Endpoints**: `GET/POST/PUT/DELETE /api/v1/nfc-tags`, `GET/POST/DELETE /api/v1/notifications`, `POST /api/v1/notifications/{id}/mark-read`, `POST /api/v1/notifications/mark-all-read`, `POST /api/v1/notification-broadcasts`
**SignalR Hub**: `/hubs/notifications`
**Backend Services**: `NfcTagEncryptionService`, `InAppNotificationService`

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |
| Self-Service Portal | http://localhost:4201 |

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full NFC and notification access |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Can manage branch NFC tags |
| Employee | salma.khaldi@company.com | Emp@123! | Receives notifications |

---

## Summary Table

| ID | Title | Priority | Category |
|----|-------|----------|----------|
| TC-NFC-001 | NFC tag list page renders with tag data | P0 | UI |
| TC-NFC-002 | Create NFC tag with UID and branch assignment | P0 | Functional |
| TC-NFC-003 | NFC tag status lifecycle: Unregistered to Registered | P0 | Business Rule |
| TC-NFC-004 | NFC tag status lifecycle: Registered to Active (provisioning) | P0 | Business Rule |
| TC-NFC-005 | NFC tag status: Active to Disabled (admin action) | P1 | Business Rule |
| TC-NFC-006 | NFC tag status: mark as Lost (permanent) | P1 | Business Rule |
| TC-NFC-007 | HMAC-SHA256 payload written during provisioning | P0 | Security |
| TC-NFC-008 | Payload format includes tagId, branchId, tagUid, timestamp, hmacSignature | P0 | Security |
| TC-NFC-009 | SHA256 verification hash generated for each tag | P1 | Security |
| TC-NFC-010 | Scan tracking increments scan count and updates last scan timestamp | P1 | Business Rule |
| TC-NFC-011 | RequirePayload toggle controls verification strictness | P1 | Configuration |
| TC-NFC-012 | View NFC tag details page displays all fields | P1 | UI |
| TC-NFC-013 | Notification bell shows unread count | P0 | UI |
| TC-NFC-014 | RequestSubmitted notification sent on request creation | P0 | Business Rule |
| TC-NFC-015 | RequestApproved notification sent on approval | P0 | Business Rule |
| TC-NFC-016 | RequestRejected notification sent on rejection | P0 | Business Rule |
| TC-NFC-017 | RequestDelegated notification sent on delegation | P1 | Business Rule |
| TC-NFC-018 | RequestEscalated notification sent on timeout | P1 | Business Rule |
| TC-NFC-019 | ApprovalPending notification sent to approver | P0 | Business Rule |
| TC-NFC-020 | DelegationReceived notification sent to delegatee | P1 | Business Rule |
| TC-NFC-021 | ApprovalReminder notification sent for pending approvals | P2 | Business Rule |
| TC-NFC-022 | Notification content is bilingual EN/AR | P1 | i18n |
| TC-NFC-023 | Notification action URL navigates to related entity | P1 | Functional |
| TC-NFC-024 | Mark notification as read via API | P1 | Functional |
| TC-NFC-025 | Mark all notifications as read | P1 | Functional |
| TC-NFC-026 | SignalR hub delivers notification in real-time | P0 | Functional |
| TC-NFC-027 | Admin broadcast sends notification to user group | P1 | Functional |
| TC-NFC-028 | Broadcast history page shows past broadcasts | P1 | UI |

---

## Test Cases

### A. NFC Tags

#### TC-NFC-001: NFC tag list page renders with tag data
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /nfc-tags |
| **Role** | System Admin |

**Preconditions:**
1. At least one NFC tag exists in the system

**Steps:**
1. Navigate to `/nfc-tags`

**Expected Results:**
- DataTable renders with columns: Tag UID, Branch, Status, Last Scanned, Scan Count
- Tags display correct status badges (Active=success, Disabled=warning, Lost=danger)
- Search and filter controls visible
- Create button available

---

#### TC-NFC-002: Create NFC tag with UID and branch assignment
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | /nfc-tags/create |
| **Role** | System Admin |

**Steps:**
1. Navigate to `/nfc-tags/create`
2. Enter Tag UID: "04:A2:B3:C4:D5:E6:F7"
3. Select Branch: "Headquarters - Riyadh"
4. Click Save

**Expected Results:**
- NFC tag created with status `Unregistered` (0)
- Tag assigned to selected branch
- Success notification shown
- Redirected to tag list or view page

---

#### TC-NFC-003: NFC tag status lifecycle: Unregistered to Registered
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. NFC tag exists with status `Unregistered`

**Steps:**
1. Update tag status to `Registered` via API (tag registered with UID and branch association)

**Expected Results:**
- Status changes from `Unregistered` (0) to `Registered` (1)
- Tag has UID and branch association stored
- Tag is awaiting provisioning

---

#### TC-NFC-004: NFC tag status lifecycle: Registered to Active (provisioning)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (API) |
| **Role** | System Admin |

**Preconditions:**
1. NFC tag exists with status `Registered`

**Steps:**
1. Provision the tag (trigger HMAC payload writing)
2. Tag status transitions to `Active`

**Expected Results:**
- Status changes from `Registered` (1) to `Active` (2)
- `EncryptedPayload` is populated with HMAC-SHA256 signed data
- `VerificationHash` (SHA256) is generated
- Write protection user audit trail recorded
- Tag is now ready for attendance verification

---

#### TC-NFC-005: NFC tag status: Active to Disabled (admin action)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /nfc-tags/:id/edit |
| **Role** | System Admin |

**Preconditions:**
1. NFC tag exists with status `Active`

**Steps:**
1. Navigate to `/nfc-tags/{id}/edit`
2. Change status to `Disabled`
3. Save

**Expected Results:**
- Status changes from `Active` (2) to `Disabled` (3)
- Tag can no longer be used for attendance verification
- Tag can be re-enabled (not permanent like Lost)

---

#### TC-NFC-006: NFC tag status: mark as Lost (permanent)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /nfc-tags/:id/edit |
| **Role** | System Admin |

**Preconditions:**
1. NFC tag exists with status `Active` or `Disabled`

**Steps:**
1. Change tag status to `Lost`
2. Save

**Expected Results:**
- Status changes to `Lost` (4)
- Tag permanently deactivated — cannot be re-enabled
- Tag cannot be used for attendance verification
- Status badge shows danger variant

---

#### TC-NFC-007: HMAC-SHA256 payload written during provisioning
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Security |
| **Page** | N/A (Backend) |
| **Role** | System Admin |

**Steps:**
1. Provision an NFC tag (transition from Registered to Active)
2. Inspect the `EncryptedPayload` field

**Expected Results:**
- `EncryptedPayload` contains HMAC-SHA256 signed data
- Signature generated using `NfcEncryption:SecretKey` from appsettings
- Payload is verifiable by `NfcTagEncryptionService`

---

#### TC-NFC-008: Payload format includes tagId, branchId, tagUid, timestamp, hmacSignature
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Security |
| **Page** | N/A (Backend) |
| **Role** | System Admin |

**Steps:**
1. Provision an NFC tag
2. Decode the payload

**Expected Results:**
- Payload format: `{tagId}|{branchId}|{tagUid}|{timestamp}|{hmacSignature}`
- All 5 components present and pipe-delimited
- tagId matches the NFC tag database ID
- branchId matches the assigned branch
- tagUid matches the physical tag UID
- timestamp is the provisioning time
- hmacSignature is valid HMAC-SHA256 of the preceding data

---

#### TC-NFC-009: SHA256 verification hash generated for each tag
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Security |
| **Page** | N/A (Backend) |
| **Role** | System Admin |

**Steps:**
1. Provision an NFC tag
2. Inspect the `VerificationHash` field

**Expected Results:**
- `VerificationHash` is a SHA256 hash string
- Hash is unique per tag
- Hash can be used for integrity checking

---

#### TC-NFC-010: Scan tracking increments scan count and updates last scan timestamp
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | System Admin |

**Preconditions:**
1. Active NFC tag exists with ScanCount = 0

**Steps:**
1. Simulate an NFC scan via mobile attendance endpoint
2. Check tag's ScanCount and LastScannedAt

**Expected Results:**
- ScanCount incremented from 0 to 1
- LastScannedAt updated to current timestamp
- Subsequent scans continue incrementing the count

---

#### TC-NFC-011: RequirePayload toggle controls verification strictness
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Configuration |
| **Page** | N/A (Backend) |
| **Role** | System Admin |

**Steps:**
1. Set `NfcEncryption:RequirePayload = false` in appsettings
2. Attempt attendance with NFC UID only (no payload) — should succeed
3. Set `NfcEncryption:RequirePayload = true`
4. Attempt attendance with NFC UID only — should fail
5. Attempt attendance with valid HMAC payload — should succeed

**Expected Results:**
- `RequirePayload = false`: NFC UID-only verification accepted (graceful degradation)
- `RequirePayload = true`: Full payload + HMAC signature required
- Invalid/missing payload with `RequirePayload = true` returns `NfcPayloadInvalid` or `NfcPayloadTampering` failure reason

---

#### TC-NFC-012: View NFC tag details page displays all fields
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /nfc-tags/:id/view |
| **Role** | System Admin |

**Preconditions:**
1. Active NFC tag exists with scan history

**Steps:**
1. Navigate to `/nfc-tags/{id}/view`

**Expected Results:**
- Page displays:
  - Tag UID
  - Branch name
  - Status with badge
  - Scan count
  - Last scanned timestamp
  - Created date
  - Provisioned by (user audit trail)
- DefinitionListComponent used for label-value pairs

---

### B. Notifications

#### TC-NFC-013: Notification bell shows unread count
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | (any page — topbar) |
| **Role** | Employee |

**Preconditions:**
1. Employee has unread notifications

**Steps:**
1. Log in as employee
2. Observe the notification bell icon in the topbar

**Expected Results:**
- Bell icon visible in topbar
- Unread count badge shows the number of unread notifications
- Clicking bell opens notification dropdown/panel
- Count updates in real-time via SignalR

---

#### TC-NFC-014: RequestSubmitted notification sent on request creation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | Employee |

**Steps:**
1. Employee creates a vacation request
2. Check notifications for the employee

**Expected Results:**
- Notification created with type `RequestSubmitted` (1)
- Sent to the requesting employee
- Title and message confirm request submission
- ActionUrl points to the vacation request detail

---

#### TC-NFC-015: RequestApproved notification sent on approval
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | Branch Manager |

**Preconditions:**
1. Employee has a pending vacation request

**Steps:**
1. Manager approves the vacation request
2. Check notifications for the original requester

**Expected Results:**
- Notification created with type `RequestApproved` (2)
- Sent to the requesting employee
- Title and message confirm approval
- ActionUrl points to the vacation request

---

#### TC-NFC-016: RequestRejected notification sent on rejection
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | Branch Manager |

**Preconditions:**
1. Employee has a pending vacation request

**Steps:**
1. Manager rejects the vacation request with a comment
2. Check notifications for the original requester

**Expected Results:**
- Notification created with type `RequestRejected` (3)
- Sent to the requesting employee
- Title and message confirm rejection

---

#### TC-NFC-017: RequestDelegated notification sent on delegation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | Branch Manager |

**Preconditions:**
1. Pending approval exists for the manager

**Steps:**
1. Manager delegates the approval to another user
2. Check notifications for the original requester

**Expected Results:**
- Notification created with type `RequestDelegated` (4)
- Sent to the original requester informing them of delegation
- ActionUrl points to the request

---

#### TC-NFC-018: RequestEscalated notification sent on timeout
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | System |

**Preconditions:**
1. Workflow step has exceeded its timeout period

**Steps:**
1. `WorkflowTimeoutProcessingJob` runs (hourly)
2. Timed-out step is escalated

**Expected Results:**
- Notification created with type `RequestEscalated` (5)
- Sent to relevant parties (original approver and escalation target)
- Timeout and escalation recorded in workflow history

---

#### TC-NFC-019: ApprovalPending notification sent to approver
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | Employee |

**Steps:**
1. Employee submits a vacation request that triggers workflow
2. Check notifications for the designated approver

**Expected Results:**
- Notification created with type `ApprovalPending` (6)
- Sent to the approver (manager/role-based)
- Title indicates a new request awaits approval
- ActionUrl navigates to the approval action page

---

#### TC-NFC-020: DelegationReceived notification sent to delegatee
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | Branch Manager |

**Steps:**
1. Manager delegates an approval to User B
2. Check notifications for User B

**Expected Results:**
- Notification created with type `DelegationReceived` (7)
- Sent to the delegatee (User B)
- Title indicates delegation assignment
- ActionUrl navigates to the pending approval

---

#### TC-NFC-021: ApprovalReminder notification sent for pending approvals
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | N/A (Backend) |
| **Role** | System |

**Preconditions:**
1. Approval has been pending for a configurable period

**Steps:**
1. Background job or scheduled task triggers reminder
2. Check notifications for the approver

**Expected Results:**
- Notification created with type `ApprovalReminder` (8)
- Sent to the approver who has not yet acted
- Reminder includes the request type and waiting duration

---

#### TC-NFC-022: Notification content is bilingual EN/AR
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | i18n |
| **Page** | N/A (API) |
| **Role** | Employee |

**Steps:**
1. Trigger a notification (e.g., submit a vacation request)
2. Call `GET /api/v1/notifications`
3. Inspect the notification object

**Expected Results:**
- Notification has both `title` (English) and `titleAr` (Arabic) fields
- Notification has both `message` (English) and `messageAr` (Arabic) fields
- Both language versions are populated and contextually accurate

---

#### TC-NFC-023: Notification action URL navigates to related entity
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | (topbar notification panel) |
| **Role** | Employee |

**Preconditions:**
1. Notification exists with an actionUrl

**Steps:**
1. Open notification dropdown in topbar
2. Click on a notification with an action URL

**Expected Results:**
- Browser navigates to the action URL
- Target page loads successfully (e.g., vacation request detail)
- Notification is marked as read after clicking

---

#### TC-NFC-024: Mark notification as read via API
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | N/A (API) |
| **Role** | Employee |

**Preconditions:**
1. Unread notification exists for the user

**Steps:**
1. Call `POST /api/v1/notifications/{id}/mark-read`
2. Call `GET /api/v1/notifications?unreadOnly=true`

**Expected Results:**
- Mark-read returns success
- The notification no longer appears in unread-only list
- Unread count decremented by 1

---

#### TC-NFC-025: Mark all notifications as read
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | N/A (API) |
| **Role** | Employee |

**Preconditions:**
1. Multiple unread notifications exist

**Steps:**
1. Call `POST /api/v1/notifications/mark-all-read`
2. Call `GET /api/v1/notifications/unread-count`

**Expected Results:**
- All notifications marked as read
- Unread count returns 0
- Notification bell badge clears

---

#### TC-NFC-026: SignalR hub delivers notification in real-time
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Functional |
| **Page** | (any page) |
| **Role** | Employee |

**Preconditions:**
1. Employee is logged in and connected to SignalR hub at `/hubs/notifications`
2. WebSocket connection is established

**Steps:**
1. From another session (as manager), approve the employee's vacation request
2. Observe the employee's browser

**Expected Results:**
- Notification delivered in real-time without page refresh
- Notification bell count updates immediately
- Notification appears in the dropdown panel
- No manual refresh required

---

#### TC-NFC-027: Admin broadcast sends notification to user group
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Functional |
| **Page** | /notifications/send |
| **Role** | System Admin |

**Preconditions:**
1. User has `notification.broadcast` permission

**Steps:**
1. Navigate to `/notifications/send`
2. Enter title (EN and AR)
3. Enter message (EN and AR)
4. Select target user group (e.g., all employees in a branch)
5. Click Send

**Expected Results:**
- Broadcast created via `POST /api/v1/notification-broadcasts`
- Notifications delivered to all users in the target group
- Each user receives the notification via SignalR
- Success notification shown to the admin

---

#### TC-NFC-028: Broadcast history page shows past broadcasts
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /notifications/history |
| **Role** | System Admin |

**Preconditions:**
1. At least one broadcast has been sent

**Steps:**
1. Navigate to `/notifications/history`

**Expected Results:**
- DataTable shows past broadcasts with: title, sent date, target group, sender
- Broadcasts listed in reverse chronological order
- Pagination available for large lists
- Permission `notification.broadcast` required to access page
