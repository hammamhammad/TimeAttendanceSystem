import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeePromotionService } from '../../../core/services/employee-promotion.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartmentsService } from '../../departments/departments.service';
import { CreateEmployeePromotionRequest } from '../../../shared/models/employee-promotion.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-create-promotion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormHeaderComponent,
    FormSectionComponent,
    SearchableSelectComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private promotionService = inject(EmployeePromotionService);
  private employeeService = inject(EmployeeService);
  private departmentsService = inject(DepartmentsService);

  private route = inject(ActivatedRoute);

  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  employeeOptions: SearchableSelectOption[] = [];
  departmentOptions: SearchableSelectOption[] = [];

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    newJobTitle: ['', Validators.required],
    newJobTitleAr: [''],
    newGrade: [''],
    newDepartmentId: [null as number | null],
    newBaseSalary: [null as number | null],
    effectiveDate: ['', Validators.required],
    reason: [''],
    reasonAr: [''],
    notes: ['']
  });

  ngOnInit(): void {
    this.loadData();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadExistingData(+id);
    }
  }

  private loadExistingData(id: number): void {
    this.promotionService.getPromotionById(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          employeeId: data.employeeId,
          newJobTitle: data.newJobTitle,
          newJobTitleAr: data.newJobTitleAr,
          newGrade: data.newGrade,
          newDepartmentId: data.newDepartmentId,
          newBaseSalary: data.newBaseSalary,
          effectiveDate: data.effectiveDate?.substring(0, 10),
          reason: data.reason,
          reasonAr: data.reasonAr,
          notes: data.notes
        });
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error_loading'));
      }
    });
  }

  private loadData(): void {
    this.loading.set(true);
    let loaded = 0;
    const checkDone = () => { loaded++; if (loaded >= 2) this.loading.set(false); };

    this.employeeService.getDropdown().subscribe({
      next: (employees) => {
        this.employeeOptions = employees.map(e => ({
          value: e.id,
          label: `${e.name} (${e.employeeNumber})`
        }));
        checkDone();
      },
      error: () => { this.notification.error(this.i18n.t('common.error_loading_data')); checkDone(); }
    });

    this.departmentsService.getDepartments({}).subscribe({
      next: (departments) => {
        this.departmentOptions = departments.map(d => ({ value: d.id, label: d.name }));
        checkDone();
      },
      error: () => { checkDone(); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);

    const v = this.form.getRawValue();
    const request: CreateEmployeePromotionRequest = {
      employeeId: v.employeeId!,
      newJobTitle: v.newJobTitle!,
      newJobTitleAr: v.newJobTitleAr || undefined,
      newGrade: v.newGrade || undefined,
      newDepartmentId: v.newDepartmentId || undefined,
      newBaseSalary: v.newBaseSalary || undefined,
      effectiveDate: v.effectiveDate!,
      reason: v.reason || undefined,
      reasonAr: v.reasonAr || undefined,
      notes: v.notes || undefined
    };

    const action$ = this.isEditMode()
      ? this.promotionService.updatePromotion(this.editId()!, request as any)
      : this.promotionService.createPromotion(request);

    action$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'employee_promotions.updated_successfully' : 'employee_promotions.created_successfully'));
        this.router.navigate(['/employee-promotions']);
      },
      error: () => {
        this.notification.error(this.i18n.t(this.isEditMode() ? 'employee_promotions.update_error' : 'employee_promotions.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
