import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AttendanceReportSummary, LeaveReportSummary, ReportFilter } from './reports.model';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/v1/Reports`;

    getAttendanceReport(filter: ReportFilter): Observable<AttendanceReportSummary> {
        let params = new HttpParams()
            .set('from', filter.fromDate)
            .set('to', filter.toDate);

        if (filter.branchId) params = params.set('branchId', filter.branchId);
        if (filter.departmentId) params = params.set('departmentId', filter.departmentId);
        if (filter.employeeId) params = params.set('employeeId', filter.employeeId);

        return this.http.get<AttendanceReportSummary>(`${this.apiUrl}/attendance`, { params });
    }

    exportAttendanceReport(filter: ReportFilter): Observable<Blob> {
        let params = new HttpParams()
            .set('from', filter.fromDate)
            .set('to', filter.toDate);

        if (filter.branchId) params = params.set('branchId', filter.branchId);
        if (filter.departmentId) params = params.set('departmentId', filter.departmentId);
        if (filter.employeeId) params = params.set('employeeId', filter.employeeId);

        return this.http.get(`${this.apiUrl}/attendance/export`, { params, responseType: 'blob' });
    }

    getLeaveReport(filter: ReportFilter): Observable<LeaveReportSummary> {
        let params = new HttpParams()
            .set('from', filter.fromDate)
            .set('to', filter.toDate);

        if (filter.branchId) params = params.set('branchId', filter.branchId);
        if (filter.departmentId) params = params.set('departmentId', filter.departmentId);
        if (filter.employeeId) params = params.set('employeeId', filter.employeeId);

        return this.http.get<LeaveReportSummary>(`${this.apiUrl}/leaves`, { params });
    }
}
