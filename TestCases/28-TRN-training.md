# TC-TRN: Training & Certification Management — Test Cases

## Module Overview

The Training module manages the full training lifecycle: programs and courses with delivery methods (Classroom, Online, Blended), scheduled sessions with capacity tracking, employee enrollments with completion tracking and certificate generation, and certification management with expiry alerts. Training categories organize content, and department budgets track training spend allocation. The `CertificationExpiryAlertJob` background job sends daily reminders for expiring certifications. The Self-Service Portal provides a training catalog, enrollment, and personal certification tracking.

**Admin Pages**: `/training/programs/*`, `/training/courses/*`, `/training/enrollments/*`, `/training/sessions/*`, `/training/certifications/*`, `/training/categories/*`, `/training/budgets/*`
**Self-Service Pages**: `/my-training`, `/training-catalog`, `/training/:id`, `/my-certifications`
**API Endpoints**: `/api/v1/training-programs`, `/api/v1/training-courses`, `/api/v1/training-sessions`, `/api/v1/training-enrollments`, `/api/v1/certifications`, `/api/v1/training-categories`, `/api/v1/training-budgets`
**Backend Entities**: `TrainingProgram`, `TrainingCourse`, `TrainingSession`, `TrainingEnrollment`, `Certification`, `TrainingCategory`, `TrainingBudget`
**Background Jobs**: `CertificationExpiryAlertJob`

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
| HR Manager | sara.fahad@company.com | Emp@123! | Department Manager, training admin |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Branch Manager |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Programs & Courses

#### TC-TRN-001: List training programs
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /training/programs |
| **Role** | HR Manager |

**Preconditions:**
1. User logged in with training management permissions

**Steps:**
1. Navigate to /training/programs

**Expected Results:**
- DataTable with columns: Program Name, Category, Duration, Delivery Method, Courses Count, Status, Actions
- UnifiedFilter with search, refresh, and Add Program button
- Filter by category and delivery method
- Pagination functional

---

#### TC-TRN-002: Create training program
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /training/programs/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /training/programs/create
2. Fill in: Name = "Leadership Development Program", Name (AR) = "برنامج تطوير القيادة"
3. Select Category = "Leadership"
4. Enter Description = "Comprehensive leadership skills development for managers"
5. Set Duration = "40 hours"
6. Set Delivery Method = "Blended"
7. Add Learning Objectives:
   - "Develop strategic thinking capabilities"
   - "Enhance team management skills"
   - "Master conflict resolution techniques"
8. Click Save

**Expected Results:**
- Program created with all fields
- Learning objectives stored as list
- Status = "Active" by default
- Success notification displayed
- Program appears in list

---

#### TC-TRN-003: Create training course within a program
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /training/courses/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /training/courses/create
2. Fill in: Name = "Strategic Leadership Fundamentals"
3. Select Program = "Leadership Development Program"
4. Select Category = "Leadership"
5. Set Duration = "8 hours"
6. Set Delivery Method = "Classroom"
7. Add Prerequisites = "Minimum 2 years in management role"
8. Add Learning Objectives = "Understand core leadership models"
9. Click Save

**Expected Results:**
- Course created and linked to program
- Program courses count incremented
- Prerequisites stored
- Success notification displayed

---

#### TC-TRN-004: Edit training course
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /training/courses/edit |
| **Role** | HR Manager |

**Steps:**
1. Edit "Strategic Leadership Fundamentals"
2. Change Duration to "12 hours"
3. Change Delivery Method to "Online"
4. Add additional learning objective
5. Click Save

**Expected Results:**
- Course updated
- Duration and delivery method changes reflected
- Existing enrollments not affected by course changes

---

#### TC-TRN-005: View training program with courses list
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /training/programs/view |
| **Role** | HR Manager |

**Steps:**
1. Click View on "Leadership Development Program"

**Expected Results:**
- DefinitionList: Name, Category, Duration, Delivery Method, Description, Status
- Learning objectives displayed as list
- Courses tab/section listing all courses in the program
- Enrollment statistics: total enrolled, completed, in progress
- StatusBadge for program status

---

#### TC-TRN-006: Delete training course — blocked if enrollments exist
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Negative |
| **Page** | /training/courses |
| **Role** | HR Manager |

**Preconditions:**
1. Course has active enrollments

**Steps:**
1. Click Delete on a course with enrollments
2. Confirm deletion

**Expected Results:**
- Deletion blocked: "Cannot delete course with active enrollments"
- Course remains in list

---

#### TC-TRN-007: Delivery method options validated
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /training/courses/create |
| **Role** | HR Manager |

**Steps:**
1. Open course create form
2. Check delivery method dropdown options

**Expected Results:**
- Three options available: Classroom, Online, Blended
- Selection is required (cannot save without choosing)
- Selected method stored correctly

---

#### TC-TRN-008: Course prerequisites displayed during enrollment
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /training/enrollments/create |
| **Role** | HR Manager |

**Steps:**
1. Select a course with prerequisites during enrollment creation
2. Observe prerequisite display

**Expected Results:**
- Prerequisites shown as informational text during enrollment
- Warning displayed if enrolling employee who may not meet prerequisites
- Enrollment not blocked (prerequisites are advisory, not enforced automatically)

---

### B. Sessions

#### TC-TRN-009: Schedule training session
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /training/sessions/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /training/sessions/create
2. Select Course = "Strategic Leadership Fundamentals"
3. Set Date = "2026-05-15"
4. Set Start Time = "09:00", End Time = "17:00"
5. Set Location = "Headquarters - Conference Room A"
6. Set Instructor = "Dr. Abdullah Salem"
7. Set Capacity = 20
8. Click Save

**Expected Results:**
- Session created with all scheduling details
- Capacity set to 20 (enrollment tracking starts at 0/20)
- Session appears in sessions list
- Success notification displayed

---

#### TC-TRN-010: View session with enrollment count
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /training/sessions/view |
| **Role** | HR Manager |

**Steps:**
1. Click View on a scheduled session

**Expected Results:**
- DefinitionList: Course, Date, Time, Location, Instructor, Capacity
- Enrollment count displayed: "8/20 enrolled"
- Progress bar showing capacity utilization
- List of enrolled employees
- Attendance tracking section (if session date has passed)

---

#### TC-TRN-011: Session capacity enforcement — enrollment rejected when full
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API |
| **Role** | HR Manager |

**Preconditions:**
1. Session capacity = 20
2. 20 employees already enrolled

**Steps:**
1. Attempt to enroll employee #21 into the session

**Expected Results:**
- Enrollment rejected: "Session is at full capacity (20/20)"
- Employee not enrolled
- Waitlist option offered (if supported)

---

#### TC-TRN-012: Edit session — reschedule date and time
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /training/sessions/edit |
| **Role** | HR Manager |

**Steps:**
1. Edit a scheduled session
2. Change Date from "2026-05-15" to "2026-05-22"
3. Change Location to "Jeddah Branch - Training Hall"
4. Click Save

**Expected Results:**
- Session rescheduled
- All enrolled employees notified of date/location change
- Enrollment records preserved

---

#### TC-TRN-013: Record session attendance
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /training/sessions/view |
| **Role** | HR Manager |

**Preconditions:**
1. Session date has passed
2. Employees were enrolled

**Steps:**
1. Open the session view
2. Mark attendance for each enrolled employee: Present / Absent
3. Click Save Attendance

**Expected Results:**
- Attendance recorded per employee
- Employees marked present update enrollment status to "Completed" (if single-session course)
- Absent employees marked accordingly
- Attendance percentage calculated for the session

---

### C. Enrollments

#### TC-TRN-014: Enroll employee in training course
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /training/enrollments/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /training/enrollments/create
2. Select Employee = "Salma Al-Khaldi"
3. Select Course = "Strategic Leadership Fundamentals"
4. Select Session = "2026-05-15 session"
5. Click Enroll

**Expected Results:**
- Enrollment created with status = "Pending"
- Session enrollment count incremented (e.g., 9/20)
- Employee notified of enrollment
- Success notification displayed

---

#### TC-TRN-015: Enrollment status lifecycle
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /training/enrollments |
| **Role** | HR Manager |

**Steps:**
1. Verify enrollment status transitions:
   - Pending -> Confirmed (via HR confirmation or auto-confirm)
   - Confirmed -> Completed (after attending session)
   - Confirmed -> Cancelled (via cancellation)
   - Confirmed -> Failed (did not meet completion criteria)
2. Attempt invalid transition: Completed -> Pending

**Expected Results:**
- Valid transitions succeed with status badge updates:
  - Pending (warning), Confirmed (info), Completed (success), Cancelled (secondary), Failed (danger)
- Invalid transitions rejected
- Each transition logged

---

#### TC-TRN-016: Complete enrollment — generate certificate
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /training/enrollments |
| **Role** | HR Manager |

**Preconditions:**
1. Employee attended session and enrollment marked Completed

**Steps:**
1. Open completed enrollment
2. Click "Generate Certificate"

**Expected Results:**
- Certificate generated with:
  - Employee name
  - Course name
  - Completion date
  - Certificate number (unique)
- Certificate linked as FileAttachment
- Certification record created in certifications table (if applicable)
- Certificate downloadable as PDF

---

#### TC-TRN-017: Cancel enrollment
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /training/enrollments |
| **Role** | HR Manager |

**Steps:**
1. Open a Confirmed enrollment
2. Click "Cancel"
3. Enter cancellation reason
4. Confirm

**Expected Results:**
- Status changes to "Cancelled"
- Session enrollment count decremented (capacity freed)
- Employee notified of cancellation
- Cancellation reason stored

---

#### TC-TRN-018: Bulk enroll multiple employees
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /training/enrollments |
| **Role** | HR Manager |

**Steps:**
1. Navigate to enrollment page
2. Select a session
3. Select multiple employees (e.g., entire IT department)
4. Click "Enroll Selected"

**Expected Results:**
- All selected employees enrolled
- Session capacity checked (enrollment stops if capacity reached)
- Summary shown: "15 enrolled, 2 skipped (capacity full)"
- Each enrollment creates a separate record

---

### D. Certifications

#### TC-TRN-019: Track employee certification
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /training/certifications |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /training/certifications
2. Click "Add Certification"
3. Select Employee = "Ahmed Al-Rashid"
4. Enter Certification Name = "PMP - Project Management Professional"
5. Set Issue Date = "2025-01-15"
6. Set Expiry Date = "2028-01-15"
7. Enter Issuing Organization = "PMI"
8. Enter Certificate Number = "PMP-2025-12345"
9. Upload certificate document (PDF)
10. Click Save

**Expected Results:**
- Certification record created
- Expiry date tracked
- Document attached via FileAttachment
- Certification appears in employee's certification list
- Success notification displayed

---

#### TC-TRN-020: Certification expiry date alert — CertificationExpiryAlertJob
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | API / Background Job |
| **Role** | System |

**Preconditions:**
1. Certification with expiry date within 30 days exists
2. `CertificationExpiryAlertJob` is scheduled (daily run)

**Steps:**
1. Trigger or wait for `CertificationExpiryAlertJob` execution
2. Check notifications for the employee and their manager

**Expected Results:**
- Job identifies certifications expiring within configured alert window (e.g., 30, 60, 90 days)
- Notification sent to:
  - Employee: "Your PMP certification expires on 2028-01-15"
  - HR Manager: "Employee Ahmed Al-Rashid's PMP certification expiring soon"
- Job iterates all active tenants via `TenantIteratingJob` base class
- Expired certifications flagged with "Expired" status

---

#### TC-TRN-021: Certification renewal tracking
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /training/certifications |
| **Role** | HR Manager |

**Steps:**
1. Open an expired or expiring certification
2. Click "Renew"
3. Update Issue Date, Expiry Date, Certificate Number
4. Upload new certificate document
5. Click Save

**Expected Results:**
- Certification updated with new dates
- Previous certificate document preserved (history)
- Status changes from "Expired"/"Expiring" to "Active"
- Renewal date logged

---

#### TC-TRN-022: List certifications with expiry filter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /training/certifications |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /training/certifications
2. Filter by Status = "Expiring Soon" (within 90 days)
3. Filter by Department

**Expected Results:**
- DataTable shows: Employee, Certification Name, Issue Date, Expiry Date, Status, Actions
- Status badges: Active (success), Expiring Soon (warning), Expired (danger)
- Sortable by expiry date
- Export to CSV available

---

### E. Categories & Budgets

#### TC-TRN-023: Create training category
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /training/categories |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /training/categories
2. Click "Add Category"
3. Fill in: Name = "Technical Skills", Name (AR) = "المهارات التقنية", Description = "Programming, architecture, DevOps"
4. Click Save

**Expected Results:**
- Category created
- Available for program and course classification
- Success notification displayed

---

#### TC-TRN-024: Edit and delete training category
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /training/categories |
| **Role** | HR Manager |

**Steps:**
1. Edit "Technical Skills" — change description
2. Delete an unused category
3. Attempt to delete a category with linked courses

**Expected Results:**
- Edit succeeds, description updated
- Unused category deleted successfully
- Category with courses: deletion blocked with error message

---

#### TC-TRN-025: Allocate training budget per department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /training/budgets |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /training/budgets
2. Click "Add Budget"
3. Select Department = "IT"
4. Set Year = 2026
5. Set Budget Amount = 100,000 SAR
6. Click Save

**Expected Results:**
- Budget allocation created for IT department, year 2026
- Budget amount stored
- One budget per department per year (duplicate blocked)
- Success notification displayed

---

#### TC-TRN-026: Track training spend against budget
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /training/budgets |
| **Role** | HR Manager |

**Preconditions:**
1. Budget allocated for IT department = 100,000 SAR
2. Training enrollments exist for IT employees with associated costs

**Steps:**
1. Navigate to /training/budgets
2. View IT department budget for 2026

**Expected Results:**
- Budget summary: Allocated = 100,000, Spent = 35,000, Remaining = 65,000
- Progress bar showing utilization (35%)
- Breakdown by category or course
- Warning if approaching budget limit (e.g., >80% utilized)

---

### F. Self-Service

#### TC-TRN-027: Employee views own training history (My Training)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-training |
| **Role** | Employee (Self-Service) |

**Steps:**
1. Login to Self-Service Portal as salma.khaldi@company.com
2. Navigate to /my-training

**Expected Results:**
- Employee sees own enrollments only
- List shows: Course Name, Date, Status, Completion, Certificate
- Completed courses show certificate download link
- Upcoming sessions highlighted
- Cannot see other employees' training data

---

#### TC-TRN-028: Employee browses training catalog
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /training-catalog |
| **Role** | Employee (Self-Service) |

**Steps:**
1. Navigate to /training-catalog

**Expected Results:**
- Card-based or list view of available courses/programs
- Each card shows: Name, Category, Duration, Delivery Method, Upcoming Sessions
- Filter by category, delivery method
- Search by course name
- "Enroll" or "Request Enrollment" button per course (if self-enrollment enabled)

---

#### TC-TRN-029: Employee views course detail
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /training/:id |
| **Role** | Employee (Self-Service) |

**Steps:**
1. Click on a course in the training catalog

**Expected Results:**
- Course detail page shows: Name, Description, Duration, Delivery Method, Prerequisites, Learning Objectives
- Upcoming sessions listed with dates, locations, and available seats
- "Enroll" button for sessions with available capacity
- Already enrolled indicator if employee is already registered

---

#### TC-TRN-030: Employee views own certifications (My Certifications)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-certifications |
| **Role** | Employee (Self-Service) |

**Steps:**
1. Navigate to /my-certifications

**Expected Results:**
- Employee sees only own certifications
- List shows: Certification Name, Issuing Organization, Issue Date, Expiry Date, Status
- Status badges: Active (success), Expiring Soon (warning), Expired (danger)
- Download certificate document link available
- Expiring certifications highlighted at top
- Cannot see other employees' certifications

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Programs & Courses | 8 | 3 | 4 | 1 |
| B. Sessions | 5 | 2 | 3 | 0 |
| C. Enrollments | 5 | 3 | 1 | 1 |
| D. Certifications | 4 | 2 | 2 | 0 |
| E. Categories & Budgets | 4 | 1 | 3 | 0 |
| F. Self-Service | 4 | 3 | 1 | 0 |
| **TOTAL** | **30** | **14** | **14** | **2** |
