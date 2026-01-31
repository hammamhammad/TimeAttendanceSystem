import { Component, OnInit, inject, signal, computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationBroadcastService, BroadcastStats } from '../../../core/services/notification-broadcast.service';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
    selector: 'app-notification-center-widget',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './notification-center-widget.component.html',
    styleUrl: './notification-center-widget.component.css'
})
export class NotificationCenterWidgetComponent implements OnInit {
    private broadcastService = inject(NotificationBroadcastService);
    public i18n = inject(I18nService);

    @Input() showQuickActions = true;

    // State
    loading = signal(true);
    stats = signal<BroadcastStats | null>(null);
    recentBroadcasts = computed(() => this.broadcastService.recentBroadcasts());

    // Computed metrics
    todayCount = computed(() => this.stats()?.todayBroadcasts || 0);
    weekCount = computed(() => this.stats()?.thisWeekBroadcasts || 0);
    monthCount = computed(() => this.stats()?.thisMonthBroadcasts || 0);
    deliveryRate = computed(() => {
        const s = this.stats();
        if (!s || !s.totalRecipients) return 0;
        return Math.round((s.totalDelivered / s.totalRecipients) * 100);
    });

    ngOnInit(): void {
        this.loadStats();
        this.loadRecentBroadcasts();
    }

    private loadStats(): void {
        this.broadcastService.getStats().subscribe({
            next: (stats) => {
                this.stats.set(stats);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    private loadRecentBroadcasts(): void {
        this.broadcastService.getBroadcasts({ pageSize: 5 }).subscribe();
    }

    refresh(): void {
        this.loading.set(true);
        this.loadStats();
        this.loadRecentBroadcasts();
    }

    t(key: string, params?: Record<string, any>): string {
        return this.i18n.t(key, params);
    }
}
