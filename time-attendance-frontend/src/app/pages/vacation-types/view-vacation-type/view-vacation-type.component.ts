import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { VacationTypesService } from '../vacation-types.service';
import { VacationTypeDetailDto } from '../../../shared/models/vacation-type.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-view-vacation-type',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent],
  templateUrl: './view-vacation-type.component.html',
  styleUrls: ['./view-vacation-type.component.css']
})
export class ViewVacationTypeComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private vacationTypesService = inject(VacationTypesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // State signals
  loading = signal(false);
  vacationType = signal<VacationTypeDetailDto | null>(null);
  vacationTypeId = signal<number | null>(null);

  // Permission constants
  readonly PERMISSIONS = {
    VACATION_TYPE_UPDATE: 'vacationType.update',
    VACATION_TYPE_DELETE: 'vacationType.delete'
  };

  ngOnInit(): void {
    this.loadVacationType();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load vacation type data from route parameters
   */
  private loadVacationType(): void {
    this.loading.set(true);

    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || id <= 0) {
          this.notificationService.error(this.i18n.t('vacation_types.errors.invalid_id'));
          this.router.navigate(['/vacation-types']);
          throw new Error('Invalid vacation type ID');
        }

        this.vacationTypeId.set(id);
        return this.vacationTypesService.getVacationTypeById(id, true); // Include usage statistics
      })
    ).subscribe({
      next: (vacationType) => {
        this.loading.set(false);
        this.vacationType.set(vacationType);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to load vacation type:', error);

        if (error.status === 404) {
          this.notificationService.error(this.i18n.t('vacation_types.errors.not_found'));
        } else {
          this.notificationService.error(this.i18n.t('vacation_types.errors.load_failed'));
        }

        this.router.navigate(['/vacation-types']);
      }
    });
  }


  /**
   * Toggle vacation type status
   */
  onToggleStatus(): void {
    const vacationType = this.vacationType();
    if (!vacationType || !this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    const action = vacationType.isActive ? 'deactivate' : 'activate';
    const message = this.i18n.t(`vacation_types.confirm_${action}`);

    this.confirmationService.confirm({
      title: this.i18n.t(`vacation_types.${action}_vacation_type`),
      message,
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t('common.cancel')
    }).then(result => {
      if (result.confirmed && vacationType) {
        this.vacationTypesService.toggleVacationTypeStatus(vacationType.id).subscribe({
          next: () => {
            const successMessage = vacationType.isActive
              ? this.i18n.t('vacation_types.success.deactivated')
              : this.i18n.t('vacation_types.success.activated');
            this.notificationService.success(successMessage);

            // Reload the vacation type to get updated status
            this.loadVacationType();
          },
          error: (error) => {
            console.error('Failed to toggle vacation type status:', error);
            this.notificationService.error(this.i18n.t('vacation_types.errors.status_toggle_failed'));
          }
        });
      }
    });
  }

  /**
   * Delete vacation type
   */
  onDelete(): void {
    const vacationType = this.vacationType();
    if (!vacationType || !this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_DELETE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    if (!vacationType.canBeDeleted) {
      this.notificationService.warning(this.i18n.t('vacation_types.warnings.cannot_delete'));
      return;
    }

    this.confirmationService.confirm({
      title: this.i18n.t('vacation_types.delete_vacation_type'),
      message: this.i18n.t('vacation_types.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    }).then(result => {
      if (result.confirmed && vacationType) {
        this.vacationTypesService.deleteVacationType(vacationType.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('vacation_types.success.deleted'));
            this.router.navigate(['/vacation-types']);
          },
          error: (error) => {
            console.error('Failed to delete vacation type:', error);
            this.notificationService.error(this.i18n.t('vacation_types.errors.delete_failed'));
          }
        });
      }
    });
  }

  /**
   * Computed property for status badge
   */
  statusBadge = computed<{ label: string; variant: 'success' | 'secondary' }>(() => {
    const vt = this.vacationType();
    if (!vt) return { label: '', variant: 'secondary' };

    return {
      label: vt.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
      variant: vt.isActive ? 'success' : 'secondary'
    };
  });

  /**
   * Computed property for basic information items
   */
  basicInfoItems = computed<DefinitionItem[]>(() => {
    const vt = this.vacationType();
    if (!vt) return [];

    const items: DefinitionItem[] = [
      { label: this.i18n.t('vacation_types.name'), value: vt.name }
    ];

    if (vt.nameAr) {
      items.push({ label: this.i18n.t('vacation_types.name_ar'), value: vt.nameAr });
    }

    items.push(
      {
        label: this.i18n.t('vacation_types.branch'),
        value: vt.branchId
          ? (vt.branchName || `Branch ${vt.branchId}`)
          : this.i18n.t('common.company_wide')
      },
      {
        label: this.i18n.t('common.status'),
        value: this.statusBadge().label,
        type: 'badge' as const,
        badgeVariant: this.statusBadge().variant
      }
    );

    return items;
  });

  /**
   * Get status badge class (kept for backward compatibility if needed elsewhere)
   */
  getStatusBadgeClass(isActive: boolean): string {
    return isActive ? 'bg-success' : 'bg-secondary';
  }

  /**
   * Get status text (kept for backward compatibility if needed elsewhere)
   */
  getStatusText(isActive: boolean): string {
    return isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive');
  }

}