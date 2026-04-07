import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PerformanceService } from '../../../../core/services/performance.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-feedback-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-feedback-request.component.html',
  styleUrls: ['./create-feedback-request.component.css']
})
export class CreateFeedbackRequestComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private service = inject(PerformanceService);
  private employeeService = inject(EmployeeService);

  submitting = signal(false);

  reviews = signal<{ id: number; employeeName: string; cycleName: string }[]>([]);
  reviewOptions = computed(() => this.reviews().map(r => ({
    value: r.id,
    label: `${r.employeeName} - ${r.cycleName}`
  })));

  employees = signal<{ id: number; name: string; employeeNumber: string }[]>([]);
  employeeOptions = computed(() => this.employees().map(e => ({ value: e.id, label: e.name })));

  form = this.fb.group({
    performanceReviewId: [null as number | null, Validators.required],
    requestedFromEmployeeId: [null as number | null, Validators.required],
    deadline: ['']
  });

  ngOnInit(): void {
    this.loadDropdowns();
  }

  loadDropdowns(): void {
    this.service.getReviews({ pageSize: 200 }).subscribe({
      next: (res) => this.reviews.set((res.data || []).map(r => ({
        id: r.id,
        employeeName: r.employeeName || '',
        cycleName: r.cycleName || ''
      })))
    });
    this.employeeService.getDropdown().subscribe({
      next: (data) => this.employees.set(data)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }
    this.submitting.set(true);
    const data = this.form.getRawValue() as any;
    if (data.deadline) {
      data.deadline = new Date(data.deadline).toISOString();
    } else {
      delete data.deadline;
    }

    this.service.createFeedbackRequest(data).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('feedback_360.created_success'));
        this.router.navigate(['/performance/feedback-requests']);
      },
      error: () => {
        this.notification.error(this.i18n.t('feedback_360.create_error'));
        this.submitting.set(false);
      }
    });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }
}
