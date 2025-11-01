# Time Attendance System - Test Cases Index

## Overview
This document provides a comprehensive index of all test cases for the Time Attendance System. The test suite covers all major features, security aspects, performance, and integration scenarios.

**Total Test Cases: 177**
**Test Files: 18**
**Last Updated: October 30, 2025**

---

## Test Suite Summary

| # | File | Module | Test Cases | Priority |
|---|------|--------|------------|----------|
| 01 | [Authentication_Tests.md](01_Authentication_Tests.md) | Authentication | 7 | High |
| 02 | [Authorization_Tests.md](02_Authorization_Tests.md) | Authorization & RBAC | 10 | High |
| 03 | [Employee_Management_Tests.md](03_Employee_Management_Tests.md) | Employee Management | 10 | High |
| 04 | [Shift_Management_Tests.md](04_Shift_Management_Tests.md) | Shift Management | 10 | High |
| 05 | [Attendance_Core_Tests.md](05_Attendance_Core_Tests.md) | Attendance Core | 10 | High |
| 06 | [Attendance_Calculation_Tests.md](06_Attendance_Calculation_Tests.md) | Attendance Calculation | 10 | High |
| 07 | [Excuse_Requests_Tests.md](07_Excuse_Requests_Tests.md) | Excuse Requests | 10 | High |
| 08 | [Remote_Work_Requests_Tests.md](08_Remote_Work_Requests_Tests.md) | Remote Work | 10 | High |
| 09 | [Vacation_Management_Tests.md](09_Vacation_Management_Tests.md) | Vacation Management | 10 | High |
| 10 | [Fingerprint_Requests_Tests.md](10_Fingerprint_Requests_Tests.md) | Fingerprint Requests | 10 | Medium |
| 11 | [Holiday_Management_Tests.md](11_Holiday_Management_Tests.md) | Public Holidays | 10 | Medium |
| 12 | [Portal_Frontend_Tests.md](12_Portal_Frontend_Tests.md) | Employee Portal UI | 10 | High |
| 13 | [Multi_Tenancy_Tests.md](13_Multi_Tenancy_Tests.md) | Multi-Tenancy | 10 | High |
| 14 | [Audit_Logging_Tests.md](14_Audit_Logging_Tests.md) | Audit & Compliance | 10 | Medium |
| 15 | [Integration_Tests.md](15_Integration_Tests.md) | Cross-Module Integration | 10 | High |
| 16 | [Performance_Tests.md](16_Performance_Tests.md) | Performance & Scalability | 10 | High |
| 17 | [Security_Tests.md](17_Security_Tests.md) | Security & Vulnerabilities | 10 | High |
| 18 | [Background_Jobs_Tests.md](18_Background_Jobs_Tests.md) | Background Jobs | 10 | Medium |

---

## Test Cases by Priority

### High Priority (127 test cases)
Critical functionality that must work for system to be operational.

- Authentication (7) - Login, logout, token management, session handling
- Authorization (10) - RBAC, permissions, branch scoping
- Employee Management (10) - CRUD, hierarchy, linking
- Shift Management (10) - Assignment, resolution, night shifts
- Attendance Core (10) - Clock in/out, status calculation
- Attendance Calculation (10) - Overtime, grace periods, hours
- Excuse Requests (10) - Create, approve, policy enforcement
- Remote Work (10) - Requests, quota validation, auto-calculation
- Vacation Management (10) - Accrual, approval, balance
- Portal Frontend (10) - UI/UX, responsiveness, forms
- Multi-Tenancy (10) - Data isolation, branch scoping
- Integration Tests (10) - Cross-module workflows
- Performance Tests (10) - Response times, scalability
- Security Tests (10) - Vulnerabilities, injection prevention

### Medium Priority (40 test cases)
Important functionality that enhances system usability and compliance.

- Fingerprint Requests (10) - Enrollment, scheduling, tracking
- Holiday Management (10) - Configuration, recurrence, integration
- Audit Logging (10) - Compliance, change tracking
- Background Jobs (10) - Scheduling, error handling, monitoring

### Low Priority (10 test cases)
Nice-to-have features and administrative conveniences.

- Various administrative UI features
- Export capabilities
- Monitoring dashboards

---

## Test Coverage by Feature

### 1. Authentication & User Management (17 test cases)
- **Files**: 01, 02
- **Coverage**:
  - Login/logout flows (AUTH-001, AUTH-005)
  - JWT token management (AUTH-004, AUTH-006)
  - Account lockout (AUTH-003)
  - Session management (AUTH-007)
  - Failed login tracking (AUTH-002)
  - Role-based access control (AUTHZ-001 to AUTHZ-010)
  - Permission enforcement
  - Branch scoping

### 2. Employee Management (10 test cases)
- **File**: 03
- **Coverage**:
  - CRUD operations (EMP-001, EMP-003, EMP-004)
  - Pagination and filtering (EMP-002, EMP-009)
  - Hierarchical relationships (EMP-005)
  - User account linking (EMP-006)
  - Data validation (EMP-007, EMP-010)
  - Department transfers (EMP-008)

### 3. Shift Management (10 test cases)
- **File**: 04
- **Coverage**:
  - Standard shifts (SHIFT-001)
  - Night shifts (SHIFT-002)
  - Multi-period shifts (SHIFT-003)
  - Assignment hierarchy (SHIFT-004 to SHIFT-006)
  - Priority resolution (SHIFT-007)
  - Effective dates (SHIFT-008)
  - Configuration updates (SHIFT-009, SHIFT-010)

### 4. Attendance System (20 test cases)
- **Files**: 05, 06
- **Coverage**:
  - Daily record generation (ATT-001)
  - Clock in/out transactions (ATT-002, ATT-004)
  - Status calculation (ATT-003, ATT-005, ATT-006, ATT-007)
  - Break tracking (ATT-008)
  - Real-time updates (ATT-009)
  - Approval workflow (ATT-010)
  - Overtime calculation (CALC-001 to CALC-003)
  - Grace periods (CALC-005, CALC-006)
  - Complex scenarios (CALC-010)

### 5. Time-Off Management (30 test cases)
- **Files**: 07, 08, 09
- **Coverage**:
  - Excuse requests (EXCUSE-001 to EXCUSE-010)
  - Policy enforcement
  - File attachments
  - Remote work requests (REMOTE-001 to REMOTE-010)
  - Working days calculation
  - Quota management
  - Vacation requests (VAC-001 to VAC-010)
  - Accrual calculation
  - Carryover management
  - Conflict detection

### 6. Support Features (20 test cases)
- **Files**: 10, 11
- **Coverage**:
  - Fingerprint requests (FP-001 to FP-010)
  - Enrollment and scheduling
  - Public holidays (HOL-001 to HOL-010)
  - Recurrence patterns
  - Branch-specific holidays

### 7. Frontend & Portal (10 test cases)
- **File**: 12
- **Coverage**:
  - Dashboard (UI-001)
  - Navigation (UI-002)
  - Form validation (UI-003)
  - File upload (UI-004)
  - Date pickers (UI-005)
  - Status badges (UI-006)
  - Data tables (UI-007)
  - Responsive design (UI-010)
  - Notifications (UI-009)

### 8. System Architecture (40 test cases)
- **Files**: 13, 14, 15, 18
- **Coverage**:
  - Multi-tenancy (MT-001 to MT-010)
  - Data isolation
  - Branch scoping
  - Audit logging (AUDIT-001 to AUDIT-010)
  - Integration workflows (INT-001 to INT-010)
  - Background jobs (JOB-001 to JOB-010)

### 9. Performance & Security (20 test cases)
- **Files**: 16, 17
- **Coverage**:
  - Load testing (PERF-001 to PERF-010)
  - Response times
  - Scalability
  - SQL injection (SEC-001)
  - XSS prevention (SEC-002)
  - Authorization bypass (SEC-003)
  - Token security (SEC-004)
  - CSRF protection (SEC-005)
  - Password security (SEC-006)
  - Rate limiting (SEC-007)

---

## Test Execution Guidelines

### Execution Order Recommendation

**Phase 1 - Foundation (Day 1-2)**
1. Authentication_Tests.md
2. Authorization_Tests.md
3. Multi_Tenancy_Tests.md
4. Security_Tests.md

**Phase 2 - Core Entities (Day 3-4)**
5. Employee_Management_Tests.md
6. Shift_Management_Tests.md
7. Holiday_Management_Tests.md

**Phase 3 - Attendance System (Day 5-6)**
8. Attendance_Core_Tests.md
9. Attendance_Calculation_Tests.md
10. Background_Jobs_Tests.md

**Phase 4 - Request Features (Day 7-8)**
11. Vacation_Management_Tests.md
12. Excuse_Requests_Tests.md
13. Remote_Work_Requests_Tests.md
14. Fingerprint_Requests_Tests.md

**Phase 5 - Integration & Frontend (Day 9-10)**
15. Integration_Tests.md
16. Portal_Frontend_Tests.md
17. Audit_Logging_Tests.md

**Phase 6 - Performance (Day 11)**
18. Performance_Tests.md

---

## Test Environment Setup

### Required Infrastructure
- **Backend**: .NET 9 API running on http://localhost:5099
- **Frontend**: Angular 17 app running on http://localhost:4200
- **Database**: PostgreSQL with test data
- **Background Jobs**: Coravel scheduler configured

### Test Data Setup
**📋 See [TEST_DATA_SETUP_GUIDE.md](TEST_DATA_SETUP_GUIDE.md) for complete step-by-step setup instructions.**

### Test Data Requirements

#### Required Test Accounts
⚠️ **CRITICAL**: All users must be linked to employees via EmployeeUserLink. This is not optional.

**1. System Administrator**
- Employee: Admin User (Code: ADMIN001)
- Username: `systemadmin`
- Password: `TempP@ssw0rd123!`
- Role: SystemAdmin
- Branch: All branches access

**2. Regular Employee**
- Employee: John Doe (Code: EMP001)
- Username: `john.doe`
- Password: `Test@123456`
- Role: Employee
- Branch: Cairo (ID: 1)
- Department: Engineering

**3. Manager**
- Employee: Alice Manager (Code: MGR001)
- Username: `alice.manager`
- Password: `Manager@123`
- Role: Manager
- Branch: Cairo
- Manages: 5+ employees

**4. HR Officer**
- Employee: Bob HR (Code: HR001)
- Username: `bob.hr`
- Password: `HR@123456`
- Role: HR Operation
- Branch: Cairo

**Additional Requirements:**
- **Branches**: 3+ branches (Cairo, Alexandria, Giza)
- **Employees**: 100+ with various configurations
- **Shifts**: 5+ shift types (standard, night, split)
- **Attendance**: Historical data for 3+ months
- **Requests**: Various statuses (Pending, Approved, Rejected)

### Testing Tools
- **API Testing**: Postman, REST Client, curl
- **Load Testing**: JMeter, k6, Artillery
- **Security Testing**: OWASP ZAP, Burp Suite
- **Frontend Testing**: Chrome DevTools, Lighthouse
- **Database**: pgAdmin, DBeaver

---

## Test Metrics & Reporting

### Key Metrics to Track
- **Test Pass Rate**: Target > 95%
- **Code Coverage**: Target > 80%
- **Defect Density**: < 1 defect per 10 test cases
- **Execution Time**: Complete suite in < 8 hours
- **Performance SLAs**: All met (see Performance_Tests.md)

### Test Report Template
Each test execution should include:
1. Test Case ID
2. Execution Date/Time
3. Tester Name
4. Result (Pass/Fail)
5. Defects Found (with IDs)
6. Notes/Comments
7. Screenshots (for UI tests)

---

## Defect Severity Guidelines

### Critical (P0)
- System crash or data loss
- Security vulnerabilities
- Authentication failures
- Data corruption

### High (P1)
- Major feature not working
- Incorrect calculation (attendance, overtime, vacation)
- Permission bypass
- Performance degradation > 50%

### Medium (P2)
- Minor feature issues
- UI/UX problems
- Validation errors
- Performance degradation 20-50%

### Low (P3)
- Cosmetic issues
- Minor UI inconsistencies
- Documentation errors
- Performance degradation < 20%

---

## Test Case Naming Convention

### Format
`[MODULE]-[NUMBER]: [Short Description]`

### Examples
- `AUTH-001`: Successful User Login
- `SHIFT-007`: Shift Assignment Priority Resolution
- `PERF-004`: Concurrent Clock-In Transactions
- `SEC-001`: SQL Injection Prevention

---

## Regression Testing

### Regression Test Suite (Run Before Each Release)
1. Authentication_Tests.md (all cases)
2. Authorization_Tests.md (all cases)
3. Integration_Tests.md (all cases)
4. Security_Tests.md (SEC-001 to SEC-005)
5. Performance_Tests.md (PERF-001, PERF-002, PERF-006)

**Estimated Time**: 4-6 hours

---

## Smoke Testing

### Smoke Test Suite (Run After Each Deployment)
1. AUTH-001: Login
2. EMP-001: Create Employee
3. ATT-001: Daily Attendance Generation
4. ATT-002: Clock In
5. ATT-004: Clock Out
6. VAC-002: Create Vacation Request
7. EXCUSE-001: Create Excuse Request
8. REMOTE-001: Create Remote Work Request
9. UI-001: Portal Dashboard
10. INT-010: End-to-End Lifecycle

**Estimated Time**: 30-60 minutes

---

## Compliance Testing

### GDPR Compliance
- AUDIT-008: Sensitive Data Masking
- AUDIT-009: Data Retention
- SEC-008: Sensitive Data Exposure

### SOX Compliance (if applicable)
- AUDIT-001 to AUDIT-007: Complete audit trail
- SEC-006: Password Security
- MT-001 to MT-005: Data isolation

### OWASP Top 10 Coverage
- SEC-001: SQL Injection (A03)
- SEC-002: XSS (A03)
- SEC-003: Broken Access Control (A01)
- SEC-004: Cryptographic Failures (A02)
- SEC-005: CSRF (A01)
- SEC-006: Identification Failures (A07)
- SEC-009: Insecure Design (A04)
- SEC-010: Security Misconfiguration (A05)

---

## Continuous Integration

### Automated Test Execution
- **Trigger**: On every commit to main branch
- **Scope**: Smoke tests + Unit tests
- **Duration**: < 15 minutes
- **Reporting**: Email on failure

### Nightly Build Testing
- **Trigger**: Daily at 2 AM
- **Scope**: Full regression suite
- **Duration**: 4-6 hours
- **Reporting**: Dashboard + Email summary

---

## Test Case Maintenance

### Review Frequency
- **Quarterly**: Review all test cases for relevance
- **After Major Release**: Update test cases for new features
- **On Defect Find**: Add regression test for fixed bugs

### Version Control
- All test case files tracked in Git
- Changes require code review
- Version tagged with each release

---

## Contact Information

### Test Team
- **Test Lead**: [Name]
- **QA Engineers**: [Names]
- **Automation Engineer**: [Name]
- **Performance Tester**: [Name]

### Reporting Issues
- **Bug Tracker**: [Jira/GitHub Issues URL]
- **Email**: qa-team@company.com
- **Slack**: #qa-time-attendance

---

## Appendix

### A. Abbreviations
- **CRUD**: Create, Read, Update, Delete
- **RBAC**: Role-Based Access Control
- **JWT**: JSON Web Token
- **2FA**: Two-Factor Authentication
- **TOTP**: Time-based One-Time Password
- **SLA**: Service Level Agreement
- **OWASP**: Open Web Application Security Project
- **GDPR**: General Data Protection Regulation
- **SOX**: Sarbanes-Oxley Act

### B. References
- [Project Architecture](../PROJECT_ARCHITECTURE.md)
- [API Documentation](../API_DOCUMENTATION.md)
- [Overtime Business Rules](../OVERTIME_BUSINESS_RULES.md)
- [Shared Components Reference](../SHARED_COMPONENTS_QUICK_REFERENCE.md)

### C. Change Log
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-10-30 | 1.0 | Initial test suite creation - 180 test cases across 18 files | AI Assistant |

---

**End of Test Cases Index**

For detailed test cases, refer to individual test files listed above.
