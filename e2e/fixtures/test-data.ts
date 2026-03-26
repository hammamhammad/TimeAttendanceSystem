/** Test data constants used across all test files */

export const USERS = {
  admin: {
    username: 'systemadmin',
    password: 'TempP@ssw0rd123!',
    role: 'SystemAdmin',
  },
  branchManager: {
    username: 'ahmed.rashid',
    password: 'Emp@123!',
    newPassword: 'Manager@2026!',
    name: 'Ahmed Al-Rashid',
    employeeId: 1001,
    role: 'BranchManager',
  },
  deptManager: {
    username: 'sara.fahad',
    password: 'Emp@123!',
    newPassword: 'DeptMgr@2026!',
    name: 'Sara Fahad',
    employeeId: 1006,
    role: 'DepartmentManager',
  },
  employee: {
    username: 'salma.khaldi',
    password: 'Emp@123!',
    newPassword: 'Employee@2026!',
    name: 'Salma Khaldi',
    employeeId: 1026,
    role: 'Employee',
  },
};

export const BRANCHES = {
  headquarters: { id: 101, name: 'Headquarters - Riyadh' },
  jeddah: { id: 102, name: 'Jeddah Branch' },
  dammam: { id: 103, name: 'Dammam Branch' },
  madinah: { id: 104, name: 'Madinah Branch' },
  makkah: { id: 105, name: 'Makkah Branch' },
};

export const DEPARTMENTS = {
  hr: 'Human Resources',
  it: 'Information Technology',
  finance: 'Finance',
  operations: 'Operations',
};

export const URLS = {
  admin: {
    base: 'http://localhost:4200',
    login: '/#/login',
    dashboard: '/#/dashboard',
    employees: '/#/employees',
    createEmployee: '/#/employees/create',
    branches: '/#/branches',
    departments: '/#/departments',
    createDepartment: '/#/departments/create',
    shifts: '/#/shifts',
    createShift: '/#/shifts/create',
    shiftAssign: '/#/shifts/assign',
    attendance: '/#/attendance',
    dailyAttendance: '/#/attendance/daily',
    monthlyReport: '/#/attendance/monthly-report',
    vacations: '/#/employee-vacations',
    createVacation: '/#/employee-vacations/create',
    excuses: '/#/employee-excuses',
    createExcuse: '/#/employee-excuses/create',
    remoteWork: '/#/remote-work',
    createRemoteWork: '/#/remote-work/create',
    users: '/#/users',
    createUser: '/#/users/create',
    roles: '/#/roles',
    createRole: '/#/roles/create',
    approvals: '/#/approvals',
    approvalHistory: '/#/approvals/history',
    vacationTypes: '/#/settings/vacation-types',
    excusePolicies: '/#/settings/excuse-policies',
    createExcusePolicy: '/#/settings/excuse-policies/create',
    overtime: '/#/settings/overtime',
    createOvertime: '/#/settings/overtime/create',
    publicHolidays: '/#/settings/public-holidays',
    createPublicHoliday: '/#/settings/public-holidays/create',
    remoteWorkPolicies: '/#/settings/remote-work-policy',
    workflows: '/#/settings/workflows',
    leaveEntitlements: '/#/settings/leave-entitlements',
    auditLogs: '/#/reports/audit-logs',
    sessions: '/#/reports/sessions',
    attendanceReport: '/#/reports/attendance',
    leaveReport: '/#/reports/leaves',
    nfcTags: '/#/nfc-tags',
    createNfcTag: '/#/nfc-tags/create',
    sendNotification: '/#/notifications/send',
    notificationHistory: '/#/notifications/history',
  },
  portal: {
    base: 'http://localhost:4201',
    login: '/#/login',
    dashboard: '/#/dashboard',
    managerDashboard: '/#/manager-dashboard',
    myAttendance: '/#/my-attendance',
    myProfile: '/#/my-profile',
    vacationRequests: '/#/vacation-requests',
    newVacation: '/#/vacation-requests/new',
    excuseRequests: '/#/excuse-requests',
    newExcuse: '/#/excuse-requests/new',
    remoteWorkRequests: '/#/remote-work-requests',
    newRemoteWork: '/#/remote-work-requests/new',
    attendanceCorrections: '/#/attendance-corrections',
    newCorrection: '/#/attendance-corrections/new',
    teamMembers: '/#/team-members',
    pendingApprovals: '/#/pending-approvals',
  },
  api: {
    base: 'http://localhost:5099',
    login: '/api/v1/auth/login',
    employees: '/api/v1/employees',
    attendance: '/api/v1/attendance',
    vacations: '/api/v1/employee-vacations',
    excuses: '/api/v1/employee-excuses',
    remoteWork: '/api/v1/remote-work-requests',
    shifts: '/api/v1/shifts',
    shiftAssignments: '/api/v1/shift-assignments',
    leaveBalances: '/api/v1/leave-balances',
    portal: '/api/v1/portal',
  },
};

/** Generate a unique test name suffix */
export function uniqueName(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}`;
}

/** Get today's date in YYYY-MM-DD format */
export function today(): string {
  return new Date().toISOString().split('T')[0];
}

/** Get a future date string */
export function futureDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

/** Get a past date string */
export function pastDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}
