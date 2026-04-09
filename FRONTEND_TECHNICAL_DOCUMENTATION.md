# TecAxle HRMS - Frontend Technical Documentation

**Version**: 1.0
**Date**: November 3, 2025
**Framework**: Angular 17+
**Architecture**: Standalone Components + Signals + Modern Patterns

---

## 📖 Welcome to the Frontend Documentation

This is the master entry point for the TecAxle HRMS frontend documentation. The frontend is built with Angular 17+ using modern patterns including standalone components, signals API, and the new control flow syntax.

---

## 📚 Documentation Structure

###Quick Access

| Document | Description | Focus |
|----------|-------------|-------|
| **[Core Architecture](./docs/frontend/02-CORE-ARCHITECTURE.md)** | Angular 17+ architecture | Standalone components, Signals, Routing |
| **[Shared Components](./SHARED_COMPONENTS_QUICK_REFERENCE.md)** ⭐ | 25+ reusable UI components | Component catalog with examples |
| **[Component Refactoring](./COMPONENT_REFACTORING_DOCUMENTATION.md)** | Refactoring patterns | Best practices, migration guide |
| **[Component Extraction Plan](./COMPONENT_EXTRACTION_PLAN.md)** | Component strategy | Design principles, extraction plan |
| **[Development Guidelines](./CLAUDE.md)** | Project instructions | Coding standards, workflows |

**Total Coverage**: 25+ shared components, 19 feature modules, 14 services

---

## 🏗️ Architecture Overview

### Technology Stack

```
┌───────────────────────────────────────┐
│      Angular 17+ Framework            │
│  - Standalone Components              │
│  - Signals API (Reactive State)       │
│  - New Control Flow (@if, @for)       │
│  - Lazy Loading                       │
└──────────────┬────────────────────────┘
               │
┌──────────────▼────────────────────────┐
│       UI Framework & Libraries        │
│  - Bootstrap 5.3.3                    │
│  - Font Awesome 6.x                   │
│  - ngx-translate (i18n)               │
│  - RxJS 7.8.0                         │
└──────────────┬────────────────────────┘
               │
┌──────────────▼────────────────────────┐
│       TypeScript 5.5+                 │
│  - Strict Mode                        │
│  - Type Safety                        │
│  - Modern ES Features                 │
└───────────────────────────────────────┘
```

### Key Features

- **Standalone Architecture** - No NgModules, direct component imports
- **Signals for State** - Fine-grained reactive state management
- **Component Library** - 25+ reusable shared components
- **Modern Syntax** - @if, @for, @switch control flow
- **i18n Support** - English and Arabic languages
- **Responsive Design** - Mobile-first Bootstrap 5
- **Type Safe** - Strict TypeScript throughout
- **Lazy Loading** - Optimized bundle sizes

---

## 📊 Project Structure

```
time-attendance-frontend/
├── src/app/
│   ├── core/                    # Core functionality (14 services)
│   │   ├── auth/               # Authentication & JWT
│   │   ├── guards/             # Route protection
│   │   ├── i18n/               # Internationalization
│   │   └── services/           # Core services
│   │
│   ├── shared/                  # Shared resources (25+ components)
│   │   ├── components/         # Reusable UI components
│   │   ├── constants/          # Constants & enums
│   │   ├── directives/         # Custom directives
│   │   ├── models/             # Interfaces
│   │   └── utils/              # Helper functions
│   │
│   ├── pages/                   # Feature pages (19 modules)
│   │   ├── attendance/         # Attendance tracking
│   │   ├── branches/           # Branch management
│   │   ├── dashboard/          # Main dashboard
│   │   ├── departments/        # Department management
│   │   ├── employees/          # Employee management
│   │   ├── reports/            # Reporting
│   │   ├── roles/              # Role & permission management
│   │   ├── shifts/             # Shift scheduling
│   │   ├── users/              # User management
│   │   └── vacation-types/     # Leave types
│   │
│   ├── services/                # Feature services
│   │   └── api/                # API communication
│   │
│   ├── layout/                  # Layout components
│   │   ├── header/             # App header
│   │   ├── sidebar/            # Navigation sidebar
│   │   └── footer/             # App footer
│   │
│   ├── app.component.ts         # Root component
│   ├── app.config.ts            # App configuration
│   └── app.routes.ts            # Route definitions
│
├── assets/                      # Static assets
│   ├── i18n/                   # Translation files
│   │   ├── en.json             # English translations
│   │   └── ar.json             # Arabic translations
│   └── images/                 # Images & icons
│
├── environments/                # Environment configs
│   ├── environment.ts          # Development
│   └── environment.prod.ts     # Production
│
└── angular.json                 # Angular CLI config
```

---

## 🎨 Shared Components Library

### Component Categories

#### 1. **Layout Components** (4 components)
- `PageHeaderComponent` - Page headers with title/subtitle
- `FormHeaderComponent` - Form headers with navigation
- `FormSectionComponent` - Logical grouping of form fields
- `SectionCardComponent` - Cards with headers

#### 2. **Display Components** (7 components)
- `StatusBadgeComponent` ⭐ - Status badges with variants
- `BadgeListComponent` ⭐ - Collections of badges
- `DefinitionListComponent` ⭐ - Label-value pairs
- `DetailCardComponent` - Information cards
- `StatCardComponent` - Statistics display
- `StatsGridComponent` - Grid of statistics
- `MetricRowComponent` - Metric displays

#### 3. **Form Components** (6 components)
- `FormGroupComponent` - Form fields with validation
- `DateRangePickerComponent` - Date range selection
- `TimeRangeInputComponent` - Time range input
- `SearchableSelectComponent` - Dropdown with search
- `SearchFilterComponent` - Search and filter
- `UnifiedFilterComponent` - Advanced filtering

#### 4. **Data Display Components** (3 components)
- `DataTableComponent` ⭐ - Feature-rich tables
- `PaginationComponent` - Table pagination
- `EmptyStateComponent` - Empty state displays

#### 5. **Feedback Components** (3 components)
- `LoadingSpinnerComponent` - Loading indicators
- `ConfirmationModalComponent` - Confirmation dialogs
- `ModalWrapperComponent` - Custom modals

#### 6. **Action Components** (2 components)
- `TableActionsComponent` - Row action buttons
- `BulkActionsToolbarComponent` - Bulk operations

---

## 🔑 Key Patterns

### 1. Signals for Reactive State

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
  searchTerm = signal<string>('');

  // Computed (auto-updates)
  filteredEmployees = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.employees().filter(emp =>
      emp.firstName.toLowerCase().includes(term)
    );
  });

  // Badge configuration
  statusBadge = computed(() => ({
    label: this.entity()?.isActive ? 'Active' : 'Inactive',
    variant: this.entity()?.isActive ? 'success' : 'secondary'
  }));
}
```

### 2. Modern Control Flow

```html
<!-- @if instead of *ngIf -->
@if (loading()) {
  <app-loading-spinner />
} @else if (employees().length > 0) {
  @for (employee of employees(); track employee.id) {
    <app-employee-card [employee]="employee" />
  }
} @else {
  <app-empty-state message="No employees found" />
}
```

### 3. Shared Component Usage

```html
<!-- Status Badge -->
<app-status-badge
  [status]="statusBadge().label"
  [variant]="statusBadge().variant">
</app-status-badge>

<!-- Definition List -->
<app-definition-list
  [items]="basicInfoItems()"
  [labelWidth]="'4'"
  [valueWidth]="'8'">
</app-definition-list>

<!-- Data Table -->
<app-data-table
  [columns]="columns"
  [data]="employees()"
  [loading]="loading()"
  (rowClick)="onRowClick($event)">
</app-data-table>
```

### 4. Service Injection with inject()

```typescript
import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/api/employee.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-employee-list',
  standalone: true
})
export class EmployeeListComponent {
  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => this.employees.set(data),
      error: () => this.notificationService.error('Failed to load employees')
    });
  }
}
```

---

## 🔐 Authentication & Authorization

### Authentication Flow

```typescript
// 1. Login
authService.login(username, password).subscribe({
  next: (response) => {
    // Token stored automatically
    router.navigate(['/dashboard']);
  },
  error: (error) => {
    notificationService.error('Login failed');
  }
});

// 2. JWT Token Injection (Automatic via interceptor)
// All HTTP requests automatically include:
// Authorization: Bearer <token>
// Accept-Language: en|ar

// 3. Route Protection
const routes: Routes = [
  {
    path: 'employees',
    canActivate: [authGuard, permissionGuard],
    data: { permission: 'Employee.View' },
    loadComponent: () => import('./pages/employees/...')
  }
];

// 4. Logout
authService.logout(); // Clears token, navigates to login
```

### Permission Checking

```typescript
// In component
@if (hasPermission('Employee.Create')) {
  <button (click)="createEmployee()">Create Employee</button>
}

// In service
hasPermission(permission: string): boolean {
  const user = this.authService.currentUser();
  return user?.permissions?.includes(permission) ?? false;
}
```

---

## 🌐 Internationalization (i18n)

### Usage Pattern

```typescript
import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-employee-form',
  standalone: true
})
export class EmployeeFormComponent {
  i18n = inject(I18nService);

  // Shorthand translation
  title = this.i18n.t('employees.create');
  saveButton = this.i18n.t('common.save');

  // With parameters
  successMessage = this.i18n.t('employees.created_successfully', {
    name: employee.firstName
  });
}
```

### Translation Files

**en.json**:
```json
{
  "employees": {
    "title": "Employees",
    "create": "Create Employee",
    "first_name": "First Name"
  }
}
```

**ar.json**:
```json
{
  "employees": {
    "title": "الموظفون",
    "create": "إضافة موظف",
    "first_name": "الاسم الأول"
  }
}
```

### Language Switching

```typescript
// Change language
i18nService.changeLanguage('ar'); // or 'en'

// Automatically updates:
// - All translations
// - Text direction (LTR/RTL)
// - API Accept-Language header
```

---

## 🎯 Feature Modules

### Complete Feature List (19 Modules)

1. **Dashboard** - Main overview with statistics
2. **Employees** - Employee management (CRUD)
3. **Attendance** - Attendance tracking and records
4. **Shifts** - Shift scheduling and assignments
5. **Departments** - Department management
6. **Branches** - Branch/location management
7. **Users** - System user management
8. **Roles** - Role and permission management
9. **Vacation Types** - Leave type configuration
10. **Employee Vacations** - Leave request management
11. **Employee Excuses** - Excuse/absence management
12. **Remote Work** - Remote work requests
13. **Reports** - Various reports and analytics
14. **Settings** - System settings
15. **Auth** - Login, 2FA, password management
16. **Portal** - Employee self-service portal
17. **Not Found** - 404 error page
18. **Unauthorized** - 403 error page

### Feature Module Pattern

Each feature follows consistent structure:
```
feature-name/
├── list-{feature}/          # List view with table
├── view-{feature}/          # Detail view
├── create-{feature}/        # Create form
└── edit-{feature}/          # Edit form
```

---

## 🛠️ Development Workflow

### Running the Application

```bash
# Development server
cd time-attendance-frontend
npm install
ng serve
# Runs on http://localhost:4200

# Production build
ng build --configuration production
# Output: dist/time-attendance-frontend/browser/
```

### Creating New Features

**1. Create Component**:
```bash
ng generate component pages/employees/list-employees --standalone
```

**2. Add Route**:
```typescript
// app.routes.ts
{
  path: 'employees',
  loadComponent: () => import('./pages/employees/list-employees/list-employees.component')
    .then(m => m.ListEmployeesComponent)
}
```

**3. Implement Component**:
```typescript
import { Component, signal, inject } from '@angular/core';
import { EmployeeService } from '../../services/api/employee.service';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './list-employees.component.html'
})
export class ListEmployeesComponent {
  private employeeService = inject(EmployeeService);

  employees = signal<Employee[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading.set(true);
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees.set(data);
        this.loading.set(false);
      }
    });
  }
}
```

---

## 📝 Code Conventions

### Naming Conventions

- **Components**: `{Action}{Entity}Component` (e.g., `CreateEmployeeComponent`)
- **Services**: `{Entity}Service` (e.g., `EmployeeService`)
- **Models**: `{Entity}` interface (e.g., `Employee`)
- **Signals**: Descriptive names (e.g., `employees`, `loading`)
- **Computed**: Descriptive with suffix (e.g., `filteredEmployees`, `statusBadge`)

### File Organization

```
feature/
├── feature.component.ts     # Component logic
├── feature.component.html   # Template
└── feature.component.css    # Styles (if needed)
```

### Import Organization

```typescript
// 1. Angular imports
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// 2. Third-party imports
import { TranslateModule } from '@ngx-translate/core';

// 3. App imports - Services
import { EmployeeService } from '../../services/api/employee.service';

// 4. App imports - Components
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';

// 5. App imports - Models
import { Employee } from '../../models/employee.model';
```

---

## 🧪 Testing Standards

### Component Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees on init', () => {
    expect(component.employees().length).toBeGreaterThan(0);
  });
});
```

---

## 🚀 Performance Optimization

### 1. Lazy Loading
All routes use lazy loading with `loadComponent()`.

### 2. OnPush Change Detection
```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 3. TrackBy Functions
```html
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}
```

### 4. Signals for Fine-Grained Reactivity
Signals only update what changed, avoiding unnecessary re-renders.

---

## 📚 Additional Resources

### Internal Documentation
- **[SHARED_COMPONENTS_QUICK_REFERENCE.md](./SHARED_COMPONENTS_QUICK_REFERENCE.md)** - Complete component catalog
- **[COMPONENT_REFACTORING_DOCUMENTATION.md](./COMPONENT_REFACTORING_DOCUMENTATION.md)** - Refactoring patterns
- **[CLAUDE.md](./CLAUDE.md)** - Development guidelines
- **[Core Architecture](./docs/frontend/02-CORE-ARCHITECTURE.md)** - Detailed architecture

### External Resources
- [Angular Documentation](https://angular.dev)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3)
- [ngx-translate Documentation](https://github.com/ngx-translate/core)

---

## 🔗 Quick Links

### Documentation
- [Core Architecture](./docs/frontend/02-CORE-ARCHITECTURE.md) - Angular 17+ patterns
- [Shared Components](./SHARED_COMPONENTS_QUICK_REFERENCE.md) - Component catalog
- [Component Refactoring](./COMPONENT_REFACTORING_DOCUMENTATION.md) - Best practices
- [Backend API Documentation](./docs/backend/00-INDEX.md) - API reference

### Development
- **Frontend URL**: http://localhost:4200
- **Backend API**: http://localhost:5099/api
- **Swagger UI**: http://localhost:5099/swagger

---

## 📞 Support & Contributing

### Before Coding
1. Read [CLAUDE.md](./CLAUDE.md) for project guidelines
2. Review [Shared Components](./SHARED_COMPONENTS_QUICK_REFERENCE.md) for available components
3. Check [Component Refactoring Guide](./COMPONENT_REFACTORING_DOCUMENTATION.md) for patterns

### Code Review Checklist
- [ ] Uses shared components instead of inline HTML
- [ ] Follows signals pattern for state
- [ ] Uses @if/@for control flow syntax
- [ ] Includes i18n translations
- [ ] Properly types all variables
- [ ] No console.log statements
- [ ] Responsive design maintained

---

## 🎯 What's Documented

### Complete Coverage
✅ 25+ shared components
✅ 19 feature modules
✅ 14 core services
✅ Authentication & authorization
✅ i18n setup (English/Arabic)
✅ Routing architecture
✅ Signals-based state management
✅ HTTP communication patterns
✅ Component patterns & best practices

---

## 🚀 Getting Started

**Choose your path**:

1. **New to Angular 17?** → Read [Core Architecture](./docs/frontend/02-CORE-ARCHITECTURE.md)
2. **Building UI?** → Check [Shared Components](./SHARED_COMPONENTS_QUICK_REFERENCE.md)
3. **Refactoring code?** → See [Component Refactoring](./COMPONENT_REFACTORING_DOCUMENTATION.md)
4. **Need patterns?** → Review [CLAUDE.md](./CLAUDE.md)

---

**Happy Coding!** 🎉

---

*Last Updated: November 3, 2025*
*Documentation Version: 1.0*
*Frontend Framework: Angular 17+ with Standalone Components + Signals*
