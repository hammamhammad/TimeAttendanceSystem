// Barrel file for easy component imports
// Usage: import { ModalWrapperComponent, EmptyStateComponent } from '@shared/components';

// Phase 1 - Critical Components
export * from './modal-wrapper/modal-wrapper.component';
export * from './confirmation-modal/confirmation-modal.component';
export * from './empty-state/empty-state.component';
export * from './loading-spinner/loading-spinner.component';
export { TableActionsComponent } from './table-actions/table-actions.component';
export type { TableActionItem } from './table-actions/table-actions.component';

// Phase 2 - High Value Components
export * from './form-group/form-group.component';
export * from './date-range-picker/date-range-picker.component';
export * from './section-card/section-card.component';
export * from './metric-row/metric-row.component';
export * from './stats-grid/stats-grid.component';

// Phase 3 - Enhancement Components
export * from './definition-list/definition-list.component';
export * from './badge-list/badge-list.component';
export * from './action-dropdown/action-dropdown.component';
export * from './error-alert/error-alert.component';
export * from './info-alert/info-alert.component';

// Phase 4 - Polish Components
export * from './content-tabs/content-tabs.component';
export * from './quick-actions-panel/quick-actions-panel.component';
export * from './time-range-input/time-range-input.component';
export * from './bulk-actions-toolbar/bulk-actions-toolbar.component';

// Existing Components
export { DataTableComponent } from './data-table/data-table.component';
export type { TableColumn, TableAction, SortEvent } from './data-table/data-table.component';
export * from './detail-card/detail-card.component';
export * from './stat-card/stat-card.component';
export * from './status-badge/status-badge.component';
export * from './page-header/page-header.component';
export * from './form-section/form-section.component';
export * from './form-header/form-header.component';
export * from './searchable-select/searchable-select.component';
export * from './unified-filter/unified-filter.component';
export * from './search-filter/search-filter.component';
export * from './pagination/pagination.component';