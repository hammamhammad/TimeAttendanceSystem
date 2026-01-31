import { Component, OnInit, signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NfcTagsService } from './nfc-tags.service';
import { BranchesService } from '../branches/branches.service';
import { NfcTag } from '../../shared/models/nfc-tag.model';
import { Branch } from '../../shared/models/branch.model';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-nfc-tags',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    DatePipe,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    StatusBadgeComponent
  ],
  template: `
    <div class="container-fluid">
      <app-page-header
        [title]="i18n.t('nfc_tags.title')"
        [subtitle]="i18n.t('nfc_tags.subtitle')">
        <button class="btn btn-primary" routerLink="/nfc-tags/create">
          <i class="fa-solid fa-plus me-2"></i>
          {{ i18n.t('nfc_tags.register_tag') }}
        </button>
      </app-page-header>

      <!-- Filters -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">{{ i18n.t('common.branch') }}</label>
              <select class="form-select" [(ngModel)]="selectedBranchId" (change)="onFilterChange()">
                <option [ngValue]="null">{{ i18n.t('common.all') }}</option>
                @for (branch of branches(); track branch.id) {
                  <option [ngValue]="branch.id">{{ branch.name }}</option>
                }
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">{{ i18n.t('common.status') }}</label>
              <select class="form-select" [(ngModel)]="selectedStatus" (change)="onFilterChange()">
                <option [ngValue]="null">{{ i18n.t('common.all') }}</option>
                <option [ngValue]="true">{{ i18n.t('common.active') }}</option>
                <option [ngValue]="false">{{ i18n.t('common.inactive') }}</option>
              </select>
            </div>
            <div class="col-md-4 d-flex align-items-end">
              <button class="btn btn-outline-secondary" (click)="clearFilters()">
                <i class="fa-solid fa-times me-2"></i>
                {{ i18n.t('common.clear_filters') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <app-loading-spinner [message]="i18n.t('nfc_tags.loading')" [centered]="true"></app-loading-spinner>
        </div>
      } @else if (nfcTags().length === 0) {
        <app-empty-state
          icon="fa-solid fa-tag"
          [title]="i18n.t('nfc_tags.no_tags_found')"
          [message]="i18n.t('nfc_tags.no_tags_message')"
          [actionText]="i18n.t('nfc_tags.register_tag')"
          actionIcon="fa-solid fa-plus"
          (action)="navigateToCreate()">
        </app-empty-state>
      } @else {
        <!-- Data Table -->
        <div class="card">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>{{ i18n.t('nfc_tags.tag_uid') }}</th>
                    <th>{{ i18n.t('common.branch') }}</th>
                    <th>{{ i18n.t('common.description') }}</th>
                    <th>{{ i18n.t('common.status') }}</th>
                    <th>{{ i18n.t('nfc_tags.write_protected') }}</th>
                    <th>{{ i18n.t('common.created_at') }}</th>
                    <th class="text-end">{{ i18n.t('common.actions') }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (tag of nfcTags(); track tag.id) {
                    <tr>
                      <td><code>{{ tag.tagUid }}</code></td>
                      <td>{{ tag.branchName }}</td>
                      <td>{{ tag.description || '-' }}</td>
                      <td>
                        <app-status-badge
                          [status]="tag.isActive ? i18n.t('common.active') : i18n.t('common.inactive')"
                          [variant]="tag.isActive ? 'success' : 'secondary'">
                        </app-status-badge>
                      </td>
                      <td>
                        <app-status-badge
                          [status]="tag.isWriteProtected ? i18n.t('nfc_tags.locked') : i18n.t('nfc_tags.unlocked')"
                          [variant]="tag.isWriteProtected ? 'warning' : 'info'">
                        </app-status-badge>
                      </td>
                      <td>{{ tag.createdAtUtc | date:'short' }}</td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-outline-info"
                                  [routerLink]="['/nfc-tags', tag.id, 'view']"
                                  [title]="i18n.t('common.view')">
                            <i class="fa-solid fa-eye"></i>
                          </button>
                          <button class="btn btn-outline-primary"
                                  [routerLink]="['/nfc-tags', tag.id, 'edit']"
                                  [title]="i18n.t('common.edit')">
                            <i class="fa-solid fa-edit"></i>
                          </button>
                          @if (!tag.isWriteProtected) {
                            <button class="btn btn-outline-warning"
                                    (click)="lockTag(tag)"
                                    [title]="i18n.t('nfc_tags.lock')">
                              <i class="fa-solid fa-lock"></i>
                            </button>
                          }
                          <button class="btn btn-outline-danger"
                                  (click)="deleteTag(tag)"
                                  [title]="i18n.t('common.delete')">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted">
              {{ i18n.t('common.showing') }} {{ nfcTags().length }} {{ i18n.t('common.of') }} {{ totalItems() }} {{ i18n.t('common.entries') }}
            </small>
            @if (totalPages() > 1) {
              <nav>
                <ul class="pagination pagination-sm mb-0">
                  <li class="page-item" [class.disabled]="currentPage() === 1">
                    <button class="page-link" (click)="onPageChange(currentPage() - 1)">
                      <i class="fa-solid fa-chevron-left"></i>
                    </button>
                  </li>
                  @for (page of getPageNumbers(); track page) {
                    <li class="page-item" [class.active]="page === currentPage()">
                      <button class="page-link" (click)="onPageChange(page)">{{ page }}</button>
                    </li>
                  }
                  <li class="page-item" [class.disabled]="currentPage() === totalPages()">
                    <button class="page-link" (click)="onPageChange(currentPage() + 1)">
                      <i class="fa-solid fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class NfcTagsComponent implements OnInit {
  private router = inject(Router);
  private nfcTagsService = inject(NfcTagsService);
  private branchesService = inject(BranchesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);

  // State
  nfcTags = signal<NfcTag[]>([]);
  branches = signal<Branch[]>([]);
  loading = signal(true);
  currentPage = signal(1);
  totalPages = signal(1);
  totalItems = signal(0);
  pageSize = 10;

  // Filters
  selectedBranchId: number | null = null;
  selectedStatus: boolean | null = null;

  ngOnInit(): void {
    this.loadBranches();
    this.loadNfcTags();
  }

  loadBranches(): void {
    this.branchesService.getBranchesForDropdown().subscribe({
      next: (branches) => this.branches.set(branches),
      error: () => this.notificationService.error(this.i18n.t('errors.loading_branches'))
    });
  }

  loadNfcTags(): void {
    this.loading.set(true);
    this.nfcTagsService.getNfcTags(
      this.currentPage(),
      this.pageSize,
      this.selectedBranchId ?? undefined,
      this.selectedStatus ?? undefined
    ).subscribe({
      next: (response) => {
        this.nfcTags.set(response.items);
        this.totalPages.set(response.totalPages);
        this.totalItems.set(response.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('nfc_tags.error_loading'));
        this.loading.set(false);
      }
    });
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.loadNfcTags();
  }

  clearFilters(): void {
    this.selectedBranchId = null;
    this.selectedStatus = null;
    this.currentPage.set(1);
    this.loadNfcTags();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadNfcTags();
    }
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    let start = Math.max(1, current - 2);
    let end = Math.min(total, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  async lockTag(tag: NfcTag): Promise<void> {
    if (tag.isWriteProtected) {
      this.notificationService.warning(this.i18n.t('nfc_tags.already_locked'));
      return;
    }

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('nfc_tags.lock_confirmation_title'),
      message: this.i18n.t('nfc_tags.lock_confirmation_message'),
      confirmText: this.i18n.t('nfc_tags.lock'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning',
      icon: 'fa-lock',
      iconClass: 'text-warning'
    });

    if (result.confirmed) {
      this.nfcTagsService.lockNfcTag(tag.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('nfc_tags.lock_success'));
          this.loadNfcTags();
        },
        error: () => this.notificationService.error(this.i18n.t('nfc_tags.lock_error'))
      });
    }
  }

  async deleteTag(tag: NfcTag): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('nfc_tags.delete_confirmation_title'),
      message: this.i18n.t('nfc_tags.delete_confirmation_message'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.nfcTagsService.deleteNfcTag(tag.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('nfc_tags.delete_success'));
          this.loadNfcTags();
        },
        error: () => this.notificationService.error(this.i18n.t('nfc_tags.delete_error'))
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/nfc-tags/create']);
  }
}
