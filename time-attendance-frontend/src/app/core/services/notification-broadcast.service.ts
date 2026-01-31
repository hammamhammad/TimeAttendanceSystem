import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface NotificationBroadcast {
  id: string;
  title: string;
  message: string;
  targetType: BroadcastTargetType;
  targetId?: string;
  targetName?: string;
  recipientCount: number;
  deliveredCount: number;
  readCount: number;
  sentAt: Date;
  sentByName: string;
  status: BroadcastStatus;
}

export enum BroadcastTargetType {
  All = 0,
  Branch = 1,
  Department = 2,
  Role = 3,
  Individual = 4
}

export enum BroadcastStatus {
  Pending = 0,
  Sent = 1,
  PartiallyDelivered = 2,
  Failed = 3
}

export interface CreateBroadcastRequest {
  title: string;
  message: string;
  targetType: BroadcastTargetType;
  targetId?: string;
  sendPush: boolean;
  priority?: 'low' | 'normal' | 'high';
  scheduledAt?: Date;
}

export interface BroadcastStats {
  totalBroadcasts: number;
  totalRecipients: number;
  totalDelivered: number;
  totalRead: number;
  avgDeliveryRate: number;
  avgReadRate: number;
  todayBroadcasts: number;
  thisWeekBroadcasts: number;
  thisMonthBroadcasts: number;
}

export interface BroadcastTarget {
  id: string;
  name: string;
  type: 'branch' | 'department' | 'role' | 'employee';
  employeeCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationBroadcastService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/notifications/broadcasts`;

  // State signals
  broadcasts = signal<NotificationBroadcast[]>([]);
  stats = signal<BroadcastStats | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  // Computed values
  recentBroadcasts = computed(() => this.broadcasts().slice(0, 5));
  pendingCount = computed(() => 
    this.broadcasts().filter(b => b.status === BroadcastStatus.Pending).length
  );

  /**
   * Get all broadcasts with optional filters
   */
  getBroadcasts(filters?: {
    startDate?: Date;
    endDate?: Date;
    targetType?: BroadcastTargetType;
    status?: BroadcastStatus;
    page?: number;
    pageSize?: number;
  }): Observable<{ items: NotificationBroadcast[]; total: number }> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<{ items: NotificationBroadcast[]; total: number }>(this.apiUrl, {
      params: this.buildParams(filters)
    }).pipe(
      tap(response => {
        this.broadcasts.set(response.items);
        this.loading.set(false);
      }),
      catchError(error => {
        this.error.set(error.message || 'Failed to load broadcasts');
        this.loading.set(false);
        return of({ items: [], total: 0 });
      })
    );
  }

  /**
   * Get broadcast statistics
   */
  getStats(): Observable<BroadcastStats> {
    return this.http.get<BroadcastStats>(`${this.apiUrl}/stats`).pipe(
      tap(stats => this.stats.set(stats)),
      catchError(error => {
        console.error('Failed to load stats:', error);
        return of({
          totalBroadcasts: 0,
          totalRecipients: 0,
          totalDelivered: 0,
          totalRead: 0,
          avgDeliveryRate: 0,
          avgReadRate: 0,
          todayBroadcasts: 0,
          thisWeekBroadcasts: 0,
          thisMonthBroadcasts: 0
        });
      })
    );
  }

  /**
   * Get a single broadcast by ID
   */
  getBroadcast(id: string): Observable<NotificationBroadcast> {
    return this.http.get<NotificationBroadcast>(`${this.apiUrl}/${id}`);
  }

  /**
   * Send a new broadcast
   */
  sendBroadcast(request: CreateBroadcastRequest): Observable<NotificationBroadcast> {
    this.loading.set(true);
    return this.http.post<NotificationBroadcast>(this.apiUrl, request).pipe(
      tap(broadcast => {
        this.broadcasts.update(list => [broadcast, ...list]);
        this.loading.set(false);
      }),
      catchError(error => {
        this.error.set(error.message || 'Failed to send broadcast');
        this.loading.set(false);
        throw error;
      })
    );
  }

  /**
   * Get available targets for broadcasting
   */
  getTargets(type: 'branch' | 'department' | 'role' | 'employee'): Observable<BroadcastTarget[]> {
    return this.http.get<BroadcastTarget[]>(`${this.apiUrl}/targets`, {
      params: { type }
    });
  }

  /**
   * Cancel a scheduled broadcast
   */
  cancelBroadcast(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.broadcasts.update(list => list.filter(b => b.id !== id));
      })
    );
  }

  /**
   * Resend a failed broadcast
   */
  resendBroadcast(id: string): Observable<NotificationBroadcast> {
    return this.http.post<NotificationBroadcast>(`${this.apiUrl}/${id}/resend`, {}).pipe(
      tap(broadcast => {
        this.broadcasts.update(list => 
          list.map(b => b.id === id ? broadcast : b)
        );
      })
    );
  }

  private buildParams(filters?: any): any {
    if (!filters) return {};
    
    const params: any = {};
    if (filters.startDate) params.startDate = filters.startDate.toISOString();
    if (filters.endDate) params.endDate = filters.endDate.toISOString();
    if (filters.targetType !== undefined) params.targetType = filters.targetType;
    if (filters.status !== undefined) params.status = filters.status;
    if (filters.page) params.page = filters.page;
    if (filters.pageSize) params.pageSize = filters.pageSize;
    
    return params;
  }
}
