import { APIRequestContext } from '@playwright/test';
import { URLS, USERS } from './test-data';

const API_BASE = URLS.api.base;

export class ApiHelpers {
  private token: string = '';

  constructor(private request: APIRequestContext) {}

  /** Login via API and get auth token */
  async login(username: string, password: string): Promise<string> {
    const response = await this.request.post(`${API_BASE}${URLS.api.login}`, {
      data: { username, password },
    });
    const body = await response.json();
    this.token = body.token || body.accessToken || '';
    return this.token;
  }

  /** Login as admin */
  async loginAsAdmin(): Promise<void> {
    await this.login(USERS.admin.username, USERS.admin.password);
  }

  /** Get auth headers */
  private authHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  // ─── Employees ─────────────────────────────────────────────

  async getEmployees(page = 1, pageSize = 10) {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.employees}?page=${page}&pageSize=${pageSize}`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  async getEmployee(id: number) {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.employees}/${id}`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  // ─── Attendance ────────────────────────────────────────────

  async getAttendanceRecords(employeeId: number, startDate: string, endDate: string) {
    const res = await this.request.post(
      `${API_BASE}${URLS.api.attendance}/report`,
      {
        headers: this.authHeaders(),
        data: { employeeId, startDate, endDate },
      }
    );
    return res.json();
  }

  async getAttendanceRecord(id: number) {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.attendance}/${id}`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  // ─── Leave Balances ────────────────────────────────────────

  async getLeaveBalances(employeeId: number) {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.leaveBalances}?employeeId=${employeeId}`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  // ─── Shifts ────────────────────────────────────────────────

  async getShifts() {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.shifts}`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  async getShiftAssignments(employeeId: number) {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.shiftAssignments}?employeeId=${employeeId}`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  // ─── Vacations ─────────────────────────────────────────────

  async getVacations(page = 1, pageSize = 10) {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.vacations}?page=${page}&pageSize=${pageSize}`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  // ─── Portal ────────────────────────────────────────────────

  async getEmployeeDashboard() {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.portal}/employee-dashboard`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  async getMyAttendance(startDate: string, endDate: string) {
    const res = await this.request.get(
      `${API_BASE}${URLS.api.portal}/my-attendance?startDate=${startDate}&endDate=${endDate}`,
      { headers: this.authHeaders() }
    );
    return res.json();
  }

  // ─── Generic ───────────────────────────────────────────────

  async get(path: string) {
    const res = await this.request.get(`${API_BASE}${path}`, {
      headers: this.authHeaders(),
    });
    return res.json();
  }

  async post(path: string, data: object) {
    const res = await this.request.post(`${API_BASE}${path}`, {
      headers: this.authHeaders(),
      data,
    });
    return res.json();
  }
}
