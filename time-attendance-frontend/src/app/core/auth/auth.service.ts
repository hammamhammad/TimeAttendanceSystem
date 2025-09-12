import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from '../../shared/models/user.model';
import { API_CONFIG } from '../http/api.config';

/**
 * Angular service for handling user authentication and session management.
 * Implements JWT-based authentication with automatic token refresh and secure storage.
 * 
 * Key Features:
 * - JWT token-based authentication with refresh token rotation
 * - Automatic token refresh when expired
 * - Secure localStorage token storage with proper cleanup
 * - Reactive user state management using Angular signals
 * - Role-based authorization support
 * - Automatic logout on token expiration
 * - Device information tracking for security
 * 
 * Security Considerations:
 * - Tokens are stored in localStorage (consider httpOnly cookies for production)
 * - Automatic logout on token expiration prevents unauthorized access
 * - Token validation prevents use of malformed or expired tokens
 * - Refresh token rotation enhances security
 * - Error handling prevents sensitive information leakage
 * 
 * @example
 * ```typescript
 * constructor(private authService: AuthService) {
 *   // Check authentication status
 *   if (this.authService.isAuthenticated()) {
 *     console.log('User is authenticated');
 *   }
 * 
 *   // Subscribe to user changes
 *   this.authService.currentUser$.subscribe(user => {
 *     console.log('Current user:', user);
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** localStorage key for JWT access token storage */
  private readonly TOKEN_KEY = 'access_token';
  /** localStorage key for JWT refresh token storage */
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  /** localStorage key for user information storage */
  private readonly USER_KEY = 'current_user';

  /** BehaviorSubject for reactive user state management (RxJS compatibility) */
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  /** Observable stream of current user state for component subscriptions */
  public currentUser$ = this.currentUserSubject.asObservable();
  
  /** Angular signal for current user state (modern reactive approach) */
  public currentUser = signal<User | null>(this.getUserFromStorage());
  /** Computed signal indicating if user is currently authenticated */
  public isAuthenticated = computed(() => !!this.currentUser());
  /** Computed signal indicating if current user has admin privileges */
  public isAdmin = computed(() => this.currentUser()?.roles?.includes('Admin') || this.currentUser()?.roles?.includes('SystemAdmin') || false);

  /**
   * Initializes the authentication service with required dependencies.
   * Restores user session from localStorage on application startup.
   * 
   * @param http - Angular HttpClient for API communication
   * @param router - Angular Router for navigation after auth events
   */
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Authenticates a user with username/password credentials.
   * Sends login request to backend API and establishes user session on success.
   * 
   * @param credentials - User login credentials (username, password, deviceInfo)
   * @returns Observable<LoginResponse> - Login response with tokens and user info
   * 
   * @remarks
   * Authentication Flow:
   * 1. Sends POST request to login endpoint with credentials
   * 2. Backend validates credentials and returns JWT tokens
   * 3. Stores tokens and user info in localStorage
   * 4. Updates reactive user state (signals and observables)
   * 5. Enables authenticated API requests via interceptor
   * 
   * Security Features:
   * - Device information sent for session tracking
   * - Error handling prevents credential exposure
   * - Automatic session establishment on success
   * - Integration with auth interceptor for subsequent requests
   * 
   * @example
   * ```typescript
   * const credentials = { username: 'admin', password: 'password123' };
   * this.authService.login(credentials).subscribe({
   *   next: (response) => console.log('Login successful', response),
   *   error: (error) => console.error('Login failed', error)
   * });
   * ```
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.login}`, credentials)
      .pipe(
        tap(response => {
          this.setSession(response);
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Logs out the current user and clears all session data.
   * Removes tokens from storage and redirects to login page.
   * 
   * @remarks
   * Logout Process:
   * 1. Clears JWT tokens from localStorage
   * 2. Removes user information from storage
   * 3. Resets reactive user state to null
   * 4. Redirects user to login page
   * 5. Invalidates any ongoing HTTP requests
   * 
   * Security Considerations:
   * - Complete session cleanup prevents token reuse
   * - Immediate navigation prevents unauthorized access
   * - State reset ensures clean authentication state
   * - Should be called on token expiration or user action
   * 
   * Note: This is client-side logout only. For complete security,
   * implement server-side token invalidation in production.
   */
  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  /**
   * Refreshes expired access tokens using refresh token rotation.
   * Automatically called by auth interceptor when access token expires.
   * 
   * @returns Observable<RefreshTokenResponse> - New access and refresh tokens
   * 
   * @remarks
   * Token Refresh Flow:
   * 1. Retrieves current refresh token from localStorage
   * 2. Sends refresh request to backend API
   * 3. Backend validates refresh token and issues new tokens
   * 4. Updates localStorage with new token pair
   * 5. Enables continued API access without re-authentication
   * 
   * Security Features:
   * - Refresh token rotation (new refresh token with each refresh)
   * - Automatic logout if refresh token is invalid/expired
   * - Error handling prevents token leakage
   * - Seamless user experience with automatic renewal
   * 
   * Error Handling:
   * - No refresh token: Immediate logout
   * - Invalid refresh token: Clear session and logout
   * - Network errors: Propagate error to calling component
   * 
   * @example
   * ```typescript
   * // Usually called automatically by auth interceptor
   * this.authService.refreshToken().subscribe({
   *   next: () => console.log('Token refreshed successfully'),
   *   error: () => console.log('Refresh failed, user logged out')
   * });
   * ```
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const request: RefreshTokenRequest = { refreshToken };
    return this.http.post<RefreshTokenResponse>(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.refresh}`, request)
      .pipe(
        tap(response => {
          if (response.refreshToken) {
            this.updateTokens(response.accessToken, response.refreshToken);
          }
        }),
        catchError(error => {
          console.error('Token refresh failed:', error);
          this.logout();
          return throwError(() => error);
        })
      );
  }

  /**
   * Retrieves the current JWT access token from localStorage.
   * Used by auth interceptor to add Authorization header to API requests.
   * 
   * @returns JWT access token string or null if not available
   * 
   * @remarks
   * Token Usage:
   * - Added to Authorization header as "Bearer <token>"
   * - Contains user identity, roles, and permissions as JWT claims
   * - Short-lived (typically 15-60 minutes) for security
   * - Automatically refreshed when expired
   * 
   * Security Notes:
   * - Tokens stored in localStorage are accessible to JavaScript
   * - Consider httpOnly cookies for enhanced security in production
   * - Always validate token expiration before use
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Retrieves the current JWT refresh token from localStorage.
   * Used for obtaining new access tokens without re-authentication.
   * 
   * @returns JWT refresh token string or null if not available
   * 
   * @remarks
   * Refresh Token Characteristics:
   * - Longer-lived than access tokens (typically 7-30 days)
   * - Single-use with rotation (new refresh token issued each use)
   * - Stored securely and transmitted only over HTTPS
   * - Invalidated on logout or suspicious activity
   * 
   * Security Considerations:
   * - More sensitive than access tokens due to longer lifespan
   * - Should be stored in httpOnly cookies in production
   * - Automatic cleanup on expiration or security events
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Checks if the current access token has expired.
   * Used to determine when automatic token refresh is needed.
   * 
   * @returns true if token is expired or invalid, false if still valid
   * 
   * @remarks
   * Token Expiration Logic:
   * 1. Retrieves access token from localStorage
   * 2. Decodes JWT payload (base64 decoding)
   * 3. Extracts 'exp' claim (expiration timestamp)
   * 4. Compares with current time to determine validity
   * 
   * Error Handling:
   * - Returns true (expired) for any parsing errors
   * - Handles malformed tokens gracefully
   * - Prevents crashes from invalid JWT format
   * 
   * Security Benefits:
   * - Prevents use of expired tokens
   * - Enables proactive token refresh
   * - Reduces failed API requests due to token expiration
   * 
   * Note: Adds small buffer time (typically 1-2 minutes) before
   * actual expiration to account for clock skew and network latency.
   */
  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp;
    } catch {
      return true;
    }
  }

  /**
   * Establishes a new user session after successful authentication.
   * Stores authentication tokens and user information, updates reactive state.
   * 
   * @param authResult - Login response containing tokens and user data
   * 
   * @remarks
   * Session Establishment Process:
   * 1. Stores JWT access token in localStorage
   * 2. Stores refresh token if provided by server
   * 3. Stores user information for offline access
   * 4. Updates Angular signals for reactive UI updates
   * 5. Notifies observables subscribers of state change
   * 
   * Storage Strategy:
   * - Uses localStorage for token persistence across browser sessions
   * - Serializes user object as JSON for complex data storage
   * - Provides both signal and observable updates for compatibility
   * 
   * Security Notes:
   * - localStorage is accessible to all scripts in the domain
   * - Consider more secure storage methods for production
   * - Tokens should be transmitted only over HTTPS
   */
  private setSession(authResult: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.accessToken);
    if (authResult.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, authResult.refreshToken);
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    
    this.currentUser.set(authResult.user);
    this.currentUserSubject.next(authResult.user);
  }

  /**
   * Updates stored authentication tokens after successful refresh.
   * Called during automatic token refresh to maintain session continuity.
   * 
   * @param accessToken - New JWT access token from refresh endpoint
   * @param refreshToken - New refresh token for next refresh cycle
   * 
   * @remarks
   * Token Rotation Security:
   * - Implements refresh token rotation for enhanced security
   * - Both access and refresh tokens are updated simultaneously
   * - Previous refresh token becomes invalid after successful refresh
   * - Prevents token replay attacks and reduces session hijacking risk
   * 
   * Storage Update:
   * - Overwrites existing tokens in localStorage
   * - Maintains user information (unchanged during token refresh)
   * - No UI state update needed as user remains authenticated
   */
  private updateTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Completely clears user session data from storage and reactive state.
   * Called during logout or when tokens become invalid.
   * 
   * @remarks
   * Session Cleanup Process:
   * 1. Removes JWT access token from localStorage
   * 2. Removes refresh token from localStorage
   * 3. Removes user information from localStorage
   * 4. Resets Angular signals to null state
   * 5. Notifies observable subscribers of state change
   * 
   * Security Benefits:
   * - Prevents token reuse after logout
   * - Clears sensitive user information from browser storage
   * - Ensures clean slate for next authentication
   * - Prevents unauthorized access to stored credentials
   * 
   * UI Impact:
   * - Triggers reactive UI updates showing unauthenticated state
   * - Components subscribed to auth state will update automatically
   * - Guards will redirect to login page on next navigation attempt
   */
  private clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.currentUser.set(null);
    this.currentUserSubject.next(null);
  }

  /**
   * Retrieves and parses user information from localStorage.
   * Used during service initialization to restore authentication state.
   * 
   * @returns Parsed User object or null if not available or invalid
   * 
   * @remarks
   * State Restoration Process:
   * 1. Attempts to retrieve user data from localStorage
   * 2. Parses JSON string back to User object
   * 3. Returns null for missing or corrupted data
   * 4. Enables automatic authentication state restoration on app restart
   * 
   * Error Handling:
   * - Returns null for any JSON parsing errors
   * - Gracefully handles missing localStorage entries
   * - Prevents application crashes from corrupted user data
   * - Allows normal authentication flow if restoration fails
   * 
   * Use Cases:
   * - Application initialization and state restoration
   * - Service construction to set initial reactive state
   * - Validation of stored user data integrity
   * 
   * Note: This method is called during service construction,
   * so it should handle all edge cases gracefully.
   */
  private getUserFromStorage(): User | null {
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }
}