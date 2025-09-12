import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { EmployeesService } from '../employees.service';
import { EmployeeDto, Gender, EmploymentStatus, WorkLocationType } from '../../../shared/models/employee.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterLink, HasPermissionDirective],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeesService = inject(EmployeesService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  error = signal<string | null>(null);
  employee = signal<EmployeeDto | null>(null);
  employeeId: number = 0;

  // Permission constants for use in template
  readonly PERMISSIONS = {
    EMPLOYEE_UPDATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`,
    EMPLOYEE_DELETE: `${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`,
    EMPLOYEE_MANAGE: `${PermissionResources.EMPLOYEE}.${PermissionActions.MANAGE}`
  };

  ngOnInit() {
    this.employeeId = +this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.loadEmployee();
    } else {
      this.router.navigate(['/employees']);
    }
  }

  private loadEmployee() {
    this.loading.set(true);
    this.employeesService.getEmployeeById(this.employeeId).subscribe({
      next: (employee) => {
        this.employee.set(employee);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load employee');
        this.loading.set(false);
        console.error('Error loading employee:', error);
      }
    });
  }

  onEdit() {
    this.router.navigate(['/employees', this.employeeId, 'edit']);
  }

  onBack() {
    this.router.navigate(['/employees']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getEmploymentStatusLabel(status: EmploymentStatus): string {
    return this.t(`employees.employment_status.${EmploymentStatus[status].toLowerCase()}`);
  }

  getGenderLabel(gender: Gender): string {
    return this.t(`employees.gender.${Gender[gender].toLowerCase()}`);
  }

  getWorkLocationTypeLabel(type: WorkLocationType): string {
    return this.t(`employees.work_location.${WorkLocationType[type].toLowerCase()}`);
  }

  t(key: string): string {
    return this.i18n.t(key);
  }
}