import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AnnouncementCategoryDto, CreateAnnouncementCategoryRequest, UpdateAnnouncementCategoryRequest,
  AnnouncementDto, CreateAnnouncementRequest, UpdateAnnouncementRequest, AnnouncementAcknowledgmentDto
} from '../../shared/models/announcement.model';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  // ===== Announcement Categories =====

  getCategories(params?: any): Observable<{ data: AnnouncementCategoryDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: AnnouncementCategoryDto[]; totalCount: number }>(`${this.baseUrl}/announcement-categories`, { params: httpParams });
  }

  getCategory(id: number): Observable<AnnouncementCategoryDto> {
    return this.http.get<AnnouncementCategoryDto>(`${this.baseUrl}/announcement-categories/${id}`);
  }

  createCategory(request: CreateAnnouncementCategoryRequest): Observable<AnnouncementCategoryDto> {
    return this.http.post<AnnouncementCategoryDto>(`${this.baseUrl}/announcement-categories`, request);
  }

  updateCategory(id: number, request: UpdateAnnouncementCategoryRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/announcement-categories/${id}`, request);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/announcement-categories/${id}`);
  }

  getCategoryDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/announcement-categories/dropdown`);
  }

  // ===== Announcements =====

  getAnnouncements(params?: any): Observable<{ data: AnnouncementDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params?.priority) httpParams = httpParams.set('priority', params.priority);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: AnnouncementDto[]; totalCount: number }>(`${this.baseUrl}/announcements`, { params: httpParams });
  }

  getAnnouncement(id: number): Observable<AnnouncementDto> {
    return this.http.get<AnnouncementDto>(`${this.baseUrl}/announcements/${id}`);
  }

  createAnnouncement(request: CreateAnnouncementRequest): Observable<AnnouncementDto> {
    return this.http.post<AnnouncementDto>(`${this.baseUrl}/announcements`, request);
  }

  updateAnnouncement(id: number, request: UpdateAnnouncementRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/announcements/${id}`, request);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/announcements/${id}`);
  }

  publishAnnouncement(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/announcements/${id}/publish`, {});
  }

  archiveAnnouncement(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/announcements/${id}/archive`, {});
  }

  getAcknowledgments(announcementId: number): Observable<AnnouncementAcknowledgmentDto[]> {
    return this.http.get<AnnouncementAcknowledgmentDto[]>(`${this.baseUrl}/announcements/${announcementId}/acknowledgments`);
  }
}
