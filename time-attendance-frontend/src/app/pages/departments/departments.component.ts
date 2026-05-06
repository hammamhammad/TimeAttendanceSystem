import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { DepartmentsService } from './departments.service';
import { DepartmentDto } from '../../shared/models/department.model';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { DepartmentTableComponent } from './department-table/department-table.component';

interface DepartmentFilterState {
  search?: string;
  branchId?: number | string;
  isActive?: 'true' | 'false' | '';
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    UnifiedFilterComponent,
    PageHeaderComponent,
    DepartmentTableComponent
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);
  private departmentsService = inject(DepartmentsService);
  private confirmationService = inject(ConfirmationService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  readonly PERMISSIONS = {
    DEPARTMENT_CREATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.CREATE}`,
    DEPARTMENT_READ: `${PermissionResources.DEPARTMENT}.${PermissionActions.READ}`,
    DEPARTMENT_UPDATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.UPDATE}`,
    DEPARTMENT_DELETE: `${PermissionResources.DEPARTMENT}.${PermissionActions.DELETE}`,
    DEPARTMENT_MANAGE: `${PermissionResources.DEPARTMENT}.${PermissionActions.MANAGE}`
  };

  loading = signal(false);
  allDepartments = signal<DepartmentDto[]>([]);
  departments = signal<DepartmentDto[]>([]);

  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  totalPages = signal(0);

  sortColumn = signal<string>('path');
  sortDirection = signal<'asc' | 'desc'>('asc');

  private currentFilter: DepartmentFilterState = {};

  ngOnInit(): void {
    this.loadDepartments();
  }

  private loadDepartments(): void {
    this.loading.set(true);
    const branchId = this.parseBranchId(this.currentFilter.branchId);

    this.departmentsService.getDepartments({
      branchId,
      includeTree: false,
      includeInactive: true
    }).subscribe({
      next: (list) => {
        this.allDepartments.set(list || []);
        this.applyFiltersAndSort();
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load departments:', err);
        this.loading.set(false);
        this.notificationService.error(
          this.i18n.t('app.error'),
          this.i18n.t('errors.server')
        );
      }
    });
  }

  private applyFiltersAndSort(): void {
    let list = [...this.allDepartments()];

    const search = (this.currentFilter.search || '').trim().toLowerCase();
    if (search) {
      list = list.filter(d =>
        d.name.toLowerCase().includes(search) ||
        d.code.toLowerCase().includes(search) ||
        (d.nameAr && d.nameAr.toLowerCase().includes(search)) ||
        (d.path && d.path.toLowerCase().includes(search)) ||
        (d.parentDepartmentName && d.parentDepartmentName.toLowerCase().includes(search)) ||
        (d.managerName && d.managerName.toLowerCase().includes(search)) ||
        (d.branchName && d.branchName.toLowerCase().includes(search))
      );
    }

    const isActive = this.currentFilter.isActive;
    if (isActive === 'true') list = list.filter(d => d.isActive);
    else if (isActive === 'false') list = list.filter(d => !d.isActive);

    const col = this.sortColumn();
    const dir = this.sortDirection();
    list.sort((a, b) => this.compareRows(a, b, col, dir));

    this.totalCount.set(list.length);
    this.totalPages.set(Math.max(1, Math.ceil(list.length / this.pageSize())));
    if (this.currentPage() > this.totalPages()) {
      this.currentPage.set(1);
    }
    this.departments.set(list);
  }

  private compareRows(a: DepartmentDto, b: DepartmentDto, col: string, dir: 'asc' | 'desc'): number {
    const av = this.resolveSortValue(a, col);
    const bv = this.resolveSortValue(b, col);

    if (av == null && bv == null) return 0;
    if (av == null) return dir === 'asc' ? 1 : -1;
    if (bv == null) return dir === 'asc' ? -1 : 1;

    let cmp = 0;
    if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
    else if (typeof av === 'boolean' && typeof bv === 'boolean') cmp = (av === bv) ? 0 : av ? -1 : 1;
    else cmp = String(av).localeCompare(String(bv));

    return dir === 'asc' ? cmp : -cmp;
  }

  private resolveSortValue(d: DepartmentDto, col: string): any {
    switch (col) {
      case 'department': return d.name;
      case 'parent': return d.parentDepartmentName ?? '';
      case 'manager': return d.managerName ?? '';
      case 'status': return d.isActive;
      default: return (d as any)[col];
    }
  }

  private parseBranchId(value: number | string | undefined): number | undefined {
    if (value === null || value === undefined || value === '') return undefined;
    const n = typeof value === 'number' ? value : parseInt(value, 10);
    return Number.isFinite(n) && n > 0 ? n : undefined;
  }

  onSearchChange(searchTerm: string): void {
    this.currentFilter = { ...this.currentFilter, search: searchTerm };
    this.currentPage.set(1);
    this.applyFiltersAndSort();
  }

  onFiltersChange(filters: any): void {
    const next: DepartmentFilterState = {
      search: this.currentFilter.search,
      branchId: filters?.branchId,
      isActive: filters?.isActive
    };
    const branchChanged = this.parseBranchId(this.currentFilter.branchId) !== this.parseBranchId(next.branchId);
    this.currentFilter = next;
    this.currentPage.set(1);

    if (branchChanged) {
      this.loadDepartments();
    } else {
      this.applyFiltersAndSort();
    }
  }

  onRefreshData(): void {
    this.currentFilter = {};
    this.currentPage.set(1);
    this.sortColumn.set('path');
    this.sortDirection.set('asc');
    this.loadDepartments();
  }

  onAddDepartment(): void {
    this.router.navigate(['/departments/create']);
  }

  onDepartmentView(department: DepartmentDto): void {
    this.router.navigate(['/departments', department.id, 'view']);
  }

  onDepartmentEdit(department: DepartmentDto): void {
    this.router.navigate(['/departments', department.id, 'edit']);
  }

  async onDepartmentDelete(department: DepartmentDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('common.delete'),
      message: this.i18n.t('department.confirmDelete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (!result.confirmed) return;

    this.departmentsService.deleteDepartment(department.id).subscribe({
      next: () => {
        this.notificationService.success(
          this.i18n.t('app.success'),
          this.i18n.t('common.deleted')
        );
        this.loadDepartments();
      },
      error: (err) => {
        console.error('Failed to delete department:', err);
        this.notificationService.error(
          this.i18n.t('app.error'),
          this.i18n.t('errors.server')
        );
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.applyFiltersAndSort();
  }

  onSortChange(event: { column: string; direction: 'asc' | 'desc' }): void {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
    this.applyFiltersAndSort();
  }

  onSelectionChange(_selected: DepartmentDto[]): void {
    // Reserved for bulk-action wiring
  }
}
