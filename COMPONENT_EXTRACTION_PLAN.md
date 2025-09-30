# Frontend Component Extraction Plan

## Analysis Summary
After reviewing the entire frontend codebase, I've identified **15 major component extraction opportunities** that will significantly reduce code duplication and improve maintainability.

---

## **1. Modal Components** 🔴 HIGH PRIORITY

### **1.1 Base Modal Wrapper**
**Pattern Found**: 30+ modals with repetitive structure
- Modal backdrop
- Modal dialog with size variants
- Header with title and close button
- Body with content
- Footer with action buttons
- Loading states

**Files to Extract From**:
- shifts.component.html (3 modals)
- roles.component.html (permissions modal)
- public-holidays.component.html (import modal)
- assign-shifts.component.html (create/edit modals)

**Proposed Component**: `app-modal-wrapper`
```typescript
@Input() show: boolean
@Input() title: string
@Input() size: 'sm' | 'md' | 'lg' | 'xl'
@Input() showFooter: boolean = true
@Output() close = new EventEmitter()
```

### **1.2 Confirmation Modal**
**Pattern Found**: Delete confirmations repeated 15+ times
**Proposed Component**: `app-confirmation-modal`

### **1.3 Form Modal**
**Pattern Found**: Create/Edit modals with form structure
**Proposed Component**: `app-form-modal`

---

## **2. List/Table Action Patterns** 🔴 HIGH PRIORITY

### **2.1 Table Action Buttons**
**Pattern Found**: Repeated button groups in 20+ tables
- View/Edit/Delete button groups
- Permission-based visibility
- Icon + tooltip pattern
- Loading states

**Proposed Component**: `app-table-actions`
```typescript
@Input() actions: TableAction[]
@Input() item: any
@Input() loading: boolean
@Output() actionClick = new EventEmitter()
```

### **2.2 Bulk Actions Toolbar**
**Pattern Found**: Selection + bulk operations in 8+ pages
**Proposed Component**: `app-bulk-actions-toolbar`

---

## **3. Empty State Components** 🟡 MEDIUM PRIORITY

### **3.1 Empty State Display**
**Pattern Found**: 25+ empty states with similar structure
- Icon
- Message
- Optional action button
- "Clear filters" option

**Files with Pattern**:
- roles.component.html:27-35
- shifts.component.html:29-31
- vacation-types.component.html:46-47
- All list pages

**Proposed Component**: `app-empty-state`
```typescript
@Input() icon: string
@Input() title: string
@Input() message: string
@Input() actionText?: string
@Input() showClearFilters: boolean = false
@Output() action = new EventEmitter()
@Output() clearFilters = new EventEmitter()
```

---

## **4. Loading State Components** 🟡 MEDIUM PRIORITY

### **4.1 Loading Spinner**
**Pattern Found**: 40+ identical loading spinners
```html
<div class="text-center py-4">
  <div class="spinner-border text-primary">
    <span class="visually-hidden">Loading...</span>
  </div>
  <p class="mt-2 text-muted">Loading message...</p>
</div>
```

**Proposed Component**: `app-loading-spinner`

### **4.2 Skeleton Loader**
**Pattern Found**: Cards with loading states
**Proposed Component**: `app-skeleton-loader`

---

## **5. Card Components** 🟡 MEDIUM PRIORITY

### **5.1 Section Card**
**Pattern Found**: Card headers with icons (50+ instances)
```html
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">
      <i class="fa-solid fa-icon me-2"></i>
      Title
    </h5>
  </div>
  <div class="card-body">...</div>
</div>
```

**Proposed Component**: `app-section-card`

### **5.2 Info Card with Avatar**
**Pattern Found**: User/Employee info cards (10+ instances)
- Avatar circle with initials
- Primary text
- Secondary text
- Status indicators

**Files**: view-user.component.html:24-42, view-employee.component.html:24-37
**Proposed Component**: `app-info-card-with-avatar`

---

## **6. Form Field Components** 🟡 MEDIUM PRIORITY

### **6.1 Labeled Form Group**
**Pattern Found**: 200+ form fields with label + required indicator
```html
<div class="col-md-6">
  <label class="form-label">
    Label <span class="text-danger">*</span>
  </label>
  <input class="form-control" [class.is-invalid]="hasError()">
  @if (hasError()) {
    <div class="invalid-feedback">{{ error }}</div>
  }
</div>
```

**Proposed Component**: `app-form-group`

### **6.2 Date Range Picker**
**Pattern Found**: Start/End date pairs (15+ instances)
**Files**: view-employee.component.html:217-228
**Proposed Component**: `app-date-range-picker`

### **6.3 Time Range Input**
**Pattern Found**: Start/End time pairs (10+ instances)
**Proposed Component**: `app-time-range-input`

---

## **7. Badge/Status Components** 🟢 LOW PRIORITY

### **7.1 Status Badge**
**Pattern Found**: Already exists but underused
**Action**: Standardize usage across all status displays

### **7.2 Priority Badge**
**Pattern Found**: Priority indicators (5+ variants)
**Proposed Component**: `app-priority-badge`

---

## **8. List Item Components** 🟢 LOW PRIORITY

### **8.1 Definition List Item**
**Pattern Found**: dt/dd pairs in view pages (100+ instances)
**Files**: view-user.component.html:48-66, view-employee.component.html:42-88
**Proposed Component**: `app-definition-list`

### **8.2 Role/Badge List**
**Pattern Found**: Badge collections (15+ instances)
```html
<div class="d-flex flex-wrap gap-1">
  @for (item of items; track item) {
    <span class="badge">{{ item }}</span>
  }
</div>
```

**Proposed Component**: `app-badge-list`

---

## **9. Statistics/Metrics Components** 🟡 MEDIUM PRIORITY

### **9.1 Metric Row**
**Pattern Found**: Label-value rows in widgets (30+ instances)
**Files**: dashboard.component.html:182-197, view-employee.component.html:100-144
**Proposed Component**: `app-metric-row`

### **9.2 Stats Grid**
**Pattern Found**: 2x2 or 3x1 stat card grids
**Files**: view-employee.component.html:242-308, dashboard.component.html:100-125
**Proposed Component**: `app-stats-grid`

---

## **10. Permission-Based Wrappers** 🟡 MEDIUM PRIORITY

### **10.1 Permission Button**
**Pattern Found**: Buttons with permission checks (50+ instances)
**Proposed Component**: `app-permission-button`
```typescript
@Input() permission: string
@Input() variant: string
@Input() icon: string
@Input() label: string
@Input() disabled: boolean
```

---

## **11. Tab Components** 🟢 LOW PRIORITY

### **11.1 Content Tabs**
**Pattern Found**: Nav tabs with content (8+ instances)
**Files**: view-employee.component.html:331-362
**Proposed Component**: `app-content-tabs`

---

## **12. Alert/Message Components** 🟢 LOW PRIORITY

### **12.1 Error Alert**
**Pattern Found**: Error displays (20+ instances)
```html
<div class="alert alert-danger">
  <i class="fa-solid fa-exclamation-triangle me-2"></i>
  {{ error }}
  <button class="btn" (click)="retry()">Retry</button>
</div>
```

**Proposed Component**: `app-error-alert`

### **12.2 Info Alert**
**Pattern Found**: Validation rules, help text boxes (10+ instances)
**Files**: create-employee.component.html:349-362
**Proposed Component**: `app-info-alert`

---

## **13. Dropdown/Select Enhancement** 🟡 MEDIUM PRIORITY

### **13.1 Action Dropdown**
**Pattern Found**: Dropdown menus for export/actions (10+ instances)
**Files**: public-holidays.component.html:22-50
**Proposed Component**: `app-action-dropdown`

---

## **14. Pagination Component** 🟡 MEDIUM PRIORITY

### **14.1 Inline Pagination**
**Pattern Found**: Custom pagination in assign-shifts (not using app-pagination)
**Files**: assign-shifts.component.html:133-167
**Action**: Standardize to use existing pagination component or enhance it

---

## **15. Quick Actions Panel** 🟢 LOW PRIORITY

### **15.1 Action Cards**
**Pattern Found**: Quick action button groups in sidebars (5+ instances)
**Files**: view-user.component.html:142-175, view-employee.component.html:178-201
**Proposed Component**: `app-quick-actions-panel`

---

## **Implementation Priority**

### **Phase 1 - Critical (Week 1)**
1. ✅ Modal Components (Base + Confirmation + Form)
2. ✅ Empty State Component
3. ✅ Loading Spinner Component
4. ✅ Table Action Buttons

### **Phase 2 - High Value (Week 2)**
5. ✅ Form Group Component
6. ✅ Date Range Picker
7. ✅ Section Card Component
8. ✅ Metric Row Component
9. ✅ Stats Grid Component

### **Phase 3 - Enhancement (Week 3)**
10. ✅ Definition List Component
11. ✅ Badge List Component
12. ✅ Action Dropdown Component
13. ✅ Error/Info Alert Components

### **Phase 4 - Polish (Week 4)**
14. ✅ Content Tabs Component
15. ✅ Quick Actions Panel
16. ✅ Standardize existing components

---

## **Expected Benefits**

### **Code Reduction**
- Estimated **40-50%** reduction in HTML template code
- Estimated **3,000-4,000** lines of code eliminated

### **Consistency**
- Uniform UI patterns across all modules
- Centralized styling and behavior
- Easier theme customization

### **Maintainability**
- Single source of truth for common patterns
- Easier to fix bugs and add features
- Reduced testing surface

### **Developer Experience**
- Faster development of new features
- Less copy-paste errors
- Better onboarding for new developers

---

## **Next Steps**

1. Confirm priority and scope
2. Create shared component interfaces/models
3. Implement Phase 1 components
4. Refactor existing pages incrementally
5. Update component documentation