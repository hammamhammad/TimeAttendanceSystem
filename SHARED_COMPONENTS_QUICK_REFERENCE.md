# Shared Components Quick Reference Guide

## Table of Contents
1. [Layout Components](#layout-components)
2. [Display Components](#display-components)
3. [Form Components](#form-components)
4. [Feedback Components](#feedback-components)
5. [Data Display Components](#data-display-components)
6. [Modal Components](#modal-components)
7. [Navigation Components](#navigation-components)

---

## Layout Components

### 1. PageHeaderComponent
**Purpose**: Consistent page headers with title and optional subtitle

```html
<app-page-header
  [title]="t('page.title')"
  [subtitle]="t('page.subtitle')">
</app-page-header>
```

### 2. FormHeaderComponent
**Purpose**: Form page headers with navigation and actions

```html
<app-form-header
  mode="create"
  [title]="t('entity.create')"
  moduleName="entities"
  moduleRoute="entities"
  [entityId]="entityId"
  [loading]="loading()">
</app-form-header>
```

**Modes**: `'create' | 'edit' | 'view'`

### 3. FormSectionComponent
**Purpose**: Logical grouping of form fields with title

```html
<app-form-section
  [title]="t('section.basic_info')"
  [icon]="'fas fa-info-circle'">
  <!-- Form fields here -->
</app-form-section>
```

### 4. SectionCardComponent
**Purpose**: Card with header and icon

```html
<app-section-card
  [title]="t('section.title')"
  [icon]="'fas fa-cog'"
  [collapsible]="false">
  <!-- Content here -->
</app-section-card>
```

---

## Display Components

### 5. StatusBadgeComponent ⭐
**Purpose**: Display status badges with consistent styling

```html
<!-- Simple status -->
<app-status-badge
  [status]="statusBadge().label"
  [variant]="statusBadge().variant">
</app-status-badge>

<!-- With icon -->
<app-status-badge
  [label]="'Active'"
  [variant]="'success'"
  [icon]="'fas fa-check'"
  [showIcon]="true">
</app-status-badge>

<!-- Different sizes -->
<app-status-badge
  [status]="'Pending'"
  [variant]="'warning'"
  [size]="'sm'">
</app-status-badge>
```

**Variants**: `'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' | 'light' | 'dark'`
**Sizes**: `'sm' | 'md' | 'lg'`

**TypeScript Pattern**:
```typescript
statusBadge = computed(() => ({
  label: this.entity()?.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
  variant: this.entity()?.isActive ? 'success' : 'secondary'
}));
```

### 6. BadgeListComponent ⭐
**Purpose**: Display collections of badges

```html
<app-badge-list
  [items]="roleBadges()"
  [gap]="'sm'"
  [emptyMessage]="t('users.no_roles')">
</app-badge-list>
```

**TypeScript Pattern**:
```typescript
roleBadges = computed<BadgeItem[]>(() => {
  const user = this.user();
  if (!user?.roles || user.roles.length === 0) return [];

  return user.roles.map((role, index) => ({
    id: index,
    label: this.getRoleName(role),
    variant: 'info' as const
  }));
});
```

### 7. DefinitionListComponent ⭐
**Purpose**: Display label-value pairs

```html
<!-- Single column -->
<app-definition-list
  [items]="basicInfoItems()"
  [labelWidth]="'4'"
  [valueWidth]="'8'">
</app-definition-list>

<!-- Two column layout -->
<app-definition-list
  [items]="items()"
  [labelWidth]="'5'"
  [valueWidth]="'7'"
  layout="two-column">
</app-definition-list>
```

**TypeScript Pattern**:
```typescript
basicInfoItems = computed<DefinitionItem[]>(() => {
  const entity = this.entity();
  if (!entity) return [];

  return [
    { label: this.t('entity.name'), value: entity.name },
    { label: this.t('entity.email'), value: entity.email || '-' },
    {
      label: this.t('common.status'),
      value: this.statusBadge().label,
      type: 'badge' as const,
      badgeVariant: this.statusBadge().variant
    },
    {
      label: this.t('entity.created_at'),
      value: entity.createdAtUtc,
      type: 'date' as const,
      dateFormat: 'medium'
    }
  ];
});
```

**Item Types**: `'text' | 'badge' | 'date' | 'html'`

### 8. DetailCardComponent
**Purpose**: Display detailed information in cards

```html
<app-detail-card
  [title]="t('details.title')"
  [icon]="'fas fa-info'"
  [data]="detailData()">
</app-detail-card>
```

### 9. StatCardComponent
**Purpose**: Display statistics with icon

```html
<app-stat-card
  [title]="t('stats.total_users')"
  [value]="'1,234'"
  [icon]="'fas fa-users'"
  [variant]="'primary'"
  [trend]="'+12%'"
  [trendUp]="true">
</app-stat-card>
```

### 10. StatsGridComponent
**Purpose**: Grid layout for multiple stat cards

```html
<app-stats-grid
  [stats]="statsData()"
  [columns]="4"
  [loading]="loading()">
</app-stats-grid>
```

### 11. MetricRowComponent
**Purpose**: Display label-value metric rows

```html
<app-metric-row
  [label]="t('metrics.attendance_rate')"
  [value]="'95%'"
  [icon]="'fas fa-percentage'"
  [variant]="'success'">
</app-metric-row>
```

---

## Form Components

### 12. FormGroupComponent
**Purpose**: Consistent form field wrapper with label and validation

```html
<app-form-group
  [label]="t('form.username')"
  [required]="true"
  [error]="hasError('username') ? getError('username') : null"
  [hint]="t('form.username_hint')">
  <input
    type="text"
    class="form-control"
    formControlName="username"
    [class.is-invalid]="hasError('username')">
</app-form-group>
```

### 13. DateRangePickerComponent
**Purpose**: Select date ranges

```html
<app-date-range-picker
  [startDate]="startDate()"
  [endDate]="endDate()"
  (rangeChange)="onDateRangeChange($event)">
</app-date-range-picker>
```

### 14. TimeRangeInputComponent
**Purpose**: Select time ranges

```html
<app-time-range-input
  [startTime]="startTime()"
  [endTime]="endTime()"
  (rangeChange)="onTimeRangeChange($event)">
</app-time-range-input>
```

### 15. SearchableSelectComponent
**Purpose**: Searchable dropdown for large lists

```html
<app-searchable-select
  [items]="employees()"
  [placeholder]="t('form.select_employee')"
  [displayKey]="'fullName'"
  [valueKey]="'id'"
  [(ngModel)]="selectedEmployeeId"
  (selectionChange)="onEmployeeSelected($event)">
</app-searchable-select>
```

### 16. SearchFilterComponent
**Purpose**: Search input with clear button

```html
<app-search-filter
  [placeholder]="t('common.search')"
  [(ngModel)]="searchTerm"
  (search)="onSearch($event)">
</app-search-filter>
```

### 17. UnifiedFilterComponent
**Purpose**: Combined search and filter controls

```html
<app-unified-filter
  [filters]="filterConfig()"
  (filterChange)="onFilterChange($event)">
</app-unified-filter>
```

---

## Feedback Components

### 18. LoadingSpinnerComponent
**Purpose**: Display loading states

```html
<!-- Simple -->
<app-loading-spinner></app-loading-spinner>

<!-- With message -->
<app-loading-spinner
  [message]="t('common.loading')"
  [variant]="'primary'"
  [centered]="true">
</app-loading-spinner>

<!-- Different sizes -->
<app-loading-spinner
  [size]="'lg'"
  [variant]="'success'">
</app-loading-spinner>
```

**Variants**: `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'`
**Sizes**: `'sm' | 'md' | 'lg'`

### 19. EmptyStateComponent
**Purpose**: Display when no data is available

```html
<app-empty-state
  [icon]="'fas fa-inbox'"
  [title]="t('common.no_data')"
  [message]="t('common.no_data_description')"
  [actionText]="t('common.add_new')"
  [showClearFilters]="hasFilters()"
  (action)="onCreate()"
  (clearFilters)="onClearFilters()">
</app-empty-state>
```

### 20. ErrorAlertComponent
**Purpose**: Display error messages

```html
<app-error-alert
  [message]="error()"
  [title]="t('common.error')"
  [showRetry]="true"
  (retry)="onRetry()"
  (dismiss)="onDismiss()">
</app-error-alert>
```

### 21. InfoAlertComponent
**Purpose**: Display informational messages

```html
<app-info-alert
  [message]="t('info.message')"
  [title]="t('info.title')"
  [variant]="'info'"
  [dismissible]="true"
  (dismiss)="onDismiss()">
</app-info-alert>
```

**Variants**: `'info' | 'warning' | 'success'`

---

## Data Display Components

### 22. DataTableComponent
**Purpose**: Display data in tables with sorting, pagination, and actions

```html
<app-data-table
  [columns]="columns"
  [data]="data()"
  [loading]="loading()"
  [totalItems]="totalItems()"
  [pageSize]="pageSize()"
  [currentPage]="currentPage()"
  [sortable]="true"
  (pageChange)="onPageChange($event)"
  (sortChange)="onSortChange($event)"
  (rowClick)="onRowClick($event)">
</app-data-table>
```

**Column Configuration**:
```typescript
columns: TableColumn[] = [
  { key: 'id', label: this.i18n.t('common.id'), sortable: true },
  { key: 'name', label: this.i18n.t('common.name'), sortable: true },
  {
    key: 'status',
    label: this.i18n.t('common.status'),
    format: (row: any) => this.formatStatusForTable(row.status)
  },
  {
    key: 'actions',
    label: this.i18n.t('common.actions'),
    format: (row: any) => this.formatActions(row)
  }
];
```

### 23. TableActionsComponent
**Purpose**: Action buttons for table rows

```html
<app-table-actions
  [actions]="tableActions"
  [item]="row"
  [loading]="loading()"
  (actionClick)="onActionClick($event)">
</app-table-actions>
```

**Actions Configuration**:
```typescript
tableActions: TableActionItem[] = [
  {
    id: 'view',
    label: this.i18n.t('common.view'),
    icon: 'fas fa-eye',
    variant: 'info',
    permission: 'entity.read'
  },
  {
    id: 'edit',
    label: this.i18n.t('common.edit'),
    icon: 'fas fa-edit',
    variant: 'warning',
    permission: 'entity.update'
  },
  {
    id: 'delete',
    label: this.i18n.t('common.delete'),
    icon: 'fas fa-trash',
    variant: 'danger',
    permission: 'entity.delete'
  }
];
```

### 24. BulkActionsToolbarComponent
**Purpose**: Toolbar for bulk operations

```html
<app-bulk-actions-toolbar
  [selectedCount]="selectedItems().length"
  [actions]="bulkActions"
  [loading]="bulkLoading()"
  (actionClick)="onBulkAction($event)"
  (clearSelection)="onClearSelection()">
</app-bulk-actions-toolbar>
```

### 25. PaginationComponent
**Purpose**: Page navigation

```html
<app-pagination
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [totalItems]="totalItems()"
  [pageSize]="pageSize()"
  (pageChange)="onPageChange($event)">
</app-pagination>
```

---

## Modal Components

### 26. ModalWrapperComponent
**Purpose**: Base modal with consistent structure

```html
<app-modal-wrapper
  [show]="showModal()"
  [title]="t('modal.title')"
  [size]="'lg'"
  [showFooter]="true"
  (close)="onClose()">
  <!-- Modal body -->
  <div body>
    <p>Modal content here</p>
  </div>

  <!-- Modal footer -->
  <div footer>
    <button class="btn btn-secondary" (click)="onClose()">
      {{ t('common.cancel') }}
    </button>
    <button class="btn btn-primary" (click)="onSave()">
      {{ t('common.save') }}
    </button>
  </div>
</app-modal-wrapper>
```

**Sizes**: `'sm' | 'md' | 'lg' | 'xl'`

### 27. ConfirmationModalComponent
**Purpose**: Confirmation dialogs

```html
<app-confirmation-modal
  [show]="showConfirmation()"
  [title]="t('common.confirm')"
  [message]="t('confirm.delete_message')"
  [confirmText]="t('common.delete')"
  [cancelText]="t('common.cancel')"
  [confirmVariant]="'danger'"
  (confirm)="onConfirm()"
  (cancel)="onCancel()">
</app-confirmation-modal>
```

---

## Navigation Components

### 28. ContentTabsComponent
**Purpose**: Tabbed content sections

```html
<app-content-tabs
  [tabs]="tabs"
  [activeTab]="activeTab()"
  (tabChange)="onTabChange($event)">
  <!-- Tab content goes here -->
</app-content-tabs>
```

**Tab Configuration**:
```typescript
tabs = [
  { id: 'overview', label: this.i18n.t('tabs.overview'), icon: 'fas fa-chart-pie' },
  { id: 'details', label: this.i18n.t('tabs.details'), icon: 'fas fa-info' },
  { id: 'history', label: this.i18n.t('tabs.history'), icon: 'fas fa-history' }
];
```

### 29. ActionDropdownComponent
**Purpose**: Dropdown menu for actions

```html
<app-action-dropdown
  [label]="t('common.actions')"
  [icon]="'fas fa-ellipsis-v'"
  [actions]="dropdownActions"
  (actionClick)="onActionClick($event)">
</app-action-dropdown>
```

### 30. QuickActionsPanelComponent
**Purpose**: Quick action buttons in sidebars

```html
<app-quick-actions-panel
  [actions]="quickActions"
  [loading]="loading()"
  (actionClick)="onActionClick($event)">
</app-quick-actions-panel>
```

---

## Common Patterns

### Pattern 1: View Page with Status Badge and Definition List
```typescript
import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { BadgeListComponent, BadgeItem } from '../../../shared/components/badge-list/badge-list.component';

@Component({
  selector: 'app-view-entity',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent,
    DefinitionListComponent,
    BadgeListComponent
  ],
  templateUrl: './view-entity.component.html'
})
export class ViewEntityComponent {
  entity = signal<Entity | null>(null);

  statusBadge = computed(() => ({
    label: this.entity()?.isActive ? 'Active' : 'Inactive',
    variant: this.entity()?.isActive ? 'success' : 'secondary'
  }));

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const entity = this.entity();
    if (!entity) return [];

    return [
      { label: 'Name', value: entity.name },
      { label: 'Email', value: entity.email },
      {
        label: 'Status',
        value: this.statusBadge().label,
        type: 'badge',
        badgeVariant: this.statusBadge().variant
      }
    ];
  });
}
```

### Pattern 2: List Page with DataTable and Actions
```typescript
columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status', format: (row) => this.formatStatus(row) },
  { key: 'actions', label: 'Actions', format: (row) => this.formatActions(row) }
];

tableActions: TableActionItem[] = [
  { id: 'view', label: 'View', icon: 'fas fa-eye', variant: 'info' },
  { id: 'edit', label: 'Edit', icon: 'fas fa-edit', variant: 'warning' },
  { id: 'delete', label: 'Delete', icon: 'fas fa-trash', variant: 'danger' }
];
```

### Pattern 3: Form Page with Validation
```html
<app-form-header
  mode="create"
  [title]="t('entity.create')"
  moduleName="entities"
  moduleRoute="entities">
</app-form-header>

<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <app-form-section [title]="t('section.basic_info')">
    <div class="row">
      <div class="col-md-6">
        <app-form-group
          [label]="t('form.name')"
          [required]="true"
          [error]="getError('name')">
          <input
            type="text"
            class="form-control"
            formControlName="name"
            [class.is-invalid]="hasError('name')">
        </app-form-group>
      </div>
    </div>
  </app-form-section>
</form>
```

---

## Import Shortcuts

### Essential Imports for View Pages:
```typescript
import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { BadgeListComponent, BadgeItem } from '../../../shared/components/badge-list/badge-list.component';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
```

### Essential Imports for List Pages:
```typescript
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { TableActionsComponent, TableActionItem } from '../../../shared/components/table-actions/table-actions.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { SearchFilterComponent } from '../../../shared/components/search-filter/search-filter.component';
```

### Essential Imports for Form Pages:
```typescript
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroupComponent } from '../../../shared/components/form-group/form-group.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { SearchableSelectComponent } from '../../../shared/components/searchable-select/searchable-select.component';
```

---

## Quick Tips

1. **Always use computed properties** for reactive badge configuration
2. **Use type: 'badge'** in DefinitionItem for embedded badges
3. **Use HTML injection** for DataTable badges, not component usage
4. **Maintain backward compatibility** when refactoring
5. **Test responsive behavior** after adding new components
6. **Follow the established patterns** in existing components
7. **Use i18n** for all user-facing text
8. **Check permissions** before rendering action buttons
9. **Provide empty states** for all lists
10. **Show loading states** during async operations

---

**For detailed documentation, see**: `COMPONENT_REFACTORING_DOCUMENTATION.md`
**Last Updated**: September 30, 2025