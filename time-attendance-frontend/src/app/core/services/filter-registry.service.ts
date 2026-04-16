import { Injectable, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, of } from 'rxjs';
import {
  UnifiedFilterConfig,
  FilterDefinition,
  FilterData,
  ModuleFilterRegistry,
  CommonFilterTypes
} from '../../shared/models/unified-filter.model';
import { SearchableSelectOption } from '../../shared/components/searchable-select/searchable-select.component';
import { I18nService } from '../i18n/i18n.service';
import { BranchesService } from '../../pages/branches/branches.service';
import { DepartmentsService } from '../../pages/departments/departments.service';
import { EmployeesService } from '../../pages/employees/employees.service';
import { ShiftsService } from '../../pages/shifts/shifts.service';
import { VacationTypesService } from '../../pages/vacation-types/vacation-types.service';
import { RolesService } from '../../pages/roles/roles.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilterRegistryService {
  private http = inject(HttpClient);
  private i18n = inject(I18nService);
  private branchesService = inject(BranchesService);
  private departmentsService = inject(DepartmentsService);
  private employeesService = inject(EmployeesService);
  private shiftsService = inject(ShiftsService);
  private vacationTypesService = inject(VacationTypesService);
  private rolesService = inject(RolesService);
  private authService = inject(AuthService);

  private registry: ModuleFilterRegistry = {};
  private dataCache = new BehaviorSubject<FilterData>({});
  private dataInitialized = false;

  constructor() {
    // Use effect to react to authentication changes
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated();
      if (isAuthenticated && !this.dataInitialized) {
        this.initializeCommonData();
        this.dataInitialized = true;
      } else if (!isAuthenticated) {
        // Clear cache on logout
        this.dataCache.next({});
        this.dataInitialized = false;
      }
    });
  }

  registerModule(moduleName: string, config: UnifiedFilterConfig): void {
    this.registry[moduleName] = config;
  }

  getModuleConfig(moduleName: string): UnifiedFilterConfig | null {
    return this.registry[moduleName] || null;
  }

  getAllModules(): string[] {
    return Object.keys(this.registry);
  }

  private initializeCommonData(): void {
    this.loadBranches();
    this.initShiftsData();
    this.initRolesData();
  }

  private loadBranches(): void {
    this.branchesService.getBranches(1, 1000).subscribe({
      next: (result) => {
        const currentData = this.dataCache.value;
        this.dataCache.next({
          ...currentData,
          branches: result.items
        });
      },
      error: (error) => {
        console.error('Failed to load branches for filter registry:', error);
      }
    });
  }

  loadDepartments(branchId?: number): Observable<any[]> {
    return this.departmentsService.getDepartments(branchId ? { branchId } : {}).pipe(
      map(departments => {
        const currentData = this.dataCache.value;
        const cacheKey = branchId ? `departments_${branchId}` : 'departments_all';
        this.dataCache.next({
          ...currentData,
          [cacheKey]: departments
        });
        return departments;
      })
    );
  }

  loadEmployees(branchId?: number): Observable<any[]> {
    return this.employeesService.getEmployeesForSelection(branchId).pipe(
      map(employees => {
        const currentData = this.dataCache.value;
        const cacheKey = branchId ? `employees_${branchId}` : 'employees_all';
        this.dataCache.next({
          ...currentData,
          [cacheKey]: employees
        });
        return employees;
      })
    );
  }

  loadShifts(branchId?: number): Observable<any[]> {
    return this.shiftsService.getShifts(1, 1000).pipe(
      map(response => {
        const shifts = response.items || [];
        const currentData = this.dataCache.value;
        const cacheKey = branchId ? `shifts_${branchId}` : 'shifts_all';
        this.dataCache.next({
          ...currentData,
          [cacheKey]: shifts,
          shifts: shifts
        });
        return shifts;
      })
    );
  }

  private initShiftsData(): void {
    this.loadShifts().subscribe({
      error: (error) => {
        console.error('Failed to load shifts for filter registry:', error);
      }
    });
  }

  loadVacationTypes(branchId?: number): Observable<any[]> {
    return this.vacationTypesService.getVacationTypes({ branchId }).pipe(
      map(response => {
        const vacationTypes = response.items || [];
        const currentData = this.dataCache.value;
        const cacheKey = branchId ? `vacationTypes_${branchId}` : 'vacationTypes_all';
        this.dataCache.next({
          ...currentData,
          [cacheKey]: vacationTypes,
          vacationTypes: vacationTypes
        });
        return vacationTypes;
      })
    );
  }

  loadRoles(): Observable<any[]> {
    return this.rolesService.getRoles().pipe(
      map(roles => {
        const currentData = this.dataCache.value;
        this.dataCache.next({
          ...currentData,
          roles: roles
        });
        return roles;
      })
    );
  }

  private initRolesData(): void {
    this.loadRoles().subscribe({
      error: (error) => {
        console.error('Failed to load roles for filter registry:', error);
      }
    });
  }


  getCachedData(): Observable<FilterData> {
    return this.dataCache.asObservable();
  }

  buildFilterOptions(filterDef: FilterDefinition, cachedData: FilterData, currentFilters?: any): SearchableSelectOption[] {
    const allOption: SearchableSelectOption = {
      value: '',
      label: this.i18n.t('common.all')
    };

    switch (filterDef.type) {
      case CommonFilterTypes.Branch:
        return [
          allOption,
          ...(cachedData.branches || []).map(branch => ({
            value: branch.id.toString(),
            label: branch.name,
            subLabel: branch.code
          }))
        ];

      case CommonFilterTypes.Department:
        const branchIdForDepts = filterDef.dependsOn && currentFilters ? currentFilters[filterDef.dependsOn] : null;
        const departmentKey = branchIdForDepts ?
          `departments_${branchIdForDepts}` : 'departments_all';
        return [
          allOption,
          ...(cachedData[departmentKey] || []).map((dept: any) => ({
            value: dept.id.toString(),
            label: dept.name,
            subLabel: dept.nameAr
          }))
        ];

      case CommonFilterTypes.Employee:
        const branchIdForEmps = filterDef.dependsOn && currentFilters ? currentFilters[filterDef.dependsOn] : null;
        const employeeKey = branchIdForEmps ?
          `employees_${branchIdForEmps}` : 'employees_all';
        return [
          allOption,
          ...(cachedData[employeeKey] || []).map((emp: any) => ({
            value: emp.id.toString(),
            label: emp.name,
            subLabel: emp.employeeNumber
          }))
        ];

      case CommonFilterTypes.Status:
        if (filterDef.statusEnum && filterDef.statusLabels) {
          return [
            allOption,
            ...Object.keys(filterDef.statusEnum)
              .filter(key => isNaN(Number(key))) // Filter out numeric keys for enum
              .map(key => ({
                value: filterDef.statusEnum![key],
                label: this.i18n.t(filterDef.statusLabels![key] || key)
              }))
          ];
        }
        return [allOption];

      case CommonFilterTypes.Shift:
        const shiftKey = filterDef.dependsOn ?
          `shifts_${cachedData[filterDef.dependsOn]}` : 'shifts_all';
        return [
          allOption,
          ...(cachedData[shiftKey] || cachedData.shifts || []).map((shift: any) => ({
            value: shift.id.toString(),
            label: shift.name,
            subLabel: shift.description || shift.shiftType
          }))
        ];

      case CommonFilterTypes.VacationType:
        const vacationTypeKey = filterDef.dependsOn ?
          `vacationTypes_${cachedData[filterDef.dependsOn]}` : 'vacationTypes_all';
        return [
          allOption,
          ...(cachedData[vacationTypeKey] || cachedData.vacationTypes || []).map((vacationType: any) => ({
            value: vacationType.id.toString(),
            label: vacationType.name,
            subLabel: vacationType.nameAr
          }))
        ];

      case CommonFilterTypes.Role:
        return [
          allOption,
          ...(cachedData.roles || []).map((role: any) => ({
            value: role.id.toString(),
            label: role.name,
            subLabel: role.type
          }))
        ];

      case CommonFilterTypes.Custom:
        return filterDef.options?.map(option => ({
          ...option,
          label: this.i18n.t(option.label)
        })) || [allOption];

      default:
        return [allOption];
    }
  }

  buildActiveInactiveOptions(): SearchableSelectOption[] {
    return [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'true', label: this.i18n.t('common.active') },
      { value: 'false', label: this.i18n.t('common.inactive') }
    ];
  }

  clearCache(): void {
    this.dataCache.next({});
    
    if (this.authService.isAuthenticated()) {
      this.initializeCommonData();
    }
  }
}
