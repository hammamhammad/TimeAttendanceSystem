import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  EmployeeContract,
  CreateEmployeeContractRequest,
  UpdateEmployeeContractRequest,
  ContractQueryParams,
  ContractPagedResult
} from '../../shared/models/employee-contract.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeContractService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/employee-contracts`;
  private http = inject(HttpClient);

  /**
   * Get contracts with filtering and pagination
   */
  getContracts(params: ContractQueryParams = {}): Observable<ContractPagedResult> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('pageNumber', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.employeeId) httpParams = httpParams.set('employeeId', params.employeeId.toString());
    if (params.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
    if (params.status !== undefined && params.status !== null) httpParams = httpParams.set('status', params.status.toString());
    if (params.contractType !== undefined && params.contractType !== null) httpParams = httpParams.set('contractType', params.contractType.toString());
    if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortDescending) httpParams = httpParams.set('sortDescending', params.sortDescending.toString());
    return this.http.get<ContractPagedResult>(this.apiUrl, { params: httpParams });
  }

  /**
   * Get contract by ID
   */
  getContractById(id: number): Observable<EmployeeContract> {
    return this.http.get<EmployeeContract>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new contract
   */
  createContract(request: CreateEmployeeContractRequest): Observable<EmployeeContract> {
    return this.http.post<EmployeeContract>(this.apiUrl, request);
  }

  /**
   * Update an existing contract
   */
  updateContract(id: number, request: UpdateEmployeeContractRequest): Observable<EmployeeContract> {
    return this.http.put<EmployeeContract>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete a contract
   */
  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Activate a draft contract
   */
  activateContract(id: number): Observable<EmployeeContract> {
    return this.http.post<EmployeeContract>(`${this.apiUrl}/${id}/activate`, {});
  }

  /**
   * Terminate an active contract
   */
  terminateContract(id: number, reason?: string): Observable<EmployeeContract> {
    return this.http.post<EmployeeContract>(`${this.apiUrl}/${id}/terminate`, { reason });
  }

  /**
   * Renew a contract
   */
  renewContract(id: number, request: { newEndDate: string; newSalary?: number }): Observable<EmployeeContract> {
    return this.http.post<EmployeeContract>(`${this.apiUrl}/${id}/renew`, request);
  }

  /**
   * Get contracts expiring within days
   */
  getExpiringContracts(days: number = 30): Observable<EmployeeContract[]> {
    const params = new HttpParams().set('days', days.toString());
    return this.http.get<EmployeeContract[]>(`${this.apiUrl}/expiring`, { params });
  }
}
