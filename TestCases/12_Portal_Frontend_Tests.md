# Portal Frontend Tests

## Overview
This test suite covers employee self-service portal UI/UX, component rendering, form validation, navigation, responsiveness, and error handling.

---

## Test Case UI-001: Portal Dashboard Loading and Display

**Priority:** High
**Type:** Frontend - Functional
**Module:** Portal

### Description
Verify that employee portal dashboard loads correctly with statistics and activity feed.

### Preconditions
- Employee logged in with portal access
- EmployeeUserLink exists
- Attendance and request data exists

### Test Steps
1. Navigate to `/portal/dashboard`
2. Observe page rendering
3. Check statistics cards
4. Check activity feed

### Expected Results
- Dashboard loads within 2 seconds
- Statistics cards display:
  - Total attendance days this month
  - Total worked hours
  - Pending requests count
  - Vacation balance
- Activity feed shows recent:
  - Attendance records
  - Approved/rejected requests
  - Upcoming appointments
- All data scoped to logged-in employee
- Responsive layout (mobile + desktop)

---

## Test Case UI-002: Navigation Menu Accessibility

**Priority:** High
**Type:** Frontend - Functional
**Module:** Portal

### Description
Verify that portal navigation menu provides access to all employee features.

### Preconditions
- Employee logged in to portal

### Test Steps
1. Open portal navigation menu
2. Verify all menu items present
3. Click each menu item
4. Verify navigation works

### Expected Results
- Navigation menu shows 7 features:
  1. Dashboard
  2. My Attendance
  3. My Profile
  4. Fingerprint Requests
  5. Vacation Requests (view only)
  6. Excuse Requests
  7. Remote Work Requests
- All links navigable
- Active route highlighted
- Mobile: hamburger menu
- Desktop: sidebar or top nav
- Logout button accessible

---

## Test Case UI-003: Form Validation Error Display

**Priority:** High
**Type:** Frontend - Functional
**Module:** Portal

### Description
Verify that form validation errors are displayed clearly to users.

### Preconditions
- Employee on excuse request create form

### Test Steps
1. Navigate to `/portal/excuse-requests/create`
2. Submit empty form
3. Fill form with invalid data:
   - End time before start time
   - Future date beyond 7 days
4. Observe error messages

### Expected Results
- Empty form submission:
  - Error messages shown under each required field:
    - "Date is required"
    - "Start time is required"
    - "End time is required"
    - "Reason is required"
  - Form not submitted
- Invalid data:
  - "End time must be after start time"
  - "Date must be within the next 7 days"
- Error messages in red
- Fields highlighted with red border
- Scroll to first error
- User-friendly language (not technical)

---

## Test Case UI-004: File Upload Component

**Priority:** High
**Type:** Frontend - Functional
**Module:** Portal - Excuse Requests

### Description
Verify that file upload component works correctly with drag-drop and validation.

### Preconditions
- Employee on excuse request form with file upload

### Test Steps
1. Click "Choose File" button
2. Select valid PDF file (2 MB)
3. Observe upload progress
4. Try to upload invalid file type (.exe)
5. Try to upload oversized file (10 MB)
6. Try drag-and-drop upload

### Expected Results
- Step 2-3:
  - File selected successfully
  - Upload progress indicator shown
  - File name displayed
  - File size displayed
  - "Remove" button available
- Step 4:
  - Error: "Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG"
  - File not uploaded
- Step 5:
  - Error: "File size exceeds 5 MB limit"
  - File not uploaded
- Step 6:
  - Drag-drop zone highlights on hover
  - File uploads successfully
- Client-side validation before server upload

---

## Test Case UI-005: Date Range Picker Component

**Priority:** Medium
**Type:** Frontend - Functional
**Module:** Portal - Remote Work

### Description
Verify that date range picker component works correctly with weekend/holiday highlighting.

### Preconditions
- Employee on remote work request form

### Test Steps
1. Click date range picker
2. Select start date: Feb 12, 2024
3. Select end date: Feb 16, 2024
4. Observe working days calculation
5. Try to select past date
6. Try to select date beyond policy limit

### Expected Results
- Calendar opens on click
- Weekends (Sat/Sun) visually disabled or grayed out
- Holidays shown in different color (red)
- Start/end dates highlighted
- Working days calculate in real-time: "5 working days"
- Past dates disabled
- Dates beyond limit disabled (if policy enforced)
- Calendar closes on selection
- Mobile-friendly calendar

---

## Test Case UI-006: Status Badge Component Rendering

**Priority:** Medium
**Type:** Frontend - Visual
**Module:** Portal

### Description
Verify that status badges display correctly across all portal features.

### Preconditions
- Employee has requests in various statuses

### Test Steps
1. Navigate to excuse requests list
2. Navigate to remote work requests list
3. Navigate to fingerprint requests list
4. Observe status badges for each status type

### Expected Results
- Status badges color-coded:
  - Pending: Yellow/Warning
  - Approved: Green/Success
  - Rejected: Red/Danger
  - Cancelled: Gray/Secondary
  - Scheduled: Blue/Info
  - Completed: Green/Success
- Badge shape: rounded pill
- Badge text: status label
- Consistent across all pages
- Accessible (sufficient contrast)
- Responsive (doesn't overflow)

---

## Test Case UI-007: Data Table with Pagination

**Priority:** High
**Type:** Frontend - Functional
**Module:** Portal

### Description
Verify that data tables display correctly with pagination controls.

### Preconditions
- Employee has 25 attendance records

### Test Steps
1. Navigate to `/portal/attendance`
2. Observe table display
3. Click pagination controls
4. Change page size
5. Use table filters

### Expected Results
- Default display: 10 records per page
- Pagination controls:
  - Page numbers (1, 2, 3, ...)
  - Previous/Next buttons
  - "Showing 1-10 of 25"
- Click page 2: Shows records 11-20
- Change page size to 25: Shows all records
- Filters work with pagination
- Sorting works (if enabled)
- Mobile: responsive table (horizontal scroll or cards)
- Loading spinner during data fetch

---

## Test Case UI-008: Empty State Component

**Priority:** Medium
**Type:** Frontend - Visual
**Module:** Portal

### Description
Verify that empty state displays when no data is available.

### Preconditions
- New employee with no requests

### Test Steps
1. Navigate to `/portal/excuse-requests`
2. Navigate to `/portal/fingerprint-requests`
3. Observe empty states

### Expected Results
- Empty state component shows:
  - Icon (illustration or symbol)
  - Message: "No excuse requests yet"
  - Call-to-action button: "Create Excuse Request"
- Click CTA: Navigates to create form
- Consistent design across all empty states
- Helpful messaging (not just "No data")
- Encourages user action

---

## Test Case UI-009: Notification Toast Messages

**Priority:** High
**Type:** Frontend - Functional
**Module:** Portal

### Description
Verify that notification toasts display correctly for user actions.

### Preconditions
- Employee on portal

### Test Steps
1. Create excuse request (success)
2. Submit form with validation error
3. Cancel a request
4. Perform action that triggers warning

### Expected Results
- Success toast (green):
  - "Excuse request created successfully"
  - Auto-dismiss after 3 seconds
  - Position: top-right
- Error toast (red):
  - "Failed to create request: [error message]"
  - Auto-dismiss after 5 seconds
  - Close button available
- Info toast (blue):
  - "Request cancelled"
  - Auto-dismiss after 3 seconds
- Warning toast (yellow):
  - "You are approaching your monthly limit"
  - Auto-dismiss after 4 seconds
- Toast stacks if multiple
- Accessible (screen reader support)

---

## Test Case UI-010: Mobile Responsiveness

**Priority:** High
**Type:** Frontend - Responsive
**Module:** Portal

### Description
Verify that portal is fully responsive and mobile-friendly.

### Preconditions
- Employee logged in
- Testing on various screen sizes

### Test Steps
1. Test on desktop (1920x1080)
2. Test on tablet (768x1024)
3. Test on mobile (375x667)
4. Test navigation menu
5. Test forms
6. Test data tables

### Expected Results
- Desktop:
  - Full layout with sidebar
  - Multi-column forms
  - Wide tables
- Tablet:
  - Collapsed sidebar or top nav
  - 2-column forms
  - Scrollable tables
- Mobile:
  - Hamburger menu
  - Single-column forms
  - Card view for tables (instead of table)
  - Touch-friendly buttons (44px minimum)
- No horizontal scroll (except tables)
- All functionality accessible
- Readable text (minimum 14px)
- Forms stack vertically
- Buttons full-width on mobile

---

## Test Execution Notes

### Test Data Requirements
- Employee with portal access
- Various requests in different statuses
- Attendance records
- Test files for upload

### Testing Tools
- Desktop browsers: Chrome, Firefox, Edge, Safari
- Mobile browsers: Chrome Mobile, Safari iOS
- Screen sizes: 375px, 768px, 1024px, 1920px
- Accessibility tools: axe DevTools

### Environment Setup
- Frontend: http://localhost:4200
- Backend: http://localhost:5099
- Test user accounts

### Dependencies
- Angular 17 application
- Bootstrap 5 CSS
- Shared components library
- API endpoints functioning

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| UI-001 | Dashboard Display | High | ⬜ Not Run |
| UI-002 | Navigation | High | ⬜ Not Run |
| UI-003 | Form Validation | High | ⬜ Not Run |
| UI-004 | File Upload | High | ⬜ Not Run |
| UI-005 | Date Picker | Medium | ⬜ Not Run |
| UI-006 | Status Badges | Medium | ⬜ Not Run |
| UI-007 | Data Table | High | ⬜ Not Run |
| UI-008 | Empty State | Medium | ⬜ Not Run |
| UI-009 | Notifications | High | ⬜ Not Run |
| UI-010 | Responsive Design | High | ⬜ Not Run |
