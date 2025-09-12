import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartmentsService } from '../departments.service';
import { Department } from '../../../shared/models/department.model';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-view-department',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('departments.view_details') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/departments">{{ i18n.t('departments.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('departments.view_details') }}</li>
            </ol>
          </nav>
        </div>
        <div class="btn-group">
          <button 
            type="button" 
            class="btn btn-primary"
            (click)="onEdit()">
            <i class="fa-solid fa-edit me-2"></i>
            {{ i18n.t('departments.edit') }}
          </button>
          <button 
            type="button" 
            class="btn btn-outline-secondary"
            (click)="onBack()">
            <i class="fa-solid fa-arrow-left me-2"></i>
            {{ i18n.t('common.back') }}
          </button>
        </div>
      </div>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (department()) {
        <!-- Department Details -->
        <div class="row">
          <!-- Main Information Card -->
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">
                  <div class="d-flex align-items-center">
                    <div class="avatar-sm me-3">
                      <div class="avatar-title bg-secondary-subtle text-secondary rounded-circle">
                        <i class="fa-solid fa-sitemap"></i>
                      </div>
                    </div>
                    <div>
                      <div class="fw-medium">{{ department()?.name }}</div>
                      <small class="text-muted">{{ department()?.code }}</small>
                    </div>
                  </div>
                </h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <!-- Basic Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('departments.name') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.name }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.name_ar') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.nameAr || '-' }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.code') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.code }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.parent') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.parentDepartmentName || i18n.t('departments.root_department') }}</dd>
                    </dl>
                  </div>

                  <!-- Additional Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('departments.manager') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.managerName || '-' }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.cost_center') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.costCenter || '-' }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('departments.location') }}:</dt>
                      <dd class="col-sm-7">{{ department()?.location || '-' }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('common.status') }}:</dt>
                      <dd class="col-sm-7">
                        @if (department()?.isActive) {
                          <span class="badge bg-success">{{ i18n.t('common.active') }}</span>
                        } @else {
                          <span class="badge bg-secondary">{{ i18n.t('common.inactive') }}</span>
                        }
                      </dd>
                    </dl>
                  </div>
                </div>

                @if (department()?.description) {
                  <div class="mt-3">
                    <h6 class="fw-semibold">{{ i18n.t('common.description') }}</h6>
                    <p class="mb-0">{{ department()?.description }}</p>
                  </div>
                }

                @if (department()?.descriptionAr) {
                  <div class="mt-3">
                    <h6 class="fw-semibold">{{ i18n.t('departments.description_ar') }}</h6>
                    <p class="mb-0" dir="rtl">{{ department()?.descriptionAr }}</p>
                  </div>
                }

                <!-- Contact Information -->
                @if (department()?.phone || department()?.email) {
                  <div class="mt-3">
                    <h6 class="fw-semibold">{{ i18n.t('departments.contact_info') }}</h6>
                    <div class="row">
                      @if (department()?.phone) {
                        <div class="col-md-6">
                          <i class="fa-solid fa-phone me-2 text-muted"></i>
                          <span>{{ department()?.phone }}</span>
                        </div>
                      }
                      @if (department()?.email) {
                        <div class="col-md-6">
                          <i class="fa-solid fa-envelope me-2 text-muted"></i>
                          <span>{{ department()?.email }}</span>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Actions and Statistics Card -->
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('common.actions') }}</h6>
              </div>
              <div class="card-body">
                <div class="d-grid gap-2">
                  <button 
                    type="button" 
                    class="btn btn-outline-primary"
                    (click)="onEdit()">
                    <i class="fa-solid fa-edit me-2"></i>
                    {{ i18n.t('departments.edit') }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-info"
                    (click)="onViewEmployees()">
                    <i class="fa-solid fa-users me-2"></i>
                    {{ i18n.t('departments.view_employees') }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-success"
                    (click)="onCreateSubDepartment()">
                    <i class="fa-solid fa-plus me-2"></i>
                    {{ i18n.t('departments.create_subdepartment') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Statistics Card -->
            <div class="card mt-3">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('departments.statistics') }}</h6>
              </div>
              <div class="card-body">
                <div class="row text-center">
                  <div class="col-6">
                    <div class="border-end">
                      <h4 class="mb-1 text-primary">{{ statistics()?.employeeCount || 0 }}</h4>
                      <p class="text-muted mb-0 small">{{ i18n.t('departments.employees') }}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <h4 class="mb-1 text-info">{{ statistics()?.subDepartmentCount || 0 }}</h4>
                    <p class="text-muted mb-0 small">{{ i18n.t('departments.sub_departments') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hierarchy Card -->
            @if (departmentHierarchy().length > 0) {
              <div class="card mt-3">
                <div class="card-header">
                  <h6 class="card-title mb-0">{{ i18n.t('departments.hierarchy') }}</h6>
                </div>
                <div class="card-body">
                  <div class="hierarchy-tree">
                    @for (item of departmentHierarchy(); track item.id) {
                      <div class="hierarchy-item" [style.margin-left.px]="item.level * 20">
                        <i class="fa-solid fa-sitemap me-2 text-muted"></i>
                        <span [class.fw-bold]="item.id.toString() === department()?.id?.toString()">{{ item.name }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Sub-departments Card -->
        @if (subDepartments().length > 0) {
          <div class="card mt-4">
            <div class="card-header">
              <h6 class="card-title mb-0">
                <i class="fa-solid fa-sitemap me-2"></i>
                {{ i18n.t('departments.sub_departments') }}
              </h6>
            </div>
            <div class="card-body">
              <div class="row g-3">
                @for (subDept of subDepartments(); track subDept.id) {
                  <div class="col-md-6 col-lg-4">
                    <div class="card border">
                      <div class="card-body p-3">
                        <div class="d-flex align-items-center">
                          <div class="avatar-sm me-3">
                            <div class="avatar-title bg-info-subtle text-info rounded-circle">
                              <i class="fa-solid fa-sitemap"></i>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="mb-1">{{ subDept.name }}</h6>
                            <p class="text-muted small mb-0">{{ subDept.code }}</p>
                          </div>
                          <div class="dropdown">
                            <button class="btn btn-sm btn-light" data-bs-toggle="dropdown">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" (click)="onViewSubDepartment(subDept.id.toString())">
                                <i class="fa-solid fa-eye me-2"></i>{{ i18n.t('common.view') }}
                              </a></li>
                              <li><a class="dropdown-item" (click)="onEditSubDepartment(subDept.id.toString())">
                                <i class="fa-solid fa-edit me-2"></i>{{ i18n.t('common.edit') }}
                              </a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('departments.department_not_found') }}
        </div>
      }
    </div>
  `
})
export class ViewDepartmentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private departmentsService = inject(DepartmentsService);
  public i18n = inject(I18nService);

  department = signal<Department | null>(null);
  statistics = signal<{employeeCount: number, subDepartmentCount: number} | null>(null);
  subDepartments = signal<Department[]>([]);
  departmentHierarchy = signal<{id: string, name: string, level: number}[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const departmentId = this.route.snapshot.paramMap.get('id');
    if (departmentId) {
      this.loadDepartment(departmentId);
      this.loadStatistics(departmentId);
      this.loadSubDepartments(departmentId);
      this.loadHierarchy(departmentId);
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

  loadStatistics(departmentId: string): void {
    // Mock statistics for now
    this.statistics.set({
      employeeCount: Math.floor(Math.random() * 50),
      subDepartmentCount: Math.floor(Math.random() * 10)
    });
  }

  loadSubDepartments(departmentId: string): void {
    // Mock sub-departments for now
    this.subDepartments.set([]);
  }

  loadHierarchy(departmentId: string): void {
    // Mock hierarchy for now
    this.departmentHierarchy.set([]);
  }

  onEdit(): void {
    if (this.department()) {
      this.router.navigate(['/departments', this.department()!.id, 'edit']);
    }
  }

  onViewEmployees(): void {
    if (this.department()) {
      this.router.navigate(['/employees'], { queryParams: { departmentId: this.department()!.id } });
    }
  }

  onCreateSubDepartment(): void {
    if (this.department()) {
      this.router.navigate(['/departments/create'], { queryParams: { parentId: this.department()!.id } });
    }
  }

  onViewSubDepartment(subDeptId: string): void {
    this.router.navigate(['/departments', subDeptId, 'view']);
  }

  onEditSubDepartment(subDeptId: string): void {
    this.router.navigate(['/departments', subDeptId, 'edit']);
  }

  onBack(): void {
    this.router.navigate(['/departments']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t('errors.unknown');
  }
}