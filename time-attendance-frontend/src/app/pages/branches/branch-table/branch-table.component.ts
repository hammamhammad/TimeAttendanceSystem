import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { Branch } from '../../../shared/models/branch.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-branch-table',
  standalone: true,
  imports: [CommonModule, DataTableComponent, StatusBadgeComponent],
  template: `
    <app-data-table
      [data]="branches"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [emptyMessage]="'No branches found'"
      (actionClick)="onActionClick($event)"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (selectionChange)="onSelectionChange($event)"
      (sortChange)="onSortChange($event)">

      <ng-template #cellTemplate let-branch let-column="column">
        <ng-container [ngSwitch]="column.key">
          <!-- Branch info -->
          <div *ngSwitchCase="'branch'" class="d-flex align-items-center">
            <div class="avatar-sm me-2">
              <div class="avatar-initial bg-info text-white rounded-circle">
                {{ branch.code.charAt(0).toUpperCase() }}
              </div>
            </div>
            <div>
              <div class="fw-medium">{{ branch.name }}</div>
              <small class="text-muted">{{ branch.code }}</small>
            </div>
          </div>

          <!-- Timezone -->
          <div *ngSwitchCase="'timezone'">
            <div>{{ branch.timeZone }}</div>
            <small class="text-muted">{{ getTimezoneDisplay(branch.timeZone) }}</small>
          </div>

          <!-- Status -->
          <span *ngSwitchCase="'status'">
            <app-status-badge
              [status]="branch.isActive ? 'active' : 'inactive'"
              [label]="branch.isActive ? 'Active' : 'Inactive'"
              [showIcon]="true">
            </app-status-badge>
          </span>

          <!-- Employee count -->
          <span *ngSwitchCase="'employeeCount'">
            <app-status-badge
              [status]="'primary'"
              [label]="(branch.employeeCount || 0).toString()">
            </app-status-badge>
          </span>

          <!-- Created date -->
          <span *ngSwitchCase="'created'">
            {{ formatDate(branch.createdAt) }}
          </span>

          <!-- Last updated -->
          <span *ngSwitchCase="'updated'">
            {{ formatDate(branch.updatedAt) }}
          </span>
        </ng-container>
      </ng-template>
    </app-data-table>
  `,
  styles: [`
    .avatar-sm {
      width: 2rem;
      height: 2rem;
    }

    .avatar-initial {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 0.875rem;
      font-weight: 600;
    }
  `]
})
export class BranchTableComponent {
  private i18n = inject(I18nService);
  private permissionService = inject(PermissionService);

  @Input() branches: Branch[] = [];
  @Input() loading = signal(false);
  @Input() currentPage = signal(1);
  @Input() totalPages = signal(1);
  @Input() totalItems = signal(0);
  @Input() pageSize = signal(10);

  @Output() viewBranch = new EventEmitter<Branch>();
  @Output() editBranch = new EventEmitter<Branch>();
  @Output() deleteBranch = new EventEmitter<Branch>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<Branch[]>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  columns: TableColumn[] = [
    { key: 'branch', label: 'Branch', width: '250px', sortable: true },
    { key: 'timezone', label: 'Timezone', width: '200px', sortable: true },
    { key: 'employeeCount', label: 'Employees', width: '100px', align: 'center', sortable: true },
    { key: 'status', label: 'Status', width: '100px', align: 'center', sortable: true },
    { key: 'created', label: 'Created', width: '120px', sortable: true },
    { key: 'updated', label: 'Updated', width: '120px', sortable: true }
  ];

  get actions(): TableAction[] {
    const actions: TableAction[] = [];

    if (this.permissionService.has(`${PermissionResources.BRANCH}.${PermissionActions.READ}`)) {
      actions.push({
        key: 'view',
        label: 'View',
        icon: 'fa-eye',
        color: 'info'
      });
    }

    if (this.permissionService.has(`${PermissionResources.BRANCH}.${PermissionActions.UPDATE}`)) {
      actions.push({
        key: 'edit',
        label: 'Edit',
        icon: 'fa-edit',
        color: 'primary'
      });
    }

    if (this.permissionService.has(`${PermissionResources.BRANCH}.${PermissionActions.DELETE}`)) {
      actions.push({
        key: 'delete',
        label: 'Delete',
        icon: 'fa-trash',
        color: 'danger'
      });
    }

    return actions;
  }

  onActionClick(event: {action: string, item: Branch}) {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.viewBranch.emit(item);
        break;
      case 'edit':
        this.editBranch.emit(item);
        break;
      case 'delete':
        this.deleteBranch.emit(item);
        break;
    }
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
  }

  onSelectionChange(selectedBranches: Branch[]) {
    this.selectionChange.emit(selectedBranches);
  }

  onSortChange(sortEvent: {column: string, direction: 'asc' | 'desc'}) {
    this.sortChange.emit(sortEvent);
  }

  getTimezoneDisplay(timeZone: string): string {
    // Simple timezone display - in a real app, you'd use a timezone library
    const date = new Date();
    try {
      return date.toLocaleTimeString('en-US', {
        timeZone: timeZone,
        timeZoneName: 'short',
        hour12: false
      }).split(' ')[1] || '';
    } catch (error) {
      return timeZone;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}