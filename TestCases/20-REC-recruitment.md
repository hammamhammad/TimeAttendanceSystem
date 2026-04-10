# TC-REC: Recruitment & Hiring — Test Cases

## Module Overview

Recruitment & Hiring manages the full hiring pipeline: job requisitions with priority and budget, job postings (internal/external), candidate profiles with resume uploads, applications moving through a 7-stage pipeline (Applied through Hired/Rejected), interview scheduling with 6 interview types and structured feedback, and offer letter generation with a full lifecycle. The module integrates with approval workflows for requisitions and offers.

**Admin Pages**: `/recruitment/requisitions/*`, `/recruitment/postings/*`, `/recruitment/candidates/*`, `/recruitment/applications/*`, `/recruitment/interviews/*`, `/recruitment/offers/*`
**API Endpoints**: `/api/v1/job-requisitions`, `/api/v1/job-postings`, `/api/v1/candidates`, `/api/v1/applications`, `/api/v1/interviews`, `/api/v1/offers`
**Backend Controllers**: `JobRequisitionsController`, `JobPostingsController`, `CandidatesController`, `ApplicationsController`, `InterviewsController`, `OffersController`
**Module**: `Recruitment` (requires subscription entitlement)

---

## Test Environment

| Item | Value |
|------|-------|
| Backend | http://localhost:5099 |
| Admin Portal | http://localhost:4200 |

### Test Users

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access |
| HR Admin | sara.fahad@company.com | Emp@123! | Recruitment permissions |
| Department Manager | ahmed.rashid@company.com | Emp@123! | Requisition approval, interviewer |
| Employee | salma.khaldi@company.com | Emp@123! | No recruitment access |

---

## Test Cases

### A. Job Requisitions

#### TC-REC-001: List job requisitions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /recruitment/requisitions |
| **Role** | HR Admin |

**Preconditions:**
1. User has requisition read permissions
2. At least one requisition exists

**Steps:**
1. Navigate to /recruitment/requisitions

**Expected Results:**
- `DataTableComponent` with columns: Title, Department, Priority, Headcount, Budget, Target Date, Status
- `UnifiedFilterComponent` with search, filter by status/priority, add button
- `StatusBadgeComponent` for status and priority
- Pagination controls visible

---

#### TC-REC-002: Create job requisition
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/requisitions/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /recruitment/requisitions/create
2. Enter job title: "Senior Software Engineer"
3. Select department: IT
4. Select branch: Headquarters - Riyadh
5. Enter position description
6. Set priority: High
7. Enter headcount: 2
8. Enter budget: 30000 SAR (per position)
9. Enter target date: 2026-08-01
10. Click Save

**Expected Results:**
- Requisition created with status = Draft (or Pending Approval)
- All fields saved correctly
- Priority stored as enum (Low/Medium/High/Urgent)
- Success notification displayed
- Redirect to list or view page

---

#### TC-REC-003: View job requisition details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /recruitment/requisitions/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to requisition view page

**Expected Results:**
- `DefinitionListComponent` shows: Title, Department, Branch, Priority, Headcount, Budget, Target Date, Status, Created By, Created Date
- `StatusBadgeComponent` for status and priority
- Priority badge colors: Low=secondary, Medium=info, High=warning, Urgent=danger
- Related postings listed (if any)
- Application count displayed

---

#### TC-REC-004: Edit job requisition
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/requisitions/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to edit page for a Draft requisition
2. Change priority from High to Urgent
3. Increase headcount from 2 to 3
4. Click Save

**Expected Results:**
- Changes saved successfully
- Only Draft/Pending requisitions editable
- Approved requisitions cannot be edited (edit button hidden)
- Success notification displayed

---

#### TC-REC-005: Requisition approval workflow
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/requisitions/:id |
| **Role** | HR Admin / Manager |

**Preconditions:**
1. Approval workflow configured for requisitions

**Steps:**
1. Create a job requisition
2. Submit for approval
3. Log in as approver (department manager)
4. Review and approve requisition

**Expected Results:**
- Requisition status changes to Pending Approval on submit
- Workflow instance created
- Approver receives notification
- After approval, status = Approved
- Approved requisition can be used to create job postings
- Rejection returns status to Draft with rejection reason

---

#### TC-REC-006: Priority levels display correctly
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /recruitment/requisitions |
| **Role** | HR Admin |

**Steps:**
1. Create requisitions with each priority level (Low, Medium, High, Urgent)
2. View them in the list

**Expected Results:**
- Low: secondary/gray badge
- Medium: info/blue badge
- High: warning/amber badge
- Urgent: danger/red badge
- Priority filter works correctly in `UnifiedFilterComponent`

---

#### TC-REC-007: Delete job requisition
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /recruitment/requisitions |
| **Role** | HR Admin |

**Steps:**
1. Click delete on a Draft requisition
2. Confirm deletion
3. Try to delete a requisition with active postings

**Expected Results:**
- Draft requisition with no postings: deleted successfully
- Requisition with active postings/applications: error or warning
- Confirmation modal shown before deletion

---

#### TC-REC-008: Requisition tracks budget against positions
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/requisitions/:id |
| **Role** | HR Admin |

**Steps:**
1. Create requisition with headcount=3, budget=25000 per position
2. View requisition details

**Expected Results:**
- Total budget displayed: 75,000 SAR (3 x 25,000)
- As positions are filled (applications reach Hired stage), remaining headcount updates
- Budget utilization tracked

---

### B. Job Postings

#### TC-REC-009: Create job posting from requisition
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/postings/create |
| **Role** | HR Admin |

**Preconditions:**
1. Approved job requisition exists

**Steps:**
1. Navigate to /recruitment/postings/create
2. Select source requisition
3. Title and department auto-populated from requisition
4. Enter job description (rich text)
5. Enter requirements (skills, experience, education)
6. Enter benefits offered
7. Select posting type: External
8. Click Save

**Expected Results:**
- Job posting created and linked to requisition
- Description, requirements, and benefits saved
- Posting type (Internal/External) stored
- Status = Draft (not yet published)
- Success notification displayed

---

#### TC-REC-010: Publish job posting
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/postings/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a Draft job posting
2. Click "Publish"
3. Confirm publication

**Expected Results:**
- Posting status changes to Published
- Published date recorded
- Posting now visible to applicants (if external)
- Internal postings visible to employees
- Status badge shows green "Published"

---

#### TC-REC-011: Unpublish job posting
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/postings/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a Published posting
2. Click "Unpublish"
3. Confirm

**Expected Results:**
- Posting status changes to Closed or Unpublished
- No longer visible to new applicants
- Existing applications remain unaffected
- Can be re-published later

---

#### TC-REC-012: List job postings
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /recruitment/postings |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /recruitment/postings

**Expected Results:**
- `DataTableComponent` with columns: Title, Department, Type (Internal/External), Status, Published Date, Applications Count
- `UnifiedFilterComponent` with search, filter by type/status
- `StatusBadgeComponent` for status
- Pagination working

---

#### TC-REC-013: View job posting details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /recruitment/postings/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to posting view page

**Expected Results:**
- `DefinitionListComponent` shows: Title, Department, Requisition, Type, Status, Published Date, Closing Date
- Description, requirements, and benefits rendered (formatted text)
- Application count and list link
- Action buttons: Publish/Unpublish, Edit, Delete (based on status)

---

#### TC-REC-014: Edit job posting
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/postings/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to edit page for a Draft posting
2. Update description and requirements
3. Click Save

**Expected Results:**
- Changes saved successfully
- Draft postings fully editable
- Published postings may have restricted editing (description only)
- Success notification displayed

---

### C. Candidates

#### TC-REC-015: List candidates
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /recruitment/candidates |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /recruitment/candidates

**Expected Results:**
- `DataTableComponent` with columns: Name, Email, Phone, Skills, Experience (Years), Source, Applications Count
- `UnifiedFilterComponent` with search and add button
- Pagination working

---

#### TC-REC-016: Create candidate profile
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/candidates/create |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /recruitment/candidates/create
2. Enter first name: "Mohammed"
3. Enter last name: "Al-Salem"
4. Enter email: "m.alsalem@email.com"
5. Enter phone: "+966501234567"
6. Add skills: "Java, Spring Boot, PostgreSQL"
7. Enter years of experience: 5
8. Enter education: "BSc Computer Science"
9. Enter salary expectation: 18000 SAR
10. Select source: LinkedIn
11. Click Save

**Expected Results:**
- Candidate profile created
- All contact and qualification details saved
- Skills stored (comma-separated or tags)
- Source tracking recorded
- Success notification displayed

---

#### TC-REC-017: Upload candidate resume
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/candidates/create |
| **Role** | HR Admin |

**Steps:**
1. During candidate creation, use `FileUploadComponent` to upload resume
2. Select file: "mohammed_alsalem_cv.pdf"
3. Submit

**Expected Results:**
- File uploaded via `POST /api/v1/files/upload`
- `FileAttachment` linked to candidate (EntityType=Candidate)
- Resume accessible from candidate view page
- Download link functional
- Supported formats: PDF, DOC, DOCX

---

#### TC-REC-018: View candidate profile
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /recruitment/candidates/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to candidate view page

**Expected Results:**
- `DefinitionListComponent` shows: Name, Email, Phone, Skills, Experience, Education, Salary Expectation, Source
- Resume download link
- List of applications submitted by this candidate
- Application statuses visible

---

#### TC-REC-019: Edit candidate profile
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/candidates/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to candidate edit page
2. Update skills and salary expectations
3. Upload a new resume (replaces old one)
4. Click Save

**Expected Results:**
- Changes saved
- New resume replaces previous attachment
- Success notification displayed

---

#### TC-REC-020: Delete candidate
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /recruitment/candidates |
| **Role** | HR Admin |

**Steps:**
1. Click delete on a candidate with no active applications
2. Confirm deletion
3. Try to delete a candidate with active applications

**Expected Results:**
- Candidate with no active applications: deleted
- Candidate with active applications: error or soft-delete
- Confirmation modal shown

---

#### TC-REC-021: Candidate source tracking
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/candidates/create |
| **Role** | HR Admin |

**Steps:**
1. Create candidates with different sources: LinkedIn, Referral, Job Board, Walk-in, Company Website
2. View candidate list

**Expected Results:**
- Source stored and displayed per candidate
- Can filter candidates by source
- Source effectiveness visible in recruitment dashboard

---

### D. Job Applications

#### TC-REC-022: Create application for a candidate
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/applications/create |
| **Role** | HR Admin |

**Preconditions:**
1. Published job posting exists
2. Candidate profile exists

**Steps:**
1. Navigate to /recruitment/applications/create
2. Select job posting
3. Select candidate
4. Upload cover letter (optional) via `FileUploadComponent`
5. Click Save

**Expected Results:**
- Application created with initial stage = Applied
- Application linked to candidate and posting
- Cover letter attached (if uploaded)
- Application date recorded
- Success notification displayed

---

#### TC-REC-023: List applications with pipeline view
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /recruitment/applications |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /recruitment/applications

**Expected Results:**
- `DataTableComponent` with columns: Candidate, Job Posting, Current Stage, Applied Date, Last Updated
- `UnifiedFilterComponent` with search, filter by stage/posting
- `StatusBadgeComponent` for pipeline stages with distinct colors:
  - Applied = secondary
  - Screening = info
  - Interview = primary
  - Assessment = warning
  - Offered = accent
  - Hired = success
  - Rejected = danger
- Pagination working

---

#### TC-REC-024: Advance application through pipeline stages
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/applications/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to application in "Applied" stage
2. Click "Advance to Screening"
3. Review candidate and click "Advance to Interview"
4. After interview, click "Advance to Assessment"
5. After assessment, click "Advance to Offered"

**Expected Results:**
- Application stage updates at each step: Applied -> Screening -> Interview -> Assessment -> Offered
- Status history records each transition with timestamp and user
- Notifications sent at each stage transition (to HR, hiring manager)
- Stage badge updates accordingly
- Cannot skip stages (must go sequentially)

---

#### TC-REC-025: Reject application with reason
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/applications/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to application at any stage
2. Click "Reject"
3. Enter rejection reason: "Insufficient technical experience"
4. Confirm rejection

**Expected Results:**
- Application stage changes to Rejected
- Rejection reason stored
- Status badge shows red "Rejected"
- Cannot advance a rejected application further
- Rejection recorded in status history

---

#### TC-REC-026: Move application to Hired stage
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/applications/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Application in Offered stage
2. Offer accepted by candidate

**Steps:**
1. Navigate to application in Offered stage
2. Click "Mark as Hired"
3. Confirm

**Expected Results:**
- Application stage changes to Hired
- Requisition headcount decremented (filled positions updated)
- Status badge shows green "Hired"
- Candidate marked as hired in their profile
- Audit log entry created

---

#### TC-REC-027: View application status history
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /recruitment/applications/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to application view page for an application that has gone through multiple stages

**Expected Results:**
- Status history timeline displayed showing each stage transition
- Each entry shows: stage, date/time, changed by (user)
- Rejection reason shown if rejected
- Current stage highlighted

---

#### TC-REC-028: Duplicate application prevention
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /recruitment/applications/create |
| **Role** | HR Admin |

**Steps:**
1. Create application for Candidate A to Posting X
2. Try to create another application for the same Candidate A to the same Posting X

**Expected Results:**
- Duplicate prevented — validation error: "Candidate already has an application for this posting"
- Same candidate can apply to different postings
- Different candidates can apply to the same posting

---

#### TC-REC-029: Filter applications by pipeline stage
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /recruitment/applications |
| **Role** | HR Admin |

**Steps:**
1. Navigate to applications list
2. Filter by stage: "Interview"

**Expected Results:**
- Only applications in Interview stage displayed
- Filter can be combined with search and posting filter
- Count updates to reflect filtered results

---

### E. Interviews

#### TC-REC-030: Schedule a phone interview
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/interviews/create |
| **Role** | HR Admin |

**Preconditions:**
1. Application exists in Interview stage

**Steps:**
1. Navigate to /recruitment/interviews/create
2. Select application/candidate
3. Select interview type: Phone
4. Set date: 2026-06-15
5. Set time: 10:00 AM
6. Set duration: 30 minutes
7. Assign interviewer: ahmed.rashid@company.com
8. Click Save

**Expected Results:**
- Interview scheduled with type = Phone
- Date, time, and duration stored
- Interviewer assigned
- Notification sent to interviewer
- Interview appears in application's interview list
- Success notification displayed

---

#### TC-REC-031: Schedule all 6 interview types
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/interviews/create |
| **Role** | HR Admin |

**Steps:**
1. Create interviews with each type: Phone, Video, InPerson, Panel, Technical, HR

**Expected Results:**
- All 6 types supported and stored correctly
- Type displayed with appropriate icon/badge in list
- InPerson type requires location field
- Panel type allows multiple interviewers
- Each type renders correctly in view page

---

#### TC-REC-032: List interviews
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /recruitment/interviews |
| **Role** | HR Admin |

**Steps:**
1. Navigate to /recruitment/interviews

**Expected Results:**
- `DataTableComponent` with columns: Candidate, Position, Type, Date/Time, Interviewer(s), Status
- `UnifiedFilterComponent` with search, filter by type/date
- `StatusBadgeComponent` for interview status (Scheduled, Completed, Cancelled)
- Pagination working

---

#### TC-REC-033: Assign multiple interviewers (panel interview)
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/interviews/create |
| **Role** | HR Admin |

**Steps:**
1. Create interview with type: Panel
2. Assign interviewer 1: ahmed.rashid@company.com
3. Assign interviewer 2: sara.fahad@company.com
4. Assign interviewer 3: another user
5. Click Save

**Expected Results:**
- Multiple interviewers assigned to single interview
- All interviewers receive notification
- Each interviewer can submit independent feedback
- Panel members listed in interview view page

---

#### TC-REC-034: Submit interview feedback with ratings
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/interviews/:id/feedback |
| **Role** | Department Manager (Interviewer) |

**Preconditions:**
1. Interview is scheduled and assigned to current user

**Steps:**
1. Navigate to interview feedback form
2. Rate Technical Skills: 4/5
3. Rate Communication: 3/5
4. Rate Culture Fit: 5/5
5. Rate Overall: 4/5
6. Add comments: "Strong technical background, good communication, excellent team fit"
7. Submit feedback

**Expected Results:**
- Feedback recorded with all 4 rating dimensions
- Ratings stored as integers 1-5
- Comments saved
- Interview status updated to Completed (if all interviewers submitted)
- Feedback visible on application view page
- Average ratings calculated if multiple interviewers

---

#### TC-REC-035: View interview feedback summary
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /recruitment/interviews/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to completed interview view page

**Expected Results:**
- Feedback from each interviewer displayed
- Rating breakdown: Technical, Communication, Culture Fit, Overall
- Visual rating display (stars or numeric)
- Comments from each interviewer
- Average rating across all interviewers (for panel)

---

#### TC-REC-036: Reschedule interview
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/interviews/:id/edit |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a scheduled interview
2. Change date and time
3. Save changes

**Expected Results:**
- Interview rescheduled with new date/time
- Notification sent to interviewer(s) about schedule change
- Previous schedule recorded in history
- Only scheduled (not completed) interviews can be rescheduled

---

#### TC-REC-037: Cancel interview
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/interviews/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a scheduled interview
2. Click "Cancel"
3. Enter cancellation reason
4. Confirm

**Expected Results:**
- Interview status changes to Cancelled
- Cancellation reason stored
- Notification sent to interviewer(s)
- Cannot submit feedback on cancelled interview

---

### F. Offer Letters

#### TC-REC-038: Generate offer letter
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/offers/create |
| **Role** | HR Admin |

**Preconditions:**
1. Application exists in Offered stage (or ready to be offered)

**Steps:**
1. Navigate to /recruitment/offers/create
2. Select application/candidate
3. Enter offered salary: 18000 SAR
4. Enter job title: "Senior Software Engineer"
5. Enter start date: 2026-08-01
6. Enter benefits: "Medical insurance, annual flight tickets, housing allowance"
7. Enter contract terms: "2-year contract, 3-month probation"
8. Click Generate

**Expected Results:**
- Offer letter created with status = Draft
- Salary, title, start date, benefits, and terms saved
- Linked to application and candidate
- Success notification displayed

---

#### TC-REC-039: View offer letter details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /recruitment/offers/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to offer view page

**Expected Results:**
- `DefinitionListComponent` shows: Candidate, Position, Salary, Start Date, Benefits, Terms, Status, Created Date
- `StatusBadgeComponent` with lifecycle colors:
  - Draft = secondary
  - Pending = warning
  - Sent = info
  - Accepted = success
  - Rejected = danger
  - Withdrawn = gray
- Action buttons based on status (Approve, Send, Withdraw)

---

#### TC-REC-040: Offer approval workflow
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/offers/:id |
| **Role** | HR Admin / Approver |

**Preconditions:**
1. Offer exists in Draft status
2. Approval workflow configured for offers

**Steps:**
1. Submit offer for approval
2. Log in as approver
3. Review salary, benefits, and terms
4. Approve the offer

**Expected Results:**
- Offer status changes from Draft to Pending (Approval)
- Workflow instance created
- Approver receives notification with offer details
- After approval, status changes to Pending (Ready to Send)
- Rejection returns to Draft with reason

---

#### TC-REC-041: Send offer to candidate
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/offers/:id |
| **Role** | HR Admin |

**Preconditions:**
1. Offer approved (status = Pending)

**Steps:**
1. Navigate to approved offer
2. Click "Send to Candidate"
3. Confirm sending

**Expected Results:**
- Offer status changes to Sent
- Sent date recorded
- Candidate notification/email triggered (if configured)
- Offer PDF generated and attached (if configured)

---

#### TC-REC-042: Candidate accepts offer
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/offers/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to Sent offer
2. Click "Mark as Accepted"
3. Enter acceptance date
4. Confirm

**Expected Results:**
- Offer status changes to Accepted
- Acceptance date recorded
- Application stage can now advance to Hired
- Status badge shows green "Accepted"
- Audit log entry created

---

#### TC-REC-043: Candidate rejects offer
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/offers/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to Sent offer
2. Click "Mark as Rejected"
3. Enter rejection reason (if known)
4. Confirm

**Expected Results:**
- Offer status changes to Rejected
- Rejection reason stored
- Application remains at current stage (can create new offer or proceed differently)
- Status badge shows red "Rejected"

---

#### TC-REC-044: Withdraw an offer
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /recruitment/offers/:id |
| **Role** | HR Admin |

**Steps:**
1. Navigate to a Sent or Pending offer
2. Click "Withdraw"
3. Enter withdrawal reason
4. Confirm

**Expected Results:**
- Offer status changes to Withdrawn
- Withdrawal reason stored
- Cannot be re-sent (must create a new offer)
- Status badge shows gray "Withdrawn"

---

#### TC-REC-045: Offer letter status lifecycle validation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /recruitment/offers/:id |
| **Role** | HR Admin |

**Steps:**
1. Verify state transitions: Draft -> Pending -> Sent -> Accepted/Rejected/Withdrawn

**Expected Results:**
- Valid transitions enforced:
  - Draft -> Pending (submit for approval)
  - Pending -> Sent (send to candidate) or Pending -> Draft (rejection returns to draft)
  - Sent -> Accepted, Rejected, or Withdrawn
  - Accepted/Rejected/Withdrawn are terminal states
- Invalid transitions blocked (e.g., cannot go from Accepted back to Sent)
- API returns validation error for invalid state transitions
- UI only shows valid action buttons for current state

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Job Requisitions | 8 | 3 | 3 | 1 | 1 |
| B. Job Postings | 6 | 3 | 3 | 0 | 0 |
| C. Candidates | 7 | 3 | 2 | 1 | 1 |
| D. Applications | 8 | 4 | 3 | 0 | 1 |
| E. Interviews | 8 | 2 | 4 | 1 | 1 |
| F. Offer Letters | 8 | 4 | 3 | 0 | 1 |
| **TOTAL** | **45** | **19** | **18** | **3** | **5** |
