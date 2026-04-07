import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PortalService } from '../../services/portal.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-request-encashment',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './request-encashment.component.html',
  styleUrl: './request-encashment.component.css'
})
export class RequestEncashmentComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly portalService = inject(PortalService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly authService = inject(AuthService);

  saving = signal(false);
  loading = signal(false);
  eligibleData = signal<any>(null);

  // Form fields
  vacationTypeId: number | null = null;
  daysToEncash: number | null = null;
  year: number = new Date().getFullYear();
  notes = '';

  ngOnInit(): void {
    this.loadEligibleData();
  }

  loadEligibleData(): void {
    const employeeId = this.authService.currentUser()?.employeeId;
    if (!employeeId) return;
    this.loading.set(true);
    this.portalService.getEligibleLeaveEncashment(employeeId).subscribe({
      next: (res) => {
        const data = res?.value ?? res;
        this.eligibleData.set(data);
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); }
    });
  }

  submit(): void {
    if (!this.vacationTypeId || !this.daysToEncash || this.daysToEncash <= 0) {
      this.notification.warning(this.i18n.t('common.fill_required'));
      return;
    }
    this.saving.set(true);
    const employeeId = this.authService.currentUser()?.employeeId;
    const data = {
      employeeId,
      vacationTypeId: this.vacationTypeId,
      daysToEncash: this.daysToEncash,
      year: this.year,
      notes: this.notes
    };
    this.portalService.createLeaveEncashment(data).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.leave_encashments.request_success'));
        this.router.navigate(['/my-leave-encashments']);
        this.saving.set(false);
      },
      error: () => { this.saving.set(false); }
    });
  }

  cancel(): void {
    this.router.navigate(['/my-leave-encashments']);
  }
}
