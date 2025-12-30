import { Component, OnInit, signal, inject, computed } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { WorkflowsService } from '../workflows.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { WorkflowDefinition, WorkflowEntityType } from '../../../../shared/models/workflow.model';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    PageHeaderComponent
],
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit {
  private workflowsService = inject(WorkflowsService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants
  readonly PERMISSIONS = {
    WORKFLOW_CREATE: 'workflow.create',
    WORKFLOW_READ: 'workflow.read',
    WORKFLOW_UPDATE: 'workflow.update',
    WORKFLOW_DELETE: 'workflow.delete'
  };

  // Signals for state management
  loading = signal(false);
  workflows = signal<WorkflowDefinition[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  // Filter signals
  selectedEntityType = signal<WorkflowEntityType | undefined>(undefined);
  selectedActiveStatus = signal<boolean | undefined>(undefined);

  // Entity types for filter dropdown
  entityTypes = this.workflowsService.getEntityTypes();

  // Data table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'name',
      label: this.t('workflows.name'),
      sortable: true,
      width: '200px',
      priority: 'high',
      mobileLabel: this.t('workflows.name')
    },
    {
      key: 'entityTypeDisplay',
      label: this.t('workflows.entity_type'),
      sortable: false,
      width: '150px',
      priority: 'high',
      mobileLabel: this.t('workflows.entity_type'),
      renderHtml: true
    },
    {
      key: 'scope',
      label: this.t('workflows.scope'),
      sortable: false,
      width: '150px',
      priority: 'medium',
      mobileLabel: this.t('workflows.scope'),
      renderHtml: true
    },
    {
      key: 'stepsCount',
      label: this.t('workflows.steps_count'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('workflows.steps_count')
    },
    {
      key: 'isDefault',
      label: this.t('workflows.default'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('workflows.default'),
      renderHtml: true
    },
    {
      key: 'status',
      label: this.t('common.status'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.t('common.status'),
      renderHtml: true
    },
    {
      key: 'createdAt',
      label: this.t('common.created'),
      sortable: true,
      width: '150px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('common.created')
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'view',
      label: this.t('common.view'),
      icon: 'fa-eye',
      color: 'primary',
      condition: () => this.permissionService.has(this.PERMISSIONS.WORKFLOW_READ)
    },
    {
      key: 'edit',
      label: this.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: () => this.permissionService.has(this.PERMISSIONS.WORKFLOW_UPDATE)
    },
    {
      key: 'toggle',
      label: this.t('workflows.toggle_status'),
      icon: 'fa-toggle-on',
      color: 'warning',
      condition: () => this.permissionService.has(this.PERMISSIONS.WORKFLOW_UPDATE)
    },
    {
      key: 'delete',
      label: this.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: () => this.permissionService.has(this.PERMISSIONS.WORKFLOW_DELETE)
    }
  ]);

  // Transform workflows data for data table
  tableData = computed(() => {
    return this.workflows().map(workflow => ({
      ...workflow,
      entityTypeDisplay: this.formatEntityType(workflow.entityType),
      scope: this.formatScope(workflow),
      stepsCount: workflow.steps?.length || 0,
      isDefault: this.formatBoolean(workflow.isDefault),
      status: this.formatStatus(workflow),
      createdAt: this.formatDate(workflow.createdAtUtc)
    }));
  });

  ngOnInit(): void {
    this.loadWorkflows();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadWorkflows(): void {
    this.loading.set(true);

    this.workflowsService.getWorkflowDefinitions(
      this.currentPage(),
      this.pageSize(),
      this.selectedEntityType(),
      undefined, // branchId
      this.selectedActiveStatus()
    ).subscribe({
      next: (response) => {
        if (response && response.items) {
          this.workflows.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
        } else {
          this.workflows.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load workflows:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.t('app.error'),
          this.t('workflows.load_error')
        );
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatEntityType(entityType: WorkflowEntityType): string {
    const displayName = this.workflowsService.getEntityTypeDisplayName(entityType);
    return `<span class="badge bg-primary">${displayName}</span>`;
  }

  formatScope(workflow: WorkflowDefinition): string {
    const scopeText = workflow.branchId === null || workflow.branchId === undefined
      ? this.t('workflows.organization_wide')
      : (workflow.branchName || `Branch ${workflow.branchId}`);
    const badgeClass = workflow.branchId === null || workflow.branchId === undefined
      ? 'badge bg-success'
      : 'badge bg-info';
    return `<span class="${badgeClass}">${scopeText}</span>`;
  }

  formatBoolean(value: boolean): string {
    const text = value ? this.t('common.yes') : this.t('common.no');
    const badgeClass = value ? 'badge bg-success' : 'badge bg-secondary';
    return `<span class="${badgeClass}">${text}</span>`;
  }

  formatStatus(workflow: WorkflowDefinition): string {
    const statusText = workflow.isActive ? this.t('common.active') : this.t('common.inactive');
    const badgeClass = workflow.isActive ? 'badge bg-success' : 'badge bg-light text-dark border';
    return `<span class="${badgeClass}">${statusText}</span>`;
  }

  // Data table action handler
  onActionClick(event: { action: string, item: WorkflowDefinition }): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.onViewWorkflow(item);
        break;
      case 'edit':
        this.onEditWorkflow(item);
        break;
      case 'toggle':
        this.onToggleStatus(item);
        break;
      case 'delete':
        this.onDeleteWorkflow(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  // Pagination handlers
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadWorkflows();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadWorkflows();
  }

  // Filter handlers
  onEntityTypeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedEntityType.set(value ? value as WorkflowEntityType : undefined);
    this.currentPage.set(1);
    this.loadWorkflows();
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedActiveStatus.set(value === 'true' ? true : value === 'false' ? false : undefined);
    this.currentPage.set(1);
    this.loadWorkflows();
  }

  onClearFilters(): void {
    this.selectedEntityType.set(undefined);
    this.selectedActiveStatus.set(undefined);
    this.currentPage.set(1);
    this.loadWorkflows();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.selectedEntityType() !== undefined ||
      this.selectedActiveStatus() !== undefined
    );
  }

  // Workflow CRUD operations
  onCreateWorkflow(): void {
    this.router.navigate(['/settings/workflows/create']);
  }

  onViewWorkflow(workflow: WorkflowDefinition): void {
    this.router.navigate(['/settings/workflows', workflow.id, 'view']);
  }

  onEditWorkflow(workflow: WorkflowDefinition): void {
    this.router.navigate(['/settings/workflows', workflow.id, 'edit']);
  }

  async onToggleStatus(workflow: WorkflowDefinition): Promise<void> {
    const action = workflow.isActive ? 'deactivate' : 'activate';
    const result = await this.confirmationService.confirm({
      title: this.t(`workflows.${action}_title`),
      message: this.t(`workflows.confirm_${action}`),
      confirmText: this.t(`workflows.${action}`),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: workflow.isActive ? 'btn-warning' : 'btn-success',
      icon: 'fa-toggle-on',
      iconClass: workflow.isActive ? 'text-warning' : 'text-success'
    });

    if (result.confirmed) {
      const observable = workflow.isActive
        ? this.workflowsService.deactivateWorkflowDefinition(workflow.id)
        : this.workflowsService.activateWorkflowDefinition(workflow.id);

      observable.subscribe({
        next: () => {
          this.loadWorkflows();
          this.notificationService.success(
            this.t('app.success'),
            this.t(`workflows.${action}_success`)
          );
        },
        error: (error) => {
          console.error(`Failed to ${action} workflow:`, error);
          this.notificationService.error(
            this.t('app.error'),
            this.t(`workflows.${action}_error`)
          );
        }
      });
    }
  }

  async onDeleteWorkflow(workflow: WorkflowDefinition): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('workflows.delete_title'),
      message: this.t('workflows.confirm_delete'),
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.workflowsService.deleteWorkflowDefinition(workflow.id).subscribe({
        next: () => {
          this.loadWorkflows();
          this.notificationService.success(
            this.t('app.success'),
            this.t('workflows.delete_success')
          );
        },
        error: (error) => {
          console.error('Failed to delete workflow:', error);
          this.notificationService.error(
            this.t('app.error'),
            this.t('workflows.delete_error')
          );
        }
      });
    }
  }
}
