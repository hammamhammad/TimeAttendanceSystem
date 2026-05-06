import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { TimesheetService } from '../../../../core/services/timesheet.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-period',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-period.component.html',
  styleUrl: './create-period.component.css'
})
export class CreatePeriodComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TimesheetService);
  private readonly notification = inject(NotificationService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('timesheetPeriod.update');
  }
  form!: FormGroup;
  saving = signal(false);
  isEdit = signal(false);
  entityId = signal<number | null>(null);
  branches = signal<any[]>([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      branchId: [null, Validators.required],
      name: ['', Validators.required],
      periodType: ['Monthly', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      submissionDeadline: ['', Validators.required],
      isActive: [true]
    });

    this.loadBranches();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.entityId.set(+id);
      this.service.getTimesheetPeriod(+id).subscribe({
        next: (p) => {
          this.form.patchValue({
            branchId: p.branchId, name: p.name, periodType: p.periodType,
            startDate: p.startDate.substring(0, 10), endDate: p.endDate.substring(0, 10),
            submissionDeadline: p.submissionDeadline.substring(0, 10), isActive: p.isActive
          });
          if (!this.canEdit()) {
            this.form.disable({ emitEvent: false });
          }
        },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  private loadBranches(): void {
    const http = (this.service as any).http;
    const baseUrl = (this.service as any).baseUrl;
    http.get(`${baseUrl}/branches?pageSize=200`).subscribe({
      next: (res: any) => this.branches.set(res.data || res),
      error: () => {}
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const data = { ...this.form.value };
    data.startDate = new Date(data.startDate).toISOString();
    data.endDate = new Date(data.endDate).toISOString();
    data.submissionDeadline = new Date(data.submissionDeadline).toISOString();

    const handler = {
      next: () => { this.notification.success(this.i18n.t(this.isEdit() ? 'timesheets.periods.updated' : 'timesheets.periods.created')); this.router.navigate(['/timesheets/periods']); this.saving.set(false); },
      error: (err: any) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.saving.set(false); }
    };
    if (this.isEdit()) this.service.updateTimesheetPeriod(this.entityId()!, data).subscribe(handler);
    else this.service.createTimesheetPeriod(data).subscribe(handler);
  }
}
