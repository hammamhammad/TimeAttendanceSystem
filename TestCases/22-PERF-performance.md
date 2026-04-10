# TC-PERF: Performance Management — Test Cases

## Module Overview

The Performance Management module provides a full-cycle performance evaluation system including review cycles, individual performance reviews, goal setting and tracking, competency frameworks, performance improvement plans (PIPs), and 360-degree feedback. Background jobs handle review reminders (`ReviewCycleReminderJob` daily at 7:00 AM) and PIP expiry checks (`PIPExpiryCheckJob` daily at 6:00 AM).

**Admin Pages**: `/performance/cycles`, `/performance/cycles/create`, `/performance/cycles/:id`, `/performance/cycles/:id/edit`, `/performance/reviews`, `/performance/reviews/create`, `/performance/reviews/:id`, `/performance/goals`, `/performance/goals/create`, `/performance/goals/:id`, `/performance/competencies`, `/performance/competencies/create`, `/performance/competencies/:id`, `/performance/pips`, `/performance/pips/create`, `/performance/pips/:id`, `/performance/feedback-requests`, `/performance/feedback-requests/create`, `/performance/feedback-requests/:id`
**API Endpoints**: `ReviewCyclesController`, `PerformanceReviewsController`, `GoalsController`, `CompetenciesController`, `PIPsController`, `FeedbackController`
**Background Jobs**: `ReviewCycleReminderJob` (daily 7:00 AM), `PIPExpiryCheckJob` (daily 6:00 AM)

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
| HR Manager | sara.fahad@company.com | (changed) | Performance management permissions |
| Branch Manager | ahmed.rashid@company.com | (changed) | Reviewer role |
| Employee | salma.khaldi@company.com | (changed) | Reviewee |

---

## Test Cases

### A. Review Cycles

#### TC-PERF-001: List review cycles page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /performance/cycles |
| **Role** | HR Manager |

**Preconditions:**
1. User logged in with review cycle management permissions

**Steps:**
1. Navigate to /performance/cycles

**Expected Results:**
- Page renders with DataTableComponent showing review cycles
- Columns include: Name, Type, Start Date, End Date, Status, Actions
- UnifiedFilterComponent with search, refresh, and Add button
- Pagination visible

---

#### TC-PERF-002: Create review cycle with all 7 types
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/cycles/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/cycles/create
2. Enter name: "2026 Annual Review"
3. Select type: "Annual"
4. Set start date: 2026-01-01
5. Set end date: 2026-12-31
6. Click Save

**Expected Results:**
- Review cycle created with status "Draft"
- All 7 cycle types selectable: Annual, SemiAnnual, Quarterly, Monthly, Probation, ProjectBased, 360Degree
- Success notification displayed

**Cycle Type Reference:**

| Type | Typical Duration |
|------|-----------------|
| Annual | 12 months |
| SemiAnnual | 6 months |
| Quarterly | 3 months |
| Monthly | 1 month |
| Probation | 3-6 months |
| ProjectBased | Variable |
| 360Degree | Variable |

---

#### TC-PERF-003: Review cycle status transitions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/cycles/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Review cycle exists in "Draft" status

**Steps:**
1. View cycle in Draft status
2. Activate the cycle (change status to Active)
3. Start reviews (status to InProgress)
4. Complete all reviews (status to Completed)
5. Close the cycle (status to Closed)

**Expected Results:**
- Valid transitions: Draft -> Active -> InProgress -> Completed -> Closed
- Each transition updates the status badge
- Cannot skip statuses (e.g., Draft directly to Completed)
- Closed cycle cannot be reopened

**Status Transition Table:**

| From | To | Action |
|------|----|--------|
| Draft | Active | Activate cycle |
| Active | InProgress | Start reviews |
| InProgress | Completed | All reviews submitted |
| Completed | Closed | Close cycle |

---

#### TC-PERF-004: Edit review cycle in Draft status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/cycles/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Review cycle in Draft status

**Steps:**
1. Navigate to /performance/cycles/{id}/edit
2. Change name to "2026 H1 Review"
3. Change type to "SemiAnnual"
4. Update end date to 2026-06-30
5. Save

**Expected Results:**
- Cycle updated successfully
- Changes reflected on view page

---

#### TC-PERF-005: Cannot edit review cycle in Closed status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/cycles/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Review cycle in Closed status

**Steps:**
1. Navigate to /performance/cycles/{id}
2. Attempt to edit

**Expected Results:**
- Edit button hidden or disabled
- Direct URL navigation to edit page shows read-only or redirects
- API returns 400 error if PUT attempted

---

#### TC-PERF-006: Assign employees to review cycle
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/cycles/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Review cycle exists in Draft or Active status

**Steps:**
1. Navigate to review cycle view
2. Click "Add Employees" or "Select Participants"
3. Select employees by department, branch, or individual
4. Save selection

**Expected Results:**
- Selected employees linked to the review cycle
- Employee count updated on cycle details
- Each employee can have a review created for them

---

#### TC-PERF-007: Delete review cycle in Draft status
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/cycles |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/cycles
2. Click delete on a Draft cycle
3. Confirm deletion

**Expected Results:**
- Cycle deleted successfully
- Cannot delete cycle in Active, InProgress, Completed, or Closed status

---

#### TC-PERF-008: Review cycle date range validation
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /performance/cycles/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/cycles/create
2. Set start date: 2026-06-30
3. Set end date: 2026-01-01 (before start date)
4. Click Save

**Expected Results:**
- Validation error: end date must be after start date
- Cycle not created

---

### B. Performance Reviews

#### TC-PERF-009: Create performance review for employee in cycle
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/reviews/create |
| **Role** | HR Manager |

**Preconditions:**
1. Active review cycle exists with employees assigned

**Steps:**
1. Navigate to /performance/reviews/create
2. Select review cycle
3. Select employee: Salma Khaldi
4. Assign reviewer: Ahmed Al-Rashid (Branch Manager)
5. Click Create

**Expected Results:**
- Performance review created linked to cycle and employee
- Reviewer assigned
- Review status: Draft or Pending
- Appears in the reviewer's pending reviews list

---

#### TC-PERF-010: Fill out performance review with overall rating
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/reviews/:id |
| **Role** | Branch Manager (Reviewer) |

**Preconditions:**
1. Performance review assigned to current user as reviewer

**Steps:**
1. Navigate to /performance/reviews/{id}
2. Set overall rating: 4 (out of 5)
3. Enter strengths: "Excellent communication and teamwork"
4. Enter areas for improvement: "Time management for complex projects"
5. Review employee's goals progress
6. Save as draft

**Expected Results:**
- Review saved with:
  - Overall rating: 4/5
  - Strengths text saved
  - Areas for improvement text saved
- Status remains Draft (not submitted)

**Rating Scale:**

| Rating | Label |
|--------|-------|
| 1 | Needs Improvement |
| 2 | Below Expectations |
| 3 | Meets Expectations |
| 4 | Exceeds Expectations |
| 5 | Outstanding |

---

#### TC-PERF-011: Submit performance review
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/reviews/:id |
| **Role** | Branch Manager (Reviewer) |

**Steps:**
1. Open a draft review with all fields filled
2. Click Submit
3. Confirm submission

**Expected Results:**
- Review status changes to "Submitted"
- Review becomes read-only for reviewer
- HR Manager can see submitted review for approval
- Notification sent to HR Manager

---

#### TC-PERF-012: Approve submitted performance review
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/reviews/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Performance review in Submitted status

**Steps:**
1. Navigate to /performance/reviews/{id}
2. Review the submitted evaluation
3. Click Approve

**Expected Results:**
- Review status changes to "Approved"
- Review finalized and locked
- Employee can view their approved review (if self-service access enabled)

---

#### TC-PERF-013: Reject submitted performance review with comments
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/reviews/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to a submitted review
2. Click Reject
3. Enter rejection reason: "Please provide more specific examples in strengths section"
4. Confirm

**Expected Results:**
- Review status changes back to Draft or Returned
- Reviewer notified of rejection with reason
- Reviewer can edit and resubmit

---

#### TC-PERF-014: Rating validation — must be between 1 and 5
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /performance/reviews/:id |
| **Role** | Branch Manager |

**Steps:**
1. Open a review for editing
2. Try to set overall rating to 0
3. Try to set overall rating to 6
4. Try to leave rating empty and submit

**Expected Results:**
- Rating 0: validation error, must be at least 1
- Rating 6: validation error, must be at most 5
- Empty rating: validation error, rating is required for submission
- Valid range: 1 through 5 (integers)

---

#### TC-PERF-015: Reviewer assignment is required
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /performance/reviews/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to create review
2. Select cycle and employee
3. Leave reviewer field empty
4. Click Create

**Expected Results:**
- Validation error: reviewer is required
- Review not created

---

### C. Goals

#### TC-PERF-016: Create goal with SMART criteria fields
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/goals/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/goals/create
2. Select employee: Salma Khaldi
3. Select review cycle (optional alignment)
4. Enter goal title: "Improve customer satisfaction score"
5. Enter description with SMART criteria:
   - Specific: "Increase NPS score from current baseline"
   - Measurable: "Achieve NPS of 85+"
   - Achievable: "Through improved response time and follow-ups"
   - Relevant: "Aligned with department KPIs"
   - Time-bound: "By end of Q2 2026"
6. Set weight: 30 (out of 100)
7. Set target date: 2026-06-30
8. Click Save

**Expected Results:**
- Goal created with all SMART fields populated
- Weight set to 30%
- Progress initialized at 0%
- Goal linked to employee and optionally to review cycle

---

#### TC-PERF-017: Track goal progress 0-100%
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/goals/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Goal exists with progress at 0%

**Steps:**
1. Navigate to /performance/goals/{id}
2. Update progress to 25%
3. Save
4. Update progress to 75%
5. Save
6. Update progress to 100%
7. Save

**Expected Results:**
- Progress field accepts values 0 through 100
- Progress bar updates visually with each change
- At 100%: goal can be marked as completed
- Progress history may be tracked

---

#### TC-PERF-018: Goal weight validation — 0 to 100
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /performance/goals/create |
| **Role** | HR Manager |

**Steps:**
1. Create a goal with weight: -1
2. Create a goal with weight: 101
3. Create a goal with weight: 0
4. Create a goal with weight: 100

**Expected Results:**
- Weight -1: validation error
- Weight 101: validation error
- Weight 0: accepted (valid minimum)
- Weight 100: accepted (valid maximum)

---

#### TC-PERF-019: Weight-based scoring formula
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/goals |
| **Role** | HR Manager |

**Preconditions:**
1. Employee has 3 goals:
   - Goal A: weight 40%, progress 100%
   - Goal B: weight 35%, progress 80%
   - Goal C: weight 25%, progress 60%

**Steps:**
1. View employee's goal summary or performance review

**Expected Results:**
- Weighted score calculated as: (40 x 1.0) + (35 x 0.8) + (25 x 0.6) = 40 + 28 + 15 = 83%
- Overall goal achievement displayed as 83%
- Individual goal contributions visible

---

#### TC-PERF-020: Edit existing goal
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/goals/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/goals/{id}
2. Update title, description, weight, or target date
3. Save

**Expected Results:**
- Goal updated successfully
- Changes reflected in view page
- Audit trail records the modification

---

#### TC-PERF-021: Delete goal
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /performance/goals |
| **Role** | HR Manager |

**Steps:**
1. Navigate to goals list
2. Delete a goal
3. Confirm deletion

**Expected Results:**
- Goal deleted
- Removed from employee's goal list
- Weight distribution adjusted (remaining goals may need rebalancing)

---

#### TC-PERF-022: Goal alignment to review cycle
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /performance/goals/create |
| **Role** | HR Manager |

**Steps:**
1. Create a goal and select a review cycle for alignment
2. View the goal details

**Expected Results:**
- Goal linked to the selected review cycle
- Goal appears in the employee's review within that cycle
- Goal progress visible during performance review

---

#### TC-PERF-023: Goal progress validation — cannot exceed 100%
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /performance/goals/:id |
| **Role** | HR Manager |

**Steps:**
1. Open a goal for editing
2. Set progress to 105%
3. Save

**Expected Results:**
- Validation error: progress cannot exceed 100%
- Progress not updated

---

### D. Competencies

#### TC-PERF-024: Create competency framework
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/competencies/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/competencies/create
2. Enter competency name: "Communication Skills"
3. Enter description
4. Define proficiency levels:
   - Beginner: "Basic verbal and written communication"
   - Intermediate: "Clear and effective communication with stakeholders"
   - Advanced: "Persuasive communication, presentation skills"
   - Expert: "Strategic communication leadership, executive presence"
5. Click Save

**Expected Results:**
- Competency created with 4 proficiency levels
- Each level has name and description
- Competency available for use in reviews

---

#### TC-PERF-025: List and view competencies
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /performance/competencies |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/competencies
2. Click on a competency to view details

**Expected Results:**
- List page shows all competencies with name, level count, and status
- View page shows competency details with all proficiency levels
- DefinitionListComponent used for details

---

#### TC-PERF-026: Assign competency to department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/competencies/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to a competency
2. Assign to IT department with required level: "Intermediate"
3. Assign to HR department with required level: "Advanced"
4. Save

**Expected Results:**
- Competency linked to departments with minimum required levels
- Department-specific requirements visible on competency view
- Used during performance reviews to evaluate employees against department standards

---

#### TC-PERF-027: Edit competency proficiency levels
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/competencies/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to competency edit page
2. Update description of "Advanced" level
3. Save

**Expected Results:**
- Level description updated
- Existing reviews using this competency not affected
- Changes apply to new reviews only

---

#### TC-PERF-028: Delete competency not in use
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /performance/competencies |
| **Role** | HR Manager |

**Steps:**
1. Delete a competency that has no reviews referencing it
2. Confirm deletion

**Expected Results:**
- Competency deleted successfully
- If competency is referenced by active reviews, deletion blocked with error message

---

### E. Performance Improvement Plans (PIPs)

#### TC-PERF-029: Create PIP for underperforming employee
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/pips/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/pips/create
2. Select employee: Salma Khaldi
3. Enter reason: "Below expectations in Q1 review"
4. Set duration: 90 days
5. Set start date: today
6. Add milestones:
   - "Complete time management training" (Due: 30 days)
   - "Achieve 80% on-time delivery rate" (Due: 60 days)
   - "Maintain consistent performance for 30 days" (Due: 90 days)
7. Click Save

**Expected Results:**
- PIP created with status "Active"
- 3 milestones created with calculated due dates
- Employee and manager notified
- PIP end date = start date + 90 days

---

#### TC-PERF-030: Add check-in dates to PIP
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/pips/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Active PIP exists

**Steps:**
1. Navigate to PIP view page
2. Add check-in dates: Day 15, Day 30, Day 45, Day 60, Day 75
3. Add notes for first check-in: "Initial assessment completed, training enrolled"
4. Save

**Expected Results:**
- Check-in dates recorded on the PIP
- Notes saved for completed check-ins
- Upcoming check-ins visible with dates

---

#### TC-PERF-031: PIP milestone completion tracking
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/pips/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to active PIP
2. Mark first milestone "Complete time management training" as completed
3. Add completion notes

**Expected Results:**
- Milestone status changes to Completed
- Completion date recorded
- Progress indicator updates (1/3 milestones complete)

---

#### TC-PERF-032: PIP outcome — Improved
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/pips/:id |
| **Role** | HR Manager |

**Preconditions:**
1. PIP with all milestones completed

**Steps:**
1. Navigate to PIP
2. Set outcome: "Improved"
3. Add final notes: "Employee met all milestones and demonstrated sustained improvement"
4. Close PIP

**Expected Results:**
- PIP status changes to "Closed" with outcome "Improved"
- Employee record updated accordingly
- Positive outcome noted in employee's performance history

---

#### TC-PERF-033: PIP outcome — Extended
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/pips/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to active PIP nearing end date
2. Set outcome: "Extended"
3. Set new end date (additional 30 days)
4. Add notes: "Partial improvement shown, extending for additional observation"

**Expected Results:**
- PIP duration extended with new end date
- Original milestones preserved
- New milestones can be added
- Status remains Active

---

#### TC-PERF-034: PIPExpiryCheckJob processes expired PIPs
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API / Background Job |
| **Role** | System |

**Preconditions:**
1. Active PIP with end date = yesterday
2. No outcome has been set

**Steps:**
1. `PIPExpiryCheckJob` runs at 6:00 AM daily
2. Job iterates all active tenants via `TenantIteratingJob`
3. Checks all active PIPs with end date < today

**Expected Results:**
- Expired PIP flagged for review
- Notification sent to HR Manager
- PIP status may change to "Expired" or "PendingReview"
- HR Manager must set final outcome manually

---

### F. 360-Degree Feedback

#### TC-PERF-035: Create 360 feedback request
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/feedback-requests/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /performance/feedback-requests/create
2. Select subject employee: Salma Khaldi
3. Select rater types: Manager, Peer, DirectReport, Self
4. Select specific raters:
   - Manager: Ahmed Al-Rashid
   - Peer: Two colleagues from same department
   - DirectReport: (if applicable)
   - Self: Salma Khaldi (auto-included)
5. Set due date for feedback submission
6. Toggle anonymous: Yes
7. Click Create

**Expected Results:**
- Feedback request created for each selected rater
- Notifications sent to all raters
- Each rater gets a separate feedback form
- Anonymous flag set for peer and direct report feedback

---

#### TC-PERF-036: Rater types available
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /performance/feedback-requests/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to create feedback request
2. Check available rater types

**Expected Results:**
- Four rater types available:
  - **Manager**: Direct supervisor
  - **Peer**: Same-level colleague
  - **DirectReport**: Subordinate employee
  - **Self**: The employee themselves
- Each type clearly labeled
- At least one rater type must be selected

---

#### TC-PERF-037: Submit 360 feedback response
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /performance/feedback-requests/:id |
| **Role** | Branch Manager (as rater) |

**Preconditions:**
1. Feedback request exists with current user as rater

**Steps:**
1. Navigate to the feedback request
2. Rate technical skills: 4/5
3. Rate communication: 5/5
4. Rate culture fit: 4/5
5. Rate overall: 4/5
6. Add written comments: "Strong team player with excellent technical skills"
7. Submit feedback

**Expected Results:**
- Feedback response recorded
- Rater status updated to "Submitted"
- Cannot edit after submission
- Anonymous responses do not show rater identity

---

#### TC-PERF-038: Anonymous feedback hides rater identity
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/feedback-requests/:id |
| **Role** | HR Manager |

**Preconditions:**
1. 360 feedback with anonymous flag = true
2. Multiple responses submitted

**Steps:**
1. Navigate to feedback results
2. View individual responses

**Expected Results:**
- Rater names NOT displayed for anonymous responses
- Feedback shows rater type (Peer, DirectReport) but not name
- Manager and Self-assessment may show identity (configurable)
- HR Manager can see aggregated results

---

#### TC-PERF-039: Aggregate 360 feedback results
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /performance/feedback-requests/:id |
| **Role** | HR Manager |

**Preconditions:**
1. All raters have submitted feedback

**Steps:**
1. Navigate to feedback request view
2. View aggregated results

**Expected Results:**
- Average ratings calculated per competency area:
  - Technical: (sum of all rater scores) / (number of raters)
  - Communication: averaged
  - Culture Fit: averaged
  - Overall: averaged
- Breakdown by rater type (Manager avg, Peer avg, DirectReport avg, Self)
- Visual chart or comparison view

---

#### TC-PERF-040: Feedback request due date enforcement
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /performance/feedback-requests/:id |
| **Role** | System |

**Preconditions:**
1. Feedback request with due date = yesterday
2. Some raters have not submitted

**Steps:**
1. Check feedback request status after due date

**Expected Results:**
- Overdue raters flagged
- Reminder notifications sent (via ReviewCycleReminderJob or dedicated job)
- HR Manager can extend due date or close without all responses
- Partial results available for submitted feedback

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Review Cycles | 8 | 3 | 4 | 0 | 0 |
| B. Reviews | 7 | 3 | 3 | 0 | 0 |
| C. Goals | 8 | 2 | 4 | 2 | 0 |
| D. Competencies | 5 | 1 | 3 | 1 | 0 |
| E. PIPs | 6 | 2 | 3 | 0 | 0 |
| F. 360 Feedback | 6 | 2 | 2 | 1 | 0 |
| **TOTAL** | **40** | **13** | **19** | **4** | **0** |
