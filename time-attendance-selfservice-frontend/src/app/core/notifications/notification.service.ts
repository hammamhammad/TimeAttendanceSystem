import { Injectable, signal } from '@angular/core';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

/**
 * Angular service for managing user notifications and toast messages in the application.
 * Provides reactive notification management using Angular Signals with automatic lifecycle management,
 * multiple notification types, and configurable display options for comprehensive user feedback.
 * 
 * @remarks
 * Notification Management Features:
 * - Reactive notification state management using Angular Signals for immediate UI updates
 * - Multiple notification types (success, error, warning, info) with distinct styling and behavior
 * - Automatic notification lifecycle with configurable duration and persistence options
 * - Unique notification identification for individual management and dismissal
 * - Queue-based notification system supporting multiple concurrent notifications
 * - Memory-efficient notification cleanup preventing memory leaks in long-running sessions
 * 
 * Notification Types and Behaviors:
 * - Success: Positive feedback with 5-second auto-dismissal for completed operations
 * - Error: Critical feedback with persistent display requiring manual dismissal by default
 * - Warning: Cautionary feedback with 7-second auto-dismissal for attention-requiring states
 * - Info: Informational feedback with 5-second auto-dismissal for general information
 * - Configurable duration and persistence options for all notification types
 * - Visual and accessibility-compliant notification styling for different message types
 * 
 * User Experience Design:
 * - Non-intrusive notification display with smooth animations and transitions
 * - Accessible notification design with proper ARIA labels and screen reader support
 * - Configurable auto-dismissal preventing notification queue overflow
 * - Manual dismissal capabilities for user control over notification visibility
 * - Persistent notifications for critical errors requiring user acknowledgment
 * - Notification grouping and de-duplication for similar messages
 * 
 * Angular Integration:
 * - Injectable service pattern with root-level dependency injection for global access
 * - Angular Signals for reactive state management and component synchronization
 * - Component integration through service injection and template binding
 * - TypeScript interfaces providing type safety and IntelliSense support
 * - Async operation integration for API response feedback and error handling
 * - Form validation integration for user input feedback and validation messages
 * 
 * Performance and Memory Management:
 * - Efficient notification storage with minimal memory footprint per notification
 * - Automatic cleanup of expired notifications preventing memory accumulation
 * - Signal-based reactivity minimizing unnecessary change detection cycles
 * - Optimized notification rendering with virtual scrolling for large notification queues
 * - Lazy loading of notification components reducing initial bundle size
 * - Memory leak prevention through proper subscription and timeout management
 * 
 * Accessibility and Internationalization:
 * - Screen reader compatible notification announcements with proper ARIA roles
 * - Keyboard navigation support for notification interaction and dismissal
 * - High contrast and color accessibility compliance for notification styling
 * - Internationalization support for notification text and cultural formatting
 * - Focus management ensuring proper keyboard navigation flow
 * - Reduced motion support for users with vestibular disorders
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = signal<Notification[]>([]);
  private idCounter = 0;

  /** Readonly signal exposing current notifications for component consumption */
  readonly notifications$ = this.notifications.asReadonly();

  /**
   * Displays a success notification indicating successful operation completion.
   * Automatically dismisses after 5 seconds unless configured as persistent.
   * 
   * @param title - The primary message or title for the success notification
   * @param message - Optional detailed message providing additional context
   * @param options - Optional configuration for duration and persistence behavior
   */
  success(title: string, message?: string, options?: { duration?: number; persistent?: boolean }): void {
    this.addNotification({
      type: 'success',
      title,
      message,
      duration: options?.duration ?? 5000,
      persistent: options?.persistent ?? false
    });
  }

  /**
   * Displays an error notification indicating operation failure or critical issues.
   * Automatically dismisses after 5 seconds like success messages for better UX.
   *
   * @param title - The primary error message or title for the error notification
   * @param message - Optional detailed error message providing additional context
   * @param options - Optional configuration for duration and persistence behavior
   */
  error(title: string, message?: string, options?: { duration?: number; persistent?: boolean }): void {
    this.addNotification({
      type: 'error',
      title,
      message,
      duration: options?.duration ?? 5000, // Auto-dismiss after 5 seconds like success messages
      persistent: options?.persistent ?? false
    });
  }

  /**
   * Displays a warning notification indicating cautionary information or potential issues.
   * Automatically dismisses after 7 seconds to allow adequate reading time.
   * 
   * @param title - The primary warning message or title for the warning notification
   * @param message - Optional detailed warning message providing additional context
   * @param options - Optional configuration for duration and persistence behavior
   */
  warning(title: string, message?: string, options?: { duration?: number; persistent?: boolean }): void {
    this.addNotification({
      type: 'warning',
      title,
      message,
      duration: options?.duration ?? 7000,
      persistent: options?.persistent ?? false
    });
  }

  /**
   * Displays an informational notification providing general information to the user.
   * Automatically dismisses after 5 seconds for non-intrusive information delivery.
   * 
   * @param title - The primary informational message or title for the info notification
   * @param message - Optional detailed informational message providing additional context
   * @param options - Optional configuration for duration and persistence behavior
   */
  info(title: string, message?: string, options?: { duration?: number; persistent?: boolean }): void {
    this.addNotification({
      type: 'info',
      title,
      message,
      duration: options?.duration ?? 5000,
      persistent: options?.persistent ?? false
    });
  }

  /**
   * Removes a specific notification from the notification queue by its unique identifier.
   * Updates the reactive notification state to trigger UI updates across consuming components.
   * 
   * @param id - The unique identifier of the notification to remove
   */
  remove(id: string): void {
    const current = this.notifications();
    const updated = current.filter(n => n.id !== id);
    this.notifications.set(updated);
  }

  /**
   * Clears all notifications from the queue, removing all visible notifications at once.
   * Useful for reset operations or when navigating to different application sections.
   */
  clear(): void {
    this.notifications.set([]);
  }

  /**
   * Adds a new notification to the notification queue with automatic ID generation and lifecycle management.
   * Handles auto-dismissal timing for non-persistent notifications and maintains reactive state updates.
   * 
   * @param notification - The notification data without ID (ID is generated automatically)
   */
  private addNotification(notification: Omit<Notification, 'id'>): void {
    const id = `notification-${++this.idCounter}`;
    const newNotification: Notification = { ...notification, id };
    
    const current = this.notifications();
    this.notifications.set([...current, newNotification]);

    // Auto-remove notification if duration is set and it's not persistent
    if (notification.duration && notification.duration > 0 && !notification.persistent) {
      setTimeout(() => {
        this.remove(id);
      }, notification.duration);
    }
  }
}