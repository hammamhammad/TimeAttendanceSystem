import { Component, signal, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TerminationService } from '../../../../core/services/termination.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { TerminationType } from '../../../../shared/models/termination.model';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-termination',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent, LoadingSpinnerComponent],
  templateUrl: './create-termination.component.html',
  styleUrls: ['./create-termination.component.css']
})
export class CreateTerminationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private terminationService = inject(TerminationService);
  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('termination.manage');
  }
  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  form!: FormGroup;
  employeeOptions: SearchableSelectOption[] = [];

  terminationTypes: TerminationType[] = ['Resignation', 'Termination', 'EndOfContract', 'Retirement', 'Redundancy', 'MutualAgreement'];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      terminationType: ['Termination', Validators.required],
      terminationDate: ['', Validators.required],
      lastWorkingDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
    this.loadEmployees();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadExistingData(+id);
    }
  }

  private loadExistingData(id: number): void {
    this.terminationService.getById(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          employeeId: data.employeeId,
          terminationType: data.terminationType,
          terminationDate: data.terminationDate?.substring(0, 10),
          lastWorkingDate: data.lastWorkingDate?.substring(0, 10),
          reason: data.reason
        });
        if (!this.canEdit()) {
          this.form.disable();
        }
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
      }
    });
  }

  private loadEmployees(): void {
    this.loading.set(true);
    this.employeeService.getDropdown().subscribe({
      next: (employees) => {
        this.employeeOptions = employees.map(e => ({
          value: e.id,
          label: `${e.name} (${e.employeeNumber})`
        }));
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading_data'));
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);

    const action$ = this.isEditMode()
      ? this.http.put<any>(`${environment.apiUrl}/api/v1/terminations/${this.editId()}`, this.form.value)
      : this.terminationService.create(this.form.value);

    action$.subscribe({
      next: (result: any) => {
        this.notificationService.success(this.i18n.t(this.isEditMode() ? 'offboarding.terminations.updated_successfully' : 'offboarding.terminations.created_successfully'));
        this.router.navigate(['/offboarding/terminations']);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_saving'));
        this.submitting.set(false);
      }
    });
  }
}
