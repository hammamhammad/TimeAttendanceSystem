import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationBroadcastService, BroadcastTargetType, CreateBroadcastRequest, BroadcastTarget } from '../../core/services/notification-broadcast.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-send-notification',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        PageHeaderComponent,
        LoadingSpinnerComponent
    ],
    templateUrl: './send-notification.component.html',
    styleUrl: './send-notification.component.css'
})
export class SendNotificationComponent implements OnInit {
    private fb = inject(FormBuilder);
    private broadcastService = inject(NotificationBroadcastService);
    private notificationService = inject(NotificationService);
    public i18n = inject(I18nService);

    // Form
    notificationForm!: FormGroup;

    // State
    loading = signal(false);
    submitting = signal(false);
    selectedTargetType = signal<BroadcastTargetType>(BroadcastTargetType.All);

    // Targets
    branches = signal<BroadcastTarget[]>([]);
    departments = signal<BroadcastTarget[]>([]);
    roles = signal<BroadcastTarget[]>([]);
    employees = signal<BroadcastTarget[]>([]);
    searchTerm = signal('');

    // Computed
    showTargetSelection = computed(() => this.selectedTargetType() !== BroadcastTargetType.All);

    availableTargets = computed(() => {
        const type = this.selectedTargetType();
        let targets: BroadcastTarget[] = [];

        switch (type) {
            case BroadcastTargetType.Branch:
                targets = this.branches();
                break;
            case BroadcastTargetType.Department:
                targets = this.departments();
                break;
            case BroadcastTargetType.Role:
                targets = this.roles();
                break;
            case BroadcastTargetType.Individual:
                targets = this.employees();
                break;
        }

        const search = this.searchTerm().toLowerCase();
        if (search) {
            targets = targets.filter(t => t.name.toLowerCase().includes(search));
        }

        return targets;
    });

    estimatedRecipients = computed(() => {
        if (this.selectedTargetType() === BroadcastTargetType.All) {
            // Get total from branches
            return this.branches().reduce((sum, b) => sum + (b.employeeCount || 0), 0);
        }

        const targetId = this.notificationForm?.get('targetId')?.value;
        if (!targetId) return 0;

        const target = this.availableTargets().find(t => t.id === targetId);
        return target?.employeeCount || 0;
    });

    // Target type options
    targetTypes = [
        { value: BroadcastTargetType.All, label: 'All Employees', icon: 'fa-globe' },
        { value: BroadcastTargetType.Branch, label: 'By Branch', icon: 'fa-building' },
        { value: BroadcastTargetType.Department, label: 'By Department', icon: 'fa-sitemap' },
        { value: BroadcastTargetType.Role, label: 'By Role', icon: 'fa-user-tag' },
        { value: BroadcastTargetType.Individual, label: 'Individual', icon: 'fa-user' }
    ];

    // Priority options
    priorities = [
        { value: 'low', label: 'Low', icon: 'fa-arrow-down', color: 'text-muted' },
        { value: 'normal', label: 'Normal', icon: 'fa-minus', color: 'text-primary' },
        { value: 'high', label: 'High', icon: 'fa-arrow-up', color: 'text-danger' }
    ];

    ngOnInit(): void {
        this.initForm();
        this.loadTargets();
    }

    private initForm(): void {
        this.notificationForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(100)]],
            message: ['', [Validators.required, Validators.maxLength(500)]],
            targetType: [BroadcastTargetType.All, Validators.required],
            targetId: [''],
            sendPush: [true],
            priority: ['normal'],
            scheduleDelivery: [false],
            scheduledAt: ['']
        });

        // Watch target type changes
        this.notificationForm.get('targetType')?.valueChanges.subscribe(value => {
            this.selectedTargetType.set(value);
            this.notificationForm.get('targetId')?.setValue('');

            // Require target for non-All types
            if (value !== BroadcastTargetType.All) {
                this.notificationForm.get('targetId')?.setValidators([Validators.required]);
            } else {
                this.notificationForm.get('targetId')?.clearValidators();
            }
            this.notificationForm.get('targetId')?.updateValueAndValidity();
        });
    }

    private loadTargets(): void {
        this.loading.set(true);

        // Load all target types
        this.broadcastService.getTargets('branch').subscribe(targets => {
            this.branches.set(targets);
        });

        this.broadcastService.getTargets('department').subscribe(targets => {
            this.departments.set(targets);
        });

        this.broadcastService.getTargets('role').subscribe(targets => {
            this.roles.set(targets);
            this.loading.set(false);
        });
    }

    searchEmployees(): void {
        const term = this.searchTerm();
        if (term.length >= 2) {
            // For employees, we might want to search from backend
            this.broadcastService.getTargets('employee').subscribe(targets => {
                this.employees.set(targets.filter(e =>
                    e.name.toLowerCase().includes(term.toLowerCase())
                ));
            });
        }
    }

    selectTarget(target: BroadcastTarget): void {
        this.notificationForm.get('targetId')?.setValue(target.id);
    }

    isTargetSelected(target: BroadcastTarget): boolean {
        return this.notificationForm.get('targetId')?.value === target.id;
    }

    onSubmit(): void {
        if (this.notificationForm.invalid) {
            this.notificationForm.markAllAsTouched();
            return;
        }

        this.submitting.set(true);

        const formValue = this.notificationForm.value;
        const request: CreateBroadcastRequest = {
            title: formValue.title,
            message: formValue.message,
            targetType: formValue.targetType,
            targetId: formValue.targetId || undefined,
            sendPush: formValue.sendPush,
            priority: formValue.priority,
            scheduledAt: formValue.scheduleDelivery ? new Date(formValue.scheduledAt) : undefined
        };

        this.broadcastService.sendBroadcast(request).subscribe({
            next: () => {
                this.notificationService.success(this.t('notifications.broadcast_sent'));
                this.resetForm();
                this.submitting.set(false);
            },
            error: (error) => {
                this.notificationService.error(error.message || this.t('notifications.broadcast_failed'));
                this.submitting.set(false);
            }
        });
    }

    resetForm(): void {
        this.notificationForm.reset({
            targetType: BroadcastTargetType.All,
            sendPush: true,
            priority: 'normal',
            scheduleDelivery: false
        });
        this.selectedTargetType.set(BroadcastTargetType.All);
        this.searchTerm.set('');
    }

    t(key: string, params?: Record<string, any>): string {
        return this.i18n.t(key, params);
    }

    // Form helpers
    get titleControl() { return this.notificationForm.get('title'); }
    get messageControl() { return this.notificationForm.get('message'); }
    get targetIdControl() { return this.notificationForm.get('targetId'); }
}
