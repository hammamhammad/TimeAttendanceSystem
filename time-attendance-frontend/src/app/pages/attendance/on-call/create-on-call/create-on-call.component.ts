import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { OnCallScheduleService } from '../../../../core/services/on-call-schedule.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-on-call',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormSectionComponent,
    SearchableSelectComponent
  ],
  templateUrl: './create-on-call.component.html',
  styleUrls: ['./create-on-call.component.css']
})
export class CreateOnCallComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private service = inject(OnCallScheduleService);
  private employeeService = inject(EmployeeService);

  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  scheduleId = signal<number | null>(null);
  employeeOptions: SearchableSelectOption[] = [];

  onCallTypes = [
    { value: 'Primary', label: 'Primary' },
    { value: 'Secondary', label: 'Secondary' },
    { value: 'Weekend', label: 'Weekend' },
    { value: 'Holiday', label: 'Holiday' },
    { value: 'Overnight', label: 'Overnight' }
  ];

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    onCallType: ['Primary', Validators.required],
    shiftId: [null as number | null],
    notes: [''],
    notesAr: [''],
    isActive: [true]
  });

  ngOnInit() {
    this.loadEmployees();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.scheduleId.set(+id);
      this.loadSchedule(+id);
    }
  }

  loadEmployees() {
    this.employeeService.getDropdown().subscribe({
      next: (employees) => {
        this.employeeOptions = employees.map(e => ({
          value: e.id,
          label: `${e.name} (${e.employeeNumber})`
        }));
      }
    });
  }

  loadSchedule(id: number) {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (schedule: any) => {
        this.form.patchValue({
          employeeId: schedule.employeeId,
          startDate: schedule.startDate?.substring(0, 10),
          endDate: schedule.endDate?.substring(0, 10),
          onCallType: schedule.onCallType,
          shiftId: schedule.shiftId,
          notes: schedule.notes,
          notesAr: schedule.notesAr,
          isActive: schedule.isActive
        });
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.load_error'));
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const data = this.form.value;

    const request = this.isEditMode()
      ? this.service.update(this.scheduleId()!, { id: this.scheduleId(), ...data })
      : this.service.create(data);

    request.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'common.updated' : 'common.created'));
        this.router.navigate(['/attendance/on-call']);
      },
      error: (err: any) => {
        this.notification.error(err?.error?.error || this.i18n.t('common.save_error'));
        this.submitting.set(false);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/attendance/on-call']);
  }
}
