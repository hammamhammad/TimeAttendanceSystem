import { Component, signal, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TrainingService } from '../../../../core/services/training.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TrainingService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('trainingSession.update');
  }
  form!: FormGroup;
  saving = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  courseOptions = signal<SearchableSelectOption[]>([]);
  programOptions = signal<SearchableSelectOption[]>([]);
  trainerOptions = signal<SearchableSelectOption[]>([]);

  deliveryMethods = ['InPerson', 'Online', 'Hybrid', 'SelfPaced', 'OnTheJob'];

  ngOnInit(): void {
    this.form = this.fb.group({
      courseId: [null, Validators.required],
      programId: [null],
      title: ['', Validators.required],
      titleAr: [''],
      deliveryMethod: ['InPerson', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: [''],
      endTime: [''],
      location: [''],
      locationAr: [''],
      onlineLink: [''],
      trainerId: [null],
      maxParticipants: [30, [Validators.required, Validators.min(1)]],
      branchId: [null],
      notes: ['']
    });

    this.loadDropdowns();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadSession(+id);
    }
  }

  private loadDropdowns(): void {
    this.service.getCourseDropdown().subscribe({
      next: (data) => this.courseOptions.set(data.map(c => ({ value: c.id, label: `${c.code} - ${c.name}` }))),
      error: () => {}
    });
    this.service.getProgramDropdown().subscribe({
      next: (data) => this.programOptions.set(data.map(p => ({ value: p.id, label: p.name }))),
      error: () => {}
    });
    this.employeeService.getDropdown().subscribe({
      next: (data) => this.trainerOptions.set(data.map(e => ({ value: e.id, label: e.name, subLabel: e.employeeNumber }))),
      error: () => {}
    });
  }

  private loadSession(id: number): void {
    this.service.getSession(id).subscribe({
      next: (s) => {
        this.form.patchValue(s);
        if (!this.canEdit()) {
          this.form.disable({ emitEvent: false });
        }
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.router.navigate(['/training/sessions']); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.value;
    const obs$ = this.isEditMode()
      ? this.service.updateSession(this.editId()!, val)
      : this.service.createSession(val);
    (obs$ as any).subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'training_sessions.updated' : 'training_sessions.created'));
        this.router.navigate(['/training/sessions']);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }
}
