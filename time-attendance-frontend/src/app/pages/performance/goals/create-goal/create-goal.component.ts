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
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-create-goal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent, LoadingSpinnerComponent],
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private service = inject(PerformanceService);
  private employeeService = inject(EmployeeService);

  submitting = signal(false);
  loading = signal(false);
  employeeOptions: SearchableSelectOption[] = [];

  goalTypeOptions = computed<SearchableSelectOption[]>(() => [
    { value: 'Individual', label: this.i18n.t('goals.category_individual') },
    { value: 'Team', label: this.i18n.t('goals.category_team') },
    { value: 'Department', label: this.i18n.t('goals.category_department') },
    { value: 'Organization', label: this.i18n.t('goals.category_organization') }
  ]);

  priorityOptions = computed<SearchableSelectOption[]>(() => [
    { value: 'Low', label: this.i18n.t('goals.priority_low') },
    { value: 'Medium', label: this.i18n.t('goals.priority_medium') },
    { value: 'High', label: this.i18n.t('goals.priority_high') },
    { value: 'Critical', label: this.i18n.t('goals.priority_critical') }
  ]);

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    title: ['', Validators.required],
    titleAr: [''],
    description: [''],
    descriptionAr: [''],
    goalType: ['Individual', Validators.required],
    priority: ['Medium', Validators.required],
    dueDate: [''],
    weight: [100, [Validators.required, Validators.min(1), Validators.max(100)]],
    targetValue: [''],
    unit: ['']
  });

  ngOnInit(): void {
    this.loading.set(true);
    this.employeeService.getDropdown().subscribe({
      next: (e) => { this.employeeOptions = e.map(x => ({ value: x.id, label: `${x.name} (${x.employeeNumber})` })); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    this.service.createGoal({
      employeeId: v.employeeId!,
      title: v.title!,
      titleAr: v.titleAr || undefined,
      description: v.description || undefined,
      descriptionAr: v.descriptionAr || undefined,
      goalType: v.goalType as any,
      priority: v.priority as any,
      dueDate: v.dueDate || undefined,
      weight: v.weight!,
      targetValue: v.targetValue || undefined,
      unit: v.unit || undefined
    }).subscribe({
      next: () => { this.notification.success(this.i18n.t('goals.created_success')); this.router.navigate(['/performance/goals']); },
      error: () => { this.notification.error(this.i18n.t('goals.create_error')); this.submitting.set(false); }
    });
  }
}
