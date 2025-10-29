# Employee Portal Access Guide

**For:** Normal Employees
**Purpose:** How to access and use the Employee Self-Service Portal
**Date:** October 25, 2025

---

## 🔐 How Employees Access the Portal

### Step-by-Step Access Instructions

#### 1. **Open Your Web Browser**
- Chrome, Firefox, Edge, or Safari
- Works on desktop and mobile devices

#### 2. **Navigate to the Application**
```
URL: http://your-company-domain.com
(In development: http://localhost:4200)
```

#### 3. **Login Screen**
You'll see the login page with:
- **Username** field
- **Password** field
- **Login** button

#### 4. **Enter Your Credentials**
```
Username: Your employee username or email
Password: Your employee password
```

> **Note:** If you don't have credentials yet, contact your HR department or system administrator.

#### 5. **After Login - Main Application**
Once logged in, you'll see the main navigation menu with:
- Dashboard
- Users (if admin)
- Employees
- Attendance
- **Portal** ← This is what you need!
- And other admin modules (if you have permissions)

---

## 🎯 Accessing the Portal

### Method 1: Navigation Menu (Primary Method)

**After logging in:**

1. Look at the **main navigation menu** (usually at the top or side)
2. Click on **"Portal"** or **"Employee Portal"**
3. You'll be taken to the Portal Dashboard

```
Main App → Portal (in navigation) → Portal Dashboard
```

### Method 2: Direct URL

**If you know the direct link:**
```
http://your-company-domain.com/portal/employee-dashboard
```

Just type or bookmark this URL and you'll go directly to the portal after login.

---

## 📊 Portal Dashboard Overview

### What You'll See First

When you access the portal, you'll land on the **Employee Dashboard** showing:

**1. Welcome Message**
```
Welcome back, [Your Name]!
```

**2. Quick Stats Cards**
- Total attendance days
- Vacation balance
- Pending requests
- Other relevant stats

**3. Recent Activity**
- Your latest attendance records
- Recent requests submitted
- Status updates

**4. Quick Action Buttons**
Navigate to specific features quickly

---

## 🗂️ Portal Features Menu

### Main Portal Navigation

From the Portal Dashboard, you'll see **7 feature cards**:

```
┌─────────────────┬─────────────────┬─────────────────┐
│   📊 Dashboard  │ 📅 My Attendance│   👤 My Profile │
├─────────────────┼─────────────────┼─────────────────┤
│ 👆 Fingerprint  │  🏖️ Vacations   │   🕐 Excuses    │
│    Requests     │    Requests     │    Requests     │
├─────────────────┼─────────────────┼─────────────────┤
│ 🏠 Remote Work  │                 │                 │
│    Requests     │                 │                 │
└─────────────────┴─────────────────┴─────────────────┘
```

**Click on any card to access that feature!**

---

## 🎮 Using Portal Features

### 1. Dashboard
**Purpose:** Overview of your work status

**What you can do:**
- View your stats at a glance
- See recent activity
- Check pending requests
- Quick links to other features

**How to access:**
- Portal → Dashboard card
- Or: `/portal/employee-dashboard`

---

### 2. My Attendance
**Purpose:** View your attendance history

**What you can do:**
- ✅ View all your attendance records
- ✅ Filter by date range
- ✅ See check-in and check-out times
- ✅ View attendance status

**How to access:**
- Portal → "My Attendance" card
- Or: `/portal/my-attendance`

**Example workflow:**
1. Click "My Attendance"
2. See table with all your attendance records
3. Use filters to find specific dates
4. View details of any record

---

### 3. My Profile
**Purpose:** View and manage your profile information

**What you can do:**
- ✅ View your personal information
- ✅ See employment details
- ✅ Check department and branch
- ✅ View contact information

**How to access:**
- Portal → "My Profile" card
- Or: `/portal/my-profile`

---

### 4. Fingerprint Requests
**Purpose:** Manage fingerprint enrollment requests

**What you can do:**
- ✅ View all your fingerprint requests
- ✅ Create new enrollment requests
- ✅ View request details
- ✅ Edit pending requests
- ✅ Cancel pending requests

**How to access:**
- Portal → "Fingerprint Requests" card
- Or: `/portal/fingerprint-requests`

**Example workflow:**
1. Click "Fingerprint Requests"
2. Click "New Request" button
3. Fill in the form
4. Submit request
5. Track status from the list

---

### 5. Vacation Requests
**Purpose:** View your vacation requests

**What you can do:**
- ✅ View all your vacation requests
- ✅ See vacation status (Pending/Approved/Completed)
- ✅ Check vacation balance
- ✅ View vacation details
- ✅ Cancel requests if needed

**How to access:**
- Portal → "Vacation Requests" card
- Or: `/portal/vacation-requests`

---

### 6. Excuse Requests ⭐ NEW FULL FEATURES
**Purpose:** Manage time excuse requests

**What you can do:**
- ✅ **View all your excuse requests**
- ✅ **Create new excuse requests** (NEW!)
- ✅ **View detailed information** (NEW!)
- ✅ **Edit pending requests** (NEW!)
- ✅ **Cancel requests**
- ✅ **Upload attachments** (NEW!)
- ✅ Track approval status

**How to access:**
- Portal → "Excuse Requests" card
- Or: `/portal/excuse-requests`

**Example workflow:**

#### Create New Excuse Request:
1. Click "Excuse Requests"
2. Click "New Excuse" button
3. Fill in the form:
   - **Excuse Type:** Personal Excuse or Official Duty
   - **Date:** Select the excuse date
   - **Start Time:** When does it start? (e.g., 09:00)
   - **End Time:** When does it end? (e.g., 10:00)
   - **Reason:** Explain why (max 500 characters)
   - **Attachment:** Optional file (PDF, DOC, image)
4. Click "Submit"
5. See success message
6. Request appears in your list with "Pending" status

#### View Excuse Details:
1. From the list, click "View" on any request
2. See complete information:
   - Request details (Date, Type, Time, Duration)
   - Status (Pending/Approved/Rejected/Cancelled)
   - Submission information
   - Reviewer comments (if reviewed)
   - Attachment (if uploaded)

#### Edit Pending Excuse:
1. From list or details, click "Edit" (only on Pending requests)
2. Modify any field
3. Click "Update"
4. Changes saved

#### Cancel Excuse:
1. Click "Cancel" button (only on Pending requests)
2. Confirm cancellation
3. Status changes to "Cancelled"

---

### 7. Remote Work Requests ⭐ NEW FULL FEATURES
**Purpose:** Manage remote work requests

**What you can do:**
- ✅ **View all your remote work requests**
- ✅ **Create new requests** (NEW!)
- ✅ **View detailed information** (NEW!)
- ✅ **Edit pending requests** (NEW!)
- ✅ **Cancel requests**
- ✅ **See working days automatically calculated** (NEW!)
- ✅ Track approval status

**How to access:**
- Portal → "Remote Work Requests" card
- Or: `/portal/remote-work-requests`

**Example workflow:**

#### Create New Remote Work Request:
1. Click "Remote Work Requests"
2. Click "New Remote Work" button
3. Fill in the form:
   - **Start Date:** First day of remote work
   - **End Date:** Last day of remote work
   - **Working Days:** Automatically calculated! (weekdays only)
   - **Reason:** Optional explanation
4. Watch as working days update automatically when you change dates!
5. Click "Submit"
6. Request appears in your list with "Pending" status

**Example:**
- Start Date: Monday, October 28, 2025
- End Date: Friday, November 1, 2025
- **System automatically shows:** "Working Days: 5 days (weekdays only)"

#### View Remote Work Details:
1. From the list, click "View" on any request
2. See complete information:
   - Date range
   - Working days count
   - Reason
   - Status
   - Submission info
   - Approval/Rejection details

#### Edit Pending Request:
1. From list or details, click "Edit" (only on Pending)
2. Change dates (working days recalculate automatically!)
3. Update reason if needed
4. Click "Update"

#### Cancel Request:
1. Click "Cancel" button (only on Pending)
2. Confirm cancellation
3. Status changes to "Cancelled"

---

## 🎨 Portal User Interface Guide

### Navigation Pattern

**Standard Flow:**
```
1. Login
2. Main App Navigation → Click "Portal"
3. Portal Dashboard (landing page)
4. Click any feature card
5. Use the feature
6. Click "Back" or use navigation to go to another feature
```

### Common UI Elements

**1. Page Headers**
Every page has:
- **Title** (what page you're on)
- **Action Buttons** (New, Refresh, Edit, etc.)
- **Back Button** (return to previous page)

**2. Tables**
When viewing lists:
- **Sortable Columns** (click header to sort)
- **Action Buttons** per row (View, Edit, Cancel)
- **Status Badges** (color-coded: Pending, Approved, etc.)
- **Pagination** (if many records)

**3. Forms**
When creating/editing:
- **Required fields** marked with red asterisk (*)
- **Character counters** on text areas
- **Validation messages** (red text under fields)
- **Submit Button** (disabled until form is valid)
- **Cancel Button** (go back without saving)

**4. Status Badges**
Color meanings:
- 🟡 **Yellow (Warning)** = Pending
- 🟢 **Green (Success)** = Approved
- 🔴 **Red (Danger)** = Rejected
- ⚫ **Gray (Secondary)** = Cancelled

---

## 📱 Mobile Access

### Access from Phone/Tablet

**Good news:** The portal is fully responsive and works on mobile devices!

**How to access:**
1. Open browser on your phone (Chrome, Safari, etc.)
2. Go to: `http://your-company-domain.com`
3. Login with your credentials
4. Click "Portal" in the menu
5. All features work the same!

**Mobile-specific features:**
- ✅ Touch-friendly buttons
- ✅ Responsive layouts
- ✅ Collapsible menus
- ✅ Optimized forms
- ✅ Easy navigation

**Tips for mobile:**
- Use landscape mode for better table viewing
- Forms are optimized for portrait mode
- All features accessible via burger menu

---

## 💡 Common Workflows

### Scenario 1: "I need to request time off for a doctor's appointment"

**Use:** Excuse Requests

**Steps:**
1. Portal → Excuse Requests
2. Click "New Excuse"
3. Select:
   - Type: Personal Excuse
   - Date: Appointment date
   - Start Time: When you'll leave
   - End Time: When you'll return
   - Reason: "Doctor's appointment"
4. Optionally attach doctor's note
5. Submit
6. Check status later by clicking "View"

---

### Scenario 2: "I want to work from home for 3 days"

**Use:** Remote Work Requests

**Steps:**
1. Portal → Remote Work Requests
2. Click "New Remote Work"
3. Select:
   - Start Date: First remote work day
   - End Date: Last remote work day
   - (System shows working days automatically)
   - Reason: Optional explanation
4. Submit
5. Wait for approval
6. Check status in the list

---

### Scenario 3: "I made a mistake in my excuse request"

**Use:** Excuse Requests - Edit

**Steps:**
1. Portal → Excuse Requests
2. Find your pending request in the list
3. Click "Edit"
4. Fix the mistake
5. Click "Update"
6. Request updated!

**Or if it's too late:**
1. Cancel the wrong request
2. Create a new correct request

---

### Scenario 4: "I want to see why my excuse was rejected"

**Use:** Excuse Requests - View Details

**Steps:**
1. Portal → Excuse Requests
2. Find the rejected request (red badge)
3. Click "View"
4. Scroll to "Approval Information" section
5. Read "Rejection Reason" from reviewer
6. Check "Reviewer Comments" for more details

---

### Scenario 5: "I need to check my attendance for last month"

**Use:** My Attendance

**Steps:**
1. Portal → My Attendance
2. Use date filters to select last month
3. View all your attendance records
4. See check-in/check-out times
5. Check for any issues

---

## ❓ Frequently Asked Questions (FAQ)

### General Access

**Q: What if I don't see the "Portal" link in the menu?**
A: Contact your system administrator. You may need the "Portal Access" permission enabled for your account.

**Q: Can I access the portal from home?**
A: Yes! If your organization allows remote access, you can access the portal from anywhere with internet.

**Q: Do I need to install any software?**
A: No! The portal works in your web browser. No installation needed.

**Q: What browsers are supported?**
A: Chrome, Firefox, Edge, Safari (latest versions recommended).

---

### Excuse Requests

**Q: How long does it take for my excuse to be approved?**
A: This depends on your organization's approval workflow. Check with your manager or HR.

**Q: Can I edit my excuse after it's approved?**
A: No, you can only edit Pending requests. Contact your manager if you need changes after approval.

**Q: What file types can I attach?**
A: PDF, DOC, DOCX, JPG, PNG files are supported.

**Q: Is there a limit on file size?**
A: Check with your system administrator for file size limits.

**Q: Can I delete an excuse request?**
A: You can cancel Pending requests. Approved/Rejected requests cannot be deleted (for audit purposes).

---

### Remote Work Requests

**Q: Why can't I select weekends?**
A: You can select any dates, but the system only counts weekdays (Monday-Friday) as working days.

**Q: How are working days calculated?**
A: The system automatically counts only weekdays between your start and end dates, excluding weekends.

**Q: Can I have multiple remote work requests for the same period?**
A: This depends on your organization's policy. The system will allow it, but check with your manager.

**Q: What if my request is rejected?**
A: View the request details to see the rejection reason. You can submit a new request if needed.

---

### Technical Issues

**Q: What if the page doesn't load?**
A:
1. Refresh the page (F5 or Ctrl+R)
2. Clear browser cache
3. Try a different browser
4. Contact IT support if the issue persists

**Q: What if I get an error message?**
A:
1. Note the error message
2. Try refreshing the page
3. If it persists, contact IT support with the error details

**Q: The portal is slow. What can I do?**
A:
1. Check your internet connection
2. Close unnecessary browser tabs
3. Clear browser cache
4. Try during off-peak hours

---

## 🔒 Security & Privacy

### Best Practices

**1. Protect Your Credentials**
- Never share your username/password
- Use a strong, unique password
- Log out when done (especially on shared computers)

**2. Secure Your Session**
- The system auto-logs you out after inactivity
- Always click "Logout" when finished
- Don't leave your computer unattended while logged in

**3. Data Privacy**
- Your data is secure and confidential
- Only you and authorized personnel can see your requests
- All actions are logged for audit purposes

---

## 📞 Getting Help

### Need Assistance?

**For Portal Access Issues:**
- Contact: IT Support / System Administrator
- Needed: Your employee ID, username

**For Request Approvals:**
- Contact: Your direct manager or HR
- Needed: Request ID, date submitted

**For Technical Problems:**
- Contact: IT Support
- Needed: Error message, screenshot, what you were doing

**For Policy Questions:**
- Contact: HR Department
- Needed: Type of request (excuse, remote work, etc.)

---

## 📋 Quick Reference Card

**Print this section for easy reference!**

```
═══════════════════════════════════════════════════════════
              EMPLOYEE PORTAL QUICK REFERENCE
═══════════════════════════════════════════════════════════

ACCESS:
  URL: http://your-company-domain.com
  Login → Main Menu → "Portal"

FEATURES:
  1. Dashboard        - Overview & stats
  2. My Attendance    - View attendance history
  3. My Profile       - Personal information
  4. Fingerprints     - Enrollment requests
  5. Vacations        - Vacation requests
  6. Excuses          - Time excuse requests (NEW!)
  7. Remote Work      - Work from home requests (NEW!)

CREATE EXCUSE REQUEST:
  Portal → Excuses → New Excuse → Fill form → Submit

CREATE REMOTE WORK REQUEST:
  Portal → Remote Work → New Remote Work → Fill form → Submit

VIEW REQUEST DETAILS:
  Find request in list → Click "View"

EDIT PENDING REQUEST:
  Find request → Click "Edit" → Update → Save

CANCEL REQUEST:
  Find request → Click "Cancel" → Confirm

SUPPORT:
  Technical: IT Support
  Approvals: Your Manager / HR
  Policy: HR Department

═══════════════════════════════════════════════════════════
```

---

## 🎓 Training Resources

### Getting Started Videos (If Available)
1. "Accessing the Employee Portal" (5 min)
2. "Creating an Excuse Request" (3 min)
3. "Creating a Remote Work Request" (3 min)
4. "Viewing Request Status" (2 min)

### Step-by-Step Guides
- See this document for detailed workflows
- Check with HR for organization-specific guides

### Training Sessions
- Contact HR for scheduled training sessions
- Request one-on-one training if needed

---

## ✅ Summary

**How Employees Access the Portal:**

1. **Login** to the application (`http://your-company-domain.com`)
2. **Click "Portal"** in the main navigation menu
3. **Land on Portal Dashboard** with 7 feature cards
4. **Click any feature** to access it
5. **Use the features** to manage your requests

**Key Points:**
- ✅ Portal is accessible to all employees (with proper permissions)
- ✅ Fully web-based (no installation needed)
- ✅ Works on desktop and mobile
- ✅ Secure and easy to use
- ✅ All request types manageable from one place

**New Capabilities:**
- ✅ Create excuse requests with attachments
- ✅ Create remote work requests with auto-calculated days
- ✅ View detailed information for all requests
- ✅ Edit pending requests before approval
- ✅ Track approval status

---

**Document Version:** 1.0
**Last Updated:** October 25, 2025
**Status:** Current and Complete

---

**Questions?** Contact your HR department or IT support team.

**Feedback?** Let us know how we can improve the portal!

🎉 **Welcome to the Employee Self-Service Portal!** 🎉
