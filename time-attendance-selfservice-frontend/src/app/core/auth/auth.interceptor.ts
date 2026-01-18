import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, tap } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  // Skip auth header for login and refresh endpoints
  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const token = authService.getAccessToken();

  // Add authorization header if token exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  console.log('[AuthInterceptor] Sending request:', req.method, req.url);

  return next(authReq).pipe(
    tap((event: any) => {
      if (event.type === 4) { // HttpResponse
        console.log('[AuthInterceptor] Response received for:', req.method, req.url, 'Status:', event.status);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('[AuthInterceptor] Error for:', req.method, req.url, 'Status:', error.status);
      // Handle 401 unauthorized responses
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        // Try to refresh token
        if (authService.getRefreshToken()) {
          return authService.refreshToken().pipe(
            switchMap(() => {
              // Retry original request with new token
              const newToken = authService.getAccessToken();
              const retryReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`)
              });
              return next(retryReq);
            }),
            catchError((refreshError) => {
              // If refresh fails, logout user
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        } else {
          // No refresh token, logout user
          authService.logout();
        }
      }
      
      return throwError(() => error);
    })
  );
};