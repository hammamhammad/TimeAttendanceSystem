import { Component, signal, inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { BranchesService } from '../../branches/branches.service';
import { BranchDto } from '../../../shared/models/employee.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';

type ViewMode = 'table' | 'tree';

@Component({
  selector: 'app-department-filters',
  standalone: true,
  imports: [
    CommonModule,
    HasPermissionDirective,
    SearchableSelectComponent
  ],
  templateUrl: './department-filters.component.html',
  styleUrls: ['./department-filters.component.css']
})
export class DepartmentFiltersComponent implements OnInit {
  public i18n = inject(I18nService);
  private branchesService = inject(BranchesService);
  public permissionService = inject(PermissionService);

  @Input() viewMode: ViewMode = 'table';
  @Input() selectedBranch: BranchDto | null = null;
  @Input() branchesLoading = false;

  @Output() viewModeChange = new EventEmitter<ViewMode>();
  @Output() branchSelectionChange = new EventEmitter<string>();
  @Output() departmentAdd = new EventEmitter<void>();

  branches = signal<BranchDto[]>([]);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    DEPARTMENT_CREATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.CREATE}`
  };

  // Branch options for searchable select
  get branchSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.selectBranch') }
    ];

    this.branches().forEach(branch => {
      options.push({
        value: branch.id.toString(),
        label: `${branch.name} (${branch.code})`
      });
    });

    return options;
  }

  ngOnInit() {
    this.loadBranches();
  }

  private loadBranches() {
    this.branchesService.getBranchesForDropdown().subscribe({
      next: (branches) => {
        const branchDtos: BranchDto[] = branches.map(branch => ({
          id: branch.id,
          name: branch.name,
          code: branch.code,
          location: undefined,
          isActive: branch.isActive
        }));

        this.branches.set(branchDtos);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
      }
    });
  }

  onViewModeChange(mode: ViewMode) {
    this.viewModeChange.emit(mode);
  }

  onBranchSelectionChange(branchIdStr: string) {
    this.branchSelectionChange.emit(branchIdStr);
  }

  onDepartmentAdd() {
    this.departmentAdd.emit();
  }
}