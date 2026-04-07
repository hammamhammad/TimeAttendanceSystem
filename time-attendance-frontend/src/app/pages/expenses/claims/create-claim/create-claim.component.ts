import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ExpenseService } from '../../../../core/services/expense.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-claim',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.css']
})
export class CreateClaimComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly expenseService = inject(ExpenseService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  employeeOptions = signal<SearchableSelectOption[]>([]);
  categoryOptions = signal<SearchableSelectOption[]>([]);

  totalAmount = computed(() => {
    const items = this.form?.get('items') as FormArray;
    if (!items) return 0;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += +(items.at(i).get('amount')?.value || 0);
    }
    return total;
  });

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      currency: ['SAR'],
      description: [''],
      items: this.fb.array([])
    });

    this.addItem();
    this.loadEmployees();
    this.loadCategories();
  }

  private loadEmployees(): void {
    this.employeeService.getDropdown().subscribe({
      next: (data) => {
        this.employeeOptions.set(data.map(e => ({
          value: e.id,
          label: e.name,
          subLabel: e.employeeNumber
        })));
      },
      error: () => {}
    });
  }

  private loadCategories(): void {
    this.expenseService.getCategoryDropdown().subscribe({
      next: (data) => {
        this.categoryOptions.set(data.map(c => ({
          value: c.id,
          label: c.name
        })));
      },
      error: () => {}
    });
  }

  addItem(): void {
    this.items.push(this.fb.group({
      expenseCategoryId: [null],
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      expenseDate: ['', Validators.required],
      notes: ['']
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid || this.items.length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.form.value;
    const request = {
      employeeId: formValue.employeeId,
      currency: formValue.currency || 'SAR',
      description: formValue.description || undefined,
      items: formValue.items.map((item: any) => ({
        expenseCategoryId: item.expenseCategoryId || undefined,
        description: item.description,
        amount: +item.amount,
        expenseDate: item.expenseDate,
        notes: item.notes || undefined
      }))
    };

    this.expenseService.createClaim(request).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('expense_claims.created'));
        this.router.navigate(['/expenses/claims']);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.saving.set(false);
      }
    });
  }
}
