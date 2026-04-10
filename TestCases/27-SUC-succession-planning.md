# TC-SUC: Succession Planning & Career Development — Test Cases

## Module Overview

The Succession Planning module manages organizational continuity through key position identification, talent profiling, successor readiness tracking, and career path planning. Key positions are assessed for vacancy risk and criticality. Talent profiles link employees to skills assessments and potential ratings. Succession plans map candidates to positions with readiness levels (Ready Now, Ready 1-2 Years, Ready 3+ Years). Career paths define progression stages with requirements and timelines. A talent pool dashboard provides search and filtering across the organization.

**Admin Pages**: `/succession/key-positions/*`, `/succession/talent-profiles/*`, `/succession/plans/*`, `/succession/career-paths/*`, `/succession/talent-pool`
**Self-Service Pages**: `/my-career`
**API Endpoints**: `/api/v1/key-positions`, `/api/v1/talent-profiles`, `/api/v1/succession-plans`, `/api/v1/career-paths`, `/api/v1/talent-pool`
**Backend Entities**: `KeyPosition`, `TalentProfile`, `SuccessionPlan`, `SuccessionCandidate`, `CareerPath`, `CareerPathStage`

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
| HR Manager | sara.fahad@company.com | Emp@123! | Department Manager |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | Branch Manager, incumbent |
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Key Positions

#### TC-SUC-001: List key positions
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /succession/key-positions |
| **Role** | HR Manager |

**Preconditions:**
1. User logged in with succession planning permissions

**Steps:**
1. Navigate to /succession/key-positions

**Expected Results:**
- DataTable with columns: Position Title, Department, Branch, Criticality, Vacancy Risk, Current Incumbent, Successor Count, Actions
- UnifiedFilter with search, refresh, and Add Position button
- Filter by criticality and department available
- Pagination functional

---

#### TC-SUC-002: Create key position
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /succession/key-positions/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/key-positions/create
2. Fill in: Position Title = "IT Director", Department = "IT", Branch = "Headquarters - Riyadh"
3. Set Criticality = "Critical"
4. Set Vacancy Risk = "High" (incumbent nearing retirement or likely to leave)
5. Select Current Incumbent = "Ahmed Al-Rashid" (from employee SearchableSelect)
6. Add notes about succession urgency
7. Click Save

**Expected Results:**
- Key position created
- Criticality badge displayed (Critical = danger variant)
- Vacancy Risk badge displayed (High = warning variant)
- Current incumbent linked and shown
- Success notification displayed

---

#### TC-SUC-003: Edit key position — change criticality
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /succession/key-positions/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Key position "IT Director" exists

**Steps:**
1. Click Edit on "IT Director"
2. Change Criticality from "Critical" to "High"
3. Update Vacancy Risk to "Medium"
4. Click Save

**Expected Results:**
- Position updated
- Criticality and vacancy risk badges reflect new values
- Change logged in audit trail

---

#### TC-SUC-004: View key position details with successor readiness
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /succession/key-positions/view |
| **Role** | HR Manager |

**Preconditions:**
1. Key position exists with linked succession plan and candidates

**Steps:**
1. Click View on "IT Director"

**Expected Results:**
- DefinitionList shows: Position Title, Department, Branch, Criticality, Vacancy Risk, Current Incumbent
- Successor readiness section shows candidates with readiness levels:
  - Ready Now (success badge)
  - Ready 1-2 Years (info badge)
  - Ready 3+ Years (warning badge)
- If no successors identified, warning message displayed
- Development actions listed per candidate

---

#### TC-SUC-005: Delete key position
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /succession/key-positions |
| **Role** | HR Manager |

**Steps:**
1. Click Delete on a key position
2. Confirmation modal appears
3. Confirm deletion

**Expected Results:**
- Position deleted (or soft-deleted)
- Associated succession plan candidates not deleted (orphan handling)
- Success notification displayed

---

#### TC-SUC-006: Filter key positions by criticality
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /succession/key-positions |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/key-positions
2. Filter by Criticality = "Critical"

**Expected Results:**
- Only Critical positions shown
- Count updates to reflect filtered results
- Filter can be combined with department and branch filters

---

#### TC-SUC-007: Key position — vacancy risk auto-assessment
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /succession/key-positions |
| **Role** | HR Manager |

**Steps:**
1. View key positions where incumbent has no identified successors
2. View key positions where incumbent contract is expiring within 6 months

**Expected Results:**
- Positions with no successors flagged as "High" vacancy risk (or warning indicator)
- Positions with expiring incumbent contracts highlighted
- Dashboard summary shows positions at risk

---

### B. Talent Profiles

#### TC-SUC-008: List talent profiles
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /succession/talent-profiles |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/talent-profiles

**Expected Results:**
- DataTable with columns: Employee Name, Department, Potential Rating, Performance Rating, Readiness Level, Actions
- Search by employee name
- Filter by potential rating and department

---

#### TC-SUC-009: Create talent profile
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /succession/talent-profiles/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/talent-profiles/create
2. Select Employee = "Salma Al-Khaldi" from SearchableSelect
3. Set Potential Rating = "High"
4. Set Performance Rating = "Exceeds Expectations"
5. Set Readiness Level = "Ready 1-2 Years"
6. Add Skills Assessment:
   - Leadership: 4/5
   - Technical: 5/5
   - Communication: 3/5
7. Add notes about development areas
8. Click Save

**Expected Results:**
- Talent profile created linked to employee
- Skills assessment scores stored
- Potential Rating badge displayed (High = success variant)
- One profile per employee (duplicate creation blocked)
- Success notification displayed

---

#### TC-SUC-010: Edit talent profile — update ratings
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /succession/talent-profiles/edit |
| **Role** | HR Manager |

**Steps:**
1. Edit talent profile for "Salma Al-Khaldi"
2. Update Potential Rating to "Medium"
3. Update Leadership skill to 5/5
4. Click Save

**Expected Results:**
- Profile updated with new ratings
- Change history preserved for tracking progression over time

---

#### TC-SUC-011: View talent profile details
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /succession/talent-profiles/view |
| **Role** | HR Manager |

**Steps:**
1. Click View on a talent profile

**Expected Results:**
- DefinitionList: Employee Name, Department, Branch, Job Title, Years of Service
- Ratings section: Potential Rating, Performance Rating, Readiness Level
- Skills radar/chart or table with proficiency scores
- Succession plans where employee is a candidate (if any)
- Development actions and notes

---

#### TC-SUC-012: Prevent duplicate talent profile for same employee
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Negative |
| **Page** | /succession/talent-profiles/create |
| **Role** | HR Manager |

**Preconditions:**
1. Talent profile already exists for employee "Salma Al-Khaldi"

**Steps:**
1. Attempt to create another talent profile for "Salma Al-Khaldi"

**Expected Results:**
- Error: "Talent profile already exists for this employee"
- Redirect to existing profile for editing
- Duplicate not created

---

#### TC-SUC-013: Delete talent profile
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | CRUD |
| **Page** | /succession/talent-profiles |
| **Role** | HR Manager |

**Steps:**
1. Click Delete on a talent profile
2. Confirm deletion

**Expected Results:**
- Profile deleted
- If employee is a succession candidate, candidacy records remain (with warning)
- Success notification displayed

---

### C. Succession Plans

#### TC-SUC-014: List succession plans
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /succession/plans |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/plans

**Expected Results:**
- DataTable with columns: Key Position, Department, Status, Candidates Count, Last Updated, Actions
- Filter by status, department
- Positions without plans highlighted

---

#### TC-SUC-015: Create succession plan — link candidates to position
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /succession/plans/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/plans/create
2. Select Key Position = "IT Director"
3. Add Candidate 1: Employee = "Salma Al-Khaldi", Readiness = "Ready 1-2 Years", Priority = 1
4. Add Candidate 2: Employee = "Omar Hassan", Readiness = "Ready 3+ Years", Priority = 2
5. Add development actions for Candidate 1: "Complete leadership program by Q2 2027"
6. Click Save

**Expected Results:**
- Succession plan created for "IT Director"
- Two candidates linked with readiness levels and priority order
- Development actions stored per candidate
- Key position updated to show successor count = 2
- Success notification displayed

---

#### TC-SUC-016: Edit succession plan — update candidate readiness
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /succession/plans/edit |
| **Role** | HR Manager |

**Steps:**
1. Edit succession plan for "IT Director"
2. Change Salma's readiness from "Ready 1-2 Years" to "Ready Now"
3. Add a new Candidate 3
4. Click Save

**Expected Results:**
- Readiness updated
- New candidate added to plan
- Readiness transition logged for historical tracking
- "Ready Now" candidates highlighted in the key position view

---

#### TC-SUC-017: View succession plan with readiness matrix
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /succession/plans/view |
| **Role** | HR Manager |

**Steps:**
1. Click View on succession plan for "IT Director"

**Expected Results:**
- Key position details shown at top
- Candidate list ordered by priority
- Each candidate shows: Name, Readiness Level (badge), Potential Rating, Performance Rating, Development Actions
- Readiness summary: X Ready Now, Y Ready 1-2 Years, Z Ready 3+ Years
- Gap analysis: if no "Ready Now" candidate, warning displayed

---

#### TC-SUC-018: Remove candidate from succession plan
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /succession/plans/edit |
| **Role** | HR Manager |

**Steps:**
1. Edit succession plan
2. Remove Candidate 3
3. Click Save

**Expected Results:**
- Candidate removed from plan
- Key position successor count decremented
- Removed candidate's talent profile not affected

---

#### TC-SUC-019: Delete succession plan
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | CRUD |
| **Page** | /succession/plans |
| **Role** | HR Manager |

**Steps:**
1. Click Delete on a succession plan
2. Confirm deletion

**Expected Results:**
- Plan deleted
- Key position shows 0 successors (vacancy risk may increase)
- Candidate talent profiles not affected

---

### D. Career Paths

#### TC-SUC-020: List career paths
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /succession/career-paths |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/career-paths

**Expected Results:**
- DataTable with columns: Path Name, Department, Stages Count, Status, Actions
- Search and filter available

---

#### TC-SUC-021: Create career path with progression stages
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /succession/career-paths/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/career-paths/create
2. Fill in: Path Name = "IT Engineering Track", Department = "IT"
3. Add Stage 1: Title = "Junior Developer", Requirements = "Bachelor's in CS, 0-2 years experience", Estimated Timeline = "0-2 years"
4. Add Stage 2: Title = "Senior Developer", Requirements = "3+ years experience, team lead project", Estimated Timeline = "2-4 years"
5. Add Stage 3: Title = "Technical Lead", Requirements = "5+ years, architecture certification", Estimated Timeline = "4-6 years"
6. Add Stage 4: Title = "IT Director", Requirements = "8+ years, MBA preferred, leadership track", Estimated Timeline = "6-10 years"
7. Click Save

**Expected Results:**
- Career path created with 4 ordered stages
- Each stage stores title, requirements, and estimated timeline
- Stages ordered sequentially
- Department scope set to "IT"
- Success notification displayed

---

#### TC-SUC-022: Edit career path — add/remove stages
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /succession/career-paths/edit |
| **Role** | HR Manager |

**Steps:**
1. Edit "IT Engineering Track"
2. Add Stage between "Senior Developer" and "Technical Lead": "Staff Engineer"
3. Remove the last stage "IT Director"
4. Click Save

**Expected Results:**
- Stages reordered correctly
- New stage inserted at correct position
- Removed stage deleted
- Existing employee career path assignments updated if affected

---

#### TC-SUC-023: View career path visualization
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /succession/career-paths/view |
| **Role** | HR Manager |

**Steps:**
1. Click View on "IT Engineering Track"

**Expected Results:**
- Visual progression display (timeline, vertical steps, or flowchart)
- Each stage shows: Title, Requirements, Estimated Timeline
- Current employees at each stage shown (if linked)
- Clear visual flow from first to last stage

---

#### TC-SUC-024: Delete career path
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | CRUD |
| **Page** | /succession/career-paths |
| **Role** | HR Manager |

**Steps:**
1. Click Delete on a career path
2. Confirm deletion

**Expected Results:**
- Career path and all stages deleted
- Employees assigned to this path notified or assignment cleared
- Success notification displayed

---

### E. Talent Pool

#### TC-SUC-025: Talent pool dashboard view
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /succession/talent-pool |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/talent-pool

**Expected Results:**
- Dashboard overview with summary stats:
  - Total talent profiles
  - By potential rating: High / Medium / Low counts
  - By readiness level: Ready Now / 1-2 Years / 3+ Years
- Key positions at risk (no Ready Now successor)
- Critical positions without any successors highlighted

---

#### TC-SUC-026: Search talent pool by skills
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /succession/talent-pool |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /succession/talent-pool
2. Search by skill = "Leadership"
3. Filter by department = "IT"

**Expected Results:**
- Results show employees with "Leadership" in their skills assessment
- Filtered to IT department only
- Results sortable by skill rating, potential, readiness

---

#### TC-SUC-027: Filter talent pool by readiness and department
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /succession/talent-pool |
| **Role** | HR Manager |

**Steps:**
1. Filter by Readiness = "Ready Now"
2. Filter by Department = all departments

**Expected Results:**
- Only employees with "Ready Now" readiness shown
- Cross-department view for organization-wide succession planning
- Can export filtered list to CSV

---

### F. Self-Service

#### TC-SUC-028: Employee views own career path (My Career)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-career |
| **Role** | Employee (Self-Service) |

**Preconditions:**
1. Employee has a talent profile
2. Employee is assigned to a career path

**Steps:**
1. Login to Self-Service Portal as salma.khaldi@company.com
2. Navigate to /my-career

**Expected Results:**
- Employee sees their own career path stages
- Current stage highlighted
- Next stage requirements visible
- Progress indicator showing where they are in the path
- Cannot see other employees' career data
- If no career path assigned, informational message shown

---

#### TC-SUC-029: Employee views career path visualization
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-career |
| **Role** | Employee (Self-Service) |

**Steps:**
1. Navigate to /my-career
2. View the career progression visualization

**Expected Results:**
- Visual timeline or step progression displayed
- Completed stages marked with checkmark/success indicator
- Current stage highlighted with accent color
- Future stages shown with requirements
- Estimated timeline per stage visible
- Mobile-responsive layout

---

#### TC-SUC-030: Employee without career path sees informational state
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /my-career |
| **Role** | Employee (Self-Service) |

**Preconditions:**
1. Employee has no talent profile or career path assignment

**Steps:**
1. Navigate to /my-career

**Expected Results:**
- EmptyStateComponent displayed with message: "No career path has been assigned yet"
- Contact HR information or link provided
- No error thrown

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Key Positions | 7 | 3 | 3 | 1 |
| B. Talent Profiles | 6 | 2 | 3 | 1 |
| C. Succession Plans | 6 | 3 | 2 | 1 |
| D. Career Paths | 5 | 2 | 2 | 1 |
| E. Talent Pool | 3 | 1 | 2 | 0 |
| F. Self-Service | 3 | 1 | 2 | 0 |
| **TOTAL** | **30** | **12** | **14** | **4** |
