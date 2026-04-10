# TC-ONB: Onboarding — Test Cases

## Module Overview

The Onboarding module enables HR teams to create reusable onboarding templates with categorized tasks, launch onboarding processes for new hires, track task completion, upload documents, and monitor progress via a dashboard. The `OnboardingTaskOverdueJob` background job marks tasks as overdue daily at 5:00 AM.

**Admin Pages**: `/onboarding/templates`, `/onboarding/templates/create`, `/onboarding/templates/:id`, `/onboarding/templates/:id/edit`, `/onboarding/processes`, `/onboarding/processes/create`, `/onboarding/processes/:id`, `/onboarding/dashboard`
**API Endpoints**: `OnboardingTemplatesController`, `OnboardingProcessesController`, `OnboardingDashboardController`
**Backend Handlers**: `CreateOnboardingTemplateCommandHandler`, `UpdateOnboardingTemplateCommandHandler`, `DeleteOnboardingTemplateCommandHandler`, `CreateOnboardingProcessCommandHandler`, `CompleteOnboardingTaskCommandHandler`
**Background Job**: `OnboardingTaskOverdueJob` (daily at 5:00 AM)

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
| HR Manager | sara.fahad@company.com | (changed) | Onboarding permissions |
| Employee | salma.khaldi@company.com | (changed) | Regular employee |

---

## Test Cases

### A. Onboarding Templates

#### TC-ONB-001: List onboarding templates page renders correctly
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /onboarding/templates |
| **Role** | HR Manager |

**Preconditions:**
1. User is logged in with onboarding template view permissions
2. At least one onboarding template exists

**Steps:**
1. Navigate to /onboarding/templates

**Expected Results:**
- Page renders with DataTableComponent showing templates
- Columns include: Name, Description, Category Count, Task Count, Status, Actions
- UnifiedFilterComponent with search, refresh, and Add button
- Pagination component visible if templates exceed page size

---

#### TC-ONB-002: Create onboarding template with all task categories
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /onboarding/templates/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /onboarding/templates/create
2. Enter template name: "Standard New Hire Onboarding"
3. Enter description: "Comprehensive onboarding for all new employees"
4. Add tasks for each of the 7 categories:
   - **Documentation**: "Submit ID copy" (Priority: High, Due Offset: 1 day, Mandatory: true)
   - **IT**: "Set up workstation" (Priority: High, Due Offset: 2 days, Mandatory: true)
   - **HR**: "Complete benefits enrollment" (Priority: Medium, Due Offset: 5 days, Mandatory: true)
   - **Training**: "Complete orientation training" (Priority: Medium, Due Offset: 7 days, Mandatory: true)
   - **Equipment**: "Issue laptop and badge" (Priority: High, Due Offset: 1 day, Mandatory: true)
   - **Access**: "Grant system access" (Priority: High, Due Offset: 2 days, Mandatory: true)
   - **Introduction**: "Meet team members" (Priority: Low, Due Offset: 3 days, Mandatory: false)
5. Click Save

**Expected Results:**
- Template created successfully
- All 7 tasks saved with correct categories, priorities, due offsets, and mandatory flags
- Success notification displayed
- Redirect to template list or view page

---

#### TC-ONB-003: Edit existing onboarding template
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /onboarding/templates/:id/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Template from TC-ONB-002 exists

**Steps:**
1. Navigate to /onboarding/templates/{id}/edit
2. Change name to "Updated New Hire Onboarding"
3. Add a new task: "Review company handbook" (Category: Training, Priority: Low, Due Offset: 10 days, Mandatory: false)
4. Remove the "Meet team members" task
5. Click Save

**Expected Results:**
- Template updated with new name
- New task added successfully
- Removed task no longer present
- Total task count updated accordingly

---

#### TC-ONB-004: Delete onboarding template
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /onboarding/templates |
| **Role** | HR Manager |

**Preconditions:**
1. Template exists with no active onboarding processes using it

**Steps:**
1. Navigate to /onboarding/templates
2. Click delete action on a template
3. Confirmation dialog appears
4. Confirm deletion

**Expected Results:**
- Template deleted successfully
- Removed from template list
- Success notification displayed

---

#### TC-ONB-005: View onboarding template details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /onboarding/templates/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Template with tasks exists

**Steps:**
1. Navigate to /onboarding/templates/{id}

**Expected Results:**
- Template details displayed with DefinitionListComponent (name, description, creation date)
- Tasks grouped by category with StatusBadgeComponent for priority
- Each task shows: name, category, priority, due offset (days), assignee type, mandatory flag
- Mandatory tasks marked with distinct badge

---

#### TC-ONB-006: Validate template name is required
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /onboarding/templates/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /onboarding/templates/create
2. Leave name field empty
3. Add at least one task
4. Click Save

**Expected Results:**
- Validation error displayed: name is required
- Form not submitted
- Template not created

---

#### TC-ONB-007: Task priority options are correct
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /onboarding/templates/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /onboarding/templates/create
2. Add a new task
3. Open the Priority dropdown

**Expected Results:**
- Priority options available: High, Medium, Low
- Default priority is Medium
- Priority displayed with appropriate color badges

---

#### TC-ONB-008: Task assignee type options are correct
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /onboarding/templates/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /onboarding/templates/create
2. Add a new task
3. Open the Assignee Type dropdown

**Expected Results:**
- Assignee type options include: HR, IT, Manager, Department Head, Specific User
- Selected assignee type saved with the task
- When "Specific User" selected, additional user selection field appears

---

### B. Onboarding Processes

#### TC-ONB-009: Create onboarding process from template for employee
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /onboarding/processes/create |
| **Role** | HR Manager |

**Preconditions:**
1. Onboarding template exists with 7 tasks
2. Employee "salma.khaldi@company.com" exists

**Steps:**
1. Navigate to /onboarding/processes/create
2. Select employee: Salma Khaldi
3. Select template: "Standard New Hire Onboarding"
4. Set start date: today
5. Click Create

**Expected Results:**
- Onboarding process created with status "NotStarted"
- All 7 tasks from template generated as individual process tasks
- Each task has due date calculated from start date + due offset
- Success notification displayed
- Redirect to process view page

---

#### TC-ONB-010: View onboarding process with task list
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /onboarding/processes/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Onboarding process from TC-ONB-009 exists

**Steps:**
1. Navigate to /onboarding/processes/{id}

**Expected Results:**
- Process details shown: employee name, template name, start date, status, completion percentage
- Task list displayed grouped by category
- Each task shows: name, assigned to, due date, status (Pending/InProgress/Completed/Overdue), mandatory badge
- Completion progress bar visible (0% initially)

---

#### TC-ONB-011: Mark onboarding task as complete
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /onboarding/processes/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Onboarding process with pending tasks exists

**Steps:**
1. Navigate to /onboarding/processes/{id}
2. Click "Complete" on the "Submit ID copy" task
3. Confirm completion

**Expected Results:**
- Task status changes to "Completed"
- Completion date recorded
- Overall completion percentage updated (e.g., 1/7 = ~14%)
- Progress bar reflects new percentage

---

#### TC-ONB-012: Assign onboarding task to specific user
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /onboarding/processes/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to an onboarding process
2. Click "Assign" on the "Set up workstation" task
3. Select IT staff member from user dropdown
4. Save assignment

**Expected Results:**
- Task assigned to the selected user
- Assigned user name displayed on the task
- Notification sent to assigned user (if notification system active)

---

#### TC-ONB-013: Upload document to onboarding process
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /onboarding/processes/:id |
| **Role** | HR Manager |

**Steps:**
1. Navigate to onboarding process view
2. Click "Upload Document" or navigate to documents section
3. Select a PDF file (under 10MB)
4. Provide document name: "Employee ID Copy"
5. Upload

**Expected Results:**
- File uploaded successfully via `POST /api/v1/files/upload`
- Document linked to the onboarding process via `FileAttachment` entity
- Document appears in the process document list
- Download link available

---

#### TC-ONB-014: Process status transitions NotStarted to InProgress to Completed
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /onboarding/processes/:id |
| **Role** | HR Manager |

**Preconditions:**
1. Onboarding process in "NotStarted" status with 3 tasks

**Steps:**
1. Complete first task
2. Observe process status
3. Complete second task
4. Complete third (final) task
5. Observe final process status

**Expected Results:**
- After first task completed: status changes from "NotStarted" to "InProgress"
- After second task: status remains "InProgress", completion at 66%
- After all tasks completed: status changes to "Completed", completion at 100%
- Completion date recorded on the process

---

#### TC-ONB-015: List onboarding processes with filters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /onboarding/processes |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /onboarding/processes
2. Filter by status: "InProgress"
3. Search by employee name
4. Filter by department

**Expected Results:**
- DataTableComponent shows filtered results
- Status filter works correctly (NotStarted, InProgress, Completed)
- Employee name search filters results
- Department filter narrows results
- Pagination works with filtered data

---

#### TC-ONB-016: Cannot create process without selecting employee
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Validation |
| **Page** | /onboarding/processes/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /onboarding/processes/create
2. Select a template
3. Leave employee field empty
4. Click Create

**Expected Results:**
- Validation error: employee is required
- Process not created

---

### C. Onboarding Dashboard

#### TC-ONB-017: Dashboard shows active processes count
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /onboarding/dashboard |
| **Role** | HR Manager |

**Preconditions:**
1. Multiple onboarding processes exist in various statuses

**Steps:**
1. Navigate to /onboarding/dashboard

**Expected Results:**
- Dashboard displays stat cards with:
  - Total active processes (NotStarted + InProgress)
  - Completed processes count
  - Total tasks pending
  - Overdue tasks count
- Numbers match actual data in the system

---

#### TC-ONB-018: Dashboard shows completion rates
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /onboarding/dashboard |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /onboarding/dashboard

**Expected Results:**
- Average completion rate displayed as percentage
- Completion rate calculated across all active processes
- Visual indicator (progress bar or chart) shows rate
- Breakdown by department if available

---

#### TC-ONB-019: Dashboard shows overdue tasks
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /onboarding/dashboard |
| **Role** | HR Manager |

**Preconditions:**
1. Some onboarding tasks have due dates in the past and are not completed

**Steps:**
1. Navigate to /onboarding/dashboard

**Expected Results:**
- Overdue tasks section visible
- Shows list of tasks past their due date
- Each overdue task shows: task name, employee name, due date, days overdue
- Sorted by most overdue first

---

#### TC-ONB-020: Dashboard shows task distribution by category
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | UI |
| **Page** | /onboarding/dashboard |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /onboarding/dashboard

**Expected Results:**
- Chart or breakdown showing tasks by category:
  - Documentation, IT, HR, Training, Equipment, Access, Introduction
- Shows completed vs pending count per category
- Helps identify bottleneck categories

---

#### TC-ONB-021: OnboardingTaskOverdueJob marks tasks as overdue
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | API / Background Job |
| **Role** | System |

**Preconditions:**
1. Onboarding task exists with due date = yesterday
2. Task status is "Pending" (not completed)

**Steps:**
1. `OnboardingTaskOverdueJob` runs at 5:00 AM daily
2. Job iterates all active tenants via `TenantIteratingJob`
3. Checks all pending tasks with due date < today

**Expected Results:**
- Task status changed to "Overdue"
- Overdue count on dashboard incremented
- Notification sent to task assignee (if configured)
- Task remains actionable (can still be completed)

---

### D. Authorization & Module Entitlement

#### TC-ONB-022: Onboarding module required for template access
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /onboarding/templates |
| **Role** | HR Manager |

**Preconditions:**
1. Tenant subscription does NOT include Onboarding module

**Steps:**
1. Navigate to /onboarding/templates

**Expected Results:**
- Route blocked by `moduleGuard`
- Redirect to unauthorized or module-disabled page
- API calls return 403 with module not enabled message
- `[RequiresModule(SystemModule.Onboarding)]` blocks backend handler

---

#### TC-ONB-023: Onboarding module enabled allows full access
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Authorization |
| **Page** | /onboarding/templates |
| **Role** | HR Manager |

**Preconditions:**
1. Tenant subscription includes Onboarding module

**Steps:**
1. Navigate to /onboarding/templates
2. Create a template
3. Create a process
4. View dashboard

**Expected Results:**
- All pages accessible
- CRUD operations succeed
- No module entitlement errors

---

#### TC-ONB-024: Read-only access when module disabled with historical data
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | /onboarding/processes |
| **Role** | HR Manager |

**Preconditions:**
1. Onboarding module was previously enabled with existing processes
2. Module is now disabled (subscription downgrade)

**Steps:**
1. Navigate to /onboarding/processes
2. Try to view an existing process
3. Try to create a new process

**Expected Results:**
- List page accessible (read-only) via `AllowReadWhenDisabled = true`
- Existing processes viewable
- Create button hidden or disabled
- Create API call returns 403
- `ModuleStatusBannerComponent` shows read-only warning

---

#### TC-ONB-025: Permission-based access control for onboarding
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Authorization |
| **Page** | /onboarding/templates |
| **Role** | Employee (no onboarding permissions) |

**Steps:**
1. Login as regular employee without onboarding management permissions
2. Navigate to /onboarding/templates

**Expected Results:**
- Access denied or redirect to unauthorized page
- Onboarding menu items not visible in sidebar
- API returns 403 Forbidden for onboarding endpoints

---

## Summary

| Section | Test Cases | P0 | P1 | P2 | P3 |
|---------|-----------|----|----|----|----|
| A. Templates | 8 | 2 | 3 | 2 | 0 |
| B. Processes | 8 | 4 | 3 | 0 | 0 |
| C. Dashboard | 5 | 1 | 3 | 1 | 0 |
| D. Authorization | 4 | 2 | 2 | 0 | 0 |
| **TOTAL** | **25** | **9** | **11** | **3** | **0** |
