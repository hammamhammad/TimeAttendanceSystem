import { Component, signal, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { SalaryStructureService } from '../../../../core/services/salary-structure.service';
import { AllowanceService } from '../../../../core/services/allowance.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { environment } from '../../../../../environments/environment';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-salary-structure',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, LoadingSpinnerComponent, SearchableSelectComponent],
  templateUrl: './create-salary-structure.component.html',
  styleUrls: ['./create-salary-structure.component.css']
})
export class CreateSalaryStructureComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private salaryStructureService = inject(SalaryStructureService);
  private allowanceService = inject(AllowanceService);
  private notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('salaryStructure.manage');
  }
  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  form!: FormGroup;

  branchOptions: SearchableSelectOption[] = [];

  // Loaded from AllowanceType API - falls back to defaults if empty
  componentTypeOptions = signal<{ value: number; label: string }[]>([]);

  private defaultComponentTypes = [
    { value: 1, label: 'Basic' },
    { value: 2, label: 'HousingAllowance' },
    { value: 3, label: 'TransportAllowance' },
    { value: 4, label: 'PhoneAllowance' },
    { value: 5, label: 'FoodAllowance' },
    { value: 6, label: 'OtherAllowance' },
    { value: 10, label: 'TaxDeduction' },
    { value: 11, label: 'SocialInsuranceDeduction' },
    { value: 12, label: 'LoanDeduction' },
    { value: 13, label: 'OtherDeduction' },
    { value: 20, label: 'Benefit' }
  ];

  calculationTypeOptions = [
    { value: 1, label: 'Fixed' },
    { value: 2, label: 'PercentageOfBasic' },
    { value: 3, label: 'PercentageOfGross' }
  ];

  get components(): FormArray {
    return this.form.get('components') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      branchId: [null],
      isActive: [true],
      components: this.fb.array([])
    });

    // Load component types from AllowanceType API
    this.loadComponentTypes();
    this.loadBranches();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadExistingData(+id);
    } else {
      this.addComponent();
    }
  }

  private loadComponentTypes(): void {
    this.allowanceService.getAllowanceTypeDropdown().subscribe({
      next: (types: any[]) => {
        if (types && types.length > 0) {
          // Use AllowanceType entities from the database
          this.componentTypeOptions.set(types.map((t: any) => ({
            value: t.id,
            label: t.name  // Already human-readable from API
          })));
        } else {
          // Fallback: translate default enum keys via i18n
          this.componentTypeOptions.set(this.defaultComponentTypes.map(t => ({
            value: t.value,
            label: this.i18n.t('payroll.component_types.' + t.label)
          })));
        }
      },
      error: () => {
        this.componentTypeOptions.set(this.defaultComponentTypes.map(t => ({
          value: t.value,
          label: this.i18n.t('payroll.component_types.' + t.label)
        })));
      }
    });
  }

  private loadBranches(): void {
    this.http.get<any[]>(`${environment.apiUrl}/api/v1/branches/dropdown`).subscribe({
      next: (data) => {
        const items = Array.isArray(data) ? data : [];
        this.branchOptions = items.map(b => ({ value: b.id, label: b.name }));
      },
      error: () => {}
    });
  }

  private loadExistingData(id: number): void {
    this.loading.set(true);
    this.salaryStructureService.getById(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          name: data.name,
          nameAr: data.nameAr,
          description: data.description,
          branchId: data.branchId,
          isActive: data.isActive
        });
        if (!this.canEdit()) {
          this.form.disable();
        }
        if (data.components?.length) {
          data.components.forEach((comp: any) => {
            this.components.push(this.fb.group({
              name: [comp.name, Validators.required],
              nameAr: [comp.nameAr || ''],
              type: [(comp.componentType && comp.componentType > 0) ? comp.componentType : this.guessComponentType(comp.name), Validators.required],
              calculationType: [(comp.calculationType && comp.calculationType > 0) ? comp.calculationType : 1, Validators.required],
              amount: [comp.amount || 0],
              percentage: [comp.percentage || 0],
              isTaxable: [comp.isTaxable ?? true],
              isFixed: [comp.isRecurring ?? true],
              sortOrder: [comp.displayOrder || comp.sortOrder || this.components.length + 1]
            }));
          });
        } else {
          this.addComponent();
        }
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  addComponent(): void {
    this.components.push(this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      type: [6, Validators.required],
      calculationType: [1, Validators.required],
      amount: [0],
      percentage: [0],
      isTaxable: [true],
      isFixed: [true],
      sortOrder: [this.components.length + 1]
    }));
  }

  private guessComponentType(name: string): number {
    const lower = (name || '').toLowerCase();
    if (lower.includes('basic')) return 1;
    if (lower.includes('housing')) return 2;
    if (lower.includes('transport')) return 3;
    if (lower.includes('phone')) return 4;
    if (lower.includes('food')) return 5;
    if (lower.includes('tax')) return 10;
    if (lower.includes('social') || lower.includes('insurance')) return 11;
    if (lower.includes('loan')) return 12;
    if (lower.includes('benefit')) return 20;
    return 6; // OtherAllowance
  }

  removeComponent(index: number): void {
    this.components.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);

    const request$ = this.isEditMode()
      ? this.salaryStructureService.update(this.editId()!, this.form.value)
      : this.salaryStructureService.create(this.form.value);

    const successKey = this.isEditMode()
      ? 'payroll.salary_structures.updated_success'
      : 'payroll.salary_structures.created_successfully';

    request$.subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t(successKey));
        this.router.navigate(['/payroll/salary-structures']);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_saving'));
        this.submitting.set(false);
      }
    });
  }
}
