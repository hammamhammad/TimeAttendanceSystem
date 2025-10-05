import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-edit-remote-work',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormHeaderComponent,
    FormSectionComponent,
    SearchableSelectComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './edit-remote-work.component.html',
  styleUrls: ['./edit-remote-work.component.css']
})
export class EditRemoteWorkComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly remoteWorkService = inject(RemoteWorkRequestsService);
  private readonly employeesService = inject(EmployeesService);
  private readonly notification = inject(NotificationService);
  readonly i18n = inject(I18nService);

  form!: FormGroup;
  loading = signal(false);
  submitting = signal(false);
  employees = signal<any[]>([]);
  requestId = signal<number | null>(null);

  employeeOptions = computed(() =>
    this.employees().map(emp => ({
      value: emp.id,
      label: `${emp.name} (${emp.employeeNumber})`
    }))
  );

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requestId.set(parseInt(id, 10));
      this.initializeForm();
      this.loadEmployees();
      this.loadRequest();
    } else {
      this.notification.error(this.i18n.t('remoteWork.request.errors.not_found'));
      this.router.navigate(['/remote-work']);
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      employeeId: [{ value: null, disabled: true }, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: [''],
      status: [{ value: RemoteWorkRequestStatus.Pending, disabled: true }],
      rejectionReason: [{ value: '', disabled: true }]
    });
  }

  private loadEmployees(): void {
    this.employeesService.getEmployeesForSelection().subscribe({
      next: (employees) => {
        this.employees.set(employees);
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.notification.error(this.i18n.t('remoteWork.request.errors.load_employees_failed'));
      }
    });
  }

  private loadRequest(): void {
    const id = this.requestId();
    if (!id) return;

    this.loading.set(true);
    this.remoteWorkService.getById(id).subscribe({
      next: (request) => {
        this.form.patchValue({
          employeeId: request.employeeId,
          startDate: request.startDate,
          endDate: request.endDate,
          reason: request.reason || '',
          status: request.status,
          rejectionReason: request.rejectionReason || ''
        });
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('remoteWork.request.errors.load_failed'));
        this.loading.set(false);
        this.router.navigate(['/remote-work']);
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

    const id = this.requestId();
    if (!id) {
      this.notification.error(this.i18n.t('remoteWork.request.errors.not_found'));
      return;
    }

    this.submitting.set(true);

    // Get the form values and include disabled fields
    const formValue = this.form.getRawValue();

    // Build the update request payload
    const updateRequest = {
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      reason: formValue.reason || '',
      status: formValue.status,
      rejectionReason: formValue.rejectionReason || ''
    };

    this.remoteWorkService.update(id, updateRequest).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('remoteWork.request.success.updated'));
        this.router.navigate(['/remote-work/view', id]);
      },
      error: (error) => {
        console.error('Error updating remote work request:', error);
        const errorMessage = error?.error?.error || this.i18n.t('remoteWork.request.errors.update_failed');
        this.notification.error(errorMessage);
        this.submitting.set(false);
      }
    });
  }

  onCancel(): void {
    const id = this.requestId();
    if (id) {
      this.router.navigate(['/remote-work', id, 'view']);
    } else {
      this.router.navigate(['/remote-work']);
    }
  }
}
