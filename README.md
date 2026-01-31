# Time Attendance System

**Version**: 4.0  
**Status**: Active Development  
**Last Updated**: January 30, 2026

## 📖 Overview

The **Time Attendance System** is a comprehensive enterprise-grade workforce management solution that provides:

- 🕐 **Time & Attendance Tracking** - Automated attendance recording, overtime calculation, and reporting
- 🏖️ **Leave Management** - Vacation requests, leave balances, accruals, and approvals
- 👤 **Employee Self-Service Portal** - Separate frontend for employees to manage their own requests
- ✅ **Approval Workflows** - Multi-step configurable approval processes with delegation
- 🏢 **Organization Management** - Multi-branch support with departments and hierarchies
- 📅 **Shift Management** - Complex shift configurations with multiple periods and assignments
- 🏠 **Remote Work Management** - Policies and requests for remote/hybrid work
- 🔔 **Real-Time Notifications** - SignalR-based in-app notification system
- 📊 **Comprehensive Reporting** - Analytics, dashboards, and audit logging
- 🌐 **Multi-Language Support** - Full English and Arabic support with RTL

---

## 🏗️ Technical Architecture

### Backend
- **Framework**: .NET 9.0 (C# 13)
- **Architecture**: Clean Architecture + CQRS + DDD
- **Database**: PostgreSQL 15+ with Entity Framework Core 9.0
- **Key Technologies**: 
  - MediatR for CQRS pattern
  - FluentValidation for request validation
  - Coravel for background jobs
  - SignalR for real-time notifications
  - AutoMapper for object mapping

### Frontend Applications
| Application | Location | Port | Purpose |
|-------------|----------|------|---------|
| **Admin Portal** | `time-attendance-frontend/` | 4200 | Full system management for HR/Admins |
| **Self-Service Portal** | `time-attendance-selfservice-frontend/` | 4201 | Employee self-service and manager approvals |
| **Mobile ESS App** | `ess_mobile_app/` (Flutter) | N/A | Mobile attendance with GPS+NFC verification |

**Frontend Stack**:
- **Framework**: Angular 17+ with Standalone Components
- **State Management**: Angular Signals
- **UI Library**: Bootstrap 5.3 + FontAwesome 6
- **Internationalization**: ngx-translate (English/Arabic)
- **Modern Syntax**: `@if` / `@for` control flow

**Mobile Stack** (Flutter ESS):
- **Framework**: Flutter 3.x
- **State Management**: Riverpod
- **Features**: GPS geofencing, NFC tag scanning, biometric auth
- **Platforms**: iOS and Android

---

## ✨ Core Features

### 1. Authentication & Authorization
- JWT-based authentication with refresh tokens
- Two-factor authentication (2FA) with backup codes
- Role-based access control (RBAC)
- Permission-based authorization
- Branch-scoped access control (multi-tenancy)
- Session management and blacklisted tokens
- Password policies and history tracking
- Login attempt tracking and lockout

### 2. Organization Structure
- **Branches**: Multi-branch organization support with branch-scoped data
- **Departments**: Hierarchical department structure (parent-child relationships)
- **Employees**: Complete employee lifecycle management
- **Users**: User accounts with role and branch assignments
- **Roles & Permissions**: Fine-grained permission system

### 3. Time & Attendance
- **Attendance Records**: Daily automated generation of attendance records
- **Transactions**: Check-in, check-out, break start/end tracking
- **Calculations**: Automatic working hours, overtime, late minutes, early leave
- **Status Tracking**: Present, Absent, Late, OnLeave, Holiday, Weekend, etc.
- **Manual Override**: Edit and override automated attendance calculations
- **Approval Workflow**: Multi-step attendance approval process
- **Finalization**: Lock attendance records after approval
- **Device Integration**: Support for biometric fingerprint devices

### 4. Shift Management
- **Shift Types**: Regular, Flexible, Split, Rotating, Night shifts
- **Shift Periods**: Multiple work periods per shift
- **Break Configuration**: Configurable break times
- **Grace Periods**: Late arrival and early departure tolerance
- **Overtime Rules**: Per-shift overtime calculation settings
- **Off Days**: Configurable off days per shift
- **Core Hours**: Define mandatory working hours
- **Shift Assignments**: Assign shifts to employees, departments, or branches
- **Priority System**: Handle overlapping shift assignments by priority
- **Temporary Assignments**: Time-bound shift assignments

### 5. Leave Management
- **Vacation Types**: Configurable leave types (annual, sick, personal, etc.)
- **Leave Policies**: Paid/unpaid, max days, carryover rules, accrual policies
- **Employee Vacations**: Create, approve, and track vacation requests
- **Leave Balances**: Track balances by employee and vacation type
- **Leave Transactions**: Accrual, usage, adjustments, carryover, expiry
- **Leave Entitlements**: Automatic entitlement assignments
- **Approval Workflow**: Multi-step vacation approval process
- **Calendar View**: Visual vacation calendar

### 6. Excuse Management
- **Excuse Policies**: Configurable excuse types and limits
- **Excuse Types**: Sick, Personal, Emergency, Medical, Family, etc.
- **Documentation Requirements**: Attachable documents for excuses
- **Approval Workflow**: Multi-step excuse approval process
- **Balance Tracking**: Track excuse hours/days usage
- **Reset Periods**: Configure policy reset cycles

### 7. Remote Work Management
- **Remote Work Policies**: Maximum days per week/month, notice periods
- **Work Location Types**: Office, Remote, Field Work, Client Site
- **Remote Work Requests**: Create and approve remote work requests
- **Approval Workflow**: Multi-step remote work approval process
- **Blackout Periods**: Define periods when remote work is not allowed
- **Department Eligibility**: Configure which departments can work remotely

### 8. Approval Workflows
- **Workflow Definitions**: Configurable multi-step approval processes
- **Workflow Types**: Support for Vacation, Excuse, Remote Work, and custom types
- **Step Types**: Approval, Notification, Condition, Automatic
- **Approver Types**: Role, User, Manager, Direct Manager, Department Head
- **Delegation**: Delegate approvals to other users
- **Timeout & Escalation**: Automatic escalation on timeout
- **Conditional Logic**: Execute steps based on conditions
- **Parallel & Sequential**: Support both approval patterns
- **Branch-Specific**: Different workflows per branch

### 9. Employee Self-Service Portal
Separate Angular application for employee self-service:

**For All Employees:**
- Personal dashboard with attendance stats and leave balance
- View personal attendance records and history
- Create and manage vacation requests
- Create and manage excuse requests
- Create and manage remote work requests
- Request fingerprint enrollment, update, or repair
- View and update personal profile

**For Managers (Additional Features):**
- Manager dashboard with team statistics
- View team members and hierarchy
- Approve/reject team member requests
- View pending approvals

### 10. Real-Time Notifications
- **SignalR Hub**: Real-time notification delivery via WebSocket
- **Notification Types**:
  - RequestSubmitted, RequestApproved, RequestRejected
  - RequestDelegated, RequestEscalated
  - ApprovalPending, DelegationReceived, ApprovalReminder
- **User-Targeted**: Notifications sent to specific user groups
- **Bilingual Content**: Title and message in English and Arabic
- **Read Tracking**: Mark notifications as read
- **Action URLs**: Navigate directly to related entities

### 11. Dashboards & Analytics
- **Admin Dashboard**: Organization stats, HR stats, attendance stats, leave stats, system health
- **Employee Dashboard**: Personal attendance, leave balance, recent activity
- **Manager Dashboard**: Team size, pending approvals, team attendance overview
- **Weekly Trends**: Attendance trends over time
- **Incomplete Records**: Track and highlight incomplete attendance

### 12. Reporting & Audit
- **Attendance Reports**: Summary and detailed reports with filters
- **Leave Reports**: Leave summary and breakdown by type
- **Export to CSV**: Download reports for external analysis
- **Audit Logs**: Comprehensive tracking of all system changes
- **Session Reports**: Active sessions and login history
- **User Activity Tracking**: Track who did what and when

### 13. Multi-Language Support
- **Bilingual UI**: Full support for English and Arabic
- **Entity Names**: All entities support bilingual names
- **RTL Support**: Right-to-left layout for Arabic
- **Translation Service**: Centralized i18n service

### 14. Mobile ESS Platform (NEW)
A Flutter-based mobile application for employee self-service with dual-verification attendance:

**Mobile Attendance (GPS + NFC)**:
- **GPS Geofencing**: Validates employee location against branch coordinates
- **NFC Tag Verification**: Scans registered NFC tags at branch locations
- **Dual Verification**: Requires both GPS and NFC for check-in/out
- **Haversine Distance Calculation**: Accurate GPS distance calculations
- **Verification Audit Logs**: Complete audit trail of all attendance attempts
- **Configurable Geofence Radius**: Per-branch geofence settings

**NFC Tag Management**:
- **Tag Registration**: Register NFC tags to specific branches
- **Tag Validation**: Real-time tag UID validation
- **Write Protection**: Permanent write-lock capability for security
- **Tag Lifecycle**: Activate/deactivate tags as needed

**Push Notifications (FCM)**:
- **Token Registration**: Firebase Cloud Messaging integration
- **Device Management**: Multi-device token support
- **Token Lifecycle**: Automatic cleanup on logout

**Admin Broadcast Notifications**:
- **Targeted Broadcasts**: Send to all, by branch, by department, or specific employees
- **Multi-Channel**: In-app and push notification support
- **Bilingual Messages**: English and Arabic content
- **Delivery Tracking**: Monitor broadcast delivery status

**Multi-Tenant Support**:
- **Tenant Discovery**: Subdomain-based tenant lookup
- **Custom Domains**: Support for enterprise custom domains
- **Dynamic API Configuration**: Tenant-specific API base URLs

**API Endpoints**:
| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/mobile/attendance/transaction` | Process mobile check-in/out |
| `POST /api/v1/mobile/attendance/check-location` | Check geofence proximity |
| `GET /api/v1/tenants/discover?domain=...` | Discover tenant by subdomain |
| `POST /api/v1/push-tokens/register` | Register FCM token |
| `POST /api/v1/notification-broadcasts` | Create admin broadcast |
| `GET /api/v1/nfc-tags` | List NFC tags |

---

## 📚 Documentation Hub

### Core Documentation
| Document | Description |
|----------|-------------|
| **[CLAUDE.md](./CLAUDE.md)** | **START HERE** - Development guidelines, coding standards, and workflows |
| [Backend Index](./docs/backend/00-INDEX.md) | Complete backend architecture documentation |
| [Frontend Architecture](./docs/frontend/02-CORE-ARCHITECTURE.md) | Frontend patterns and architecture |

### Developer Guides
| Document | Description |
|----------|-------------|
| [Backend Quick Reference](./docs/backend/01-QUICK-REFERENCE.md) | Cheat sheet for backend developers |
| [Shared Components Catalog](./SHARED_COMPONENTS_QUICK_REFERENCE.md) | Frontend component library usage |
| [Component Refactoring Guide](./COMPONENT_REFACTORING_DOCUMENTATION.md) | Patterns and best practices |

### Business & Operations
| Document | Description |
|----------|-------------|
| [Overtime Business Rules](./OVERTIME_BUSINESS_RULES.md) | Overtime calculation rules |
| [Workflow Integration Plan](./WORKFLOW_INTEGRATION_PLAN.md) | Approval workflow guide |
| [Self-Service Implementation](./SELFSERVICE_IMPLEMENTATION_PLAN.md) | Self-service portal guide |

### Deployment & Testing
| Document | Description |
|----------|-------------|
| [Ubuntu Deployment Guide](./UBUNTU_DEPLOYMENT_GUIDE.md) | Production deployment instructions |
| [Test Cases Index](./TestCases/00_TEST_CASES_INDEX.md) | Master test cases index |
| [Test Data Setup](./TestCases/TEST_DATA_SETUP_GUIDE.md) | Test data configuration |

---

## 🚀 Quick Start

### Prerequisites
- .NET 9.0 SDK
- Node.js 18+
- PostgreSQL 15+

### Step 1: Start the Backend API
```bash
cd src/Api/TimeAttendanceSystem.Api
dotnet run
# Server starts on http://localhost:5099
# Swagger UI: http://localhost:5099/swagger
# Database is created automatically on first run
```

### Step 2: Load Sample Data (First Time Only)
```bash
# Option 1: Using .NET tool (recommended)
cd tools
dotnet run --project RunSampleData.csproj

# Verify the data was loaded
cd tools/verify
dotnet run
```

### Step 3: Start the Admin Portal
```bash
cd time-attendance-frontend
npm install  # First time only
npm start
# Application starts on http://localhost:4200
```

### Step 4: Start the Self-Service Portal
```bash
cd time-attendance-selfservice-frontend
npm install  # First time only
npm start
# Application starts on http://localhost:4201
```

---

## 🔐 Default Credentials

### System Administrator
| Username | Password | Notes |
|----------|----------|-------|
| `systemadmin` | See `Infrastructure/Data/ApplicationDbContextSeed.cs` | Full system access |

### Sample Employee Accounts (after running sample data script)
| Role | Username | Password | Employee ID |
|------|----------|----------|-------------|
| **Branch Manager** | ahmed.rashid | Emp@123! | 1001 |
| **Department Manager** | sara.fahad | Emp@123! | 1006 |
| **Regular Employee** | salma.khaldi | Emp@123! | 1026 |

> **Note**: All employee accounts require password change on first login

---

## 🛠️ Development Workflow

### Running Applications Summary

| Application | URL | Port | Purpose |
|-------------|-----|------|---------|
| **Backend API** | http://localhost:5099 | 5099 | RESTful API, SignalR Hub, Authentication |
| **Admin Portal** | http://localhost:4200 | 4200 | Full system management for HR/Admins |
| **Self-Service Portal** | http://localhost:4201 | 4201 | Employee self-service and manager approvals |

### Development Rules
- Always follow guidelines in **[CLAUDE.md](./CLAUDE.md)**
- Plan → Confirm → Implement → Verify
- Compile and test before committing
- Use shared components exclusively

### Essential Commands

**Backend:**
```bash
# Run backend
cd src/Api/TimeAttendanceSystem.Api
dotnet run

# Create migration
dotnet ef migrations add MigrationName --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api

# Update database
dotnet ef database update --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api
```

**Frontend:**
```bash
# Admin Portal
cd time-attendance-frontend
npm start

# Self-Service Portal
cd time-attendance-selfservice-frontend
npm start
```

---

## 🔧 Sample Data Management Tools

The project includes .NET console tools for managing sample data:

### Sample Data Loader
```bash
cd tools
dotnet run --project RunSampleData.csproj
```
Creates: 5 branches, 20 departments, 50 employees with user accounts

### Sample Data Verifier
```bash
cd tools/verify
dotnet run
```
Verifies all sample data was loaded correctly

---

## 📁 Key File Locations

### Backend
- Controllers: `src/Api/TimeAttendanceSystem.Api/Controllers/`
- SignalR Hubs: `src/Api/TimeAttendanceSystem.Api/Hubs/`
- Services: `src/Application/TimeAttendanceSystem.Application/Services/`
- Entities: `src/Domain/TimeAttendanceSystem.Domain/`
- Repositories: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Repositories/`
- Background Jobs: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/`

### Frontend (Admin)
- Pages: `time-attendance-frontend/src/app/pages/`
- Shared Components: `time-attendance-frontend/src/app/shared/components/`
- Core Services: `time-attendance-frontend/src/app/core/services/`

### Frontend (Self-Service)
- Portal Pages: `time-attendance-selfservice-frontend/src/app/pages/portal/`
- Portal Service: `time-attendance-selfservice-frontend/src/app/pages/portal/services/portal.service.ts`

---

## 🧪 Testing Checklist

After starting all applications:
- [ ] Backend: Visit http://localhost:5099/swagger for API documentation
- [ ] Admin Portal: Log in at http://localhost:4200 with systemadmin credentials
- [ ] Self-Service: Log in at http://localhost:4201 with employee credentials
- [ ] Change password on first login (required for sample accounts)
- [ ] Create a vacation request in self-service portal
- [ ] Log in as manager and approve the request
- [ ] Verify real-time notifications work

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check PostgreSQL connection, review appsettings.json |
| **Frontend compilation errors** | Delete node_modules and run `npm install` |
| **Port conflicts** | Check if ports 4200, 4201, or 5099 are in use |
| **API connection errors** | Verify backend is running, check CORS settings |
| **Can't login** | Verify username format (email prefix) and password |
| **SignalR not connecting** | Check browser console, verify JWT token |

---

## 📄 License

This project is proprietary software for enterprise use.

---

## 📱 Mobile App Setup (Flutter)

The mobile application is located in `ess_mobile_app/`.
A local Flutter SDK is installed in `flutter/`.

### Prerequisites
- Windows 10/11
- PowerShell

### Setup & Run
1. **Navigate to the project**:
   ```powershell
   cd ess_mobile_app
   ```

2. **Run the App**:
   ```powershell
   # Use the local Flutter SDK
   ../flutter/bin/flutter run
   ```

**Note**: The Flutter SDK is installed locally in `d:\Work\TimeAttendanceSystem\flutter` to avoid conflicts with global installations.

---

*Generated for Time Attendance System - Enterprise Workforce Management Solution*
