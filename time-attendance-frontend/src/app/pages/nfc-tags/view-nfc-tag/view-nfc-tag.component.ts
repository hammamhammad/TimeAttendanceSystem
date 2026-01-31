import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NfcTagsService } from '../nfc-tags.service';
import { NfcTag } from '../../../shared/models/nfc-tag.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { DatePipe } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DetailCardComponent, DetailField } from '../../../shared/components/detail-card/detail-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-view-nfc-tag',
  standalone: true,
  imports: [
    RouterModule,
    DatePipe,
    PageHeaderComponent,
    DetailCardComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <div class="container-fluid">
      <app-page-header
        [title]="i18n.t('nfc_tags.view_tag')"
        [showBackButton]="true"
        backRoute="/nfc-tags">
      </app-page-header>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <app-loading-spinner [message]="i18n.t('common.loading')" [centered]="true"></app-loading-spinner>
        </div>
      } @else if (tag()) {
        <div class="row">
          <!-- Main Content -->
          <div class="col-lg-8">
            <app-detail-card
              [title]="tag()!.tagUid"
              [subtitle]="tag()!.description || i18n.t('nfc_tags.no_description')"
              icon="fa-solid fa-tag"
              [fields]="tagFields()"
              layout="two-column">
            </app-detail-card>
          </div>

          <!-- Sidebar -->
          <div class="col-lg-4">
            <!-- Actions -->
            <div class="card mb-3">
              <div class="card-header">
                <h6 class="card-title mb-0">{{ i18n.t('common.actions') }}</h6>
              </div>
              <div class="card-body">
                <div class="d-grid gap-2">
                  <button class="btn btn-outline-primary" [routerLink]="['/nfc-tags', tag()!.id, 'edit']">
                    <i class="fa-solid fa-edit me-2"></i>
                    {{ i18n.t('common.edit') }}
                  </button>
                  @if (!tag()!.isWriteProtected) {
                    <button class="btn btn-outline-warning" (click)="lockTag()">
                      <i class="fa-solid fa-lock me-2"></i>
                      {{ i18n.t('nfc_tags.lock') }}
                    </button>
                  }
                  <button class="btn btn-outline-danger" (click)="deleteTag()">
                    <i class="fa-solid fa-trash me-2"></i>
                    {{ i18n.t('common.delete') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Lock Status -->
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0">
                  <i class="fa-solid fa-shield-halved me-2"></i>
                  {{ i18n.t('nfc_tags.security_status') }}
                </h6>
              </div>
              <div class="card-body">
                @if (tag()!.isWriteProtected) {
                  <div class="d-flex align-items-center text-warning mb-2">
                    <i class="fa-solid fa-lock fa-2x me-3"></i>
                    <div>
                      <strong>{{ i18n.t('nfc_tags.locked') }}</strong>
                      <p class="text-muted small mb-0">{{ i18n.t('nfc_tags.locked_description') }}</p>
                    </div>
                  </div>
                  @if (tag()!.lockedAt) {
                    <small class="text-muted">
                      {{ i18n.t('nfc_tags.locked_at') }}: {{ tag()!.lockedAt | date:'medium' }}
                    </small>
                  }
                } @else {
                  <div class="d-flex align-items-center text-info">
                    <i class="fa-solid fa-lock-open fa-2x me-3"></i>
                    <div>
                      <strong>{{ i18n.t('nfc_tags.unlocked') }}</strong>
                      <p class="text-muted small mb-0">{{ i18n.t('nfc_tags.unlocked_description') }}</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('nfc_tags.tag_not_found') }}
        </div>
      }
    </div>
  `
})
export class ViewNfcTagComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private nfcTagsService = inject(NfcTagsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);

  // State
  tag = signal<NfcTag | null>(null);
  loading = signal(true);
  error = signal('');

  // Computed fields for detail card
  tagFields = computed<DetailField[]>(() => {
    const t = this.tag();
    if (!t) return [];

    return [
      { label: this.i18n.t('nfc_tags.tag_uid'), value: t.tagUid, copyable: true },
      { label: this.i18n.t('common.branch'), value: t.branchName || '-' },
      { label: this.i18n.t('common.description'), value: t.description || '-' },
      {
        label: this.i18n.t('common.status'),
        value: t.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
        type: 'badge',
        badgeVariant: t.isActive ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('nfc_tags.write_protected'),
        value: t.isWriteProtected ? this.i18n.t('nfc_tags.locked') : this.i18n.t('nfc_tags.unlocked'),
        type: 'badge',
        badgeVariant: t.isWriteProtected ? 'warning' : 'info'
      },
      { label: this.i18n.t('common.created_at'), value: t.createdAtUtc, type: 'date' }
    ];
  });

  ngOnInit(): void {
    const tagId = this.route.snapshot.paramMap.get('id');
    if (tagId) {
      this.loadTag(parseInt(tagId));
    } else {
      this.error.set('Invalid tag ID');
      this.loading.set(false);
    }
  }

  loadTag(id: number): void {
    this.nfcTagsService.getNfcTagById(id).subscribe({
      next: (tag) => {
        this.tag.set(tag);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.error || this.i18n.t('nfc_tags.tag_not_found'));
        this.loading.set(false);
      }
    });
  }

  async lockTag(): Promise<void> {
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
      this.nfcTagsService.lockNfcTag(this.tag()!.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('nfc_tags.lock_success'));
          this.loadTag(this.tag()!.id);
        },
        error: () => this.notificationService.error(this.i18n.t('nfc_tags.lock_error'))
      });
    }
  }

  async deleteTag(): Promise<void> {
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
      this.nfcTagsService.deleteNfcTag(this.tag()!.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('nfc_tags.delete_success'));
          this.router.navigate(['/nfc-tags']);
        },
        error: () => this.notificationService.error(this.i18n.t('nfc_tags.delete_error'))
      });
    }
  }
}
