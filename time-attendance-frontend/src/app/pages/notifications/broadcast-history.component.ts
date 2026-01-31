import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    NotificationBroadcastService,
    NotificationBroadcast,
    BroadcastTargetType,
    BroadcastStatus,
    BroadcastStats
} from '../../core/services/notification-broadcast.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-broadcast-history',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PageHeaderComponent,
        LoadingSpinnerComponent
    ],
    templateUrl: './broadcast-history.component.html',
    styleUrl: './broadcast-history.component.css'
})
export class BroadcastHistoryComponent implements OnInit {
    private broadcastService = inject(NotificationBroadcastService);
    private notificationService = inject(NotificationService);
    public i18n = inject(I18nService);

    // State
    loading = computed(() => this.broadcastService.loading());
    error = computed(() => this.broadcastService.error());
    broadcasts = computed(() => this.broadcastService.broadcasts());
    stats = computed(() => this.broadcastService.stats());

    // Filters
    filters = signal({
        startDate: null as Date | null,
        endDate: null as Date | null,
        targetType: null as BroadcastTargetType | null,
        status: null as BroadcastStatus | null,
        searchTerm: ''
    });

    // Pagination
    currentPage = signal(1);
    pageSize = signal(10);
    totalItems = signal(0);

    // View mode
    viewMode = signal<'table' | 'cards'>('table');

    // Selected broadcast for detail view
    selectedBroadcast = signal<NotificationBroadcast | null>(null);

    // Computed filtered broadcasts
    filteredBroadcasts = computed(() => {
        let items = this.broadcasts();
        const filter = this.filters();

        if (filter.searchTerm) {
            const term = filter.searchTerm.toLowerCase();
            items = items.filter(b =>
                b.title.toLowerCase().includes(term) ||
                b.message.toLowerCase().includes(term)
            );
        }

        return items;
    });

    // Stats computed
    deliveryRate = computed(() => {
        const s = this.stats();
        return s ? ((s.totalDelivered / s.totalRecipients) * 100).toFixed(1) : '0';
    });

    readRate = computed(() => {
        const s = this.stats();
        return s ? ((s.totalRead / s.totalDelivered) * 100).toFixed(1) : '0';
    });

    // Filter options
    targetTypeOptions = [
        { value: null, label: 'All Targets' },
        { value: BroadcastTargetType.All, label: 'All Employees' },
        { value: BroadcastTargetType.Branch, label: 'Branch' },
        { value: BroadcastTargetType.Department, label: 'Department' },
        { value: BroadcastTargetType.Role, label: 'Role' },
        { value: BroadcastTargetType.Individual, label: 'Individual' }
    ];

    statusOptions = [
        { value: null, label: 'All Status' },
        { value: BroadcastStatus.Pending, label: 'Pending', color: 'warning' },
        { value: BroadcastStatus.Sent, label: 'Sent', color: 'success' },
        { value: BroadcastStatus.PartiallyDelivered, label: 'Partial', color: 'info' },
        { value: BroadcastStatus.Failed, label: 'Failed', color: 'danger' }
    ];

    // Expose enums to template
    BroadcastStatus = BroadcastStatus;
    BroadcastTargetType = BroadcastTargetType;

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        const filter = this.filters();
        this.broadcastService.getBroadcasts({
            startDate: filter.startDate || undefined,
            endDate: filter.endDate || undefined,
            targetType: filter.targetType ?? undefined,
            status: filter.status ?? undefined,
            page: this.currentPage(),
            pageSize: this.pageSize()
        }).subscribe(response => {
            this.totalItems.set(response.total);
        });

        this.broadcastService.getStats().subscribe();
    }

    updateFilters(updates: Partial<typeof this.filters extends () => infer T ? T : never>): void {
        this.filters.update(f => ({ ...f, ...updates }));
        this.currentPage.set(1);
        this.loadData();
    }

    clearFilters(): void {
        this.filters.set({
            startDate: null,
            endDate: null,
            targetType: null,
            status: null,
            searchTerm: ''
        });
        this.loadData();
    }

    changePage(page: number): void {
        this.currentPage.set(page);
        this.loadData();
    }

    viewDetails(broadcast: NotificationBroadcast): void {
        this.selectedBroadcast.set(broadcast);
    }

    closeDetails(): void {
        this.selectedBroadcast.set(null);
    }

    resend(broadcast: NotificationBroadcast): void {
        if (confirm(this.t('notifications.confirm_resend'))) {
            this.broadcastService.resendBroadcast(broadcast.id).subscribe({
                next: () => {
                    this.notificationService.success(this.t('notifications.resend_success'));
                },
                error: (error) => {
                    this.notificationService.error(error.message || this.t('notifications.resend_failed'));
                }
            });
        }
    }

    cancel(broadcast: NotificationBroadcast): void {
        if (confirm(this.t('notifications.confirm_cancel'))) {
            this.broadcastService.cancelBroadcast(broadcast.id).subscribe({
                next: () => {
                    this.notificationService.success(this.t('notifications.cancel_success'));
                },
                error: (error) => {
                    this.notificationService.error(error.message || this.t('notifications.cancel_failed'));
                }
            });
        }
    }

    getStatusBadgeClass(status: BroadcastStatus): string {
        switch (status) {
            case BroadcastStatus.Pending: return 'bg-warning';
            case BroadcastStatus.Sent: return 'bg-success';
            case BroadcastStatus.PartiallyDelivered: return 'bg-info';
            case BroadcastStatus.Failed: return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    getStatusLabel(status: BroadcastStatus): string {
        const option = this.statusOptions.find(o => o.value === status);
        return option?.label || 'Unknown';
    }

    getTargetTypeIcon(type: BroadcastTargetType): string {
        switch (type) {
            case BroadcastTargetType.All: return 'fa-globe';
            case BroadcastTargetType.Branch: return 'fa-building';
            case BroadcastTargetType.Department: return 'fa-sitemap';
            case BroadcastTargetType.Role: return 'fa-user-tag';
            case BroadcastTargetType.Individual: return 'fa-user';
            default: return 'fa-circle';
        }
    }

    getTargetTypeLabel(type: BroadcastTargetType): string {
        const option = this.targetTypeOptions.find(o => o.value === type);
        return option?.label || 'Unknown';
    }

    calculateProgress(broadcast: NotificationBroadcast): number {
        if (!broadcast.recipientCount) return 0;
        return (broadcast.deliveredCount / broadcast.recipientCount) * 100;
    }

    t(key: string, params?: Record<string, any>): string {
        return this.i18n.t(key, params);
    }

    get totalPages(): number {
        return Math.ceil(this.totalItems() / this.pageSize());
    }

    get pageNumbers(): number[] {
        const total = this.totalPages;
        const current = this.currentPage();
        const pages: number[] = [];

        for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
            pages.push(i);
        }

        return pages;
    }
}
