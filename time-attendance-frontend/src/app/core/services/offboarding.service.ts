import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ClearanceItem,
  EndOfServiceCalculation,
  FinalSettlement,
  ExitInterview,
  SaveExitInterviewRequest
} from '../../shared/models/termination.model';
import {
  FinalSettlementSummary,
  CalculateFinalSettlementRequest,
  ApproveFinalSettlementRequest
} from '../../shared/models/final-settlement.model';

@Injectable({ providedIn: 'root' })
export class OffboardingService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1`;
  private http = inject(HttpClient);

  // Clearance
  getClearanceItems(terminationId: number): Observable<ClearanceItem[]> {
    return this.http.get<ClearanceItem[]>(`${this.apiUrl}/clearance/${terminationId}`);
  }

  completeClearanceItem(terminationId: number, itemId: number, notes?: string): Observable<ClearanceItem> {
    return this.http.post<ClearanceItem>(
      `${this.apiUrl}/clearance/items/${itemId}/complete`,
      { notes }
    );
  }

  uncompleteClearanceItem(terminationId: number, itemId: number): Observable<ClearanceItem> {
    return this.http.post<ClearanceItem>(
      `${this.apiUrl}/clearance/items/${itemId}/uncomplete`,
      {}
    );
  }

  // End of Service
  calculateEndOfService(terminationId: number): Observable<EndOfServiceCalculation> {
    return this.http.post<EndOfServiceCalculation>(
      `${this.apiUrl}/end-of-service/${terminationId}/calculate`,
      {}
    );
  }

  getEndOfService(terminationId: number): Observable<EndOfServiceCalculation> {
    return this.http.get<EndOfServiceCalculation>(
      `${this.apiUrl}/end-of-service/${terminationId}`
    );
  }

  // Final Settlement
  getFinalSettlement(terminationId: number): Observable<FinalSettlement> {
    return this.http.get<FinalSettlement>(
      `${this.apiUrl}/final-settlements/${terminationId}`
    );
  }

  calculateFinalSettlement(request: CalculateFinalSettlementRequest): Observable<FinalSettlement> {
    return this.http.post<FinalSettlement>(
      `${this.apiUrl}/final-settlements/${request.terminationId}/calculate`,
      request
    );
  }

  approveFinalSettlement(terminationId: number, request: ApproveFinalSettlementRequest): Observable<FinalSettlement> {
    return this.http.post<FinalSettlement>(
      `${this.apiUrl}/final-settlements/${terminationId}/approve`,
      request
    );
  }

  markFinalSettlementPaid(terminationId: number): Observable<FinalSettlement> {
    return this.http.post<FinalSettlement>(
      `${this.apiUrl}/final-settlements/${terminationId}/mark-paid`,
      {}
    );
  }

  // Exit Interview
  getExitInterview(terminationId: number): Observable<ExitInterview> {
    return this.http.get<ExitInterview>(
      `${this.apiUrl}/exit-interviews/${terminationId}`
    );
  }

  saveExitInterview(terminationId: number, request: SaveExitInterviewRequest): Observable<ExitInterview> {
    return this.http.post<ExitInterview>(
      `${this.apiUrl}/exit-interviews/${terminationId}`,
      request
    );
  }

  // Pending clearance overview
  getPendingClearance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clearance/pending`);
  }

  // Final settlements list
  getFinalSettlements(params?: { branchId?: number; status?: string; page?: number; pageSize?: number }): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/final-settlements`, { params: params as any });
  }
}
