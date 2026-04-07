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

@Component({
  selector: 'app-create-certification',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-certification.component.html',
  styleUrls: ['./create-certification.component.css']
})
export class CreateCertificationComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TrainingService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  employeeOptions = signal<SearchableSelectOption[]>([]);
  courseOptions = signal<SearchableSelectOption[]>([]);

  statuses = ['Active', 'Expired', 'Revoked', 'Pending'];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      certificationName: ['', Validators.required],
      certificationNameAr: [''],
      issuingOrganization: ['', Validators.required],
      issuingOrganizationAr: [''],
      credentialId: [''],
      issueDate: ['', Validators.required],
      expiryDate: [''],
      status: ['Active', Validators.required],
      courseId: [null],
      sessionId: [null],
      notes: ['']
    });

    this.loadDropdowns();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadCertification(+id);
    }
  }

  private loadDropdowns(): void {
    this.employeeService.getDropdown().subscribe({
      next: (data) => this.employeeOptions.set(data.map(e => ({ value: e.id, label: e.name, subLabel: e.employeeNumber }))),
      error: () => {}
    });
    this.service.getCourseDropdown().subscribe({
      next: (data) => this.courseOptions.set(data.map(c => ({ value: c.id, label: `${c.code} - ${c.name}` }))),
      error: () => {}
    });
  }

  private loadCertification(id: number): void {
    this.service.getCertification(id).subscribe({
      next: (c) => this.form.patchValue(c),
      error: () => { this.notification.error(this.i18n.t('common.error')); this.router.navigate(['/training/certifications']); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.value;
    const obs$ = this.isEditMode()
      ? this.service.updateCertification(this.editId()!, val)
      : this.service.createCertification(val);
    (obs$ as any).subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'certifications.updated' : 'certifications.created'));
        this.router.navigate(['/training/certifications']);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }
}
