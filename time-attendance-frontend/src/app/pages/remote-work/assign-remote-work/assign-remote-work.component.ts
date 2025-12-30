import { Component, OnInit, signal, inject, computed } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteWorkRequestsService } from '../../../core/services/remote-work-requests.service';
import { RemoteWorkRequestStatus } from '../../../core/models/remote-work-request.model';
import { EmployeesService } from '../../employees/employees.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-assign-remote-work',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormHeaderComponent,
    FormSectionComponent,
    SearchableSelectComponent,
    LoadingSpinnerComponent
],
  templateUrl: './assign-remote-work.component.html',
  styleUrls: ['./assign-remote-work.component.css']
})
export class AssignRemoteWorkComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly remoteWorkService = inject(RemoteWorkRequestsService);
  private readonly employeesService = inject(EmployeesService);
  private readonly notification = inject(NotificationService);
  private readonly authService = inject(AuthService);
  readonly i18n = inject(I18nService);

  form!: FormGroup;
  loading = signal(false);
  submitting = signal(false);
  employees = signal<any[]>([]);

  employeeOptions = computed(() =>
    this.employees().map(emp => ({
      value: emp.id,
      label: `${emp.name} (${emp.employeeNumber})`
    }))
  );

  statusOptions = [
    { value: RemoteWorkRequestStatus.Pending, label: this.i18n.t('remoteWork.status.pending') },
    { value: RemoteWorkRequestStatus.Approved, label: this.i18n.t('remoteWork.status.approved') },
    { value: RemoteWorkRequestStatus.Rejected, label: this.i18n.t('remoteWork.status.rejected') },
    { value: RemoteWorkRequestStatus.Cancelled, label: this.i18n.t('remoteWork.status.cancelled') }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.loadEmployees();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: [''],
      status: [RemoteWorkRequestStatus.Approved, Validators.required],
      approvalComments: ['']
    });
  }

  private loadEmployees(): void {
    this.loading.set(true);
    this.employeesService.getEmployeesForSelection().subscribe({
      next: (employees) => {
        this.employees.set(employees);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.notification.error(this.i18n.t('remoteWork.request.errors.load_employees_failed'));
        this.loading.set(false);
      }
    });
  }

  onEmployeeSelectionChange(employeeId: any): void {
    const id = employeeId ? (typeof employeeId === 'number' ? employeeId : parseInt(employeeId)) : null;
    this.form.patchValue({ employeeId: id });
    this.form.get('employeeId')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notification.warning(this.i18n.t('app.checkForm'));
      return;
    }

    const currentUser = this.authService.currentUser();
    if (!currentUser?.id) {
      this.notification.error(this.i18n.t('auth.session_expired'));
      return;
    }

    this.submitting.set(true);

    const formValue = this.form.value;
    const request = {
      ...formValue,
      createdByUserId: currentUser.id
    };

    this.remoteWorkService.create(request).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('remoteWork.request.success.created'));
        this.router.navigate(['/remote-work']);
      },
      error: (error) => {
        console.error('Error creating remote work request:', error);
        this.notification.error(this.i18n.t('remoteWork.request.errors.create_failed'));
        this.submitting.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/remote-work']);
  }
}
