import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ShiftAssignment,
  ShiftAssignmentsResponse,
  CreateShiftAssignmentRequest,
  UpdateShiftAssignmentRequest,
  ShiftAssignmentType,
  ShiftAssignmentStatus,
  ShiftAssignmentOptions
} from '../../shared/models/shift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftAssignmentService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/shift-assignments`;

  constructor(private http: HttpClient) {}

  /**
   * Get paginated list of shift assignments with optional filtering
   */
  getShiftAssignments(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    assignmentType?: ShiftAssignmentType;
    employeeId?: number;
    departmentId?: number;
    branchId?: number;
    shiftId?: number;
    status?: ShiftAssignmentStatus;
    effectiveFrom?: string;
    effectiveTo?: string;
    currentlyActive?: boolean;
    minPriority?: number;
    maxPriority?: number;
  }): Observable<ShiftAssignmentsResponse> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.page !== undefined) {
        httpParams = httpParams.set('page', params.page.toString());
      }
      if (params.pageSize !== undefined) {
        httpParams = httpParams.set('pageSize', params.pageSize.toString());
      }
      if (params.search) {
        httpParams = httpParams.set('search', params.search);
      }
      if (params.assignmentType !== undefined) {
        httpParams = httpParams.set('assignmentType', params.assignmentType.toString());
      }
      if (params.employeeId !== undefined) {
        httpParams = httpParams.set('employeeId', params.employeeId.toString());
      }
      if (params.departmentId !== undefined) {
        httpParams = httpParams.set('departmentId', params.departmentId.toString());
      }
      if (params.branchId !== undefined) {
        httpParams = httpParams.set('branchId', params.branchId.toString());
      }
      if (params.shiftId !== undefined) {
        httpParams = httpParams.set('shiftId', params.shiftId.toString());
      }
      if (params.status !== undefined) {
        httpParams = httpParams.set('status', params.status.toString());
      }
      if (params.effectiveFrom) {
        httpParams = httpParams.set('effectiveFrom', params.effectiveFrom);
      }
      if (params.effectiveTo) {
        httpParams = httpParams.set('effectiveTo', params.effectiveTo);
      }
      if (params.currentlyActive !== undefined) {
        httpParams = httpParams.set('currentlyActive', params.currentlyActive.toString());
      }
      if (params.minPriority !== undefined) {
        httpParams = httpParams.set('minPriority', params.minPriority.toString());
      }
      if (params.maxPriority !== undefined) {
        httpParams = httpParams.set('maxPriority', params.maxPriority.toString());
      }
    }

    return this.http.get<ShiftAssignmentsResponse>(this.apiUrl, { params: httpParams });
  }

  /**
   * Get a specific shift assignment by ID
   */
  getShiftAssignmentById(id: number): Observable<ShiftAssignment> {
    return this.http.get<ShiftAssignment>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new shift assignment
   */
  createShiftAssignment(request: CreateShiftAssignmentRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, request);
  }

  /**
   * Update an existing shift assignment
   */
  updateShiftAssignment(id: number, request: UpdateShiftAssignmentRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete a shift assignment
   */
  deleteShiftAssignment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Get assignment creation options (assignment types, statuses, etc.)
   */
  getAssignmentOptions(): Observable<ShiftAssignmentOptions> {
    return this.http.get<ShiftAssignmentOptions>(`${this.apiUrl}/options`);
  }

  /**
   * Get display text for assignment type
   */
  getAssignmentTypeDisplay(type: ShiftAssignmentType): string {
    switch (type) {
      case ShiftAssignmentType.Employee:
        return 'Employee';
      case ShiftAssignmentType.Department:
        return 'Department';
      case ShiftAssignmentType.Branch:
        return 'Branch';
      default:
        return 'Unknown';
    }
  }

  /**
   * Get display text for assignment status
   */
  getStatusDisplay(status: ShiftAssignmentStatus): string {
    switch (status) {
      case ShiftAssignmentStatus.Pending:
        return 'Pending';
      case ShiftAssignmentStatus.Active:
        return 'Active';
      case ShiftAssignmentStatus.Inactive:
        return 'Inactive';
      case ShiftAssignmentStatus.Expired:
        return 'Expired';
      case ShiftAssignmentStatus.Cancelled:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }

  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(status: ShiftAssignmentStatus): string {
    switch (status) {
      case ShiftAssignmentStatus.Pending:
        return 'badge-warning';
      case ShiftAssignmentStatus.Active:
        return 'badge-success';
      case ShiftAssignmentStatus.Inactive:
        return 'badge-secondary';
      case ShiftAssignmentStatus.Expired:
        return 'badge-danger';
      case ShiftAssignmentStatus.Cancelled:
        return 'badge-dark';
      default:
        return 'badge-light';
    }
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  /**
   * Check if an assignment is currently active
   */
  isCurrentlyActive(assignment: ShiftAssignment): boolean {
    const now = new Date();
    const effectiveDate = new Date(assignment.effectiveDate);
    const endDate = assignment.endDate ? new Date(assignment.endDate) : null;

    return assignment.status === ShiftAssignmentStatus.Active &&
           effectiveDate <= now &&
           (!endDate || endDate >= now);
  }
}