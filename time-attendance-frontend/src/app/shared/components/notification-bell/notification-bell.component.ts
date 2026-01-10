import { Component, inject, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationBellService } from '../../../core/services/notification-bell.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { Notification, NotificationType } from '../../models/notification.model';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  private readonly notificationService = inject(NotificationBellService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);

  /** Whether the dropdown is open */
  isDropdownOpen = false;

  /** Notifications list */
  notifications = this.notificationService.notifications;

  /** Unread count */
  unreadCount = this.notificationService.unreadCount;

  /** Loading state */
  isLoading = this.notificationService.isLoading;

  /** Has unread notifications */
  hasUnread = this.notificationService.hasUnread;

  /** Current language */
  currentLang = computed(() => this.i18n.locale());

  ngOnInit(): void {
    this.notificationService.initialize();
  }

  ngOnDestroy(): void {
    this.notificationService.cleanup();
  }

  /**
   * Toggles the dropdown visibility.
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.notificationService.loadNotifications().subscribe();
    }
  }

  /**
   * Closes the dropdown.
   */
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  /**
   * Gets the notification title based on current language.
   */
  getTitle(notification: Notification): string {
    return this.currentLang() === 'ar' ? notification.titleAr : notification.titleEn;
  }

  /**
   * Gets the notification message based on current language.
   */
  getMessage(notification: Notification): string {
    return this.currentLang() === 'ar' ? notification.messageAr : notification.messageEn;
  }

  /**
   * Gets the icon class for a notification type.
   */
  getIconClass(type: NotificationType): string {
    switch (type) {
      case NotificationType.RequestApproved:
        return 'bi-check-circle-fill text-success';
      case NotificationType.RequestRejected:
        return 'bi-x-circle-fill text-danger';
      case NotificationType.ApprovalPending:
      case NotificationType.DelegationReceived:
        return 'bi-hourglass-split text-warning';
      case NotificationType.RequestSubmitted:
        return 'bi-send-fill text-primary';
      case NotificationType.RequestDelegated:
        return 'bi-arrow-left-right text-info';
      case NotificationType.RequestEscalated:
        return 'bi-arrow-up-circle-fill text-warning';
      case NotificationType.ApprovalReminder:
        return 'bi-alarm-fill text-warning';
      default:
        return 'bi-bell-fill text-secondary';
    }
  }

  /**
   * Formats the time ago string.
   */
  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return this.i18n.t('notifications.justNow');
    } else if (diffMins < 60) {
      return this.i18n.t('notifications.minutesAgo', { count: diffMins });
    } else if (diffHours < 24) {
      return this.i18n.t('notifications.hoursAgo', { count: diffHours });
    } else {
      return this.i18n.t('notifications.daysAgo', { count: diffDays });
    }
  }

  /**
   * Handles notification click - marks as read and navigates.
   */
  onNotificationClick(notification: Notification): void {
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.id).subscribe();
    }

    this.closeDropdown();

    if (notification.actionUrl) {
      this.router.navigateByUrl(notification.actionUrl);
    }
  }

  /**
   * Marks all notifications as read.
   */
  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe();
  }

  /**
   * Handles click outside the dropdown to close it.
   */
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-bell-container')) {
      this.closeDropdown();
    }
  }
}
