import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PortalService } from '../../services/portal.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-shift-swap',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, SearchableSelectComponent],
  templateUrl: './create-shift-swap.component.html',
  styleUrl: './create-shift-swap.component.css'
})
export class CreateShiftSwapComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly portalService = inject(PortalService);
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);

  saving = signal(false);
  loading = signal(false);

  swapWithEmployeeId: number | null = null;
  originalDate = '';
  swapDate = '';
  reason = '';

  employeeOptions: SearchableSelectOption[] = [];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading.set(true);
    this.employeeService.getDropdown().subscribe({
      next: (employees) => {
        this.employeeOptions = employees.map(e => ({
          value: e.id,
          label: `${e.name} (${e.employeeNumber})`
        }));
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); }
    });
  }

  submit(): void {
    if (!this.swapWithEmployeeId || !this.originalDate || !this.swapDate) {
      this.notification.warning(this.i18n.t('common.fill_required'));
      return;
    }
    this.saving.set(true);
    this.portalService.createShiftSwapRequest({
      swapWithEmployeeId: this.swapWithEmployeeId,
      originalDate: this.originalDate,
      swapDate: this.swapDate,
      reason: this.reason || null
    }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.shift_swaps.create_success'));
        this.router.navigate(['/shift-swap-requests']);
      },
      error: (err: any) => {
        this.notification.error(err?.error?.error || this.i18n.t('common.save_error'));
        this.saving.set(false);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/shift-swap-requests']);
  }
}
