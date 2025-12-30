import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsService } from './reports.service';
import { AttendanceReportSummary, ReportFilter } from './reports.model';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-attendance-report',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, StatCardComponent],
  templateUrl: './attendance-report.html'
})
export class AttendanceReportComponent {
  private reportsService = inject(ReportsService);

  filter = signal<ReportFilter>({
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0]
  });

  report = signal<AttendanceReportSummary | null>(null);
  loading = signal(false);

  updateFilter(key: keyof ReportFilter, value: any) {
    this.filter.update(f => ({ ...f, [key]: value }));
  }

  loadReport() {
    this.loading.set(true);
    this.reportsService.getAttendanceReport(this.filter())
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

  exportReport() {
    this.loading.set(true);
    this.reportsService.exportAttendanceReport(this.filter())
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `attendance-report-${this.filter().fromDate}-${this.filter().toDate}.csv`;
          a.click();
          window.URL.revokeObjectURL(url);
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
      case 'Present': return 'badge-success';
      case 'Absent': return 'badge-error';
      case 'Late': return 'badge-warning';
      case 'OnLeave': return 'badge-info';
      default: return 'badge-ghost';
    }
  }
}
