# Frontend Core Architecture

**Time Attendance System - Frontend**
**Framework**: Angular 17+
**Architecture**: Standalone Components + Signals + Modern Angular Patterns

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Angular 17+ Features](#angular-17-features)
4. [Application Configuration](#application-configuration)
5. [Core Modules](#core-modules)
6. [Routing Architecture](#routing-architecture)
7. [State Management](#state-management)
8. [HTTP Communication](#http-communication)
9. [Internationalization](#internationalization)
10. [Build & Deployment](#build--deployment)

---

## Architecture Overview

### Technology Stack

```
┌─────────────────────────────────────────┐
│     Angular 17+ (Standalone)            │
│  - Signals API for reactive state       │
│  - Standalone components (no NgModules) │
│  - New control flow (@if, @for)         │
│  - Improved performance & DX            │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        Core Libraries                   │
│  - Bootstrap 5 (UI Framework)           │
│  - ngx-translate (i18n)                 │
│  - Font Awesome (Icons)                 │
│  - RxJS 7+ (Reactive programming)       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      TypeScript 5.5+                    │
│  - Strict mode enabled                  │
│  - Type safety throughout               │
│  - Modern ES features                   │
└─────────────────────────────────────────┘
```

### Key Technologies

- **Angular**: 17.3.0
- **TypeScript**: 5.5+
- **Bootstrap**: 5.3.3
- **ngx-translate**: 15.0.0
- **RxJS**: 7.8.0
- **Font Awesome**: Free 6.x

### Architecture Principles

1. **Standalone Components** - No NgModules, direct imports
2. **Signals for State** - Reactive state management with signals
3. **Component Composition** - Reusable shared components
4. **Functional Reactive** - RxJS for async operations
5. **Type Safety** - Strict TypeScript configuration
6. **i18n First** - Multi-language support (English/Arabic)

---

## Project Structure

### Directory Organization

```
time-attendance-frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality (singletons)
│   │   │   ├── auth/               # Authentication logic
│   │   │   ├── guards/             # Route guards
│   │   │   ├── i18n/               # Internationalization
│   │   │   ├── interceptors/       # HTTP interceptors
│   │   │   ├── models/             # Core interfaces
│   │   │   ├── services/           # Core services
│   │   │   └── title/              # Page title strategy
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── header/             # App header
│   │   │   ├── sidebar/            # Navigation sidebar
│   │   │   └── footer/             # App footer
│   │   │
│   │   ├── pages/                   # Feature pages
│   │   │   ├── attendance/         # Attendance management
│   │   │   ├── branches/           # Branch management
│   │   │   ├── dashboard/          # Dashboard
│   │   │   ├── departments/        # Department management
│   │   │   ├── employees/          # Employee management
│   │   │   ├── reports/            # Reporting
│   │   │   ├── roles/              # Role management
│   │   │   ├── shifts/             # Shift management
│   │   │   ├── users/              # User management
│   │   │   └── vacation-types/     # Vacation types
│   │   │
│   │   ├── services/                # Feature services
│   │   │   ├── api/                # API services
│   │   │   └── state/              # State management services
│   │   │
│   │   ├── shared/                  # Shared resources
│   │   │   ├── components/         # Reusable UI components (25+)
│   │   │   ├── constants/          # Constants & enums
│   │   │   ├── directives/         # Custom directives
│   │   │   ├── models/             # Shared interfaces
│   │   │   ├── ui/                 # UI utilities
│   │   │   └── utils/              # Helper functions
│   │   │
│   │   ├── app.component.ts         # Root component
│   │   ├── app.config.ts            # Application configuration
│   │   └── app.routes.ts            # Route definitions
│   │
│   ├── assets/                      # Static assets
│   │   ├── i18n/                   # Translation files
│   │   └── images/                 # Images
│   │
│   ├── environments/                # Environment configs
│   │   ├── environment.ts          # Development
│   │   └── environment.prod.ts     # Production
│   │
│   ├── index.html                   # HTML entry point
│   ├── main.ts                      # Application bootstrap
│   └── styles.css                   # Global styles
│
├── angular.json                     # Angular CLI configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

### File Organization Patterns

**Feature Module Structure** (e.g., `pages/employees/`):
```
employees/
├── list-employees/
│   ├── list-employees.component.ts
│   ├── list-employees.component.html
│   └── list-employees.component.css
├── view-employee/
│   ├── view-employee.component.ts
│   ├── view-employee.component.html
│   └── view-employee.component.css
├── create-employee/
│   ├── create-employee.component.ts
│   ├── create-employee.component.html
│   └── create-employee.component.css
└── edit-employee/
    ├── edit-employee.component.ts
    ├── edit-employee.component.html
    └── edit-employee.component.css
```

**Shared Component Structure** (e.g., `shared/components/status-badge/`):
```
status-badge/
├── status-badge.component.ts        # Component logic
├── status-badge.component.html      # Template
└── status-badge.component.css       # Styles
```

---

## Angular 17+ Features

### 1. Standalone Components

**No NgModules Required**:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Direct imports
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent { }
```

### 2. Signals API

**Reactive State Management**:
```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  // Signal for mutable state
  employees = signal<Employee[]>([]);
  searchTerm = signal<string>('');

  // Computed signal (auto-updates)
  filteredEmployees = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.employees().filter(emp =>
      emp.firstName.toLowerCase().includes(term)
    );
  });

  // Effect (side effects)
  constructor() {
    effect(() => {
      console.log('Employee count:', this.employees().length);
    });
  }

  // Update signal
  addEmployee(employee: Employee) {
    this.employees.update(list => [...list, employee]);
  }
}
```

### 3. New Control Flow Syntax

**@if Directive** (replaces *ngIf):
```html
@if (user()) {
  <div class="user-info">
    <h3>{{ user().name }}</h3>
  </div>
} @else {
  <div class="loading">Loading...</div>
}
```

**@for Directive** (replaces *ngFor):
```html
@for (employee of employees(); track employee.id) {
  <div class="employee-card">
    {{ employee.firstName }} {{ employee.lastName }}
  </div>
} @empty {
  <app-empty-state message="No employees found" />
}
```

**@switch Directive** (replaces *ngSwitch):
```html
@switch (status()) {
  @case ('active') {
    <span class="badge bg-success">Active</span>
  }
  @case ('inactive') {
    <span class="badge bg-secondary">Inactive</span>
  }
  @default {
    <span class="badge bg-warning">Unknown</span>
  }
}
```

### 4. Functional Guards & Interceptors

**Route Guard**:
```typescript
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
```

**HTTP Interceptor**:
```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
```

---

## Application Configuration

### app.config.ts

**Bootstrap Configuration**:
```typescript
import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone.js configuration
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router with features
    provideRouter(
      routes,
      withComponentInputBinding(),  // Bind route params to component inputs
      withHashLocation()            // Use hash-based routing
    ),

    // HTTP client with interceptors
    provideHttpClient(withInterceptors([authInterceptor])),

    // App initialization
    {
      provide: APP_INITIALIZER,
      useFactory: (service: SomeService) => () => service.init(),
      deps: [SomeService],
      multi: true
    }
  ]
};
```

### main.ts

**Application Bootstrap**:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

---

## Core Modules

### 1. Authentication Module

**Location**: `src/app/core/auth/`

**Key Files**:
- `auth.service.ts` - Authentication logic
- `auth.interceptor.ts` - JWT token injection
- `auth.guard.ts` - Route protection

**Authentication Service**:
```typescript
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', { username, password })
      .pipe(
        tap(response => {
          this.setToken(response.accessToken);
          this.currentUser.set(response.user);
          this.isAuthenticated.set(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    const userJson = localStorage.getItem(this.USER_KEY);

    if (token && userJson) {
      this.currentUser.set(JSON.parse(userJson));
      this.isAuthenticated.set(true);
    }
  }
}
```

### 2. HTTP Interceptor

**Location**: `src/app/core/auth/auth.interceptor.ts`

**JWT Token Injection**:
```typescript
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Clone request and add auth header
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': localStorage.getItem('language') || 'en'
      }
    });
  }

  // Handle errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
```

### 3. Route Guards

**Location**: `src/app/core/guards/`

**Auth Guard**:
```typescript
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
```

**Permission Guard**:
```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermission = route.data['permission'];

  const user = authService.currentUser();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  if (user.permissions?.includes(requiredPermission)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
```

---

## Routing Architecture

### Route Configuration

**Location**: `src/app/app.routes.ts`

**Route Structure**:
```typescript
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component')
      .then(m => m.LoginComponent)
  },

  // Protected routes
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
        title: 'Dashboard'
      },
      {
        path: 'employees',
        canActivate: [permissionGuard],
        data: { permission: 'Employee.View' },
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/employees/list-employees/list-employees.component')
              .then(m => m.ListEmployeesComponent)
          },
          {
            path: 'create',
            loadComponent: () => import('./pages/employees/create-employee/create-employee.component')
              .then(m => m.CreateEmployeeComponent),
            data: { permission: 'Employee.Create' }
          },
          {
            path: ':id',
            loadComponent: () => import('./pages/employees/view-employee/view-employee.component')
              .then(m => m.ViewEmployeeComponent)
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./pages/employees/edit-employee/edit-employee.component')
              .then(m => m.EditEmployeeComponent),
            data: { permission: 'Employee.Update' }
          }
        ]
      }
    ]
  },

  // Fallback routes
  { path: 'unauthorized', loadComponent: () => import('./pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
```

### Lazy Loading

All routes use **lazy loading** with `loadComponent()`:
- Reduces initial bundle size
- Improves application startup time
- Loads features on demand

---

## State Management

### Signals-Based State

**Component-Level State**:
```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  // Signals
  employees = signal<Employee[]>([]);
  loading = signal<boolean>(false);
  searchTerm = signal<string>('');

  // Computed values
  filteredEmployees = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.employees().filter(emp =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term)
    );
  });

  totalCount = computed(() => this.employees().length);

  // Actions
  loadEmployees(): void {
    this.loading.set(true);
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
```

### Service-Level State

**Shared State Service**:
```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeStateService {
  private _employees = signal<Employee[]>([]);
  private _selectedEmployee = signal<Employee | null>(null);

  // Public readonly signals
  employees = this._employees.asReadonly();
  selectedEmployee = this._selectedEmployee.asReadonly();

  // Computed
  activeEmployees = computed(() =>
    this._employees().filter(e => e.isActive)
  );

  // Actions
  setEmployees(employees: Employee[]): void {
    this._employees.set(employees);
  }

  selectEmployee(employee: Employee): void {
    this._selectedEmployee.set(employee);
  }

  addEmployee(employee: Employee): void {
    this._employees.update(list => [...list, employee]);
  }

  updateEmployee(id: number, updates: Partial<Employee>): void {
    this._employees.update(list =>
      list.map(emp => emp.id === id ? { ...emp, ...updates } : emp)
    );
  }
}
```

---

## HTTP Communication

### API Service Pattern

**Location**: `src/app/services/api/`

**Base API Service**:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export abstract class BaseApiService<T> {
  protected abstract readonly endpoint: string;

  constructor(protected http: HttpClient) {}

  protected get baseUrl(): string {
    return `${environment.apiUrl}${this.endpoint}`;
  }

  getAll(params?: any): Observable<T[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }
    return this.http.get<T[]>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.baseUrl, data);
  }

  update(id: number, data: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

**Feature API Service**:
```typescript
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Employee } from '../../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService extends BaseApiService<Employee> {
  protected readonly endpoint = '/api/employees';

  // Additional methods specific to employees
  toggleStatus(id: number): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/${id}/toggle-status`, {});
  }

  getByDepartment(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/by-department/${departmentId}`);
  }
}
```

---

## Internationalization

### ngx-translate Setup

**Location**: `src/app/core/i18n/`

**Translation Service Wrapper**:
```typescript
import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private translate = inject(TranslateService);

  constructor() {
    // Set default language
    this.translate.setDefaultLang('en');

    // Load saved language or use default
    const savedLang = localStorage.getItem('language') || 'en';
    this.translate.use(savedLang);
  }

  // Shorthand for translate.instant()
  t(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
```

**Translation Files**:

`src/assets/i18n/en.json`:
```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "view": "View",
    "active": "Active",
    "inactive": "Inactive"
  },
  "employees": {
    "title": "Employees",
    "create": "Create Employee",
    "first_name": "First Name",
    "last_name": "Last Name"
  }
}
```

`src/assets/i18n/ar.json`:
```json
{
  "common": {
    "save": "حفظ",
    "cancel": "إلغاء",
    "delete": "حذف",
    "edit": "تعديل",
    "view": "عرض",
    "active": "نشط",
    "inactive": "غير نشط"
  },
  "employees": {
    "title": "الموظفون",
    "create": "إضافة موظف",
    "first_name": "الاسم الأول",
    "last_name": "اسم العائلة"
  }
}
```

---

## Build & Deployment

### Development Build

```bash
# Start development server
ng serve
# Runs on http://localhost:4200

# With specific port
ng serve --port 4200

# With host binding
ng serve --host 0.0.0.0
```

### Production Build

```bash
# Build for production
ng build --configuration production

# Output directory
dist/time-attendance-frontend/browser/
```

### Build Configuration

**angular.json**:
```json
{
  "projects": {
    "time-attendance-frontend": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

### Environment Configuration

**environment.ts** (Development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5099',
  appName: 'Time Attendance System',
  version: '1.0.0'
};
```

**environment.prod.ts** (Production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.timeattendance.com',
  appName: 'Time Attendance System',
  version: '1.0.0'
};
```

---

## Performance Optimizations

### 1. Lazy Loading

All routes are lazy-loaded using `loadComponent()`.

### 2. OnPush Change Detection

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-card.component.html'
})
export class EmployeeCardComponent { }
```

### 3. TrackBy Functions

```html
@for (employee of employees(); track employee.id) {
  <app-employee-card [employee]="employee" />
}
```

### 4. Signals for Reactive State

Signals provide fine-grained reactivity without zone.js overhead.

---

## Next Steps

- **[Shared Components Documentation →](./03-SHARED-COMPONENTS.md)**
- **[Services Documentation →](./04-SERVICES.md)**
- **[Pages Documentation →](./05-PAGES.md)**

---

*Last Updated: November 3, 2025*
*Angular Version: 17.3.0*
