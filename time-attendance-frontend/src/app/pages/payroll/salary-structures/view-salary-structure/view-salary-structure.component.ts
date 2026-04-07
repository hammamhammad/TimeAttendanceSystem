import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { SalaryStructureService } from '../../../../core/services/salary-structure.service';
import { SalaryStructure } from '../../../../shared/models/salary-structure.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-salary-structure',
  standalone: true,
  imports: [
    RouterModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, DataTableComponent,
    AuditHistoryComponent
  ],
  templateUrl: './view-salary-structure.component.html',
  styleUrls: ['./view-salary-structure.component.css']
})
export class ViewSalaryStructureComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private salaryStructureService = inject(SalaryStructureService);
  private notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  structure = signal<SalaryStructure | null>(null);

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const s = this.structure();
    if (!s) return [];
    return [
      { label: this.i18n.t('common.name'), value: s.name },
      { label: this.i18n.t('common.name_ar'), value: s.nameAr || '-' },
      { label: this.i18n.t('common.branch'), value: s.branchName || this.i18n.t('common.all') },
      { label: this.i18n.t('common.description'), value: s.description || '-' },
      { label: this.i18n.t('common.status'), value: s.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'), type: 'badge', badgeVariant: s.isActive ? 'success' : 'secondary' },
      { label: this.i18n.t('payroll.salary_structures.components'), value: (s.components?.length || 0) + '' },
      { label: this.i18n.t('common.created_at'), value: s.createdAtUtc, type: 'date' }
    ];
  });

  private componentTypeMap: Record<number, string> = {
    0: 'Basic', 1: 'Basic', 2: 'HousingAllowance', 3: 'TransportAllowance', 4: 'PhoneAllowance',
    5: 'FoodAllowance', 6: 'OtherAllowance', 10: 'TaxDeduction', 11: 'SocialInsuranceDeduction',
    12: 'LoanDeduction', 13: 'OtherDeduction', 20: 'Benefit'
  };

  private calcTypeMap: Record<number, string> = {
    0: 'Fixed', 1: 'Fixed', 2: 'PercentageOfBasic', 3: 'PercentageOfGross'
  };

  getComponentTypeName(type: number | string): string {
    if (typeof type === 'string' && isNaN(Number(type))) return this.i18n.t('payroll.component_types.' + type);
    const key = this.componentTypeMap[Number(type)];
    return key ? this.i18n.t('payroll.component_types.' + key) : String(type);
  }

  getCalcTypeName(type: number | string): string {
    if (typeof type === 'string' && isNaN(Number(type))) return this.i18n.t('payroll.calculation_types.' + type);
    const key = this.calcTypeMap[Number(type)];
    return key ? this.i18n.t('payroll.calculation_types.' + key) : String(type);
  }

  componentColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('common.name'), priority: 'high' },
    { key: 'componentType', label: this.i18n.t('payroll.salary_structures.component_type'), priority: 'high' },
    { key: 'calculationType', label: this.i18n.t('payroll.salary_structures.calculation_type'), priority: 'medium' },
    { key: 'amount', label: this.i18n.t('common.amount'), priority: 'medium' },
    { key: 'percentage', label: this.i18n.t('common.percentage'), priority: 'low' },
    { key: 'isTaxable', label: this.i18n.t('payroll.salary_structures.taxable'), priority: 'low' }
  ];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.loadData(id);
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.salaryStructureService.getById(id).subscribe({
      next: (data) => {
        this.structure.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }
}
