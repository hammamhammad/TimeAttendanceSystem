import {
  environment
} from "./chunk-ZTCQ26FY.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  Observable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/core/services/attendance.service.ts
var _AttendanceService = class _AttendanceService {
  http;
  apiUrl = `${environment.apiUrl}/api/v1/attendance`;
  constructor(http) {
    this.http = http;
  }
  /**
   * Get attendance report with filtering and pagination
   */
  getAttendanceReport(request) {
    return this.http.post(`${this.apiUrl}/report`, request);
  }
  /**
   * Get attendance record for specific employee and date
   */
  getEmployeeAttendanceRecord(employeeId, date) {
    return this.http.get(`${this.apiUrl}/employee/${employeeId}/date/${date}`);
  }
  /**
   * Create a new attendance transaction
   */
  createTransaction(request) {
    return this.http.post(`${this.apiUrl}/transactions`, request);
  }
  /**
   * Get specific attendance transaction by ID
   */
  getTransaction(id) {
    return this.http.get(`${this.apiUrl}/transactions/${id}`);
  }
  /**
   * Get attendance statistics for specified period
   */
  getAttendanceStatistics(startDate, endDate, branchId, departmentId) {
    let params = new HttpParams().set("startDate", startDate).set("endDate", endDate);
    if (branchId) {
      params = params.set("branchId", branchId.toString());
    }
    if (departmentId) {
      params = params.set("departmentId", departmentId.toString());
    }
    return this.http.get(`${this.apiUrl}/statistics`, { params });
  }
  /**
   * Get incomplete attendance records (missing check-out)
   */
  getIncompleteRecords(branchId, upToDate) {
    let params = new HttpParams();
    if (branchId) {
      params = params.set("branchId", branchId.toString());
    }
    if (upToDate) {
      params = params.set("upToDate", upToDate);
    }
    return this.http.get(`${this.apiUrl}/incomplete`, { params });
  }
  /**
   * Generate attendance records for a specific date (Admin only)
   */
  generateAttendance(date, branchId) {
    let params = new HttpParams();
    if (branchId) {
      params = params.set("branchId", branchId.toString());
    }
    return this.http.post(`${this.apiUrl}/generate/${date}`, {}, { params });
  }
  /**
   * Run the daily attendance generation process (Admin only)
   * This simulates the background job that runs automatically each day
   */
  runDailyGeneration() {
    return this.http.post(`${this.apiUrl}/generate/daily`, {});
  }
  /**
   * Get dashboard data with today's statistics and recent activity
   */
  getDashboardData(branchId, departmentId) {
    let params = new HttpParams();
    if (branchId) {
      params = params.set("branchId", branchId.toString());
    }
    if (departmentId) {
      params = params.set("departmentId", departmentId.toString());
    }
    return this.http.get(`${this.apiUrl}/dashboard`, { params });
  }
  /**
   * Get attendance record by ID
   */
  getAttendanceById(attendanceId) {
    return this.http.get(`${this.apiUrl}/${attendanceId}`);
  }
  /**
   * Get attendance records for a specific date range and employee
   */
  getEmployeeAttendanceHistory(employeeId, startDate, endDate) {
    const request = {
      startDate,
      endDate,
      employeeId,
      includeTransactions: true,
      includeWorkingDayAnalysis: true,
      pageNumber: 1,
      pageSize: 1e3
      // Large number to get all records
    };
    return this.getAttendanceReport(request);
  }
  /**
   * Get comprehensive attendance history for a specific employee with absent days included.
   * This method ensures that missing attendance records are generated as "Absent" status.
   */
  getEmployeeAttendanceHistoryComplete(employeeId, startDate, endDate) {
    let params = new HttpParams().set("startDate", startDate).set("endDate", endDate);
    return this.http.get(`${this.apiUrl}/employee/${employeeId}/history`, { params });
  }
  /**
   * Get daily attendance for all employees on a specific date
   */
  getDailyAttendance(date, branchId, departmentId, employeeId) {
    const request = {
      startDate: date,
      endDate: date,
      branchId,
      departmentId,
      employeeId,
      includeTransactions: false,
      includeWorkingDayAnalysis: false,
      pageNumber: 1,
      pageSize: 1e3
    };
    return this.getAttendanceReport(request);
  }
  /**
   * Bulk create transactions (for import functionality)
   */
  bulkCreateTransactions(transactions) {
    return new Observable((observer) => {
      const results = [];
      let completed = 0;
      transactions.forEach((transaction) => {
        this.createTransaction(transaction).subscribe({
          next: /* @__PURE__ */ __name((result) => {
            results.push(result);
            completed++;
            if (completed === transactions.length) {
              observer.next(results);
              observer.complete();
            }
          }, "next"),
          error: /* @__PURE__ */ __name((error) => observer.error(error), "error")
        });
      });
    });
  }
  /**
   * Get transactions by date
   */
  getTransactionsByDate(date) {
    return this.http.get(`${this.apiUrl}/transactions/date/${date}`);
  }
  /**
   * Delete transaction
   */
  deleteTransaction(transactionId) {
    return this.http.delete(`${this.apiUrl}/transactions/${transactionId}`);
  }
  /**
   * Get employee attendance records (multiple records)
   */
  getEmployeeAttendanceRecords(employeeId, startDate, endDate) {
    return this.getEmployeeAttendanceHistory(employeeId, startDate, endDate);
  }
  /**
   * Get employee recent transactions
   */
  getEmployeeRecentTransactions(employeeId, limit = 10) {
    let params = new HttpParams().set("employeeId", employeeId.toString()).set("limit", limit.toString());
    return this.http.get(`${this.apiUrl}/transactions/recent`, { params });
  }
  /**
   * Get attendance record by ID for editing
   */
  getAttendanceRecordById(recordId) {
    return this.http.get(`${this.apiUrl}/${recordId}`);
  }
  /**
   * Update attendance record with manual overrides
   */
  updateAttendanceRecord(recordId, request) {
    return this.http.put(`${this.apiUrl}/${recordId}`, request);
  }
  /**
   * Update multiple attendance records in bulk
   */
  bulkUpdateAttendanceRecords(requests) {
    return this.http.put(`${this.apiUrl}/bulk-update`, requests);
  }
  // ====================================================================
  // ENHANCED MANUAL CALCULATION METHODS
  // ====================================================================
  /**
   * Manually calculate attendance for a specific employee on a specific date.
   * This allows manual recalculation of attendance based on the shift assigned on that date.
   */
  calculateAttendanceForEmployeeDate(employeeId, date) {
    return this.http.post(`${this.apiUrl}/calculate/employee/${employeeId}/date/${date}`, {});
  }
  /**
   * Manually calculate attendance for all employees on a specific date.
   * This forces recalculation/generation for all active employees.
   */
  calculateAttendanceForDate(date, forceRecalculate = false, branchId) {
    let params = new HttpParams();
    if (forceRecalculate) {
      params = params.set("forceRecalculate", forceRecalculate.toString());
    }
    if (branchId) {
      params = params.set("branchId", branchId.toString());
    }
    return this.http.post(`${this.apiUrl}/calculate/date/${date}`, {}, { params });
  }
  /**
   * Bulk manual calculation for multiple employees and dates.
   * Useful for fixing attendance records after system issues or data imports.
   */
  bulkCalculateAttendance(request) {
    return this.http.post(`${this.apiUrl}/calculate/bulk`, request);
  }
  /**
   * Recalculate a specific attendance record (useful after editing transactions)
   */
  recalculateAttendanceRecord(recordId) {
    return this.http.post(`${this.apiUrl}/${recordId}/recalculate`, {});
  }
  /**
   * Force generation of attendance record for employee on specific date
   * This is useful when an employee was added after the daily generation ran
   */
  forceGenerateAttendanceRecord(employeeId, date) {
    return this.calculateAttendanceForEmployeeDate(employeeId, date);
  }
  /**
   * Change shift for a specific attendance record
   * This creates a temporary shift assignment for the attendance date and recalculates attendance
   */
  changeAttendanceShift(changeData) {
    const request = {
      shiftId: changeData.shiftId,
      notes: changeData.notes
    };
    return this.http.post(`${this.apiUrl}/${changeData.attendanceId}/change-shift`, request);
  }
  /**
   * Get monthly attendance report with summary statistics and employee records
   */
  getMonthlyReport(request) {
    return this.http.post(`${this.apiUrl}/monthly-report`, request);
  }
  /**
   * Get leave, excuse, and remote work details for a specific employee and date.
   * Used in the Daily Attendance Detail page to show comprehensive absence information.
   */
  getLeaveExcuseDetails(employeeId, date) {
    let params = new HttpParams().set("date", date);
    return this.http.get(`${this.apiUrl}/employee/${employeeId}/leave-excuse-details`, { params });
  }
};
__name(_AttendanceService, "AttendanceService");
__publicField(_AttendanceService, "\u0275fac", /* @__PURE__ */ __name(function AttendanceService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AttendanceService)(\u0275\u0275inject(HttpClient));
}, "AttendanceService_Factory"));
__publicField(_AttendanceService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AttendanceService, factory: _AttendanceService.\u0275fac, providedIn: "root" }));
var AttendanceService = _AttendanceService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttendanceService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AttendanceService
};
//# sourceMappingURL=chunk-233LUQFN.js.map
