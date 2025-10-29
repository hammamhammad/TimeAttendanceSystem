# Employee Self-Service Portal - Access Guide

**Quick reference for accessing the newly completed portal features**

---

## 🚀 Getting Started

### 1. Start the Backend
```bash
cd "D:\Work\AI Code\TimeAttendanceSystem\src\Api\TimeAttendanceSystem.Api"
dotnet run
```
**Backend URL:** http://localhost:5099

### 2. Start the Frontend
```bash
cd "D:\Work\AI Code\TimeAttendanceSystem\time-attendance-frontend"
npm start
```
**Frontend URL:** http://localhost:4200

---

## 🔐 Login

Navigate to: http://localhost:4200/login

**Test Employee Credentials:**
- Use any employee account from your database
- Default admin: `admin` / (your configured password)

---

## 📍 Portal Navigation

Once logged in as an employee, you can access the portal through:

### Method 1: Main Menu
1. Click on the main navigation menu
2. Look for "Portal" or "Employee Portal" link
3. Click to access the portal dashboard

### Method 2: Direct URLs
You can navigate directly to any portal page:

| Feature | URL |
|---------|-----|
| Portal Dashboard | http://localhost:4200/portal/employee-dashboard |
| My Attendance | http://localhost:4200/portal/my-attendance |
| My Profile | http://localhost:4200/portal/my-profile |
| Fingerprint Requests | http://localhost:4200/portal/fingerprint-requests |
| Vacation Requests | http://localhost:4200/portal/vacation-requests |
| **Excuse Requests** ⭐ | http://localhost:4200/portal/excuse-requests |
| **Remote Work Requests** ⭐ | http://localhost:4200/portal/remote-work-requests |

---

## 🎯 New Features (Phase 6-7)

### ⭐ Excuse Requests

**Access:** Portal Dashboard → "Excuse Requests" card
**Direct URL:** http://localhost:4200/portal/excuse-requests

**What You Can Do:**
- ✅ View all your excuse requests
- ✅ See request status (Pending, Approved, Rejected, Cancelled)
- ✅ View details including: Date, Type, Time Range, Duration, Reason
- ✅ Cancel pending requests
- ✅ Create new excuse requests (via "New Excuse" button)

**Status Badges:**
- 🟡 **Pending** - Awaiting approval
- 🟢 **Approved** - Request approved
- 🔴 **Rejected** - Request rejected
- ⚫ **Cancelled** - Request cancelled

**Available Actions:**
- **View** - See full request details (all requests)
- **Cancel** - Cancel the request (Pending only)

---

### ⭐ Remote Work Requests

**Access:** Portal Dashboard → "Remote Work Requests" card
**Direct URL:** http://localhost:4200/portal/remote-work-requests

**What You Can Do:**
- ✅ View all your remote work requests
- ✅ See request status (Pending, Approved, Rejected, Cancelled)
- ✅ View details including: Start Date, End Date, Working Days, Reason
- ✅ Cancel pending requests
- ✅ Create new remote work requests (via "New Remote Work" button)

**Status Badges:**
- 🟡 **Pending** - Awaiting approval
- 🟢 **Approved** - Request approved
- 🔴 **Rejected** - Request rejected
- ⚫ **Cancelled** - Request cancelled

**Available Actions:**
- **View** - See full request details (all requests)
- **Cancel** - Cancel the request (Pending only)

---

## 📊 Portal Dashboard

**URL:** http://localhost:4200/portal/employee-dashboard

The main portal dashboard displays cards for all 7 features:

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│    📊 Dashboard     │  📅 My Attendance   │   👤 My Profile     │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ 👆 Fingerprint      │  🏖️ Vacation         │   🕐 Excuse         │
│    Requests         │     Requests         │      Requests       │
├─────────────────────┼─────────────────────┼─────────────────────┤
│ 🏠 Remote Work      │                     │                     │
│    Requests         │                     │                     │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

**Each card includes:**
- Feature icon
- Feature name
- Brief description
- Click to navigate to the feature

---

## 🎨 User Interface

### Page Layout
All portal pages follow a consistent layout:

```
┌────────────────────────────────────────────────────┐
│  Page Title                    [New] [Refresh]     │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │         Data Table with Requests             │ │
│  │  Date │ Type │ Status │ Actions              │ │
│  │  ───────────────────────────────────────────  │ │
│  │  Oct 20 │ Personal │ 🟡 Pending │ [👁️] [❌]  │ │
│  │  Oct 15 │ Official │ 🟢 Approved │ [👁️]     │ │
│  │  Oct 10 │ Personal │ 🔴 Rejected │ [👁️]     │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ℹ️  Info Card with helpful information            │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Features
- **Sortable Columns** - Click column headers to sort
- **Pagination** - Navigate through multiple pages (10 items per page)
- **Search/Filter** - Find specific requests
- **Responsive Design** - Works on mobile and desktop
- **Loading States** - Shows spinner while loading data
- **Empty States** - Helpful message when no data exists
- **Error States** - Clear error messages with retry option

---

## 🎯 Common Workflows

### Create an Excuse Request
1. Navigate to: http://localhost:4200/portal/excuse-requests
2. Click **"New Excuse"** button
3. Fill in the form (navigates to excuse request form)
4. Submit the request
5. View the request in the list with "Pending" status

### Cancel an Excuse Request
1. Navigate to: http://localhost:4200/portal/excuse-requests
2. Find the pending request in the table
3. Click **Cancel** button (❌ icon)
4. Confirm the cancellation in the dialog
5. Request status updates to "Cancelled"

### Create a Remote Work Request
1. Navigate to: http://localhost:4200/portal/remote-work-requests
2. Click **"New Remote Work"** button
3. Fill in the form (navigates to remote work request form)
4. Submit the request
5. View the request in the list with "Pending" status

### Cancel a Remote Work Request
1. Navigate to: http://localhost:4200/portal/remote-work-requests
2. Find the pending request in the table
3. Click **Cancel** button (❌ icon)
4. Confirm the cancellation in the dialog
5. Request status updates to "Cancelled"

### View Request Details
1. Navigate to the appropriate requests page
2. Find the request in the table
3. Click **View** button (👁️ icon)
4. See full details including approval history and comments

---

## 🔧 Troubleshooting

### "Cannot access portal" or "Access Denied"
**Solution:** Ensure you're logged in as an employee (not admin-only account)

### "No data showing"
**Solutions:**
1. Check backend is running: http://localhost:5099
2. Click the **Refresh** button
3. Check browser console for errors
4. Verify employee has data in the database

### "Actions not working"
**Solutions:**
1. Ensure you're clicking the correct button
2. Check that the request is in "Pending" status (for Cancel)
3. Look for notification messages (success/error)
4. Check browser console for errors

### "Page not loading"
**Solutions:**
1. Verify frontend is running: http://localhost:4200
2. Check the URL is correct
3. Clear browser cache and reload
4. Check browser console for errors

### Backend Errors
**Solutions:**
1. Check backend is running: `dotnet run`
2. Verify database connection
3. Check API logs in console
4. Ensure migrations are applied

---

## 📱 Mobile Access

All portal features are mobile-responsive:

- **Phones** - Single column layout, touch-friendly buttons
- **Tablets** - Optimized two-column layout
- **Desktop** - Full three-column card grid

**Recommended Browsers:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers supported

---

## 🎓 Tips & Best Practices

### For Employees
1. **Check Status Regularly** - View your requests to see approval status
2. **Use Refresh** - Click refresh to see the latest data
3. **Cancel Early** - Cancel requests you no longer need
4. **Provide Details** - Add clear reasons when creating requests
5. **Plan Ahead** - Submit requests with sufficient lead time

### For Administrators
1. **Monitor Requests** - Use admin panel to review pending requests
2. **Approve Promptly** - Employees can see status in real-time
3. **Add Comments** - Provide feedback when rejecting requests
4. **Set Policies** - Configure excuse and remote work policies

---

## 📞 Support

### For Developers
- Check `PHASE_6_7_COMPLETION_SUMMARY.md` for technical details
- Review component code in:
  - `time-attendance-frontend/src/app/pages/portal/excuse-requests/`
  - `time-attendance-frontend/src/app/pages/portal/remote-work-requests/`

### For Users
- Contact your system administrator
- Check with HR for policy questions
- Review company remote work and excuse policies

---

## ✅ Quick Checklist

Before using the new features, ensure:

- [ ] Backend is running (http://localhost:5099)
- [ ] Frontend is running (http://localhost:4200)
- [ ] You're logged in as an employee
- [ ] You have access to the portal
- [ ] Your account has the necessary permissions
- [ ] Database has your employee record

---

## 🎉 Summary

**New Features Available:**
- ⭐ Excuse Requests Management
- ⭐ Remote Work Requests Management

**Total Portal Features:** 7
- Dashboard
- My Attendance
- My Profile
- Fingerprint Requests
- Vacation Requests
- Excuse Requests (NEW)
- Remote Work Requests (NEW)

**Ready to Use:** ✅ All features are production-ready!

---

**Last Updated:** October 25, 2025
**Version:** 1.0
**Status:** Production Ready ✅
