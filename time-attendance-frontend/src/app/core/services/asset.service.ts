import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AssetCategoryDto, CreateAssetCategoryRequest, UpdateAssetCategoryRequest,
  AssetDto, CreateAssetRequest, UpdateAssetRequest,
  AssetAssignmentDto, CreateAssetAssignmentRequest, ReturnAssetRequest,
  AssetMaintenanceDto, CreateAssetMaintenanceRequest, UpdateAssetMaintenanceRequest,
  AssetQueryParams, AssignmentQueryParams, MaintenanceQueryParams,
  PagedResult
} from '../../shared/models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  // ========== Categories ==========

  getCategories(): Observable<AssetCategoryDto[]> {
    return this.http.get<AssetCategoryDto[]>(`${this.baseUrl}/asset-categories`);
  }

  getCategory(id: number): Observable<AssetCategoryDto> {
    return this.http.get<AssetCategoryDto>(`${this.baseUrl}/asset-categories/${id}`);
  }

  getCategoryDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/asset-categories/dropdown`);
  }

  createCategory(request: CreateAssetCategoryRequest): Observable<AssetCategoryDto> {
    return this.http.post<AssetCategoryDto>(`${this.baseUrl}/asset-categories`, request);
  }

  updateCategory(id: number, request: UpdateAssetCategoryRequest): Observable<AssetCategoryDto> {
    return this.http.put<AssetCategoryDto>(`${this.baseUrl}/asset-categories/${id}`, request);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/asset-categories/${id}`);
  }

  // ========== Assets ==========

  getAssets(params?: AssetQueryParams): Observable<PagedResult<AssetDto>> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
      if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
      if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId.toString());
      if (params.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
      if (params.status) httpParams = httpParams.set('status', params.status);
    }
    return this.http.get<PagedResult<AssetDto>>(`${this.baseUrl}/assets`, { params: httpParams });
  }

  getAsset(id: number): Observable<AssetDto> {
    return this.http.get<AssetDto>(`${this.baseUrl}/assets/${id}`);
  }

  getAvailableAssetsDropdown(): Observable<{ id: number; name: string; assetTag: string }[]> {
    return this.http.get<{ id: number; name: string; assetTag: string }[]>(`${this.baseUrl}/assets/dropdown/available`);
  }

  createAsset(request: CreateAssetRequest): Observable<AssetDto> {
    return this.http.post<AssetDto>(`${this.baseUrl}/assets`, request);
  }

  updateAsset(id: number, request: UpdateAssetRequest): Observable<AssetDto> {
    return this.http.put<AssetDto>(`${this.baseUrl}/assets/${id}`, request);
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/assets/${id}`);
  }

  // ========== Assignments ==========

  getAssignments(params?: AssignmentQueryParams): Observable<PagedResult<AssetAssignmentDto>> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
      if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.employeeId) httpParams = httpParams.set('employeeId', params.employeeId.toString());
    }
    return this.http.get<PagedResult<AssetAssignmentDto>>(`${this.baseUrl}/asset-assignments`, { params: httpParams });
  }

  getAssignment(id: number): Observable<AssetAssignmentDto> {
    return this.http.get<AssetAssignmentDto>(`${this.baseUrl}/asset-assignments/${id}`);
  }

  getAssetAssignments(assetId: number): Observable<AssetAssignmentDto[]> {
    return this.http.get<AssetAssignmentDto[]>(`${this.baseUrl}/assets/${assetId}/assignments`);
  }

  getEmployeeAssignments(employeeId: number): Observable<AssetAssignmentDto[]> {
    return this.http.get<AssetAssignmentDto[]>(`${this.baseUrl}/asset-assignments/by-employee/${employeeId}`);
  }

  createAssignment(request: CreateAssetAssignmentRequest): Observable<AssetAssignmentDto> {
    return this.http.post<AssetAssignmentDto>(`${this.baseUrl}/asset-assignments`, request);
  }

  returnAsset(id: number, request: ReturnAssetRequest): Observable<AssetAssignmentDto> {
    return this.http.post<AssetAssignmentDto>(`${this.baseUrl}/asset-assignments/${id}/return`, request);
  }

  // ========== Maintenance ==========

  getMaintenanceRecords(params?: MaintenanceQueryParams): Observable<PagedResult<AssetMaintenanceDto>> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
      if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
      if (params.assetId) httpParams = httpParams.set('assetId', params.assetId.toString());
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.maintenanceType) httpParams = httpParams.set('maintenanceType', params.maintenanceType);
    }
    return this.http.get<PagedResult<AssetMaintenanceDto>>(`${this.baseUrl}/asset-maintenance`, { params: httpParams });
  }

  getMaintenanceRecord(id: number): Observable<AssetMaintenanceDto> {
    return this.http.get<AssetMaintenanceDto>(`${this.baseUrl}/asset-maintenance/${id}`);
  }

  getAssetMaintenanceRecords(assetId: number): Observable<AssetMaintenanceDto[]> {
    return this.http.get<AssetMaintenanceDto[]>(`${this.baseUrl}/assets/${assetId}/maintenance`);
  }

  createMaintenance(request: CreateAssetMaintenanceRequest): Observable<AssetMaintenanceDto> {
    return this.http.post<AssetMaintenanceDto>(`${this.baseUrl}/asset-maintenance`, request);
  }

  updateMaintenance(id: number, request: UpdateAssetMaintenanceRequest): Observable<AssetMaintenanceDto> {
    return this.http.put<AssetMaintenanceDto>(`${this.baseUrl}/asset-maintenance/${id}`, request);
  }

  deleteMaintenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/asset-maintenance/${id}`);
  }

  // ========== Clearance ==========

  getEmployeeClearance(employeeId: number): Observable<AssetAssignmentDto[]> {
    return this.http.get<AssetAssignmentDto[]>(`${this.baseUrl}/asset-assignments/clearance/${employeeId}`);
  }
}
