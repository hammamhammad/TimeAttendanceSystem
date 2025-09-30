import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { EmployeeVacationsService } from '../employee-vacations.service';
import { EmployeeVacation } from '../../../shared/models/employee-vacation.model';
import { PermissionActions } from '../../../shared/utils/permission.utils';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-view-employee-vacation',
  standalone: true,
  imports: [
    CommonModule,
    FormHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DefinitionListComponent
  ],
  templateUrl: './view-employee-vacation.component.html',
  styleUrls: ['./view-employee-vacation.component.css']
})
export class ViewEmployeeVacationComponent implements OnInit {
  public i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeeVacationsService = inject(EmployeeVacationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public permissionService = inject(PermissionService);

  // Signals
  loading = signal(false);
  processing = signal(false);
  vacation = signal<EmployeeVacation | null>(null);
  error = signal<string | null>(null);


  ngOnInit(): void {
    this.loadVacationDetails();
  }

  private loadVacationDetails(): void {
    const vacationId = this.route.snapshot.paramMap.get('id');
    if (!vacationId) {
      this.router.navigate(['/employee-vacations']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.employeeVacationsService.getVacationById(+vacationId).subscribe({
      next: (vacation) => {
        this.vacation.set(vacation);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load vacation details:', error);
        this.error.set(this.i18n.t('employee_vacations.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }


  async approveVacation(): Promise<void> {
    if (!this.vacation()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('employee_vacations.approve_vacation'),
      message: this.i18n.t('employee_vacations.confirm_approve'),
      confirmText: this.i18n.t('common.approve'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success'
    });

    if (result.confirmed) {
      this.processing.set(true);

      this.employeeVacationsService.toggleVacationStatus(this.vacation()!.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('employee_vacations.success.approved')
          );
          this.loadVacationDetails(); // Reload to show updated status
          this.processing.set(false);
        },
        error: (error: any) => {
          console.error('Failed to approve vacation:', error);
          this.notificationService.error(
            this.i18n.t('employee_vacations.errors.approve_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  async deleteVacation(): Promise<void> {
    if (!this.vacation()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('employee_vacations.delete_vacation'),
      message: this.i18n.t('employee_vacations.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.processing.set(true);

      this.employeeVacationsService.deleteVacation(this.vacation()!.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('employee_vacations.success.deleted')
          );
          this.router.navigate(['/employee-vacations']);
        },
        error: (error) => {
          console.error('Failed to delete vacation:', error);
          this.notificationService.error(
            this.i18n.t('employee_vacations.errors.delete_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  // Permission checks
  canEdit(): boolean {
    return this.permissionService.has(`vacation.${PermissionActions.UPDATE}`);
  }

  canApprove(): boolean {
    const vacation = this.vacation();
    return vacation ? vacation.isApproved === false &&
           this.permissionService.has(`vacation.${PermissionActions.APPROVE}`) : false;
  }

  canDelete(): boolean {
    return this.permissionService.has(`vacation.${PermissionActions.DELETE}`);
  }

  hasActiveActions(): boolean {
    return this.canEdit() || this.canApprove() || this.canDelete();
  }

  /**
   * Get form mode for FormHeaderComponent
   */
  getFormMode(): 'create' | 'edit' | 'view' {
    return 'view';
  }

  /**
   * Get vacation ID for FormHeaderComponent
   */
  getVacationId(): number | undefined {
    return this.vacation()?.id;
  }

  /**
   * Navigate to edit
   */
  navigateToEdit(): void {
    if (this.vacation()) {
      this.router.navigate(['/employee-vacations', this.vacation()!.id, 'edit']);
    }
  }

  /**
   * Navigate back
   */
  navigateBack(): void {
    this.router.navigate(['/employee-vacations']);
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string | Date): string {
    return new Date(dateString).toLocaleDateString();
  }

  /**
   * Format datetime for display
   */
  formatDateTime(dateString: string | Date): string {
    return new Date(dateString).toLocaleString();
  }

  /**
   * Get status class for styling
   */
  getStatusClass(isApproved: boolean): string {
    return isApproved ? 'badge bg-success' : 'badge bg-warning';
  }

  /**
   * Get status text
   */
  getStatusText(isApproved: boolean): string {
    return isApproved ? this.i18n.t('vacationStatus.approved') : this.i18n.t('vacationStatus.pending');
  }

  // Computed properties for definition lists
  basicInfoColumn1 = computed<DefinitionItem[]>(() => {
    const vacation = this.vacation();
    if (!vacation) return [];

    return [
      {
        label: this.i18n.t('fields.employee'),
        value: vacation.employeeName
      },
      {
        label: this.i18n.t('fields.vacationType'),
        value: vacation.vacationTypeName
      },
      {
        label: this.i18n.t('fields.totalDays'),
        value: `${vacation.totalDays} ${vacation.totalDays === 1 ? this.i18n.t('fields.dayUnit') : this.i18n.t('fields.daysUnit')}`
      }
    ];
  });

  basicInfoColumn2 = computed<DefinitionItem[]>(() => {
    const vacation = this.vacation();
    if (!vacation) return [];

    return [
      {
        label: this.i18n.t('fields.startDate'),
        value: vacation.startDate,
        type: 'date' as const
      },
      {
        label: this.i18n.t('fields.endDate'),
        value: vacation.endDate,
        type: 'date' as const
      },
      {
        label: this.i18n.t('fields.status'),
        value: this.getStatusText(vacation.isApproved),
        type: 'badge' as const,
        badgeVariant: vacation.isApproved ? 'success' : 'warning'
      }
    ];
  });

  // Computed property for status badge
  statusBadge = computed<{ label: string; variant: 'success' | 'warning' }>(() => {
    const vacation = this.vacation();
    if (!vacation) return { label: '', variant: 'warning' };

    return {
      label: this.getStatusText(vacation.isApproved),
      variant: vacation.isApproved ? 'success' : 'warning'
    };
  });
}