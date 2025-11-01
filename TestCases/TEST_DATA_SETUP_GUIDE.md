# Test Data Setup Guide

## Overview
This guide provides step-by-step instructions for setting up test data required to execute the test cases in this suite.

**Important**: All users in the system must be linked to employees via EmployeeUserLink. This is a critical requirement for the system architecture.

---

## Setup Order

Follow this order to ensure referential integrity:

1. Branches
2. Departments
3. Employees
4. Users
5. EmployeeUserLink
6. Shifts
7. Shift Assignments
8. Public Holidays
9. Vacation Types
10. Policies (Excuse, Remote Work)

---

## 1. Create Branches

### API Endpoint
`POST /api/v1/branches`

### Required Branches

**Branch 1: Cairo**
```json
{
  "code": "CAI",
  "nameEn": "Cairo Branch",
  "nameAr": "فرع القاهرة",
  "timezone": "Africa/Cairo",
  "isActive": true
}
```

**Branch 2: Alexandria**
```json
{
  "code": "ALX",
  "nameEn": "Alexandria Branch",
  "nameAr": "فرع الإسكندرية",
  "timezone": "Africa/Cairo",
  "isActive": true
}
```

**Branch 3: Giza**
```json
{
  "code": "GIZ",
  "nameEn": "Giza Branch",
  "nameAr": "فرع الجيزة",
  "timezone": "Africa/Cairo",
  "isActive": true
}
```

---

## 2. Create Departments

### API Endpoint
`POST /api/v1/departments`

### Required Departments

**Engineering Department**
```json
{
  "code": "ENG",
  "nameEn": "Engineering",
  "nameAr": "الهندسة",
  "branchId": 1,
  "managerId": null,
  "isActive": true
}
```

**HR Department**
```json
{
  "code": "HR",
  "nameEn": "Human Resources",
  "nameAr": "الموارد البشرية",
  "branchId": 1,
  "managerId": null,
  "isActive": true
}
```

**Sales Department**
```json
{
  "code": "SALES",
  "nameEn": "Sales",
  "nameAr": "المبيعات",
  "branchId": 1,
  "managerId": null,
  "isActive": true
}
```

---

## 3. Create Employees

### API Endpoint
`POST /api/v1/employees`

### Required Test Employees

**1. Admin User Employee**
```json
{
  "code": "ADMIN001",
  "firstNameEn": "System",
  "lastNameEn": "Administrator",
  "firstNameAr": "مسؤول",
  "lastNameAr": "النظام",
  "email": "admin@company.com",
  "phoneNumber": "+201000000001",
  "birthDate": "1985-01-01",
  "hireDate": "2020-01-01",
  "departmentId": 1,
  "branchId": 1,
  "jobTitle": "System Administrator",
  "employmentStatus": "FullTime",
  "workLocationType": "Office",
  "isActive": true
}
```
**Note**: Record the returned employee ID for user linking.

**2. Regular Employee - John Doe**
```json
{
  "code": "EMP001",
  "firstNameEn": "John",
  "lastNameEn": "Doe",
  "firstNameAr": "جون",
  "lastNameAr": "دو",
  "email": "john.doe@company.com",
  "phoneNumber": "+201000000002",
  "birthDate": "1990-05-15",
  "hireDate": "2023-01-15",
  "departmentId": 1,
  "branchId": 1,
  "jobTitle": "Software Engineer",
  "employmentStatus": "FullTime",
  "workLocationType": "Office",
  "isActive": true
}
```
**Note**: Record the returned employee ID.

**3. Manager - Alice Manager**
```json
{
  "code": "MGR001",
  "firstNameEn": "Alice",
  "lastNameEn": "Manager",
  "firstNameAr": "أليس",
  "lastNameAr": "مدير",
  "email": "alice.manager@company.com",
  "phoneNumber": "+201000000003",
  "birthDate": "1985-03-20",
  "hireDate": "2021-01-01",
  "departmentId": 1,
  "branchId": 1,
  "jobTitle": "Engineering Manager",
  "employmentStatus": "FullTime",
  "workLocationType": "Office",
  "isActive": true
}
```
**Note**: Record the returned employee ID.

**4. HR Officer - Bob HR**
```json
{
  "code": "HR001",
  "firstNameEn": "Bob",
  "lastNameEn": "HR",
  "firstNameAr": "بوب",
  "lastNameAr": "موارد بشرية",
  "email": "bob.hr@company.com",
  "phoneNumber": "+201000000004",
  "birthDate": "1988-07-10",
  "hireDate": "2022-01-01",
  "departmentId": 2,
  "branchId": 1,
  "jobTitle": "HR Officer",
  "employmentStatus": "FullTime",
  "workLocationType": "Office",
  "isActive": true
}
```
**Note**: Record the returned employee ID.

---

## 4. Create User Accounts

### API Endpoint
`POST /api/v1/auth/register` (or admin user creation endpoint)

### Important Notes
- Users are created through registration or admin endpoints
- The systemadmin user likely already exists from database seed
- For testing, you may need admin access to create users with specific roles

### Required Test Users

**1. System Administrator** (if not already seeded)
```json
{
  "username": "systemadmin",
  "email": "admin@company.com",
  "password": "TempP@ssw0rd123!",
  "firstName": "System",
  "lastName": "Administrator"
}
```
**Then assign role**: SystemAdmin

**2. Regular Employee User**
```json
{
  "username": "john.doe",
  "email": "john.doe@company.com",
  "password": "Test@123456",
  "firstName": "John",
  "lastName": "Doe"
}
```
**Then assign role**: Employee

**3. Manager User**
```json
{
  "username": "alice.manager",
  "email": "alice.manager@company.com",
  "password": "Manager@123",
  "firstName": "Alice",
  "lastName": "Manager"
}
```
**Then assign role**: Manager

**4. HR User**
```json
{
  "username": "bob.hr",
  "email": "bob.hr@company.com",
  "password": "HR@123456",
  "firstName": "Bob",
  "lastName": "HR"
}
```
**Then assign role**: HR Operation

---

## 5. Create EmployeeUserLink

### API Endpoint
`POST /api/v1/employees/{employeeId}/link-user`

### Critical Step
This links user accounts to employee records, enabling portal access.

**Link System Admin**
```json
POST /api/v1/employees/{admin-employee-id}/link-user
{
  "userId": "{systemadmin-user-id}"
}
```

**Link John Doe**
```json
POST /api/v1/employees/{john-employee-id}/link-user
{
  "userId": "{john-user-id}"
}
```

**Link Alice Manager**
```json
POST /api/v1/employees/{alice-employee-id}/link-user
{
  "userId": "{alice-user-id}"
}
```

**Link Bob HR**
```json
POST /api/v1/employees/{bob-employee-id}/link-user
{
  "userId": "{bob-user-id}"
}
```

---

## 6. Assign User Branch Scopes

### API Endpoint
`POST /api/v1/users/{userId}/branches`

**System Admin** - All branches
```json
{
  "branchIds": [1, 2, 3]
}
```

**John Doe** - Cairo only
```json
{
  "branchIds": [1]
}
```

**Alice Manager** - Cairo only
```json
{
  "branchIds": [1]
}
```

**Bob HR** - Cairo only
```json
{
  "branchIds": [1]
}
```

---

## 7. Create Shifts

### API Endpoint
`POST /api/v1/shifts`

**Standard Morning Shift**
```json
{
  "code": "MORNING",
  "name": "Morning Shift",
  "nameAr": "وردية الصباح",
  "shiftType": "TimeBased",
  "isNightShift": false,
  "totalHours": 8.0,
  "gracePeriodMinutes": 15,
  "breakDurationMinutes": 60,
  "isActive": true,
  "periods": [
    {
      "startTime": "09:00:00",
      "endTime": "17:00:00",
      "durationHours": 8.0,
      "isCoreHours": true
    }
  ]
}
```

**Night Shift**
```json
{
  "code": "NIGHT",
  "name": "Night Shift",
  "nameAr": "وردية الليل",
  "shiftType": "TimeBased",
  "isNightShift": true,
  "totalHours": 8.0,
  "gracePeriodMinutes": 15,
  "breakDurationMinutes": 60,
  "isActive": true,
  "periods": [
    {
      "startTime": "22:00:00",
      "endTime": "06:00:00",
      "durationHours": 8.0,
      "isCoreHours": true
    }
  ]
}
```

---

## 8. Assign Shifts

### API Endpoint
`POST /api/v1/shift-assignments`

**Assign Morning Shift to Branch 1 (Default)**
```json
{
  "shiftId": "{morning-shift-id}",
  "assignmentLevel": "Branch",
  "branchId": 1,
  "effectiveDate": "2024-01-01",
  "isActive": true
}
```

**Assign Morning Shift to John Doe**
```json
{
  "shiftId": "{morning-shift-id}",
  "assignmentLevel": "Employee",
  "employeeId": "{john-employee-id}",
  "effectiveDate": "2024-01-01",
  "isDefault": true,
  "isActive": true
}
```

---

## 9. Create Public Holidays

### API Endpoint
`POST /api/v1/public-holidays`

**New Year's Day**
```json
{
  "name": "New Year's Day",
  "nameAr": "رأس السنة الميلادية",
  "date": "2024-01-01",
  "recurrenceType": "Annual",
  "isActive": true,
  "appliesTo": "AllBranches"
}
```

**Labor Day**
```json
{
  "name": "Labor Day",
  "nameAr": "عيد العمال",
  "date": "2024-05-01",
  "recurrenceType": "Annual",
  "isActive": true,
  "appliesTo": "AllBranches"
}
```

---

## 10. Create Vacation Types

### API Endpoint
`POST /api/v1/vacation-types`

**Annual Leave**
```json
{
  "code": "ANNUAL",
  "name": "Annual Leave",
  "nameAr": "إجازة سنوية",
  "accrualType": "Annual",
  "daysPerYear": 21,
  "maxDaysPerRequest": 14,
  "maxCarryoverDays": 5,
  "carryoverExpirationMonths": 3,
  "requiresApproval": true,
  "isPaid": true,
  "isActive": true
}
```

---

## 11. Create Policies

### Excuse Policy
`POST /api/v1/excuse-policies`

```json
{
  "name": "Standard Excuse Policy",
  "branchId": 1,
  "maxPersonalExcusesPerMonth": 3,
  "maxHoursPerExcuse": 4,
  "requireApproval": true,
  "isActive": true
}
```

### Remote Work Policy
`POST /api/v1/remote-work-policies`

```json
{
  "name": "Standard Remote Work Policy",
  "branchId": 1,
  "weeklyQuota": 3,
  "monthlyQuota": 12,
  "maxConsecutiveDays": 5,
  "requiresManagerApproval": true,
  "isActive": true
}
```

---

## 12. Verify Setup

### Verification Checklist

Run these queries to verify setup:

1. **Verify Employees**
```sql
SELECT Code, FirstNameEn, Email, BranchId, DepartmentId, IsActive
FROM Employees
WHERE Code IN ('ADMIN001', 'EMP001', 'MGR001', 'HR001');
```
Expected: 4 employees

2. **Verify Users**
```sql
SELECT Username, Email, IsActive, EmailVerified
FROM Users
WHERE Username IN ('systemadmin', 'john.doe', 'alice.manager', 'bob.hr');
```
Expected: 4 users

3. **Verify EmployeeUserLink**
```sql
SELECT eul.*, e.Code as EmployeeCode, u.Username
FROM EmployeeUserLinks eul
JOIN Employees e ON e.Id = eul.EmployeeId
JOIN Users u ON u.Id = eul.UserId;
```
Expected: 4 links

4. **Verify Shift Assignments**
```sql
SELECT sa.*, s.Code as ShiftCode, e.Code as EmployeeCode
FROM ShiftAssignments sa
LEFT JOIN Shifts s ON s.Id = sa.ShiftId
LEFT JOIN Employees e ON e.Id = sa.EmployeeId;
```
Expected: At least 2 assignments

5. **Test Login**
```bash
# Test john.doe login
curl -X POST http://localhost:5099/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john.doe",
    "password": "Test@123456"
  }'
```
Expected: JWT tokens returned

---

## Troubleshooting

### Issue: User cannot access portal
**Solution**: Verify EmployeeUserLink exists

### Issue: Permission denied errors
**Solution**: Verify role assignment and UserBranchScope

### Issue: No shift for employee
**Solution**: Create shift assignment (employee/department/branch level)

### Issue: Cannot create attendance
**Solution**: Ensure shift is assigned and effective date is correct

---

## Quick Setup Script (SQL)

For development/testing, you can use this SQL script as a reference:

```sql
-- Note: This is a reference. Actual implementation depends on your seeding strategy.
-- Recommended: Use the API endpoints above for proper validation and audit logging.

-- Insert Branches (if not exists)
-- Insert Departments (if not exists)
-- Insert Employees
-- Insert Users (via API for password hashing)
-- Insert EmployeeUserLinks
-- Insert UserBranchScopes
-- Insert Shifts
-- Insert ShiftAssignments
-- Insert PublicHolidays
-- Insert VacationTypes
-- Insert Policies
```

---

## Summary

After completing this setup, you will have:

- ✅ 3 Branches (Cairo, Alexandria, Giza)
- ✅ 3 Departments (Engineering, HR, Sales)
- ✅ 4 Test employees with linked user accounts
- ✅ 4 User accounts with roles (SystemAdmin, Employee, Manager, HR)
- ✅ 4 EmployeeUserLinks (critical for portal access)
- ✅ Branch scopes for all users
- ✅ 2+ Shifts (Morning, Night)
- ✅ Shift assignments
- ✅ 2+ Public holidays
- ✅ 1+ Vacation type
- ✅ 2 Policies (Excuse, Remote Work)

**Your test environment is now ready for test case execution!**

---

**Last Updated**: 2025-10-30
