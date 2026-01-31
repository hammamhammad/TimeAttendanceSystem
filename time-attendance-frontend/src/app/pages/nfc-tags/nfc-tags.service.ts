import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  NfcTag,
  NfcTagsResponse,
  CreateNfcTagRequest,
  UpdateNfcTagRequest,
  NfcTagValidationResult
} from '../../shared/models/nfc-tag.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NfcTagsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/nfc-tags`;

  getNfcTags(
    page: number = 1,
    pageSize: number = 10,
    branchId?: number,
    isActive?: boolean
  ): Observable<NfcTagsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (branchId) {
      params = params.set('branchId', branchId.toString());
    }

    if (isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    return this.http.get<NfcTagsResponse>(this.baseUrl, { params });
  }

  getNfcTagById(id: number): Observable<NfcTag> {
    return this.http.get<NfcTag>(`${this.baseUrl}/${id}`);
  }

  getNfcTagsByBranch(branchId: number): Observable<NfcTag[]> {
    return this.http.get<NfcTag[]>(`${this.baseUrl}/by-branch/${branchId}`);
  }

  validateNfcTag(tagUid: string, branchId: number): Observable<NfcTagValidationResult> {
    return this.http.get<NfcTagValidationResult>(
      `${this.baseUrl}/validate/${encodeURIComponent(tagUid)}`,
      { params: { branchId: branchId.toString() } }
    );
  }

  createNfcTag(request: CreateNfcTagRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.baseUrl, request);
  }

  updateNfcTag(id: number, request: UpdateNfcTagRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, request);
  }

  lockNfcTag(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/${id}/lock`, {});
  }

  deleteNfcTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
