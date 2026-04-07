import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DocumentCategoryDto, CreateDocumentCategoryRequest, UpdateDocumentCategoryRequest,
  EmployeeDocumentDto, CreateEmployeeDocumentRequest,
  CompanyPolicyDto, CreateCompanyPolicyRequest, PolicyAcknowledgmentDto,
  LetterTemplateDto, CreateLetterTemplateRequest, UpdateLetterTemplateRequest,
  LetterRequestDto, CreateLetterRequestRequest
} from '../../shared/models/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  // ===== Document Categories =====

  getCategories(params?: any): Observable<{ data: DocumentCategoryDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: DocumentCategoryDto[]; totalCount: number }>(`${this.baseUrl}/document-categories`, { params: httpParams });
  }

  getCategory(id: number): Observable<DocumentCategoryDto> {
    return this.http.get<DocumentCategoryDto>(`${this.baseUrl}/document-categories/${id}`);
  }

  createCategory(request: CreateDocumentCategoryRequest): Observable<DocumentCategoryDto> {
    return this.http.post<DocumentCategoryDto>(`${this.baseUrl}/document-categories`, request);
  }

  updateCategory(id: number, request: UpdateDocumentCategoryRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/document-categories/${id}`, request);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/document-categories/${id}`);
  }

  // ===== Employee Documents =====

  getEmployeeDocuments(params?: any): Observable<{ data: EmployeeDocumentDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.employeeId) httpParams = httpParams.set('employeeId', params.employeeId);
    if (params?.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: EmployeeDocumentDto[]; totalCount: number }>(`${this.baseUrl}/employee-documents`, { params: httpParams });
  }

  getEmployeeDocument(id: number): Observable<EmployeeDocumentDto> {
    return this.http.get<EmployeeDocumentDto>(`${this.baseUrl}/employee-documents/${id}`);
  }

  createEmployeeDocument(request: CreateEmployeeDocumentRequest, file: File): Observable<EmployeeDocumentDto> {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, String(value));
    });
    return this.http.post<EmployeeDocumentDto>(`${this.baseUrl}/employee-documents`, formData);
  }

  verifyDocument(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/employee-documents/${id}/verify`, {});
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/employee-documents/${id}`);
  }

  // ===== Company Policies =====

  getPolicies(params?: any): Observable<{ data: CompanyPolicyDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: CompanyPolicyDto[]; totalCount: number }>(`${this.baseUrl}/company-policies`, { params: httpParams });
  }

  getPolicy(id: number): Observable<CompanyPolicyDto> {
    return this.http.get<CompanyPolicyDto>(`${this.baseUrl}/company-policies/${id}`);
  }

  createPolicy(request: CreateCompanyPolicyRequest, file?: File): Observable<CompanyPolicyDto> {
    const formData = new FormData();
    if (file) formData.append('file', file);
    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, String(value));
    });
    return this.http.post<CompanyPolicyDto>(`${this.baseUrl}/company-policies`, formData);
  }

  updatePolicy(id: number, request: CreateCompanyPolicyRequest, file?: File): Observable<void> {
    const formData = new FormData();
    if (file) formData.append('file', file);
    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, String(value));
    });
    return this.http.put<void>(`${this.baseUrl}/company-policies/${id}`, formData);
  }

  publishPolicy(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/company-policies/${id}/publish`, {});
  }

  archivePolicy(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/company-policies/${id}/archive`, {});
  }

  getPolicyAcknowledgments(policyId: number): Observable<PolicyAcknowledgmentDto[]> {
    return this.http.get<PolicyAcknowledgmentDto[]>(`${this.baseUrl}/company-policies/${policyId}/acknowledgments`);
  }

  acknowledgePolicy(policyId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/company-policies/${policyId}/acknowledge`, {});
  }

  // ===== Letter Templates =====

  getLetterTemplates(params?: any): Observable<{ data: LetterTemplateDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: LetterTemplateDto[]; totalCount: number }>(`${this.baseUrl}/letter-templates`, { params: httpParams });
  }

  getLetterTemplate(id: number): Observable<LetterTemplateDto> {
    return this.http.get<LetterTemplateDto>(`${this.baseUrl}/letter-templates/${id}`);
  }

  createLetterTemplate(request: CreateLetterTemplateRequest): Observable<LetterTemplateDto> {
    return this.http.post<LetterTemplateDto>(`${this.baseUrl}/letter-templates`, request);
  }

  updateLetterTemplate(id: number, request: UpdateLetterTemplateRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/letter-templates/${id}`, request);
  }

  deleteLetterTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/letter-templates/${id}`);
  }

  getLetterTemplateDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/letter-templates/dropdown`);
  }

  // ===== Letter Requests =====

  getLetterRequests(params?: any): Observable<{ data: LetterRequestDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: LetterRequestDto[]; totalCount: number }>(`${this.baseUrl}/letter-requests`, { params: httpParams });
  }

  getLetterRequest(id: number): Observable<LetterRequestDto> {
    return this.http.get<LetterRequestDto>(`${this.baseUrl}/letter-requests/${id}`);
  }

  createLetterRequest(request: CreateLetterRequestRequest): Observable<LetterRequestDto> {
    return this.http.post<LetterRequestDto>(`${this.baseUrl}/letter-requests`, request);
  }

  approveLetterRequest(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/letter-requests/${id}/approve`, {});
  }

  rejectLetterRequest(id: number, reason: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/letter-requests/${id}/reject`, { reason });
  }

  generateLetter(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/letter-requests/${id}/generate`, {});
  }

  // ===== My Documents (Portal) =====

  getMyDocuments(params?: any): Observable<{ data: EmployeeDocumentDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: EmployeeDocumentDto[]; totalCount: number }>(`${this.baseUrl}/portal/my-documents`, { params: httpParams });
  }

  getMyLetterRequests(params?: any): Observable<{ data: LetterRequestDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: LetterRequestDto[]; totalCount: number }>(`${this.baseUrl}/portal/my-letter-requests`, { params: httpParams });
  }

  getPublishedPolicies(): Observable<CompanyPolicyDto[]> {
    return this.http.get<CompanyPolicyDto[]>(`${this.baseUrl}/portal/company-policies`);
  }
}
