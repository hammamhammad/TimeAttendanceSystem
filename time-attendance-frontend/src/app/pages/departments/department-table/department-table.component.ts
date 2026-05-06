import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';

import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { DepartmentDto } from '../../../shared/models/department.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-department-table',
  standalone: true,
  imports: [DataTableComponent, StatusBadgeComponent],
  template: `
    <app-data-table
      [data]="departments"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [paginated]="true"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [emptyMessage]="i18n.t('department.noDepartments')"
      (actionClick)="onActionClick($event)"
      (pageChange)="pageChange.emit($event)"
      (pageSizeChange)="pageSizeChange.emit($event)"
      (selectionChange)="selectionChange.emit($event)"
      (sortChange)="sortChange.emit($event)">

      <ng-template #cellTemplate let-dept let-column="column">
        @switch (column.key) {

          @case ('department') {
            <div class="dept-cell" [style.padding-inline-start.px]="(dept.level || 0) * 18">
              <div class="d-flex align-items-center">
                @if (dept.level > 0) {
                  <span class="dept-tree-marker" aria-hidden="true">
                    <i class="fas fa-level-up-alt fa-rotate-90"></i>
                  </span>
                }
                <i class="fas fa-building text-primary me-2"></i>
                <div class="flex-grow-1 min-width-0">
                  <div class="fw-medium text-truncate">{{ dept.name }}</div>
                  @if (dept.nameAr) {
                    <small class="text-muted d-block text-truncate">{{ dept.nameAr }}</small>
                  }
                </div>
              </div>
            </div>
          }

          @case ('code') {
            <app-status-badge [status]="'secondary'" [label]="dept.code"></app-status-badge>
          }

          @case ('branchName') {
            @if (dept.branchName) {
              <span>{{ dept.branchName }}</span>
            } @else {
              <span class="text-muted">-</span>
            }
          }

          @case ('parent') {
            @if (dept.parentDepartmentName) {
              <div class="d-flex align-items-center">
                <i class="fas fa-sitemap text-muted me-2"></i>
                <span>{{ dept.parentDepartmentName }}</span>
              </div>
            } @else {
              <span class="badge-root">{{ i18n.t('department.root_department') }}</span>
            }
          }

          @case ('path') {
            <small class="text-muted">{{ dept.path }}</small>
          }

          @case ('manager') {
            @if (dept.managerName) {
              <div class="d-flex align-items-center">
                <i class="fas fa-user-tie text-secondary me-2"></i>
                <span>{{ dept.managerName }}</span>
              </div>
            } @else {
              <span class="text-muted">-</span>
            }
          }

          @case ('employeeCount') {
            <app-status-badge
              [status]="dept.employeeCount > 0 ? 'success' : 'secondary'"
              [label]="(dept.employeeCount || 0).toString()">
            </app-status-badge>
          }

          @case ('status') {
            <app-status-badge
              [status]="dept.isActive ? 'active' : 'inactive'"
              [label]="dept.isActive ? i18n.t('common.active') : i18n.t('common.inactive')"
              [showIcon]="true">
            </app-status-badge>
          }
        }
      </ng-template>
    </app-data-table>
  `,
  styles: [`
    .dept-cell { display: flex; align-items: center; min-width: 0; }
    .dept-tree-marker {
      color: var(--app-gray-400, #98A2B3);
      font-size: 11px;
      margin-inline-end: 6px;
      display: inline-flex;
      align-items: center;
    }
    .min-width-0 { min-width: 0; }
    .badge-root {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      background: var(--app-gray-100, #F2F4F7);
      color: var(--app-gray-600, #475467);
      font-size: 11px;
      font-weight: 500;
    }
  `]
})
export class DepartmentTableComponent implements OnInit {
  i18n = inject(I18nService);
  private permissionService = inject(PermissionService);

  @Input() departments: DepartmentDto[] = [];
  @Input() loading: any = signal(false);
  @Input() currentPage: any = signal(1);
  @Input() totalPages: any = signal(1);
  @Input() totalItems: any = signal(0);
  @Input() pageSize: any = signal(10);

  @Output() viewDepartment = new EventEmitter<DepartmentDto>();
  @Output() editDepartment = new EventEmitter<DepartmentDto>();
  @Output() deleteDepartment = new EventEmitter<DepartmentDto>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<DepartmentDto[]>();
  @Output() sortChange = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

  columns: TableColumn[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'department', label: this.i18n.t('department.name'), width: '220px', sortable: true, filterField: 'name', priority: 'high' },
      { key: 'code', label: this.i18n.t('department.code'), width: '110px', sortable: true, type: 'code', priority: 'high' },
      { key: 'branchName', label: this.i18n.t('common.branch'), width: '140px', sortable: true, filterType: 'reference', priority: 'medium' },
      { key: 'parent', label: this.i18n.t('department.parentDepartment'), width: '160px', sortable: true, filterField: 'parentDepartmentName', filterType: 'reference', emptyValueLabel: this.i18n.t('department.root_department'), priority: 'medium' },
      { key: 'path', label: this.i18n.t('department.path'), width: '200px', sortable: true, hideOnMobile: true, priority: 'low' },
      { key: 'manager', label: this.i18n.t('department.manager'), width: '160px', sortable: true, filterField: 'managerName', filterType: 'reference', priority: 'medium' },
      { key: 'employeeCount', label: this.i18n.t('common.employees'), width: '110px', align: 'center', sortable: true, filterType: 'number', priority: 'high' },
      { key: 'status', label: this.i18n.t('common.status'), width: '110px', align: 'center', sortable: true, filterField: 'isActive', filterType: 'boolean', priority: 'high' }
    ];
  }

  get actions(): TableAction[] {
    const actions: TableAction[] = [];

    if (this.permissionService.has(`${PermissionResources.DEPARTMENT}.${PermissionActions.READ}`)) {
      actions.push({ key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' });
    }
    if (this.permissionService.has(`${PermissionResources.DEPARTMENT}.${PermissionActions.UPDATE}`)) {
      actions.push({ key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' });
    }
    if (this.permissionService.has(`${PermissionResources.DEPARTMENT}.${PermissionActions.DELETE}`)) {
      actions.push({
        key: 'delete',
        label: this.i18n.t('common.delete'),
        icon: 'fa-trash',
        color: 'danger',
        condition: (d: DepartmentDto) => (d.employeeCount || 0) === 0 && !d.hasChildren
      });
    }

    return actions;
  }

  onActionClick(event: { action: string; item: DepartmentDto }): void {
    switch (event.action) {
      case 'view': this.viewDepartment.emit(event.item); break;
      case 'edit': this.editDepartment.emit(event.item); break;
      case 'delete': this.deleteDepartment.emit(event.item); break;
    }
  }
}
