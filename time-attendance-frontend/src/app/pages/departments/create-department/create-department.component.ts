import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { Department, DepartmentDto, CreateDepartmentRequest, UpdateDepartmentRequest } from '../../../shared/models/department.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [CommonModule, RouterModule, DepartmentFormComponent],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('department.create') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/departments">{{ i18n.t('departments.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('department.create') }}</li>
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
            [externalSaving]="saving()"
            (save)="onDepartmentCreated($event)"
            (cancel)="onCancel()">
          </app-department-form>
        </div>
      </div>
    </div>
  `
})
export class CreateDepartmentComponent {
  private router = inject(Router);
  private departmentsService = inject(DepartmentsService);
  public i18n = inject(I18nService);

  saving = signal(false);
  error = signal('');

  onDepartmentCreated(department: CreateDepartmentRequest | UpdateDepartmentRequest): void {
    if (this.saving()) return;

    this.saving.set(true);
    this.error.set('');

    const createRequest = department as CreateDepartmentRequest;

    this.departmentsService.createDepartment(createRequest).subscribe({
      next: (response) => {
        console.log('Department created successfully:', response);
        this.saving.set(false);
        this.router.navigate(['/departments']);
      },
      error: (error) => {
        console.error('Error creating department:', error);
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