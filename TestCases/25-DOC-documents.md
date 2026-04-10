# TC-DOC: Documents & Letter Management — Test Cases

## Module Overview

The Documents module provides centralized document management for the organization, including document categories, employee document storage (linked via `FileAttachment` with `EntityType+EntityId`), company policies, letter templates with variable placeholders, and letter request generation. File uploads use `POST /api/v1/files/upload` with a 10MB maximum and supported types: PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX. The Self-Service Portal exposes My Documents and My Letters for employees.

**Admin Pages**: `/documents/categories`, `/documents/employee-documents/*`, `/documents/company-policies/*`, `/documents/letter-templates/*`, `/documents/letter-requests/*`
**Self-Service Pages**: `/my-documents`, `/my-letters`
**API Endpoints**: `POST /api/v1/files/upload`, `GET /api/v1/files/{storedFileName}`, `/api/v1/document-categories`, `/api/v1/employee-documents`, `/api/v1/company-policies`, `/api/v1/letter-templates`, `/api/v1/letter-requests`
**Backend Entities**: `FileAttachment`, `DocumentCategory`, `CompanyPolicy`, `LetterTemplate`, `LetterRequest`

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
| Employee | salma.khaldi@company.com | Emp@123! | Regular employee |

---

## Test Cases

### A. Document Categories

#### TC-DOC-001: List document categories
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /documents/categories |
| **Role** | HR Manager |

**Preconditions:**
1. User is logged in with document management permissions
2. At least one document category exists

**Steps:**
1. Navigate to /documents/categories

**Expected Results:**
- DataTable renders with columns: Name, Name (AR), Description, Status, Actions
- Pagination controls visible
- Search filter available
- Refresh button functional
- Add Category button visible

---

#### TC-DOC-002: Create document category
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /documents/categories |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /documents/categories
2. Click "Add Category"
3. Fill in: Name = "Employment Contracts", Name (AR) = "عقود العمل", Description = "All employment contract documents"
4. Set IsActive = true
5. Click Save

**Expected Results:**
- Category created successfully
- Success notification displayed
- New category appears in list
- Name, description, and active status saved correctly

---

#### TC-DOC-003: Edit document category
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /documents/categories |
| **Role** | HR Manager |

**Preconditions:**
1. Category "Employment Contracts" exists

**Steps:**
1. Navigate to /documents/categories
2. Click Edit action on "Employment Contracts"
3. Change Description to "Employment and renewal contracts"
4. Click Save

**Expected Results:**
- Category updated successfully
- Updated description shown in list
- Success notification displayed

---

#### TC-DOC-004: Deactivate document category
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /documents/categories |
| **Role** | HR Manager |

**Preconditions:**
1. Active category exists

**Steps:**
1. Navigate to /documents/categories
2. Click Edit on the active category
3. Set IsActive = false
4. Click Save

**Expected Results:**
- Category marked inactive
- StatusBadge shows "Inactive" with secondary variant
- Inactive category no longer appears in dropdown selections on other forms

---

### B. Employee Documents

#### TC-DOC-005: Upload employee document — valid file
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /documents/employee-documents |
| **Role** | HR Manager |

**Preconditions:**
1. Employee exists in the system
2. Document category exists

**Steps:**
1. Navigate to /documents/employee-documents
2. Click "Add Document"
3. Select employee from SearchableSelect
4. Select category "Employment Contracts"
5. Upload a 2MB PDF file via FileUploadComponent
6. Add title = "Ahmed Employment Contract 2026"
7. Click Save

**Expected Results:**
- File uploaded via `POST /api/v1/files/upload` (multipart form data)
- `FileAttachment` record created with EntityType = "EmployeeDocument", EntityId linked to employee
- Document appears in employee document list
- File size and type shown in list
- Success notification displayed

---

#### TC-DOC-006: Upload employee document — reject oversized file (>10MB)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Negative |
| **Page** | /documents/employee-documents |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /documents/employee-documents
2. Click "Add Document"
3. Select an employee
4. Attempt to upload a 15MB file

**Expected Results:**
- Upload rejected before or during API call
- Error notification: file exceeds 10MB maximum
- No `FileAttachment` record created
- Form remains open for correction

---

#### TC-DOC-007: Upload employee document — reject invalid file type
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Negative |
| **Page** | /documents/employee-documents |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /documents/employee-documents
2. Click "Add Document"
3. Attempt to upload a .exe file
4. Attempt to upload a .zip file

**Expected Results:**
- Upload rejected — unsupported file type
- Error notification displayed
- Only PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX accepted
- No file stored on disk

---

#### TC-DOC-008: View and download employee document
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /documents/employee-documents |
| **Role** | HR Manager |

**Preconditions:**
1. Employee document exists with uploaded file

**Steps:**
1. Navigate to /documents/employee-documents
2. Click View on an existing document
3. Document detail page opens with DefinitionList showing title, category, employee, upload date, file size
4. Click "Download" button

**Expected Results:**
- View page renders with all document metadata
- Download triggers `GET /api/v1/files/{storedFileName}`
- File downloads with correct content type and original filename
- Browser opens download dialog or saves file

---

#### TC-DOC-009: List employee documents with filters
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | UI |
| **Page** | /documents/employee-documents |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /documents/employee-documents
2. Filter by employee name using search
3. Filter by category using dropdown
4. Filter by upload date range

**Expected Results:**
- Table filters correctly by each criterion
- Combined filters work together (AND logic)
- Result count updates
- Clear filters resets to full list

---

#### TC-DOC-010: Upload multiple file types — all supported types accepted
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /documents/employee-documents |
| **Role** | HR Manager |

**Steps:**
1. Upload a .pdf file — should succeed
2. Upload a .doc file — should succeed
3. Upload a .docx file — should succeed
4. Upload a .jpg file — should succeed
5. Upload a .jpeg file — should succeed
6. Upload a .png file — should succeed
7. Upload a .xlsx file — should succeed

**Expected Results:**
- All 7 file types upload successfully
- Each creates a valid `FileAttachment` record
- File preview/icon appropriate to type (PDF icon, image thumbnail, etc.)

---

#### TC-DOC-011: Delete employee document
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /documents/employee-documents |
| **Role** | HR Manager |

**Preconditions:**
1. Employee document exists

**Steps:**
1. Navigate to /documents/employee-documents
2. Click Delete action on a document
3. Confirmation modal appears
4. Click Confirm

**Expected Results:**
- Document record deleted
- File removed from storage (or soft-deleted)
- Document no longer appears in list
- Success notification displayed

---

#### TC-DOC-012: Bulk upload documents for an employee
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | Business Rule |
| **Page** | /documents/employee-documents |
| **Role** | HR Manager |

**Steps:**
1. Navigate to employee document upload
2. Select an employee
3. Upload 3 files at once (if multi-upload supported)

**Expected Results:**
- All files uploaded sequentially or in parallel
- Each file creates a separate FileAttachment record
- All documents appear in the employee's document list
- Progress indicator shown during upload

---

### C. Company Policies

#### TC-DOC-013: List company policies
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /documents/company-policies |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /documents/company-policies

**Expected Results:**
- DataTable with columns: Title, Category, Status (Published/Draft), Created Date, Actions
- Search and filter controls available
- Add Policy button visible

---

#### TC-DOC-014: Create company policy with document attachment
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /documents/company-policies/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /documents/company-policies/create
2. Fill in: Title = "Annual Leave Policy 2026", Category = "Leave Management"
3. Enter policy content in rich text / textarea field
4. Upload a PDF attachment via FileUploadComponent
5. Click Save as Draft

**Expected Results:**
- Policy created with status "Draft"
- Attachment linked via FileAttachment
- Policy appears in list with Draft badge
- Success notification displayed

---

#### TC-DOC-015: Publish company policy
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /documents/company-policies |
| **Role** | HR Manager |

**Preconditions:**
1. Draft company policy exists

**Steps:**
1. Navigate to /documents/company-policies
2. Click "Publish" action on the draft policy
3. Confirmation dialog appears
4. Confirm publish

**Expected Results:**
- Policy status changes from "Draft" to "Published"
- StatusBadge shows "Published" with success variant
- Published policy becomes visible to employees in self-service portal
- Success notification displayed

---

#### TC-DOC-016: Unpublish company policy
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /documents/company-policies |
| **Role** | HR Manager |

**Preconditions:**
1. Published company policy exists

**Steps:**
1. Click "Unpublish" on a published policy
2. Confirm action

**Expected Results:**
- Policy status reverts to "Draft"
- Policy no longer visible to employees in self-service
- StatusBadge shows "Draft" with warning variant

---

#### TC-DOC-017: Edit company policy
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /documents/company-policies/edit |
| **Role** | HR Manager |

**Steps:**
1. Click Edit on an existing policy
2. Update title and content
3. Replace the attached document with a new file
4. Click Save

**Expected Results:**
- Policy updated with new title, content, and attachment
- Previous attachment replaced (old file cleaned up)
- Success notification displayed

---

### D. Letter Templates

#### TC-DOC-018: List letter templates
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | UI |
| **Page** | /documents/letter-templates |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /documents/letter-templates

**Expected Results:**
- DataTable with columns: Template Name, Category, Status (Active/Inactive), Created Date, Actions
- Add Template button visible
- Search and filter available

---

#### TC-DOC-019: Create letter template with variable placeholders
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | CRUD |
| **Page** | /documents/letter-templates/create |
| **Role** | HR Manager |

**Steps:**
1. Navigate to /documents/letter-templates/create
2. Fill in: Template Name = "Employment Certificate"
3. Select Category = "HR Letters"
4. Enter body with placeholders:
   ```
   This is to certify that {employee_name} has been employed as {position}
   at our organization since {joining_date}. This letter was issued on {date}.
   ```
5. Set Active = true
6. Click Save

**Expected Results:**
- Template created with placeholders preserved in body text
- Supported placeholders listed/documented: `{employee_name}`, `{position}`, `{date}`, `{department}`, `{branch}`, `{joining_date}`, `{employee_id}`, `{manager_name}`
- Template appears in list with Active badge
- Success notification displayed

---

#### TC-DOC-020: Edit letter template
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | CRUD |
| **Page** | /documents/letter-templates/edit |
| **Role** | HR Manager |

**Preconditions:**
1. Letter template exists

**Steps:**
1. Click Edit on "Employment Certificate" template
2. Add `{salary}` placeholder to the body
3. Click Save

**Expected Results:**
- Template body updated with new placeholder
- Success notification displayed

---

#### TC-DOC-021: Deactivate letter template
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /documents/letter-templates |
| **Role** | HR Manager |

**Preconditions:**
1. Active template exists

**Steps:**
1. Click Edit on an active template
2. Set Active = false
3. Click Save

**Expected Results:**
- Template marked inactive
- Inactive template no longer available for letter request creation
- StatusBadge shows "Inactive" with secondary variant

---

#### TC-DOC-022: Delete letter template
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Category** | CRUD |
| **Page** | /documents/letter-templates |
| **Role** | HR Manager |

**Preconditions:**
1. Template exists with no associated letter requests

**Steps:**
1. Click Delete action on a template
2. Confirmation modal appears
3. Confirm deletion

**Expected Results:**
- Template deleted (or soft-deleted)
- Template removed from list
- If template has existing letter requests, deletion is blocked with an error message

---

### E. Letter Requests

#### TC-DOC-023: Create letter request from template
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /documents/letter-requests/create |
| **Role** | HR Manager |

**Preconditions:**
1. Active letter template "Employment Certificate" exists
2. Employee exists with profile data

**Steps:**
1. Navigate to /documents/letter-requests/create
2. Select employee from SearchableSelect
3. Select template "Employment Certificate"
4. Click "Generate"

**Expected Results:**
- System auto-fills placeholders from employee data:
  - `{employee_name}` replaced with employee full name
  - `{position}` replaced with employee job title
  - `{joining_date}` replaced with employee joining date
  - `{date}` replaced with current date
- Preview of generated letter shown
- User can edit the generated text before finalizing
- Status = "Draft"

---

#### TC-DOC-024: Auto-fill variable placeholders from employee data
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /documents/letter-requests/create |
| **Role** | HR Manager |

**Steps:**
1. Create a letter request using a template with all supported placeholders
2. Select employee "Ahmed Al-Rashid" (Branch Manager, Headquarters)

**Expected Results:**
- `{employee_name}` = "Ahmed Al-Rashid"
- `{position}` = employee's job title
- `{department}` = "Human Resources" (or actual department)
- `{branch}` = "Headquarters - Riyadh"
- `{joining_date}` = employee's start date
- `{employee_id}` = "1001"
- `{date}` = today's date in tenant locale format
- `{manager_name}` = employee's direct manager name
- Unresolved placeholders flagged with warning

---

#### TC-DOC-025: Generate letter request as PDF
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /documents/letter-requests |
| **Role** | HR Manager |

**Preconditions:**
1. Letter request exists in finalized/approved state

**Steps:**
1. Navigate to the letter request view page
2. Click "Generate PDF"

**Expected Results:**
- PDF generated with the filled-in letter content
- Company branding/header applied to PDF
- PDF available for download
- FileAttachment created linking PDF to the letter request

---

#### TC-DOC-026: Download generated letter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /documents/letter-requests |
| **Role** | HR Manager |

**Preconditions:**
1. Letter request has a generated PDF

**Steps:**
1. Navigate to /documents/letter-requests
2. Click Download on a generated letter

**Expected Results:**
- `GET /api/v1/files/{storedFileName}` returns the PDF
- File downloads with meaningful filename (e.g., "Employment_Certificate_Ahmed_2026.pdf")
- Correct Content-Type: application/pdf

---

#### TC-DOC-027: Letter request status tracking
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /documents/letter-requests |
| **Role** | HR Manager |

**Steps:**
1. Create a letter request — status = "Draft"
2. Finalize the request — status = "Pending"
3. Approve the request (if approval workflow configured) — status = "Approved"
4. Generate PDF — status = "Generated"

**Expected Results:**
- Status transitions correctly through the lifecycle
- StatusBadge updates: Draft (warning), Pending (info), Approved (success), Generated (success)
- Each status change logged in audit trail
- Actions available depend on current status (e.g., "Generate PDF" only available after approval)

---

### F. Self-Service

#### TC-DOC-028: Employee views own documents (My Documents)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-documents |
| **Role** | Employee (Self-Service) |

**Preconditions:**
1. Employee has uploaded documents linked to their profile
2. Published company policies exist

**Steps:**
1. Login to Self-Service Portal as salma.khaldi@company.com
2. Navigate to /my-documents

**Expected Results:**
- Employee sees only their own documents (not other employees')
- List shows document title, category, upload date, file type
- Download button available for each document
- Published company policies section visible
- No edit/delete actions (view-only for employees)

---

#### TC-DOC-029: Employee requests a letter (My Letters)
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Category** | Business Rule |
| **Page** | /my-letters |
| **Role** | Employee (Self-Service) |

**Preconditions:**
1. Active letter templates exist

**Steps:**
1. Login to Self-Service Portal
2. Navigate to /my-letters
3. Click "Request Letter"
4. Select template "Employment Certificate" from dropdown
5. Review auto-filled content
6. Submit request

**Expected Results:**
- Only active templates shown in dropdown
- Employee's own data auto-filled into placeholders
- Request submitted with status "Pending"
- Success notification: "Letter request submitted"
- Request appears in My Letters list with Pending badge

---

#### TC-DOC-030: Employee views and downloads approved letter
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Category** | Business Rule |
| **Page** | /my-letters |
| **Role** | Employee (Self-Service) |

**Preconditions:**
1. Employee has an approved/generated letter request

**Steps:**
1. Navigate to /my-letters
2. Find the approved letter request
3. Click "View" to see letter details
4. Click "Download PDF"

**Expected Results:**
- Letter detail shows template name, request date, status, generated date
- PDF download works correctly
- Only own letter requests visible (not other employees')
- Pending/draft letters show status but no download option

---

## Summary

| Section | Test Cases | P0 | P1 | P2 |
|---------|-----------|----|----|-----|
| A. Document Categories | 4 | 2 | 2 | 0 |
| B. Employee Documents | 8 | 4 | 3 | 1 |
| C. Company Policies | 5 | 3 | 2 | 0 |
| D. Letter Templates | 5 | 2 | 2 | 1 |
| E. Letter Requests | 5 | 3 | 2 | 0 |
| F. Self-Service | 3 | 2 | 1 | 0 |
| **TOTAL** | **30** | **16** | **12** | **2** |
