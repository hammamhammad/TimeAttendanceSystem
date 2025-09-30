import { Component, signal, inject, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { DepartmentsService } from '../departments.service';
import { DepartmentDto } from '../../../shared/models/department.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

interface SortConfig {
  column: keyof DepartmentDto;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-department-table',
  standalone: true,
  imports: [CommonModule, FormsModule, HasPermissionDirective, StatusBadgeComponent, LoadingSpinnerComponent],
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit, OnChanges {
  @Input() selectedBranchId?: number;
  @Input() allowSelection = true;
  @Input() allowEdit = true;
  @Input() allowDelete = true;
  @Input() showControls = true;
  @Output() departmentSelected = new EventEmitter<DepartmentDto>();
  @Output() departmentView = new EventEmitter<DepartmentDto>();
  @Output() departmentEdit = new EventEmitter<DepartmentDto>();
  @Output() departmentDelete = new EventEmitter<DepartmentDto>();
  @Output() departmentAdd = new EventEmitter<void>();

  public i18n = inject(I18nService);
  private departmentsService = inject(DepartmentsService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    DEPARTMENT_CREATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.CREATE}`,
    DEPARTMENT_READ: `${PermissionResources.DEPARTMENT}.${PermissionActions.READ}`,
    DEPARTMENT_UPDATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.UPDATE}`,
    DEPARTMENT_DELETE: `${PermissionResources.DEPARTMENT}.${PermissionActions.DELETE}`
  };

  // Signals
  loading = signal(false);
  departments = signal<DepartmentDto[]>([]);
  filteredDepartments = signal<DepartmentDto[]>([]);
  selectedDepartments = signal<Set<number>>(new Set());
  sortConfig = signal<SortConfig>({ column: 'name', direction: 'asc' });
  searchTerm = signal('');
  showInactive = signal(false);
  
  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  
  // View options
  showHierarchy = signal(false);
  pageSizeOptions = [5, 10, 25, 50, 100];

  ngOnInit() {
    console.log('DepartmentTableComponent ngOnInit - selectedBranchId:', this.selectedBranchId);
    this.loadDepartments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('DepartmentTableComponent ngOnChanges:', changes);
    if (changes['selectedBranchId']) {
      console.log('selectedBranchId changed from', changes['selectedBranchId'].previousValue, 'to', changes['selectedBranchId'].currentValue);
      this.loadDepartments();
    }
  }

  loadDepartments() {
    console.log('loadDepartments called - selectedBranchId:', this.selectedBranchId);
    this.loading.set(true);

    console.log('Making departments API call with params:', {
      branchId: this.selectedBranchId,
      includeTree: false,
      includeInactive: this.showInactive()
    });

    this.departmentsService.getDepartments({
      branchId: this.selectedBranchId,
      includeTree: false,
      includeInactive: this.showInactive()
    }).subscribe({
      next: (departments) => {
        console.log('Departments API response:', departments);
        if (departments) {
          this.departments.set(departments);
          this.applyFiltersAndSort();
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load departments:', error);
        this.loading.set(false);
      }
    });
  }

  applyFiltersAndSort() {
    let filtered = [...this.departments()];
    
    // Apply search filter
    const searchTerm = this.searchTerm().toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(dept => 
        dept.name.toLowerCase().includes(searchTerm) ||
        dept.code.toLowerCase().includes(searchTerm) ||
        (dept.nameAr && dept.nameAr.toLowerCase().includes(searchTerm)) ||
        (dept.description && dept.description.toLowerCase().includes(searchTerm)) ||
        (dept.costCenter && dept.costCenter.toLowerCase().includes(searchTerm)) ||
        dept.path.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply active filter
    if (!this.showInactive()) {
      filtered = filtered.filter(dept => dept.isActive);
    }
    
    // Apply sorting
    const sort = this.sortConfig();
    filtered.sort((a, b) => {
      const aVal = a[sort.column];
      const bVal = b[sort.column];
      
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sort.direction === 'asc' ? 1 : -1;
      if (bVal == null) return sort.direction === 'asc' ? -1 : 1;
      
      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }
      
      return sort.direction === 'asc' ? comparison : -comparison;
    });
    
    this.filteredDepartments.set(filtered);
    this.updatePagination();
  }

  updatePagination() {
    const total = this.filteredDepartments().length;
    const pages = Math.ceil(total / this.pageSize());
    this.totalPages.set(pages);
    
    // Adjust current page if necessary
    if (this.currentPage() > pages && pages > 0) {
      this.currentPage.set(pages);
    }
  }

  getPaginatedDepartments(): DepartmentDto[] {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredDepartments().slice(start, end);
  }

  onSort(column: keyof DepartmentDto) {
    const currentSort = this.sortConfig();
    const direction = currentSort.column === column && currentSort.direction === 'asc' 
      ? 'desc' 
      : 'asc';
    
    this.sortConfig.set({ column, direction });
    this.applyFiltersAndSort();
  }

  getSortIcon(column: keyof DepartmentDto): string {
    const sort = this.sortConfig();
    if (sort.column !== column) return 'fas fa-sort';
    return sort.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  }

  onSearchChange(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
    this.applyFiltersAndSort();
  }

  onShowInactiveChange(show: boolean) {
    this.showInactive.set(show);
    this.currentPage.set(1);
    this.loadDepartments();
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.updatePagination();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, -1, total);
      } else if (current >= total - 3) {
        pages.push(1, -1, total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }
    
    return pages;
  }

  selectDepartment(dept: DepartmentDto) {
    if (!this.allowSelection) return;
    this.departmentSelected.emit(dept);
  }

  toggleSelection(deptId: number) {
    const selected = this.selectedDepartments();
    if (selected.has(deptId)) {
      selected.delete(deptId);
    } else {
      selected.add(deptId);
    }
    this.selectedDepartments.set(new Set(selected));
  }

  toggleAllSelection() {
    const selected = this.selectedDepartments();
    const paginated = this.getPaginatedDepartments();
    
    if (this.isAllPageSelected()) {
      paginated.forEach(dept => selected.delete(dept.id));
    } else {
      paginated.forEach(dept => selected.add(dept.id));
    }
    
    this.selectedDepartments.set(new Set(selected));
  }

  isSelected(deptId: number): boolean {
    return this.selectedDepartments().has(deptId);
  }

  isAllPageSelected(): boolean {
    const paginated = this.getPaginatedDepartments();
    return paginated.length > 0 && paginated.every(dept => this.isSelected(dept.id));
  }

  isSomePageSelected(): boolean {
    const paginated = this.getPaginatedDepartments();
    return paginated.some(dept => this.isSelected(dept.id)) && !this.isAllPageSelected();
  }

  onAddDepartment() {
    this.departmentAdd.emit();
  }

  onViewDepartment(dept: DepartmentDto) {
    this.departmentView.emit(dept);
  }

  onEditDepartment(dept: DepartmentDto) {
    this.departmentEdit.emit(dept);
  }

  onDeleteDepartment(dept: DepartmentDto) {
    this.departmentDelete.emit(dept);
  }

  onBulkDelete() {
    const selected = this.selectedDepartments();
    const departments = this.departments().filter(dept => selected.has(dept.id));
    // Emit bulk delete event or handle individually
    departments.forEach(dept => this.departmentDelete.emit(dept));
  }

  clearSelection() {
    this.selectedDepartments.set(new Set());
  }

  refresh() {
    this.loadDepartments();
  }

  getIndentClass(level: number): string {
    return `indent-${Math.min(level, 5)}`;
  }

  trackByDeptId(index: number, dept: DepartmentDto): number {
    return dept.id;
  }

  // Expose Math for template usage
  Math = Math;
}