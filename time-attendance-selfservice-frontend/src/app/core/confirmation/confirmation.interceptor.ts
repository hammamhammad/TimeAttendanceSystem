import {
  HttpContextToken,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap, throwError } from 'rxjs';
import { ConfirmationService } from './confirmation.service';

/**
 * Pass `new HttpContext().set(SKIP_CONFIRMATION, true)` on a request
 * to bypass the global confirmation prompt. Used for:
 *  - chained/background operations (auto-saves, polling)
 *  - composite flows that already asked the user once
 */
export const SKIP_CONFIRMATION = new HttpContextToken<boolean>(() => false);

/**
 * Marker on the HttpErrorResponse we throw when the user dismisses the
 * confirmation modal. Consumers that want to branch on "cancelled vs real
 * error" can check `err.error?.cancelled === true`.
 */
export const USER_CANCELLED_MARKER = 'user-cancelled-confirmation';

/**
 * URL segments that never require confirmation. These are either:
 *  - auth/session lifecycle
 *  - real-time / read-like endpoints
 *  - notification read-receipts and similar background chatter
 *  - file downloads/uploads (the enclosing action gets the prompt)
 */
const URL_ALLOWLIST: readonly string[] = [
  '/auth/',
  '/hubs/',
  '/signalr',
  '/global-search',
  '/search',
  '/notifications/read',
  '/notifications/mark-read',
  '/files/upload',
  '/files/download',
  '/export',
  '/download'
];

const METHOD_CONFIG: Record<string, {
  title: string;
  message: string;
  confirmText: string;
  confirmButtonClass: string;
  icon: string;
  iconClass: string;
}> = {
  POST: {
    title: 'Confirm Create',
    message: 'Do you want to submit this action?',
    confirmText: 'Confirm',
    confirmButtonClass: 'btn-primary',
    icon: 'fa-plus-circle',
    iconClass: 'text-primary'
  },
  PUT: {
    title: 'Confirm Update',
    message: 'Do you want to save these changes?',
    confirmText: 'Save',
    confirmButtonClass: 'btn-primary',
    icon: 'fa-save',
    iconClass: 'text-primary'
  },
  PATCH: {
    title: 'Confirm Update',
    message: 'Do you want to save these changes?',
    confirmText: 'Save',
    confirmButtonClass: 'btn-primary',
    icon: 'fa-save',
    iconClass: 'text-primary'
  },
  DELETE: {
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this record? This action cannot be undone.',
    confirmText: 'Delete',
    confirmButtonClass: 'btn-danger',
    icon: 'fa-trash',
    iconClass: 'text-danger'
  }
};

function isMutating(method: string): boolean {
  return method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';
}

function isAllowlisted(url: string): boolean {
  const lower = url.toLowerCase();
  return URL_ALLOWLIST.some(seg => lower.includes(seg));
}

export const confirmationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const method = req.method.toUpperCase();

  if (!isMutating(method)) {
    return next(req);
  }
  if (req.context.get(SKIP_CONFIRMATION)) {
    return next(req);
  }
  if (isAllowlisted(req.url)) {
    return next(req);
  }

  const confirmationService = inject(ConfirmationService);

  // Compound-save flows fire several mutating requests in sequence after one
  // user click (e.g. update branch → update coordinates). A single approval
  // covers the whole chain — suppress the prompt during a brief window after
  // the last confirm.
  if (confirmationService.wasJustConfirmed()) {
    return next(req);
  }

  const cfg = METHOD_CONFIG[method];

  return from(
    confirmationService.confirm({
      title: cfg.title,
      message: cfg.message,
      confirmText: cfg.confirmText,
      cancelText: 'Cancel',
      confirmButtonClass: cfg.confirmButtonClass,
      icon: cfg.icon,
      iconClass: cfg.iconClass
    })
  ).pipe(
    switchMap(result => {
      if (!result.confirmed) {
        // Throw a recognizable cancellation error so subscribers' `error`
        // handlers fire — that's what resets `loading` signals, re-enables
        // buttons, and clears spinners. `NotificationService.error()` checks
        // `confirmationService.wasJustCancelled()` and suppresses the toast so
        // the user doesn't see a false-positive error.
        return throwError(() => new HttpErrorResponse({
          status: 0,
          statusText: 'Cancelled',
          url: req.url,
          error: { cancelled: true, reason: USER_CANCELLED_MARKER }
        }));
      }
      return next(req);
    })
  );
};
