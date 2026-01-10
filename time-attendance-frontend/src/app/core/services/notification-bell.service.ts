import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Notification, UnreadCountResponse } from '../../shared/models/notification.model';
import { SignalRService } from './signalr.service';
import { NotificationService } from '../notifications/notification.service';
import { I18nService } from '../i18n/i18n.service';

/**
 * Service for managing in-app notifications.
 * Handles fetching, marking as read, and real-time updates via SignalR.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationBellService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/notifications`;
  private readonly http = inject(HttpClient);
  private readonly signalRService = inject(SignalRService);
  private readonly toastService = inject(NotificationService);
  private readonly i18n = inject(I18nService);

  /** List of notifications */
  notifications = signal<Notification[]>([]);

  /** Unread notification count */
  unreadCount = signal<number>(0);

  /** Loading state */
  isLoading = signal<boolean>(false);

  /** Computed signal for checking if there are unread notifications */
  hasUnread = computed(() => this.unreadCount() > 0);

  /** Track if we've initialized (to avoid showing toast for initial load) */
  private initialized = false;

  constructor() {
    // React to SignalR unread count updates
    effect(() => {
      const count = this.signalRService.unreadCount();
      this.unreadCount.set(count);
    });

    // React to new notifications from SignalR
    effect(() => {
      const notification = this.signalRService.newNotification();
      if (notification) {
        // Add to beginning of notifications array
        this.notifications.update(current => [notification, ...current]);

        // Show toast notification for real-time updates (only after initialization)
        if (this.initialized) {
          this.showToastForNotification(notification);
        }
      }
    });
  }

  /**
   * Shows a toast notification for a new notification.
   */
  private showToastForNotification(notification: Notification): void {
    const isArabic = this.i18n.locale() === 'ar';
    const title = isArabic ? notification.titleAr : notification.titleEn;
    const message = isArabic ? notification.messageAr : notification.messageEn;

    // Determine toast type based on notification type (comparing string values)
    const notificationType = notification.type as string;
    switch (notificationType) {
      case 'RequestApproved':
        this.toastService.success(title, message);
        break;
      case 'RequestRejected':
        this.toastService.error(title, message);
        break;
      case 'ApprovalPending':
      case 'DelegationReceived':
      case 'ApprovalReminder':
        this.toastService.warning(title, message);
        break;
      default:
        this.toastService.info(title, message);
        break;
    }
  }

  /**
   * Loads notifications from the API.
   */
  loadNotifications(unreadOnly = false, limit = 50): Observable<Notification[]> {
    this.isLoading.set(true);
    return this.http.get<Notification[]>(`${this.apiUrl}`, {
      params: { unreadOnly: unreadOnly.toString(), limit: limit.toString() }
    }).pipe(
      tap(notifications => {
        this.notifications.set(notifications);
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Loads the unread count from the API.
   */
  loadUnreadCount(): Observable<UnreadCountResponse> {
    return this.http.get<UnreadCountResponse>(`${this.apiUrl}/unread-count`).pipe(
      tap(response => {
        this.unreadCount.set(response.count);
      })
    );
  }

  /**
   * Marks a notification as read.
   */
  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${notificationId}/mark-read`, {}).pipe(
      tap(() => {
        // Update local state
        this.notifications.update(notifications =>
          notifications.map(n =>
            n.id === notificationId
              ? { ...n, isRead: true, readAt: new Date().toISOString() }
              : n
          )
        );
        // Decrease unread count
        this.unreadCount.update(count => Math.max(0, count - 1));
      })
    );
  }

  /**
   * Marks all notifications as read.
   */
  markAllAsRead(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/mark-all-read`, {}).pipe(
      tap(() => {
        // Update local state
        const now = new Date().toISOString();
        this.notifications.update(notifications =>
          notifications.map(n => ({ ...n, isRead: true, readAt: now }))
        );
        this.unreadCount.set(0);
      })
    );
  }

  /**
   * Deletes a notification.
   */
  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`).pipe(
      tap(() => {
        const notification = this.notifications().find(n => n.id === notificationId);
        // Update local state
        this.notifications.update(notifications =>
          notifications.filter(n => n.id !== notificationId)
        );
        // Update unread count if the notification was unread
        if (notification && !notification.isRead) {
          this.unreadCount.update(count => Math.max(0, count - 1));
        }
      })
    );
  }

  /**
   * Initializes the notification service.
   * Should be called after user authentication.
   */
  async initialize(): Promise<void> {
    // Start SignalR connection
    await this.signalRService.startConnection();

    // Load initial data
    this.loadUnreadCount().subscribe();
    this.loadNotifications().subscribe({
      complete: () => {
        // Mark as initialized after initial data load
        this.initialized = true;
      }
    });
  }

  /**
   * Cleans up the notification service.
   * Should be called on logout.
   */
  async cleanup(): Promise<void> {
    await this.signalRService.stopConnection();
    this.notifications.set([]);
    this.unreadCount.set(0);
  }
}
