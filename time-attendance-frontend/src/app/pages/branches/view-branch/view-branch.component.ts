import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BranchesService } from '../branches.service';
import { Branch } from '../../../shared/models/branch.model';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-view-branch',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('branches.view_details') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/branches">{{ i18n.t('branches.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('branches.view_details') }}</li>
            </ol>
          </nav>
        </div>
        <div class="btn-group">
          <button 
            type="button" 
            class="btn btn-primary"
            (click)="onEdit()">
            <i class="fa-solid fa-edit me-2"></i>
            {{ i18n.t('branches.edit') }}
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
      } @else if (branch()) {
        <!-- Branch Details -->
        <div class="row">
          <!-- Main Information Card -->
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">
                  <div class="d-flex align-items-center">
                    <div class="avatar-sm me-3">
                      <div class="avatar-title bg-primary-subtle text-primary rounded-circle">
                        <i class="fa-solid fa-building"></i>
                      </div>
                    </div>
                    <div>
                      <div class="fw-medium">{{ branch()?.name }}</div>
                      <small class="text-muted">{{ branch()?.code }}</small>
                    </div>
                  </div>
                </h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <!-- Basic Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('branches.name') }}:</dt>
                      <dd class="col-sm-7">{{ branch()?.name }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('branches.code') }}:</dt>
                      <dd class="col-sm-7">{{ branch()?.code }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('branches.timezone') }}:</dt>
                      <dd class="col-sm-7">{{ branch()?.timeZone }}</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('common.status') }}:</dt>
                      <dd class="col-sm-7">
                        @if (branch()?.isActive) {
                          <span class="badge bg-success">{{ i18n.t('common.active') }}</span>
                        } @else {
                          <span class="badge bg-secondary">{{ i18n.t('common.inactive') }}</span>
                        }
                      </dd>
                    </dl>
                  </div>

                  <!-- Contact Information -->
                  <div class="col-md-6">
                    <dl class="row">
                      <dt class="col-sm-5">{{ i18n.t('common.phone') }}:</dt>
                      <dd class="col-sm-7">-</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('common.email') }}:</dt>
                      <dd class="col-sm-7">-</dd>
                      
                      <dt class="col-sm-5">{{ i18n.t('branches.created_at') }}:</dt>
                      <dd class="col-sm-7">{{ formatDate(branch()!.createdAtUtc) }}</dd>
                    </dl>
                  </div>
                </div>

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
                    {{ i18n.t('branches.edit') }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-info"
                    (click)="onViewEmployees()">
                    <i class="fa-solid fa-users me-2"></i>
                    {{ i18n.t('branches.view_employees') }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-secondary"
                    (click)="onViewDepartments()">
                    <i class="fa-solid fa-sitemap me-2"></i>
                    {{ i18n.t('branches.view_departments') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Statistics Card -->
            <div class="card mt-3">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('branches.statistics') }}</h6>
              </div>
              <div class="card-body">
                <div class="row text-center">
                  <div class="col-6">
                    <div class="border-end">
                      <h4 class="mb-1 text-primary">{{ statistics()?.employeeCount || 0 }}</h4>
                      <p class="text-muted mb-0 small">{{ i18n.t('branches.employees') }}</p>
                    </div>
                  </div>
                  <div class="col-6">
                    <h4 class="mb-1 text-info">{{ statistics()?.departmentCount || 0 }}</h4>
                    <p class="text-muted mb-0 small">{{ i18n.t('branches.departments') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('branches.branch_not_found') }}
        </div>
      }
    </div>
  `
})
export class ViewBranchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private branchesService = inject(BranchesService);
  public i18n = inject(I18nService);

  branch = signal<Branch | null>(null);
  statistics = signal<{employeeCount: number, departmentCount: number} | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const branchId = this.route.snapshot.paramMap.get('id');
    if (branchId) {
      this.loadBranch(branchId);
      this.loadStatistics(branchId);
    } else {
      this.error.set('Invalid branch ID');
      this.loading.set(false);
    }
  }

  loadBranch(branchId: string): void {
    // Mock loading branch for now
    setTimeout(() => {
      const mockBranch: Branch = {
        id: parseInt(branchId),
        name: 'Sample Branch',
        code: 'SAMPLE',
        timeZone: 'UTC',
        isActive: true,
        employeeCount: 10,
        departmentCount: 3,
        createdAtUtc: '2024-01-01T00:00:00Z'
      };
      this.branch.set(mockBranch);
      this.loading.set(false);
    }, 1000);
  }

  loadStatistics(branchId: string): void {
    // Mock statistics for now
    this.statistics.set({
      employeeCount: Math.floor(Math.random() * 100),
      departmentCount: Math.floor(Math.random() * 20)
    });
  }

  onEdit(): void {
    if (this.branch()) {
      this.router.navigate(['/branches', this.branch()!.id, 'edit']);
    }
  }

  onViewEmployees(): void {
    if (this.branch()) {
      this.router.navigate(['/employees'], { queryParams: { branchId: this.branch()!.id } });
    }
  }

  onViewDepartments(): void {
    if (this.branch()) {
      this.router.navigate(['/departments'], { queryParams: { branchId: this.branch()!.id } });
    }
  }

  onBack(): void {
    this.router.navigate(['/branches']);
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