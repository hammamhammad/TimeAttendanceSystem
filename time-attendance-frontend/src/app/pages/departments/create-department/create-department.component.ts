import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { Department, DepartmentDto, CreateDepartmentRequest, UpdateDepartmentRequest } from '../../../shared/models/department.model';
import { I18nService } from '../../../core/i18n/i18n.service';

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
  public i18n = inject(I18nService);

  onDepartmentCreated(department: CreateDepartmentRequest | UpdateDepartmentRequest): void {
    this.router.navigate(['/departments']);
  }

  onCancel(): void {
    this.router.navigate(['/departments']);
  }
}