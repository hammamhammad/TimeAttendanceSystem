import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { AnnouncementService } from '../../../core/services/announcement.service';
import { AnnouncementPriority, AnnouncementTargetAudience } from '../../../shared/models/announcement.model';
import { BranchesService } from '../../branches/branches.service';
import { DepartmentsService } from '../../departments/departments.service';
import { RolesService } from '../../roles/roles.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../shared/components/searchable-select/searchable-select.component';

import { PermissionService } from '../../../core/auth/permission.service';
@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-announcement.component.html',
  styleUrl: './create-announcement.component.css'
})
export class CreateAnnouncementComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(AnnouncementService);
  private readonly notification = inject(NotificationService);
  private readonly branchesService = inject(BranchesService);
  private readonly departmentsService = inject(DepartmentsService);
  private readonly rolesService = inject(RolesService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('announcement.update');
  }
  form!: FormGroup;
  saving = signal(false);
  isEdit = signal(false);
  entityId = signal<number | null>(null);

  categoryOptions = signal<{ value: any; label: string }[]>([]);
  priorityOptions = computed(() => Object.values(AnnouncementPriority).map(p => ({ value: p, label: this.i18n.t('announcements.priority_' + p) })));
  targetAudienceOptions = computed(() => Object.values(AnnouncementTargetAudience).map(t => ({ value: t, label: this.i18n.t('announcements.target_' + t) })));

  targetIdOptions = signal<{ value: any; label: string }[]>([]);
  selectedTargetAudience = signal<string>('All');
  selectedTargetIds = signal<number[]>([]);

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      titleAr: [''],
      content: ['', Validators.required],
      contentAr: [''],
      categoryId: [null, Validators.required],
      priority: ['Normal', Validators.required],
      targetAudience: ['All', Validators.required],
      scheduledDate: [''],
      expiryDate: [''],
      isPinned: [false],
      requiresAcknowledgment: [false]
    });

    this.service.getCategoryDropdown().subscribe({
      next: (res) => this.categoryOptions.set(res.map(c => ({ value: c.id, label: c.name })))
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.entityId.set(+id);
      this.service.getAnnouncement(+id).subscribe({
        next: (ann) => {
          this.form.patchValue({
            title: ann.title, titleAr: ann.titleAr, content: ann.content, contentAr: ann.contentAr,
            categoryId: ann.categoryId, priority: ann.priority, targetAudience: ann.targetAudience,
            scheduledDate: ann.scheduledDate?.split('T')[0], expiryDate: ann.expiryDate?.split('T')[0],
            isPinned: ann.isPinned, requiresAcknowledgment: ann.requiresAcknowledgment
          });
          if (!this.canEdit()) {
            this.form.disable();
          }
          this.selectedTargetAudience.set(ann.targetAudience);
          this.selectedTargetIds.set(ann.targetIds ?? []);
          this.loadTargetOptions(ann.targetAudience);
        },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onTargetAudienceChange(value: string): void {
    this.form.get('targetAudience')?.setValue(value);
    this.selectedTargetAudience.set(value);
    this.selectedTargetIds.set([]);
    this.loadTargetOptions(value);
  }

  loadTargetOptions(audience: string): void {
    this.targetIdOptions.set([]);
    if (audience === 'Branch') {
      this.branchesService.getBranchesForDropdown().subscribe({
        next: (branches) => this.targetIdOptions.set(branches.map(b => ({ value: b.id, label: b.name })))
      });
    } else if (audience === 'Department') {
      this.departmentsService.getDepartments({}).subscribe({
        next: (depts: any) => {
          const list = depts.data ?? depts;
          this.targetIdOptions.set(list.map((d: any) => ({ value: d.id, label: d.name })));
        }
      });
    } else if (audience === 'Role') {
      this.rolesService.getRoles().subscribe({
        next: (roles: any) => {
          const list = roles.data ?? roles;
          this.targetIdOptions.set(list.map((r: any) => ({ value: r.id, label: r.name })));
        }
      });
    }
  }

  onTargetIdChange(value: any): void {
    if (!value) return;
    const ids = this.selectedTargetIds();
    if (!ids.includes(value)) {
      this.selectedTargetIds.set([...ids, value]);
    }
  }

  removeTargetId(id: number): void {
    this.selectedTargetIds.set(this.selectedTargetIds().filter(i => i !== id));
  }

  getTargetLabel(id: number): string {
    return this.targetIdOptions().find(o => o.value === id)?.label ?? String(id);
  }

  showTargetIds(): boolean {
    const audience = this.selectedTargetAudience();
    return audience === 'Branch' || audience === 'Department' || audience === 'Role';
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const data = {
      ...this.form.value,
      targetIds: this.showTargetIds() ? this.selectedTargetIds() : undefined
    };

    const handler = {
      next: () => { this.notification.success(this.i18n.t(this.isEdit() ? 'announcements.updated' : 'announcements.created')); this.router.navigate(['/announcements']); this.saving.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    };
    if (this.isEdit()) { this.service.updateAnnouncement(this.entityId()!, data).subscribe(handler); }
    else { this.service.createAnnouncement(data).subscribe(handler); }
  }
}
