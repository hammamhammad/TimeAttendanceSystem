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

@Component({
  selector: 'app-create-investigation',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-investigation.component.html',
  styleUrls: ['./create-investigation.component.css']
})
export class CreateInvestigationComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(EmployeeRelationsService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  employeeOptions = signal<SearchableSelectOption[]>([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      relatedGrievanceId: [null]
    });

    this.loadEmployees();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadInvestigation(+id);
    }
  }

  private loadEmployees(): void {
    this.employeeService.getDropdown().subscribe({
      next: (data) => this.employeeOptions.set(data.map(e => ({ value: e.id, label: `${e.name} (${e.employeeNumber})` }))),
      error: () => {}
    });
  }

  private loadInvestigation(id: number): void {
    this.service.getInvestigation(id).subscribe({
      next: (inv) => {
        this.form.patchValue({
          ...inv,
          startDate: inv.startDate?.split('T')[0]
        });
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.router.navigate(['/employee-relations/investigations']); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.value;
    const obs$ = this.isEditMode()
      ? this.service.updateInvestigation(this.editId()!, val)
      : this.service.createInvestigation(val);
    (obs$ as any).subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'investigations.updated' : 'investigations.created'));
        this.router.navigate(['/employee-relations/investigations']);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }
}
