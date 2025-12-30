import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/core/notifications/notification.service.ts
var _NotificationService = class _NotificationService {
  notifications = signal([], ...ngDevMode ? [{ debugName: "notifications" }] : []);
  idCounter = 0;
  /** Readonly signal exposing current notifications for component consumption */
  notifications$ = this.notifications.asReadonly();
  /**
   * Displays a success notification indicating successful operation completion.
   * Automatically dismisses after 5 seconds unless configured as persistent.
   *
   * @param title - The primary message or title for the success notification
   * @param message - Optional detailed message providing additional context
   * @param options - Optional configuration for duration and persistence behavior
   */
  success(title, message, options) {
    this.addNotification({
      type: "success",
      title,
      message,
      duration: options?.duration ?? 5e3,
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
  error(title, message, options) {
    this.addNotification({
      type: "error",
      title,
      message,
      duration: options?.duration ?? 5e3,
      // Auto-dismiss after 5 seconds like success messages
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
  warning(title, message, options) {
    this.addNotification({
      type: "warning",
      title,
      message,
      duration: options?.duration ?? 7e3,
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
  info(title, message, options) {
    this.addNotification({
      type: "info",
      title,
      message,
      duration: options?.duration ?? 5e3,
      persistent: options?.persistent ?? false
    });
  }
  /**
   * Removes a specific notification from the notification queue by its unique identifier.
   * Updates the reactive notification state to trigger UI updates across consuming components.
   *
   * @param id - The unique identifier of the notification to remove
   */
  remove(id) {
    const current = this.notifications();
    const updated = current.filter((n) => n.id !== id);
    this.notifications.set(updated);
  }
  /**
   * Clears all notifications from the queue, removing all visible notifications at once.
   * Useful for reset operations or when navigating to different application sections.
   */
  clear() {
    this.notifications.set([]);
  }
  /**
   * Adds a new notification to the notification queue with automatic ID generation and lifecycle management.
   * Handles auto-dismissal timing for non-persistent notifications and maintains reactive state updates.
   *
   * @param notification - The notification data without ID (ID is generated automatically)
   */
  addNotification(notification) {
    const id = `notification-${++this.idCounter}`;
    const newNotification = __spreadProps(__spreadValues({}, notification), { id });
    const current = this.notifications();
    this.notifications.set([...current, newNotification]);
    if (notification.duration && notification.duration > 0 && !notification.persistent) {
      setTimeout(() => {
        this.remove(id);
      }, notification.duration);
    }
  }
};
__name(_NotificationService, "NotificationService");
__publicField(_NotificationService, "\u0275fac", /* @__PURE__ */ __name(function NotificationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotificationService)();
}, "NotificationService_Factory"));
__publicField(_NotificationService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" }));
var NotificationService = _NotificationService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  NotificationService
};
//# sourceMappingURL=chunk-6SX47UU2.js.map
