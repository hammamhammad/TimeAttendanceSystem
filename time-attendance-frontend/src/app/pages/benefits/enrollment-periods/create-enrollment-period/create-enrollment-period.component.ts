import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { BenefitService } from '../../../../core/services/benefit.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { OpenEnrollmentPeriod } from '../../../../shared/models/benefit.model';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-enrollment-period',
  standalone: true,
  imports: [FormsModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-enrollment-period.component.html',
  styleUrls: ['./create-enrollment-period.component.css']
})
export class CreateEnrollmentPeriodComponent implements OnInit {
  private benefitService = inject(BenefitService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  private permissionService = inject(PermissionService);

  // TODO: wire up readonly disable when canEdit is false (form is a plain object with ngModel — not a FormGroup)
  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('openEnrollmentPeriod.update');
  }
  submitting = signal(false);
  isEdit = signal(false);
  editId = signal<number | null>(null);
  branches = signal<any[]>([]);

  form = {
    name: '',
    nameAr: '',
    branchId: null as number | null,
    planYear: new Date().getFullYear(),
    startDate: '',
    endDate: '',
    allowLifeEventChanges: false,
    notes: '',
    isActive: true
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { this.isEdit.set(true); this.editId.set(+id); this.loadPeriod(+id); }
  }

  t(key: string): string { return this.i18n.t(key); }

  loadPeriod(id: number): void {
    this.benefitService.getOpenEnrollmentPeriod(id).subscribe({
      next: (item: OpenEnrollmentPeriod) => {
        this.form.name = item.name;
        this.form.nameAr = item.nameAr || '';
        this.form.branchId = item.branchId || null;
        this.form.planYear = item.planYear;
        this.form.startDate = item.startDate ? item.startDate.substring(0, 10) : '';
        this.form.endDate = item.endDate ? item.endDate.substring(0, 10) : '';
        this.form.allowLifeEventChanges = item.allowLifeEventChanges;
        this.form.notes = item.notes || '';
        this.form.isActive = item.isActive;
      },
      error: () => { this.notificationService.error(this.t('app.error'), this.t('benefits.periods.load_error')); this.router.navigate(['/benefits/enrollment-periods']); }
    });
  }

  onSubmit(): void {
    if (!this.form.name || !this.form.startDate || !this.form.endDate) {
      this.notificationService.warning(this.t('app.warning'), this.t('common.fill_required'));
      return;
    }
    this.submitting.set(true);
    const payload: any = { ...this.form };
    if (payload.branchId === null) delete payload.branchId;

    if (this.isEdit()) {
      this.benefitService.updateOpenEnrollmentPeriod(this.editId()!, payload).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.periods.updated_success')); this.router.navigate(['/benefits/enrollment-periods']); this.submitting.set(false); },
        error: (err) => { this.submitting.set(false); this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.periods.save_error')); }
      });
    } else {
      this.benefitService.createOpenEnrollmentPeriod(payload).subscribe({
        next: (res) => { this.notificationService.success(this.t('app.success'), this.t('benefits.periods.created_success')); this.router.navigate(['/benefits/enrollment-periods']); this.submitting.set(false); },
        error: (err) => { this.submitting.set(false); this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.periods.save_error')); }
      });
    }
  }

  onCancel(): void { this.router.navigate(['/benefits/enrollment-periods']); }
}
