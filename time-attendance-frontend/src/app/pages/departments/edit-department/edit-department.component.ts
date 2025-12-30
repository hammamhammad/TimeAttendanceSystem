import { Component, OnInit, signal, inject } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { DepartmentsService } from '../departments.service';
import { Department, DepartmentDto, CreateDepartmentRequest, UpdateDepartmentRequest } from '../../../shared/models/department.model';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [RouterModule, DepartmentFormComponent],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('department.edit') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/departments">{{ i18n.t('departments.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('department.edit') }}</li>
            </ol>
          </nav>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-secondary"
          (click)="onCancel()">
          <i class="fa-solid fa-arrow-left me-2"></i>
          {{ i18n.t('common.back') }}
        </button>
      </div>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (department()) {
        @if (error()) {
          <div class="alert alert-danger">
            <i class="fa-solid fa-exclamation-triangle me-2"></i>
            {{ error() }}
          </div>
        }

        <!-- Main Form Card -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="fa-solid fa-building me-2"></i>
              {{ i18n.t('department.information') }}
            </h5>
          </div>
          <div class="card-body">
            <app-department-form
              [department]="department()"
              [branchId]="department()?.branchId || null"
              [isEditMode]="true"
              [externalSaving]="saving()"
              (save)="onDepartmentSaved($event)"
              (cancel)="onCancel()">
            </app-department-form>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('department.not_found') }}
        </div>
      }
    </div>
  `
})
export class EditDepartmentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private departmentsService = inject(DepartmentsService);
  public i18n = inject(I18nService);

  department = signal<Department | null>(null);
  loading = signal(true);
  saving = signal(false);
  error = signal('');

  ngOnInit(): void {
    const departmentId = this.route.snapshot.paramMap.get('id');
    if (departmentId) {
      this.loadDepartment(departmentId);
    } else {
      this.error.set('Invalid department ID');
      this.loading.set(false);
    }
  }

  loadDepartment(departmentId: string): void {
    this.departmentsService.getDepartmentById(+departmentId).subscribe({
      next: (department) => {
        this.department.set(department);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }
    });
  }

  onDepartmentSaved(department: CreateDepartmentRequest | UpdateDepartmentRequest): void {
    if (this.saving() || !this.department()) return;

    this.saving.set(true);
    this.error.set('');

    const departmentId = this.department()!.id;
    const updateRequest = department as UpdateDepartmentRequest;

    this.departmentsService.updateDepartment(departmentId, updateRequest).subscribe({
      next: () => {
        console.log('Department updated successfully');
        this.saving.set(false);
        this.router.navigate(['/departments']);
      },
      error: (error) => {
        console.error('Error updating department:', error);
        this.error.set(this.getErrorMessage(error));
        this.saving.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/departments']);
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t('errors.unknown');
  }
}