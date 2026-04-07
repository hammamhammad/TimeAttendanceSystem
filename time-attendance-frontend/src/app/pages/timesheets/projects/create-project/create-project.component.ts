import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TimesheetService } from '../../../../core/services/timesheet.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TimesheetService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  isEdit = signal(false);
  entityId = signal<number | null>(null);
  branches = signal<any[]>([]);
  employees = signal<any[]>([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      descriptionAr: [''],
      clientName: [''],
      clientNameAr: [''],
      managerEmployeeId: [null],
      branchId: [null, Validators.required],
      startDate: [''],
      endDate: [''],
      budgetHours: [null],
      status: ['Active'],
      isActive: [true],
      isChargeable: [true]
    });

    this.loadDropdowns();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.entityId.set(+id);
      this.service.getProject(+id).subscribe({
        next: (p) => this.form.patchValue({
          code: p.code, name: p.name, nameAr: p.nameAr, description: p.description, descriptionAr: p.descriptionAr,
          clientName: p.clientName, clientNameAr: p.clientNameAr, managerEmployeeId: p.managerEmployeeId,
          branchId: p.branchId, startDate: p.startDate ? p.startDate.substring(0, 10) : '',
          endDate: p.endDate ? p.endDate.substring(0, 10) : '', budgetHours: p.budgetHours,
          status: p.status, isActive: p.isActive, isChargeable: p.isChargeable
        }),
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  private loadDropdowns(): void {
    // Load branches from API
    import('../../../../core/services/timesheet.service').then(() => {
      const http = (this.service as any).http;
      const baseUrl = (this.service as any).baseUrl;
      http.get(`${baseUrl}/branches?pageSize=200`).subscribe({
        next: (res: any) => this.branches.set(res.data || res),
        error: () => {}
      });
      http.get(`${baseUrl}/employees?pageSize=500`).subscribe({
        next: (res: any) => this.employees.set((res.data || res).map((e: any) => ({ id: e.id, name: e.firstName + ' ' + e.lastName }))),
        error: () => {}
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const data = { ...this.form.value };
    if (data.startDate) data.startDate = new Date(data.startDate).toISOString();
    if (data.endDate) data.endDate = new Date(data.endDate).toISOString();
    if (!data.managerEmployeeId) data.managerEmployeeId = null;
    if (!data.budgetHours) data.budgetHours = null;

    const handler = {
      next: () => { this.notification.success(this.i18n.t(this.isEdit() ? 'timesheets.projects.updated' : 'timesheets.projects.created')); this.router.navigate(['/timesheets/projects']); this.saving.set(false); },
      error: (err: any) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.saving.set(false); }
    };
    if (this.isEdit()) this.service.updateProject(this.entityId()!, data).subscribe(handler);
    else this.service.createProject(data).subscribe(handler);
  }
}
