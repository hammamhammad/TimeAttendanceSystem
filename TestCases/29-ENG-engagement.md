# TC-ENG: Employee Engagement — Test Cases

## Module Overview

Employee Engagement covers announcements, surveys, and employee relations (counseling, disciplinary actions, grievances, investigations). Announcements allow HR to communicate company-wide or targeted messages. Surveys collect structured employee feedback. Employee relations manages formal HR processes including counseling sessions, disciplinary actions, grievance handling, and internal investigations.

**Admin Pages**: `/announcements/*`, `/surveys/*`, `/employee-relations/counseling/*`, `/employee-relations/disciplinary-actions/*`, `/employee-relations/grievances/*`, `/employee-relations/investigations/*`
**Self-Service Pages**: `/announcements/*`, `/my-surveys/*`, `/my-grievances`, `/my-disciplinary`
**API Endpoints**: `POST/GET/PUT/DELETE /api/v1/announcements`, `POST/GET/PUT/DELETE /api/v1/surveys`, `POST/GET/PUT/DELETE /api/v1/counseling-sessions`, `POST/GET/PUT/DELETE /api/v1/disciplinary-actions`, `POST/GET/PUT/DELETE /api/v1/grievances`, `POST/GET/PUT/DELETE /api/v1/investigations`
**Background Jobs**: `SurveyExpiryJob`, `CounselingFollowUpReminderJob`, `GrievanceSlaAlertJob`

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
| System Admin | systemadmin@{domain} | TecAxle@Sys2026! | Full access |
| HR Manager | sara.fahad@company.com | Emp@123! | HR department manager |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Branch manager |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Announcements

#### TC-ENG-001: Create announcement category
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /announcements/categories |
| **Role** | HR Manager |

**Preconditions:**
1. Logged in as HR Manager on Admin Portal

**Steps:**
1. Navigate to /announcements/categories
2. Click "Add Category"
3. Enter name: "Company News", name (AR): "اخبار الشركة"
4. Select an icon/color
5. Click Save

**Expected Results:**
- Category created successfully
- Success notification displayed
- Category appears in the list
- Both EN and AR names stored

---

#### TC-ENG-002: Edit announcement category
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | CRUD |
| **Page** | /announcements/categories |
| **Role** | HR Manager |

**Preconditions:**
1. Category "Company News" exists (from TC-ENG-001)

**Steps:**
1. Navigate to /announcements/categories
2. Click edit on "Company News"
3. Change name to "Corporate Updates"
4. Click Save

**Expected Results:**
- Category updated successfully
- Name reflects the change in the list
- Existing announcements linked to this category are unaffected

---

#### TC-ENG-003: Create announcement with full details
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /announcements/create |
| **Role** | HR Manager |

**Preconditions:**
1. At least one announcement category exists
2. Multiple branches and departments exist

**Steps:**
1. Navigate to /announcements/create
2. Enter title: "Q2 Town Hall Meeting"
3. Enter title (AR): "اجتماع الربع الثاني"
4. Select category: "Company News"
5. Enter content: rich text body describing the town hall
6. Set target audience: "All Employees"
7. Set priority: "High"
8. Click Save as Draft

**Expected Results:**
- Announcement created with status "Draft"
- Success notification shown
- Announcement appears in admin list with Draft status badge
- Not yet visible to employees in self-service portal

---

#### TC-ENG-004: Target announcement to specific branch
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /announcements/create |
| **Role** | HR Manager |

**Preconditions:**
1. Multiple branches exist (e.g., Headquarters, Jeddah Branch)

**Steps:**
1. Navigate to /announcements/create
2. Enter title: "Riyadh Office Renovation Notice"
3. Set target audience: "Specific Branches"
4. Select branch: "Headquarters - Riyadh"
5. Enter content and category
6. Click Publish

**Expected Results:**
- Announcement published with branch targeting
- Only employees in "Headquarters - Riyadh" see this announcement in self-service
- Employees in Jeddah, Dammam, etc. do NOT see it
- Admin list shows targeting scope

---

#### TC-ENG-005: Target announcement to specific department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /announcements/create |
| **Role** | HR Manager |

**Preconditions:**
1. Multiple departments exist

**Steps:**
1. Navigate to /announcements/create
2. Enter title: "IT Security Policy Update"
3. Set target audience: "Specific Departments"
4. Select department: "IT"
5. Enter content, category, and save as Published

**Expected Results:**
- Only employees in IT department see this announcement
- Employees in HR, Finance, Operations do NOT see it

---

#### TC-ENG-006: Publish and unpublish announcement
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /announcements |
| **Role** | HR Manager |

**Preconditions:**
1. A draft announcement exists (from TC-ENG-003)

**Steps:**
1. Navigate to /announcements
2. Click on the draft announcement
3. Click "Publish"
4. Verify announcement is visible in self-service portal
5. Return to admin portal, click "Unpublish"
6. Verify announcement is no longer visible in self-service portal

**Expected Results:**
- Publish changes status from Draft to Published
- Published announcements appear in self-service /announcements
- Unpublish reverts status to Draft
- Draft announcements are hidden from self-service

---

#### TC-ENG-007: Schedule announcement for future publication
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /announcements/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /announcements/create
2. Enter title: "Ramadan Working Hours"
3. Set schedule: publish date = tomorrow at 08:00 AM
4. Fill in content, category, target audience (All)
5. Click Save

**Expected Results:**
- Announcement saved with status "Scheduled"
- Not visible in self-service portal before scheduled time
- After scheduled date/time passes, status changes to Published
- Becomes visible to target audience automatically

---

#### TC-ENG-008: Self-service announcement view and read tracking
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI / Business Rule |
| **Page** | /announcements (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Published announcement "Q2 Town Hall Meeting" targeting all employees exists

**Steps:**
1. Login to self-service portal as salma.khaldi@company.com
2. Navigate to /announcements
3. Observe announcement list
4. Click on "Q2 Town Hall Meeting"
5. Read the full announcement content
6. Return to announcement list

**Expected Results:**
- Announcement list shows published announcements
- Each announcement shows title, date, category, priority
- After clicking and reading, announcement marked as read
- Admin portal can view read count/percentage for the announcement
- Unread announcements visually distinct (e.g., bold title, unread badge)

---

### B. Surveys

#### TC-ENG-009: Create survey template with rating question
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /surveys/create |
| **Role** | HR Manager |

**Preconditions:**
1. Logged in as HR Manager on Admin Portal

**Steps:**
1. Navigate to /surveys/create
2. Enter title: "Employee Satisfaction Q2 2026"
3. Enter description
4. Add question 1: Type = Rating (1-5), text = "How satisfied are you with your work environment?"
5. Add question 2: Type = Rating (1-5), text = "How do you rate management communication?"
6. Set start date and end date
7. Click Save

**Expected Results:**
- Survey created with status "Draft"
- Two rating questions saved with correct type and text
- Rating scale (1-5) configured
- Survey appears in admin survey list

---

#### TC-ENG-010: Create survey with multiple question types
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /surveys/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /surveys/create
2. Enter title: "Annual Feedback Survey"
3. Add question: Type = Rating (1-5), text = "Overall job satisfaction"
4. Add question: Type = Text, text = "What improvements would you suggest?"
5. Add question: Type = MultiChoice, text = "Best company benefit?" options = ["Health Insurance", "Annual Leave", "Training Budget", "Remote Work"]
6. Add question: Type = YesNo, text = "Would you recommend this company to a friend?"
7. Add question: Type = Scale (1-10), text = "Rate your work-life balance"
8. Click Save

**Expected Results:**
- Survey saved with 5 questions of different types
- Each question type stores its configuration (options for MultiChoice, scale range for Scale)
- Question order preserved

---

#### TC-ENG-011: Distribute survey to employee group
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /surveys/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Survey "Employee Satisfaction Q2 2026" exists in Draft status

**Steps:**
1. Navigate to the survey detail page
2. Set target: "All Employees" (or select specific branches/departments)
3. Click "Activate" or "Distribute"
4. Confirm distribution

**Expected Results:**
- Survey status changes to "Active"
- Targeted employees can see the survey in self-service /my-surveys
- Non-targeted employees do NOT see it
- Distribution date recorded

---

#### TC-ENG-012: Close active survey
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /surveys/:id |
| **Role** | HR Manager |

**Preconditions:**
1. An active survey exists with some responses collected

**Steps:**
1. Navigate to the active survey
2. Click "Close Survey"
3. Confirm closure

**Expected Results:**
- Survey status changes to "Closed"
- No new responses can be submitted
- Employees see survey as "Closed" in self-service
- Existing responses preserved
- Results analytics become available

---

#### TC-ENG-013: Self-service employee responds to survey
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-surveys/:id/respond (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Active survey distributed to employee's group
2. Employee has not yet responded

**Steps:**
1. Login to self-service as salma.khaldi@company.com
2. Navigate to /my-surveys
3. See active survey in list
4. Click on survey to open response form at /my-surveys/:id/respond
5. Answer rating question: select 4 out of 5
6. Answer text question: type "More team building activities"
7. Answer MultiChoice question: select "Health Insurance"
8. Answer YesNo question: select "Yes"
9. Answer Scale question: select 8 out of 10
10. Click Submit

**Expected Results:**
- Response submitted successfully
- Success notification displayed
- Survey no longer shows as "pending" in /my-surveys list
- Survey marked as "Completed" for this employee
- Employee cannot submit a second response

---

#### TC-ENG-014: Prevent duplicate survey response
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /my-surveys/:id/respond (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has already responded to the survey (TC-ENG-013)

**Steps:**
1. Navigate to /my-surveys/:id/respond for the same survey
2. Attempt to submit another response

**Expected Results:**
- System prevents duplicate submission
- Error message: "You have already responded to this survey"
- Or the respond link is hidden/disabled for completed surveys

---

#### TC-ENG-015: Survey results analytics
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /surveys/:id/results |
| **Role** | HR Manager |

**Preconditions:**
1. Survey has collected multiple responses

**Steps:**
1. Navigate to /surveys/:id/results
2. Review analytics dashboard

**Expected Results:**
- Response rate shown (responses / total distributed)
- Rating questions: average score, distribution chart
- Text questions: list of responses (anonymized if configured)
- MultiChoice questions: response count per option, pie/bar chart
- YesNo questions: percentage yes vs no
- Scale questions: average, distribution
- Export option available (CSV)

---

#### TC-ENG-016: Survey expiry job closes expired surveys
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Active survey with end date set to yesterday

**Steps:**
1. `SurveyExpiryJob` runs on schedule
2. Job finds surveys where end date has passed and status is Active

**Expected Results:**
- Survey status automatically changed to "Closed"
- No new responses accepted after closure
- Job logs the action

---

#### TC-ENG-017: Edit survey questions while in Draft
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /surveys/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Survey exists in Draft status

**Steps:**
1. Navigate to /surveys/:id/edit
2. Modify question text
3. Add a new question
4. Remove an existing question
5. Reorder questions
6. Click Save

**Expected Results:**
- All changes saved successfully
- Question order updated

---

#### TC-ENG-018: Cannot edit survey questions after activation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Validation |
| **Page** | /surveys/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Survey is in Active status with responses collected

**Steps:**
1. Navigate to /surveys/:id/edit
2. Attempt to modify questions

**Expected Results:**
- Questions are read-only (cannot modify text, add, or remove)
- Warning message: "Cannot edit questions on an active survey with responses"
- Non-question fields (title, description, end date) may still be editable

---

### C. Counseling

#### TC-ENG-019: Create counseling session record
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /employee-relations/counseling/create |
| **Role** | HR Manager |

**Preconditions:**
1. Employee "salma.khaldi@company.com" exists

**Steps:**
1. Navigate to /employee-relations/counseling/create
2. Select employee: Salma Khaldi
3. Set date: today
4. Select counselor: Sara Fahad (HR Manager)
5. Enter session type: "Performance"
6. Enter notes: "Discussed Q1 performance metrics and areas for improvement"
7. Set follow-up date: 2 weeks from today
8. Click Save

**Expected Results:**
- Counseling session created successfully
- Session appears in list at /employee-relations/counseling
- All fields saved correctly (employee, date, counselor, notes, follow-up)
- Success notification displayed

---

#### TC-ENG-020: View counseling session list with filters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /employee-relations/counseling |
| **Role** | HR Manager |

**Preconditions:**
1. Multiple counseling sessions exist

**Steps:**
1. Navigate to /employee-relations/counseling
2. Filter by employee name
3. Filter by date range
4. Filter by counselor

**Expected Results:**
- DataTable shows counseling sessions
- Filters narrow results correctly
- Columns: Employee, Date, Counselor, Type, Follow-up Date, Status
- Pagination works

---

#### TC-ENG-021: Edit counseling session notes and follow-up
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /employee-relations/counseling/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Counseling session exists (from TC-ENG-019)

**Steps:**
1. Navigate to the counseling session
2. Click Edit
3. Update notes with additional observations
4. Change follow-up date
5. Click Save

**Expected Results:**
- Session updated successfully
- Updated notes and follow-up date saved
- Audit trail records the change

---

#### TC-ENG-022: Counseling follow-up reminder job
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Counseling session with follow-up date = today exists

**Steps:**
1. `CounselingFollowUpReminderJob` runs on schedule
2. Job checks for sessions with follow-up dates due today or overdue

**Expected Results:**
- Notification sent to the counselor about pending follow-up
- Notification contains employee name, session date, and follow-up date
- Only sessions with pending follow-ups trigger reminders
- Already-completed follow-ups are excluded

---

### D. Disciplinary Actions

#### TC-ENG-023: Create verbal warning disciplinary action
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /employee-relations/disciplinary-actions/create |
| **Role** | HR Manager |

**Preconditions:**
1. Employee exists in the system

**Steps:**
1. Navigate to /employee-relations/disciplinary-actions/create
2. Select employee: Salma Khaldi
3. Select severity: "Verbal Warning"
4. Enter reason: "Repeated tardiness in March 2026"
5. Enter description with details
6. Set date: today
7. Attach supporting documentation (if any)
8. Click Save

**Expected Results:**
- Disciplinary action created with severity "Verbal"
- Record appears in admin list
- Employee notified (in-app notification)
- Audit trail created

---

#### TC-ENG-024: Create disciplinary actions at all severity levels
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-relations/disciplinary-actions/create |
| **Role** | HR Manager |

**Steps:**
1. Create disciplinary action with severity "Written Warning"
2. Create disciplinary action with severity "Final Warning"
3. Create disciplinary action with severity "Suspension"
4. Create disciplinary action with severity "Termination"

**Expected Results:**
- All five severity levels (Verbal, Written, Final, Suspension, Termination) can be created
- Each has appropriate severity badge in the list
- Severity ordering: Verbal < Written < Final < Suspension < Termination

---

#### TC-ENG-025: Attach documentation to disciplinary action
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /employee-relations/disciplinary-actions/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Disciplinary action exists

**Steps:**
1. Navigate to disciplinary action detail page
2. Click "Attach Document"
3. Upload a PDF file (e.g., signed warning letter)
4. Save

**Expected Results:**
- Document uploaded and linked to the disciplinary action
- File appears in attachments section
- Download link works
- File types validated (PDF, DOC, DOCX, JPG, PNG)
- Max file size enforced (10MB)

---

#### TC-ENG-026: Employee response to disciplinary action
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-relations/disciplinary-actions/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Disciplinary action exists for employee

**Steps:**
1. Navigate to disciplinary action detail
2. Enter employee response/acknowledgment section
3. Record employee's response: "I acknowledge the warning and will improve my punctuality"
4. Set response date
5. Save

**Expected Results:**
- Employee response recorded against the disciplinary action
- Response date and text saved
- Status may update to reflect acknowledgment

---

#### TC-ENG-027: Self-service view disciplinary actions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /my-disciplinary (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Disciplinary action exists for the logged-in employee

**Steps:**
1. Login to self-service as the affected employee
2. Navigate to /my-disciplinary
3. View list of disciplinary actions

**Expected Results:**
- Employee sees only their own disciplinary records
- Each record shows: date, severity, reason, status
- Employee can view details but cannot edit or delete
- Severity badge displayed with appropriate color (Verbal=warning, Written=info, Final=danger, Suspension=danger, Termination=danger)

---

### E. Grievances

#### TC-ENG-028: Employee submits grievance via self-service
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /my-grievances (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Logged in to self-service portal as employee

**Steps:**
1. Navigate to /my-grievances
2. Click "Submit Grievance"
3. Select category: "Workplace Harassment"
4. Enter description: detailed account of the grievance
5. Attach supporting document (optional)
6. Click Submit

**Expected Results:**
- Grievance created with status "Submitted"
- Confirmation notification shown to employee
- Grievance appears in employee's /my-grievances list
- HR notified of new grievance submission
- Grievance ID assigned for tracking

---

#### TC-ENG-029: HR views and assigns grievance for investigation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-relations/grievances |
| **Role** | HR Manager |

**Preconditions:**
1. Grievance submitted by employee (from TC-ENG-028)

**Steps:**
1. Navigate to /employee-relations/grievances
2. View the submitted grievance
3. Assign investigator: select a manager or HR staff
4. Set SLA target date (e.g., 14 days from submission)
5. Update status to "Under Investigation"
6. Save

**Expected Results:**
- Investigator assigned to the grievance
- Status updated to "Under Investigation"
- SLA target date recorded
- Investigator notified of assignment
- Employee can see status update in self-service

---

#### TC-ENG-030: Resolve grievance with outcome
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-relations/grievances/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Grievance is under investigation

**Steps:**
1. Navigate to grievance detail
2. Enter resolution notes: "Investigation completed. Mediation session held between parties."
3. Set outcome: "Resolved"
4. Set resolution date
5. Save

**Expected Results:**
- Grievance status changes to "Resolved"
- Resolution notes and date saved
- Employee notified of resolution
- Grievance closed for further edits

---

#### TC-ENG-031: Grievance status tracking in self-service
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-grievances (Self-Service) |
| **Role** | Employee |

**Preconditions:**
1. Employee has submitted a grievance that has gone through multiple status changes

**Steps:**
1. Login to self-service as the employee
2. Navigate to /my-grievances
3. Click on the grievance to view details

**Expected Results:**
- Current status displayed prominently (Submitted / Under Investigation / Resolved / Closed)
- Status history/timeline shows each status change with date
- Employee can see assigned investigator (if applicable)
- Employee can see resolution notes once resolved

---

#### TC-ENG-032: Grievance SLA alert job
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | Background Job |
| **Role** | System |

**Preconditions:**
1. Grievance with SLA target date = today or overdue, still in "Under Investigation" status

**Steps:**
1. `GrievanceSlaAlertJob` runs on schedule
2. Job checks for grievances approaching or past SLA deadline

**Expected Results:**
- Alert notification sent to assigned investigator and HR manager
- Notification includes grievance ID, employee name, SLA deadline, days overdue
- Only active (non-resolved) grievances trigger alerts
- Escalation to senior HR if significantly overdue

---

### F. Investigations

#### TC-ENG-033: Create investigation case
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /employee-relations/investigations/create |
| **Role** | HR Manager |

**Preconditions:**
1. Logged in as HR Manager

**Steps:**
1. Navigate to /employee-relations/investigations/create
2. Enter case title: "Workplace Conduct Investigation - Case 2026-001"
3. Enter description of allegations
4. Select type: "Misconduct"
5. Assign lead investigator
6. Set start date
7. Link to related grievance (if applicable)
8. Click Save

**Expected Results:**
- Investigation case created with status "Open"
- Case ID assigned
- Lead investigator notified
- If linked to grievance, cross-reference visible on both records
- Success notification displayed

---

#### TC-ENG-034: Link investigation to grievance and disciplinary action
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /employee-relations/investigations/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Investigation case exists (from TC-ENG-033)
2. Related grievance and disciplinary action exist

**Steps:**
1. Navigate to investigation detail
2. Link to existing grievance (from TC-ENG-028)
3. Link to existing disciplinary action (from TC-ENG-023)
4. Save

**Expected Results:**
- Investigation shows linked grievance and disciplinary action
- Grievance detail page shows linked investigation
- Disciplinary action detail page shows linked investigation
- Cross-navigation between related records works

---

#### TC-ENG-035: Record investigation findings and outcome
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /employee-relations/investigations/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Investigation case is Open

**Steps:**
1. Navigate to investigation detail
2. Enter findings: detailed investigation summary
3. Select outcome: "Substantiated" (or "Unsubstantiated" / "Inconclusive")
4. Enter recommended actions
5. Set completion date
6. Close investigation

**Expected Results:**
- Investigation status changes to "Closed"
- Findings, outcome, and recommended actions saved
- Completion date recorded
- Linked grievance may be updated based on outcome
- Audit trail records the closure

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Announcements | 8 | 3 | 3 | 2 |
| B. Surveys | 10 | 4 | 5 | 1 |
| C. Counseling | 4 | 1 | 3 | 0 |
| D. Disciplinary | 5 | 2 | 3 | 0 |
| E. Grievances | 5 | 2 | 3 | 0 |
| F. Investigations | 3 | 2 | 1 | 0 |
| **TOTAL** | **35** | **14** | **18** | **3** |
