import { Component, signal, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { EmployeeRelationsService } from '../../../../core/services/employee-relations.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-grievance',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-grievance.component.html',
  styleUrls: ['./create-grievance.component.css']
})
export class CreateGrievanceComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(EmployeeRelationsService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('grievance.update');
  }
  form!: FormGroup;
  saving = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  employeeOptions = signal<SearchableSelectOption[]>([]);

  grievanceTypes = ['Workplace', 'Harassment', 'Discrimination', 'Compensation', 'WorkConditions', 'Management', 'Policy', 'Other'];
  priorities = ['Low', 'Medium', 'High', 'Critical'];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      grievanceType: ['Workplace', Validators.required],
      priority: ['Medium', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
      desiredResolution: ['']
    });

    this.loadEmployees();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadGrievance(+id);
    }
  }

  private loadEmployees(): void {
    this.employeeService.getDropdown().subscribe({
      next: (data) => this.employeeOptions.set(data.map(e => ({ value: e.id, label: `${e.name} (${e.employeeNumber})` }))),
      error: () => {}
    });
  }

  private loadGrievance(id: number): void {
    this.service.getGrievance(id).subscribe({
      next: (g) => {
        this.form.patchValue(g);
        if (!this.canEdit()) {
          this.form.disable({ emitEvent: false });
        }
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.router.navigate(['/employee-relations/grievances']); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.value;
    const obs$ = this.isEditMode()
      ? this.service.updateGrievance(this.editId()!, val)
      : this.service.createGrievance(val);
    (obs$ as any).subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'grievances.updated' : 'grievances.created'));
        this.router.navigate(['/employee-relations/grievances']);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }
}
