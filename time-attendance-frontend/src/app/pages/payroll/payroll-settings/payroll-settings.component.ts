import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { environment } from '../../../../environments/environment';

interface TaxConfig {
  id?: number;
  name: string;
  nameAr?: string;
  branchId?: number;
  branchName?: string;
  effectiveDate: string;
  isActive: boolean;
  brackets: TaxBracket[];
  editing?: boolean;
}

interface TaxBracket {
  id?: number;
  minAmount: number;
  maxAmount: number;
  rate: number;
  fixedAmount: number;
}

interface SocialInsuranceConfig {
  id?: number;
  name: string;
  nameAr?: string;
  branchId?: number;
  branchName?: string;
  employeeContributionRate: number;
  employerContributionRate: number;
  maxInsurableSalary: number;
  /**
   * Optional ISO nationality code this config applies to (e.g. "SA" for Saudi-only GOSI rates).
   * Leave empty/null to apply to all nationalities.
   */
  appliesToNationalityCode?: string;
  effectiveDate: string;
  isActive: boolean;
  editing?: boolean;
}

interface InsuranceProvider {
  id?: number;
  name: string;
  nameAr?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  policyNumber?: string;
  insuranceType: number;
  isActive: boolean;
  employeeCount?: number;
  editing?: boolean;
}

interface PayrollCalendarPolicy {
  id?: number;
  branchId?: number;
  branchName?: string;
  /** 1 = CalendarDays, 2 = WorkingDays, 3 = FixedBasis */
  basisType: number;
  fixedBasisDays?: number;
  standardHoursPerDay: number;
  treatPublicHolidaysAsPaid: boolean;
  effectiveFromDate: string;
  effectiveToDate?: string;
  isActive: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-payroll-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, SectionCardComponent],
  templateUrl: './payroll-settings.component.html',
  styleUrls: ['./payroll-settings.component.css']
})
export class PayrollSettingsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/payroll-settings`;

  activeTab = signal<'tax' | 'social' | 'insurance' | 'calendar'>('tax');
  loading = signal(false);

  taxConfigs = signal<TaxConfig[]>([]);
  socialConfigs = signal<SocialInsuranceConfig[]>([]);
  insuranceProviders = signal<InsuranceProvider[]>([]);
  calendarPolicies = signal<PayrollCalendarPolicy[]>([]);

  ngOnInit(): void {
    this.loadTaxConfigs();
  }

  setTab(tab: 'tax' | 'social' | 'insurance' | 'calendar'): void {
    this.activeTab.set(tab);
    switch (tab) {
      case 'tax': this.loadTaxConfigs(); break;
      case 'social': this.loadSocialConfigs(); break;
      case 'insurance': this.loadInsuranceProviders(); break;
      case 'calendar': this.loadCalendarPolicies(); break;
    }
  }

  basisTypeLabel(t: number): string {
    switch (t) {
      case 1: return 'CalendarDays';
      case 2: return 'WorkingDays';
      case 3: return 'FixedBasis';
      default: return 'Unknown';
    }
  }

  // ── Tax Configurations ──────────────────────────────────────────

  private loadTaxConfigs(): void {
    this.loading.set(true);
    this.http.get<TaxConfig[]>(`${this.baseUrl}/tax-configs`).subscribe({
      next: (data) => {
        this.taxConfigs.set(data.map(d => ({ ...d, editing: false })));
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  addTaxConfig(): void {
    this.taxConfigs.update(items => [...items, {
      name: '', effectiveDate: new Date().toISOString().substring(0, 10),
      isActive: true, brackets: [], editing: true
    }]);
  }

  saveTaxConfig(item: TaxConfig, index: number): void {
    if (!item.name) {
      this.notificationService.error(this.i18n.t('common.name_required'));
      return;
    }

    const payload = {
      name: item.name,
      nameAr: item.nameAr,
      branchId: item.branchId,
      effectiveDate: item.effectiveDate,
      isActive: item.isActive,
      brackets: item.brackets?.map(b => ({
        id: b.id || undefined,
        minAmount: b.minAmount,
        maxAmount: b.maxAmount,
        rate: b.rate,
        fixedAmount: b.fixedAmount
      })) || []
    };

    if (item.id) {
      this.http.put(`${this.baseUrl}/tax-configs/${item.id}`, payload).subscribe({
        next: () => {
          item.editing = false;
          this.notificationService.success(this.i18n.t('common.saved_successfully'));
          this.loadTaxConfigs();
        },
        error: () => this.notificationService.error(this.i18n.t('common.error_saving'))
      });
    } else {
      this.http.post<{ id: number }>(`${this.baseUrl}/tax-configs`, payload).subscribe({
        next: (result) => {
          item.id = result.id;
          item.editing = false;
          this.notificationService.success(this.i18n.t('common.saved_successfully'));
          this.loadTaxConfigs();
        },
        error: () => this.notificationService.error(this.i18n.t('common.error_saving'))
      });
    }
  }

  removeTaxConfig(index: number): void {
    const item = this.taxConfigs()[index];
    if (item.id) {
      this.confirmationService.confirm({
        title: this.i18n.t('common.confirm_delete'),
        message: this.i18n.t('common.confirm_delete_message'),
        confirmText: this.i18n.t('common.delete'),
        confirmButtonClass: 'btn-danger'
      }).then(result => {
        if (result.confirmed) {
          this.http.delete(`${this.baseUrl}/tax-configs/${item.id}`).subscribe({
            next: () => {
              this.notificationService.success(this.i18n.t('common.deleted_successfully'));
              this.loadTaxConfigs();
            },
            error: () => this.notificationService.error(this.i18n.t('common.error_deleting'))
          });
        }
      });
    } else {
      this.taxConfigs.update(items => items.filter((_, i) => i !== index));
    }
  }

  // ── Social Insurance ────────────────────────────────────────────

  private loadSocialConfigs(): void {
    this.loading.set(true);
    this.http.get<SocialInsuranceConfig[]>(`${this.baseUrl}/social-insurance`).subscribe({
      next: (data) => {
        this.socialConfigs.set(data.map(d => ({ ...d, editing: false })));
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  addSocialConfig(): void {
    this.socialConfigs.update(items => [...items, {
      name: '', employeeContributionRate: 0, employerContributionRate: 0,
      maxInsurableSalary: 0, effectiveDate: new Date().toISOString().substring(0, 10),
      isActive: true, editing: true
    }]);
  }

  saveSocialConfig(item: SocialInsuranceConfig, index: number): void {
    if (!item.name) {
      this.notificationService.error(this.i18n.t('common.name_required'));
      return;
    }

    const payload = {
      name: item.name,
      nameAr: item.nameAr,
      branchId: item.branchId,
      employeeContributionRate: item.employeeContributionRate,
      employerContributionRate: item.employerContributionRate,
      maxInsurableSalary: item.maxInsurableSalary,
      appliesToNationalityCode: item.appliesToNationalityCode || null,
      effectiveDate: item.effectiveDate,
      isActive: item.isActive
    };

    if (item.id) {
      this.http.put(`${this.baseUrl}/social-insurance/${item.id}`, payload).subscribe({
        next: () => {
          item.editing = false;
          this.notificationService.success(this.i18n.t('common.saved_successfully'));
          this.loadSocialConfigs();
        },
        error: () => this.notificationService.error(this.i18n.t('common.error_saving'))
      });
    } else {
      this.http.post<{ id: number }>(`${this.baseUrl}/social-insurance`, payload).subscribe({
        next: (result) => {
          item.id = result.id;
          item.editing = false;
          this.notificationService.success(this.i18n.t('common.saved_successfully'));
          this.loadSocialConfigs();
        },
        error: () => this.notificationService.error(this.i18n.t('common.error_saving'))
      });
    }
  }

  removeSocialConfig(index: number): void {
    const item = this.socialConfigs()[index];
    if (item.id) {
      this.confirmationService.confirm({
        title: this.i18n.t('common.confirm_delete'),
        message: this.i18n.t('common.confirm_delete_message'),
        confirmText: this.i18n.t('common.delete'),
        confirmButtonClass: 'btn-danger'
      }).then(result => {
        if (result.confirmed) {
          this.http.delete(`${this.baseUrl}/social-insurance/${item.id}`).subscribe({
            next: () => {
              this.notificationService.success(this.i18n.t('common.deleted_successfully'));
              this.loadSocialConfigs();
            },
            error: () => this.notificationService.error(this.i18n.t('common.error_deleting'))
          });
        }
      });
    } else {
      this.socialConfigs.update(items => items.filter((_, i) => i !== index));
    }
  }

  // ── Insurance Providers ─────────────────────────────────────────

  private loadInsuranceProviders(): void {
    this.loading.set(true);
    this.http.get<InsuranceProvider[]>(`${this.baseUrl}/insurance-providers`).subscribe({
      next: (data) => {
        this.insuranceProviders.set(data.map(d => ({ ...d, editing: false })));
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  addInsuranceProvider(): void {
    this.insuranceProviders.update(items => [...items, {
      name: '', policyNumber: '', insuranceType: 0,
      isActive: true, editing: true
    }]);
  }

  saveInsuranceProvider(item: InsuranceProvider, index: number): void {
    if (!item.name) {
      this.notificationService.error(this.i18n.t('common.name_required'));
      return;
    }

    const payload = {
      name: item.name,
      nameAr: item.nameAr,
      contactPerson: item.contactPerson,
      phone: item.phone,
      email: item.email,
      policyNumber: item.policyNumber,
      insuranceType: item.insuranceType,
      isActive: item.isActive
    };

    if (item.id) {
      this.http.put(`${this.baseUrl}/insurance-providers/${item.id}`, payload).subscribe({
        next: () => {
          item.editing = false;
          this.notificationService.success(this.i18n.t('common.saved_successfully'));
          this.loadInsuranceProviders();
        },
        error: () => this.notificationService.error(this.i18n.t('common.error_saving'))
      });
    } else {
      this.http.post<{ id: number }>(`${this.baseUrl}/insurance-providers`, payload).subscribe({
        next: (result) => {
          item.id = result.id;
          item.editing = false;
          this.notificationService.success(this.i18n.t('common.saved_successfully'));
          this.loadInsuranceProviders();
        },
        error: () => this.notificationService.error(this.i18n.t('common.error_saving'))
      });
    }
  }

  removeInsuranceProvider(index: number): void {
    const item = this.insuranceProviders()[index];
    if (item.id) {
      this.confirmationService.confirm({
        title: this.i18n.t('common.confirm_delete'),
        message: this.i18n.t('common.confirm_delete_message'),
        confirmText: this.i18n.t('common.delete'),
        confirmButtonClass: 'btn-danger'
      }).then(result => {
        if (result.confirmed) {
          this.http.delete(`${this.baseUrl}/insurance-providers/${item.id}`).subscribe({
            next: () => {
              this.notificationService.success(this.i18n.t('common.deleted_successfully'));
              this.loadInsuranceProviders();
            },
            error: () => this.notificationService.error(this.i18n.t('common.error_deleting'))
          });
        }
      });
    } else {
      this.insuranceProviders.update(items => items.filter((_, i) => i !== index));
    }
  }

  // ── Payroll Calendar Policy ────────────────────────────────────

  private loadCalendarPolicies(): void {
    this.loading.set(true);
    this.http.get<PayrollCalendarPolicy[]>(`${this.baseUrl}/calendar-policies`).subscribe({
      next: (data) => {
        this.calendarPolicies.set(data.map(d => ({ ...d, editing: false })));
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  addCalendarPolicy(): void {
    this.calendarPolicies.update(items => [...items, {
      basisType: 1,
      fixedBasisDays: undefined,
      standardHoursPerDay: 8,
      treatPublicHolidaysAsPaid: true,
      effectiveFromDate: new Date().toISOString().substring(0, 10),
      isActive: true,
      editing: true
    }]);
  }

  saveCalendarPolicy(item: PayrollCalendarPolicy, index: number): void {
    if (item.basisType === 3 && (!item.fixedBasisDays || item.fixedBasisDays <= 0)) {
      this.notificationService.error('FixedBasisDays is required (> 0) when basis type is FixedBasis.');
      return;
    }
    if (!item.standardHoursPerDay || item.standardHoursPerDay <= 0) {
      this.notificationService.error('Standard hours per day must be > 0.');
      return;
    }
    const payload = {
      branchId: item.branchId,
      basisType: item.basisType,
      fixedBasisDays: item.basisType === 3 ? item.fixedBasisDays : null,
      standardHoursPerDay: item.standardHoursPerDay,
      treatPublicHolidaysAsPaid: item.treatPublicHolidaysAsPaid,
      effectiveFromDate: item.effectiveFromDate,
      effectiveToDate: item.effectiveToDate || null,
      isActive: item.isActive
    };
    const request$ = item.id
      ? this.http.put(`${this.baseUrl}/calendar-policies/${item.id}`, payload)
      : this.http.post<{ id: number }>(`${this.baseUrl}/calendar-policies`, payload);
    request$.subscribe({
      next: (result: any) => {
        if (!item.id && result?.id) item.id = result.id;
        item.editing = false;
        this.notificationService.success(this.i18n.t('common.saved_successfully'));
        this.loadCalendarPolicies();
      },
      error: () => this.notificationService.error(this.i18n.t('common.error_saving'))
    });
  }

  removeCalendarPolicy(index: number): void {
    const item = this.calendarPolicies()[index];
    if (item.id) {
      this.confirmationService.confirm({
        title: this.i18n.t('common.confirm_delete'),
        message: this.i18n.t('common.confirm_delete_message'),
        confirmText: this.i18n.t('common.delete'),
        confirmButtonClass: 'btn-danger'
      }).then(result => {
        if (result.confirmed) {
          this.http.delete(`${this.baseUrl}/calendar-policies/${item.id}`).subscribe({
            next: () => {
              this.notificationService.success(this.i18n.t('common.deleted_successfully'));
              this.loadCalendarPolicies();
            },
            error: () => this.notificationService.error(this.i18n.t('common.error_deleting'))
          });
        }
      });
    } else {
      this.calendarPolicies.update(items => items.filter((_, i) => i !== index));
    }
  }
}
