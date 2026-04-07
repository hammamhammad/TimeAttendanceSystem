import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  TrainingCategoryDto, CreateTrainingCategoryRequest, UpdateTrainingCategoryRequest,
  TrainingCourseDto, CreateTrainingCourseRequest, UpdateTrainingCourseRequest,
  TrainingProgramDto, CreateTrainingProgramRequest, UpdateTrainingProgramRequest,
  TrainingSessionDto, CreateTrainingSessionRequest, UpdateTrainingSessionRequest,
  TrainingEnrollmentDto, CreateTrainingEnrollmentRequest, BulkEnrollmentRequest,
  TrainingAttendanceDto, MarkTrainingAttendanceRequest,
  TrainingEvaluationDto, CreateTrainingEvaluationRequest, SessionEvaluationSummaryDto,
  EmployeeCertificationDto, CreateEmployeeCertificationRequest, UpdateEmployeeCertificationRequest,
  TrainingBudgetDto, CreateTrainingBudgetRequest, UpdateTrainingBudgetRequest, TrainingBudgetSummaryDto
} from '../../shared/models/training.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  // ===== Helper =====
  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return httpParams;
  }

  // ===== Training Categories =====

  getCategories(params?: any): Observable<{ data: TrainingCategoryDto[]; totalCount: number }> {
    return this.http.get<{ data: TrainingCategoryDto[]; totalCount: number }>(`${this.baseUrl}/training-categories`, { params: this.buildParams(params) });
  }

  getCategory(id: number): Observable<TrainingCategoryDto> {
    return this.http.get<TrainingCategoryDto>(`${this.baseUrl}/training-categories/${id}`);
  }

  createCategory(request: CreateTrainingCategoryRequest): Observable<TrainingCategoryDto> {
    return this.http.post<TrainingCategoryDto>(`${this.baseUrl}/training-categories`, request);
  }

  updateCategory(id: number, request: UpdateTrainingCategoryRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/training-categories/${id}`, request);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/training-categories/${id}`);
  }

  getCategoryDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/training-categories/dropdown`);
  }

  // ===== Training Courses =====

  getCourses(params?: any): Observable<{ data: TrainingCourseDto[]; totalCount: number }> {
    return this.http.get<{ data: TrainingCourseDto[]; totalCount: number }>(`${this.baseUrl}/training-courses`, { params: this.buildParams(params) });
  }

  getCourse(id: number): Observable<TrainingCourseDto> {
    return this.http.get<TrainingCourseDto>(`${this.baseUrl}/training-courses/${id}`);
  }

  createCourse(request: CreateTrainingCourseRequest): Observable<TrainingCourseDto> {
    return this.http.post<TrainingCourseDto>(`${this.baseUrl}/training-courses`, request);
  }

  updateCourse(id: number, request: UpdateTrainingCourseRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/training-courses/${id}`, request);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/training-courses/${id}`);
  }

  getCourseDropdown(): Observable<{ id: number; name: string; code: string }[]> {
    return this.http.get<{ id: number; name: string; code: string }[]>(`${this.baseUrl}/training-courses/dropdown`);
  }

  // ===== Training Programs =====

  getPrograms(params?: any): Observable<{ data: TrainingProgramDto[]; totalCount: number }> {
    return this.http.get<{ data: TrainingProgramDto[]; totalCount: number }>(`${this.baseUrl}/training-programs`, { params: this.buildParams(params) });
  }

  getProgram(id: number): Observable<TrainingProgramDto> {
    return this.http.get<TrainingProgramDto>(`${this.baseUrl}/training-programs/${id}`);
  }

  createProgram(request: CreateTrainingProgramRequest): Observable<TrainingProgramDto> {
    return this.http.post<TrainingProgramDto>(`${this.baseUrl}/training-programs`, request);
  }

  updateProgram(id: number, request: UpdateTrainingProgramRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/training-programs/${id}`, request);
  }

  deleteProgram(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/training-programs/${id}`);
  }

  addCourseToProgram(programId: number, courseId: number, sequenceOrder: number, isMandatory: boolean): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/training-programs/${programId}/courses`, { courseId, sequenceOrder, isMandatory });
  }

  removeCourseFromProgram(programId: number, courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/training-programs/${programId}/courses/${courseId}`);
  }

  getProgramDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/training-programs/dropdown`);
  }

  // ===== Training Sessions =====

  getSessions(params?: any): Observable<{ data: TrainingSessionDto[]; totalCount: number }> {
    return this.http.get<{ data: TrainingSessionDto[]; totalCount: number }>(`${this.baseUrl}/training-sessions`, { params: this.buildParams(params) });
  }

  getSession(id: number): Observable<TrainingSessionDto> {
    return this.http.get<TrainingSessionDto>(`${this.baseUrl}/training-sessions/${id}`);
  }

  createSession(request: CreateTrainingSessionRequest): Observable<TrainingSessionDto> {
    return this.http.post<TrainingSessionDto>(`${this.baseUrl}/training-sessions`, request);
  }

  updateSession(id: number, request: UpdateTrainingSessionRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/training-sessions/${id}`, request);
  }

  deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/training-sessions/${id}`);
  }

  completeSession(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/training-sessions/${id}/complete`, {});
  }

  cancelSession(id: number, reason?: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/training-sessions/${id}/cancel`, { reason });
  }

  getSessionCalendar(params?: any): Observable<TrainingSessionDto[]> {
    return this.http.get<TrainingSessionDto[]>(`${this.baseUrl}/training-sessions/calendar`, { params: this.buildParams(params) });
  }

  getSessionDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/training-sessions/dropdown`);
  }

  // ===== Training Enrollments =====

  getEnrollments(params?: any): Observable<{ data: TrainingEnrollmentDto[]; totalCount: number }> {
    return this.http.get<{ data: TrainingEnrollmentDto[]; totalCount: number }>(`${this.baseUrl}/training-enrollments`, { params: this.buildParams(params) });
  }

  getEnrollment(id: number): Observable<TrainingEnrollmentDto> {
    return this.http.get<TrainingEnrollmentDto>(`${this.baseUrl}/training-enrollments/${id}`);
  }

  createEnrollment(request: CreateTrainingEnrollmentRequest): Observable<TrainingEnrollmentDto> {
    return this.http.post<TrainingEnrollmentDto>(`${this.baseUrl}/training-enrollments`, request);
  }

  approveEnrollment(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/training-enrollments/${id}/approve`, {});
  }

  rejectEnrollment(id: number, reason: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/training-enrollments/${id}/reject`, { reason });
  }

  cancelEnrollment(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/training-enrollments/${id}/cancel`, {});
  }

  bulkEnroll(request: BulkEnrollmentRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/training-enrollments/bulk`, request);
  }

  // ===== Training Attendance =====

  getSessionAttendance(sessionId: number, params?: any): Observable<TrainingAttendanceDto[]> {
    return this.http.get<TrainingAttendanceDto[]>(`${this.baseUrl}/training-attendance/session/${sessionId}`, { params: this.buildParams(params) });
  }

  markBulkAttendance(request: MarkTrainingAttendanceRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/training-attendance/bulk`, request);
  }

  updateAttendance(id: number, request: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/training-attendance/${id}`, request);
  }

  // ===== Training Evaluations =====

  getEvaluations(params?: any): Observable<{ data: TrainingEvaluationDto[]; totalCount: number }> {
    return this.http.get<{ data: TrainingEvaluationDto[]; totalCount: number }>(`${this.baseUrl}/training-evaluations`, { params: this.buildParams(params) });
  }

  getEvaluation(id: number): Observable<TrainingEvaluationDto> {
    return this.http.get<TrainingEvaluationDto>(`${this.baseUrl}/training-evaluations/${id}`);
  }

  createEvaluation(request: CreateTrainingEvaluationRequest): Observable<TrainingEvaluationDto> {
    return this.http.post<TrainingEvaluationDto>(`${this.baseUrl}/training-evaluations`, request);
  }

  getSessionEvaluationSummary(sessionId: number): Observable<SessionEvaluationSummaryDto> {
    return this.http.get<SessionEvaluationSummaryDto>(`${this.baseUrl}/training-evaluations/session/${sessionId}/summary`);
  }

  // ===== Employee Certifications =====

  getCertifications(params?: any): Observable<{ data: EmployeeCertificationDto[]; totalCount: number }> {
    return this.http.get<{ data: EmployeeCertificationDto[]; totalCount: number }>(`${this.baseUrl}/employee-certifications`, { params: this.buildParams(params) });
  }

  getCertification(id: number): Observable<EmployeeCertificationDto> {
    return this.http.get<EmployeeCertificationDto>(`${this.baseUrl}/employee-certifications/${id}`);
  }

  createCertification(request: CreateEmployeeCertificationRequest): Observable<EmployeeCertificationDto> {
    return this.http.post<EmployeeCertificationDto>(`${this.baseUrl}/employee-certifications`, request);
  }

  updateCertification(id: number, request: UpdateEmployeeCertificationRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/employee-certifications/${id}`, request);
  }

  deleteCertification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/employee-certifications/${id}`);
  }

  getExpiringCertifications(days: number = 30): Observable<EmployeeCertificationDto[]> {
    return this.http.get<EmployeeCertificationDto[]>(`${this.baseUrl}/employee-certifications/expiring`, { params: new HttpParams().set('days', days) });
  }

  getCertificationsByEmployee(employeeId: number): Observable<EmployeeCertificationDto[]> {
    return this.http.get<EmployeeCertificationDto[]>(`${this.baseUrl}/employee-certifications/employee/${employeeId}`);
  }

  // ===== Training Budgets =====

  getBudgets(params?: any): Observable<{ data: TrainingBudgetDto[]; totalCount: number }> {
    return this.http.get<{ data: TrainingBudgetDto[]; totalCount: number }>(`${this.baseUrl}/training-budgets`, { params: this.buildParams(params) });
  }

  getBudget(id: number): Observable<TrainingBudgetDto> {
    return this.http.get<TrainingBudgetDto>(`${this.baseUrl}/training-budgets/${id}`);
  }

  createBudget(request: CreateTrainingBudgetRequest): Observable<TrainingBudgetDto> {
    return this.http.post<TrainingBudgetDto>(`${this.baseUrl}/training-budgets`, request);
  }

  updateBudget(id: number, request: UpdateTrainingBudgetRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/training-budgets/${id}`, request);
  }

  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/training-budgets/${id}`);
  }

  getBudgetSummary(params?: any): Observable<TrainingBudgetSummaryDto> {
    return this.http.get<TrainingBudgetSummaryDto>(`${this.baseUrl}/training-budgets/summary`, { params: this.buildParams(params) });
  }
}
