import {
  Router
} from "./chunk-APWG5MB4.js";
import {
  environment
} from "./chunk-ZTCQ26FY.js";
import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  catchError,
  computed,
  setClassMetadata,
  signal,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/core/http/api.config.ts
var API_CONFIG = {
  baseUrl: environment.apiUrl || "http://localhost:5000",
  endpoints: {
    auth: {
      login: "/api/v1/auth/login",
      refresh: "/api/v1/auth/refresh",
      logout: "/api/v1/auth/logout",
      profile: "/api/v1/auth/profile",
      changePassword: "/api/v1/auth/change-password"
    },
    users: {
      list: "/api/users",
      create: "/api/users",
      update: /* @__PURE__ */ __name((id) => `/api/users/${id}`, "update"),
      delete: /* @__PURE__ */ __name((id) => `/api/users/${id}`, "delete"),
      get: /* @__PURE__ */ __name((id) => `/api/users/${id}`, "get")
    },
    employees: {
      list: "/api/employees",
      create: "/api/employees",
      update: /* @__PURE__ */ __name((id) => `/api/employees/${id}`, "update"),
      delete: /* @__PURE__ */ __name((id) => `/api/employees/${id}`, "delete"),
      get: /* @__PURE__ */ __name((id) => `/api/employees/${id}`, "get")
    },
    departments: {
      list: "/api/departments"
    },
    branches: {
      list: "/api/branches"
    }
  }
};

// src/app/core/auth/auth.service.ts
var _AuthService = class _AuthService {
  http;
  router;
  /** localStorage key for JWT access token storage */
  TOKEN_KEY = "access_token";
  /** localStorage key for JWT refresh token storage */
  REFRESH_TOKEN_KEY = "refresh_token";
  /** localStorage key for user information storage */
  USER_KEY = "current_user";
  /** BehaviorSubject for reactive user state management (RxJS compatibility) */
  currentUserSubject = new BehaviorSubject(this.getUserFromStorage());
  /** Observable stream of current user state for component subscriptions */
  currentUser$ = this.currentUserSubject.asObservable();
  /** Angular signal for current user state (modern reactive approach) */
  currentUser = signal(this.getUserFromStorage(), ...ngDevMode ? [{ debugName: "currentUser" }] : []);
  /** Computed signal indicating if user is currently authenticated */
  isAuthenticated = computed(() => !!this.currentUser(), ...ngDevMode ? [{ debugName: "isAuthenticated" }] : []);
  /** Computed signal indicating if current user has admin privileges */
  isAdmin = computed(() => this.currentUser()?.roles?.includes("Admin") || this.currentUser()?.roles?.includes("SystemAdmin") || false, ...ngDevMode ? [{ debugName: "isAdmin" }] : []);
  /**
   * Initializes the authentication service with required dependencies.
   * Restores user session from localStorage on application startup.
   *
   * @param http - Angular HttpClient for API communication
   * @param router - Angular Router for navigation after auth events
   */
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
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
  login(credentials) {
    return this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.login}`, {
      username: credentials.username,
      password: credentials.password,
      deviceInfo: credentials.deviceInfo,
      rememberMe: credentials.rememberMe || false
    }).pipe(tap((response) => {
      this.setSession(response);
    }), catchError((error) => {
      console.error("Login failed:", error);
      return throwError(() => error);
    }));
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
  logout() {
    this.clearSession();
    this.router.navigate(["/login"]);
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
  refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error("No refresh token available"));
    }
    const request = { refreshToken };
    return this.http.post(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.refresh}`, request).pipe(tap((response) => {
      if (response.refreshToken) {
        this.updateTokens(response.accessToken, response.refreshToken);
      }
    }), catchError((error) => {
      console.error("Token refresh failed:", error);
      this.logout();
      return throwError(() => error);
    }));
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
  getAccessToken() {
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
  getRefreshToken() {
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
  isTokenExpired() {
    const token = this.getAccessToken();
    if (!token)
      return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1e3;
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
  setSession(authResult) {
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
  updateTokens(accessToken, refreshToken) {
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
  clearSession() {
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
  getUserFromStorage() {
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }
  /**
   * Checks if the current user has SystemAdmin role.
   * @returns true if user has SystemAdmin role, false otherwise
   */
  isSystemAdmin() {
    return this.currentUser()?.roles?.includes("SystemAdmin") || false;
  }
};
__name(_AuthService, "AuthService");
__publicField(_AuthService, "\u0275fac", /* @__PURE__ */ __name(function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
}, "AuthService_Factory"));
__publicField(_AuthService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" }));
var AuthService = _AuthService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  API_CONFIG,
  AuthService
};
//# sourceMappingURL=chunk-HZ2IZU2F.js.map
