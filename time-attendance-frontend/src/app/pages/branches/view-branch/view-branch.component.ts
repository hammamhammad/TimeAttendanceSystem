import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BranchesService } from '../branches.service';
import { Branch } from '../../../shared/models/branch.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DetailCardComponent, DetailField } from '../../../shared/components/detail-card/detail-card.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-view-branch',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    DetailCardComponent,
    StatusBadgeComponent,
    StatCardComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="app-view-page">
      <!-- Standardized Page Header -->
      <app-page-header
        [title]="i18n.t('branches.view_details')">
      </app-page-header>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <app-loading-spinner
            [message]="i18n.t('common.loading')"
            [centered]="true">
          </app-loading-spinner>
        </div>
      } @else if (branch()) {
        <!-- Branch Details Layout -->
        <div class="app-desktop-sidebar">
          <!-- Main Content -->
          <div class="app-main-content">
            <!-- Branch Information Card -->
            <app-detail-card
              [title]="branch()?.name"
              [subtitle]="branch()?.code"
              icon="fas fa-building"
              [fields]="branchFields"
              layout="two-column">
            </app-detail-card>
          </div>

          <!-- Sidebar -->
          <div class="app-sidebar-content">
            <!-- Quick Actions Card -->
            <div class="card mb-3">
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

            <!-- Statistics Cards -->
            <div class="d-flex flex-column gap-3">
              <app-stat-card
                [label]="i18n.t('branches.employees')"
                [value]="statistics()?.employeeCount || 0"
                icon="fas fa-users"
                variant="primary"
                [clickable]="true"
                [clickableText]="i18n.t('branches.view_employees')"
                (click)="onViewEmployees()">
              </app-stat-card>

              <app-stat-card
                [label]="i18n.t('branches.departments')"
                [value]="statistics()?.departmentCount || 0"
                icon="fas fa-sitemap"
                variant="info"
                [clickable]="true"
                [clickableText]="i18n.t('branches.view_departments')"
                (click)="onViewDepartments()">
              </app-stat-card>
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


  get branchFields(): DetailField[] {
    const branch = this.branch();
    if (!branch) return [];

    return [
      {
        label: this.i18n.t('branches.name'),
        value: branch.name
      },
      {
        label: this.i18n.t('branches.code'),
        value: branch.code,
        copyable: true
      },
      {
        label: this.i18n.t('branches.timezone'),
        value: branch.timeZone
      },
      {
        label: this.i18n.t('common.status'),
        value: branch.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
        type: 'badge',
        badgeVariant: branch.isActive ? 'success' : 'danger'
      },
      {
        label: this.i18n.t('common.phone'),
        value: '-'
      },
      {
        label: this.i18n.t('common.email'),
        value: '-'
      },
      {
        label: this.i18n.t('branches.created_at'),
        value: branch.createdAtUtc,
        type: 'date'
      }
    ];
  }

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