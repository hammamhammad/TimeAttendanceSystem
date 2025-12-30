import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService } from './reports.service';
import { LeaveReportSummary, ReportFilter } from './reports.model';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-leave-report',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, StatCardComponent],
  templateUrl: './leave-report.html'
})
export class LeaveReportComponent {
  private reportsService = inject(ReportsService);

  filter = signal<ReportFilter>({
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0]
  });

  report = signal<LeaveReportSummary | null>(null);
  loading = signal(false);

  updateFilter(key: keyof ReportFilter, value: any) {
    this.filter.update(f => ({ ...f, [key]: value }));
  }

  loadReport() {
    this.loading.set(true);
    this.reportsService.getLeaveReport(this.filter())
      .subscribe({
        next: (data) => {
          this.report.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
        }
      });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved': return 'badge-success';
      case 'Rejected': return 'badge-error';
      case 'Pending': return 'badge-warning';
      default: return 'badge-ghost';
    }
  }
}
