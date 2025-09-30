# Development Guidelines for Time Attendance System

## General Development Rules

### Project Structure
- Understand the project structure and follow this structure before implementing any new feature
- Split the new components into three files (ts, html, css)
- Follow the established folder organization patterns

### Development Workflow
- Always give me the plan for implementation, then wait for me to confirm
- Compile the project and confirm no compilation errors before going to the next step
- Test features thoroughly before considering them complete

### Backend Development
- Use Coravel package for all background jobs
- Always drop the DB and create it from the models and seed data (development only)
- When applying database migrations, ensure that all existing data in the database is preserved
- Always run the backend on http://localhost:5099

### Frontend Development
- Always run the frontend on http://localhost:4200
- Always use the new Angular template syntax `@if` / `@for` instead of legacy structural directives (`*ngIf`, `*ngFor`)
- Follow Angular 17+ standalone component patterns

---

## Frontend Component Standards

### Required Services
- Always use `NotificationService` for user notifications (success, error, warning, info)
- Always use `ConfirmationService` for confirmation dialogs (delete, submit, etc.)

### Data Display Standards
- Always use `DataTableComponent` for tables in the frontend
- Use `EmptyStateComponent` when no data is available
- Use `LoadingSpinnerComponent` for loading states

### Shared Component Usage (IMPORTANT)

#### View Pages
When creating view/detail pages, **always use**:
- `StatusBadgeComponent` for all status displays
- `DefinitionListComponent` for label-value pairs (instead of manual dt/dd)
- `BadgeListComponent` for collections of badges
- `FormHeaderComponent` for page headers with navigation
- `DetailCardComponent` for information cards

**Required Pattern**:
```typescript
import { Component, signal, inject, computed } from '@angular/core';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { BadgeListComponent, BadgeItem } from '../../../shared/components/badge-list/badge-list.component';

// Always use computed properties for reactive badge configuration
statusBadge = computed(() => ({
  label: this.entity()?.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
  variant: this.entity()?.isActive ? 'success' : 'secondary'
}));
```

#### List Pages
When creating list pages, **always use**:
- `DataTableComponent` for the main table
- `TableActionsComponent` for row actions (view, edit, delete)
- `SearchFilterComponent` or `UnifiedFilterComponent` for filtering
- `BulkActionsToolbarComponent` for bulk operations
- `PaginationComponent` for pagination
- `EmptyStateComponent` for empty states

#### Form Pages
When creating form pages, **always use**:
- `FormHeaderComponent` for page header
- `FormSectionComponent` for logical grouping of fields
- `FormGroupComponent` for individual form fields with labels and validation
- `SearchableSelectComponent` for dropdowns with search
- `DateRangePickerComponent` for date ranges
- `TimeRangeInputComponent` for time ranges

### Modal Standards
- Use `ModalWrapperComponent` for all custom modals
- Use `ConfirmationModalComponent` for confirmation dialogs (via `ConfirmationService`)

### Badge and Status Display Rules
- **NEVER** use inline `<span class="badge">` - always use `StatusBadgeComponent`
- **NEVER** create manual badge HTML - use shared components
- **NEVER** use manual dt/dd lists - always use `DefinitionListComponent`
- For DataTable columns, use HTML injection pattern (documented exception)

**❌ Bad - Don't do this**:
```html
<span [class]="getStatusBadgeClass(entity.isActive)">
  {{ getStatusText(entity.isActive) }}
</span>

<dl class="row">
  <dt class="col-sm-4">Name</dt>
  <dd class="col-sm-8">{{ entity.name }}</dd>
</dl>
```

**✅ Good - Do this**:
```html
<app-status-badge
  [status]="statusBadge().label"
  [variant]="statusBadge().variant">
</app-status-badge>

<app-definition-list
  [items]="basicInfoItems()"
  [labelWidth]="'4'"
  [valueWidth]="'8'">
</app-definition-list>
```

---

## Code Quality Standards

### TypeScript Standards
- Use signals for reactive state: `signal()`, `computed()`
- Use dependency injection with `inject()` function
- Maintain type safety - avoid `any` type when possible
- Use interfaces for complex objects

### Template Standards
- Use `@if` and `@for` syntax (Angular 17+)
- Use signal accessors with `()`
- Maintain consistent indentation
- Use i18n service for all user-facing text: `i18n.t('key')`

### Styling Standards
- Use Bootstrap 5 utility classes
- Follow established spacing patterns
- Maintain responsive design (mobile-first)
- Use CSS files for component-specific styles

---

## Documentation Requirements

### When Creating New Features
1. Follow patterns in `SHARED_COMPONENTS_QUICK_REFERENCE.md`
2. Reference `COMPONENT_REFACTORING_DOCUMENTATION.md` for best practices
3. Check `DOCUMENTATION_INDEX.md` for related documentation

### When Refactoring
1. Use computed properties for reactive data
2. Replace inline patterns with shared components
3. Maintain backward compatibility when possible
4. Test thoroughly after refactoring

---

## Testing Standards

### Before Committing Code
- [ ] Compile with no TypeScript errors
- [ ] All computed properties update correctly
- [ ] Shared components render properly
- [ ] i18n translations work correctly
- [ ] No visual regressions
- [ ] Responsive behavior maintained
- [ ] Loading states work correctly
- [ ] Error handling works correctly

### Build Verification
- Run `ng build` to verify production build
- Check bundle sizes haven't increased significantly
- Verify no console errors in development mode

---

## Reference Documentation

### Essential Reading
- **Quick Reference**: `SHARED_COMPONENTS_QUICK_REFERENCE.md` - Component usage guide
- **Refactoring Guide**: `COMPONENT_REFACTORING_DOCUMENTATION.md` - Patterns and best practices
- **Documentation Index**: `DOCUMENTATION_INDEX.md` - Master index of all docs

### Component Documentation
All shared components are documented in `SHARED_COMPONENTS_QUICK_REFERENCE.md` with:
- Usage examples
- Input/Output parameters
- TypeScript patterns
- HTML examples
- Common use cases

### Architecture Documentation
- `PROJECT_ARCHITECTURE.md` - System architecture overview
- `COMPONENT_EXTRACTION_PLAN.md` - Component strategy and rationale
- `API_DOCUMENTATION.md` - Backend API reference

---

## Common Patterns

### Creating a New View Page
1. Import required components: `StatusBadgeComponent`, `DefinitionListComponent`, `BadgeListComponent`
2. Create signal for entity: `entity = signal<Entity | null>(null)`
3. Create computed properties for badges: `statusBadge = computed(() => ({ ... }))`
4. Create computed properties for definition lists: `basicInfoItems = computed(() => [...])`
5. Use components in template instead of inline HTML

### Creating a New List Page
1. Import: `DataTableComponent`, `TableActionsComponent`, `EmptyStateComponent`
2. Define table columns with `TableColumn[]` interface
3. Define table actions with `TableActionItem[]` interface
4. Handle pagination, sorting, and filtering
5. Use `EmptyStateComponent` for no data states

### Creating a New Form
1. Import form components: `FormHeaderComponent`, `FormSectionComponent`, `FormGroupComponent`
2. Use `ReactiveFormsModule` for form handling
3. Group related fields in `FormSectionComponent`
4. Use `FormGroupComponent` for each field with validation
5. Use appropriate input components (`SearchableSelectComponent`, `DateRangePickerComponent`, etc.)

---

## Important Notes

### Component Usage is Mandatory
- Using shared components is **not optional** - it's required for consistency
- All new features must follow established patterns
- Refactor existing code to use shared components when modifying it

### Performance Considerations
- Shared components are optimized and tested
- Using them ensures consistent performance
- Computed properties are efficient with Angular signals

### Maintenance Benefits
- Centralized component logic reduces bugs
- Consistent UI patterns improve UX
- Easier to update styling across the application
- Reduced code duplication

---

## Getting Help

### Can't Find a Component?
- Check `SHARED_COMPONENTS_QUICK_REFERENCE.md` for complete catalog
- Search the `shared/components` directory
- Ask team members for guidance

### Unsure About a Pattern?
- Review `COMPONENT_REFACTORING_DOCUMENTATION.md` for examples
- Look at recently refactored components (view-user, view-vacation-type, edit-attendance)
- Check `DOCUMENTATION_INDEX.md` for related documentation

### Need to Create New Shared Component?
- Review `COMPONENT_EXTRACTION_PLAN.md` for component design principles
- Follow established component structure (separate ts/html/css files)
- Document the new component in `SHARED_COMPONENTS_QUICK_REFERENCE.md`

---

**Last Updated**: September 30, 2025
**Version**: 2.0 - Added comprehensive component usage guidelines