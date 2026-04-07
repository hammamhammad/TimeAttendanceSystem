import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ExpenseService } from '../../../../core/services/expense.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-create-expense-policy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-expense-policy.component.html',
  styleUrl: './create-expense-policy.component.css'
})
export class CreateExpensePolicyComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(ExpenseService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  isEdit = signal(false);
  entityId = signal<number | null>(null);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      maxClaimAmount: [0, [Validators.required, Validators.min(0)]],
      maxMonthlyAmount: [0, [Validators.required, Validators.min(0)]],
      requiresApproval: [true],
      approvalThreshold: [0],
      receiptRequiredAbove: [0],
      isActive: [true]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.entityId.set(+id);
      this.service.getPolicy(+id).subscribe({
        next: (p) => this.form.patchValue(p),
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const data = { ...this.form.value, allowedCategories: [] };
    const handler = { next: () => { this.notification.success(this.i18n.t(this.isEdit() ? 'expense_policies.updated' : 'expense_policies.created')); this.router.navigate(['/expenses/policies']); this.saving.set(false); }, error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); } };
    if (this.isEdit()) { this.service.updatePolicy(this.entityId()!, data).subscribe(handler); } else { this.service.createPolicy(data).subscribe(handler); }
  }
}
