import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../../core/i18n/i18n.service';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }[];
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    tooltip?: {
      enabled?: boolean;
    };
  };
  scales?: {
    x?: {
      display?: boolean;
    };
    y?: {
      display?: boolean;
      beginAtZero?: boolean;
    };
  };
}

@Component({
  selector: 'app-attendance-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-chart.component.html',
  styleUrls: ['./attendance-chart.component.css']
})
export class AttendanceChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() type: 'bar' | 'line' | 'pie' | 'doughnut' = 'bar';
  @Input() data!: ChartData;
  @Input() options: ChartOptions = {};
  @Input() height: number = 400;
  @Input() width?: number;
  @Input() title?: string;
  @Input() loading = false;

  private chart: any;
  private chartInstance: any;

  constructor(public readonly i18nService: I18nService) {}

  ngOnInit(): void {
    this.loadChartJS();
  }

  ngAfterViewInit(): void {
    if (this.chart && this.data) {
      this.createChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.chart && this.chartCanvas) {
      this.updateChart();
    }
  }

  private async loadChartJS(): Promise<void> {
    try {
      // Dynamic import of Chart.js
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);
      this.chart = Chart;

      if (this.chartCanvas && this.data) {
        this.createChart();
      }
    } catch (error) {
      console.error('Failed to load Chart.js:', error);
    }
  }

  private createChart(): void {
    if (!this.chart || !this.chartCanvas || !this.data) {
      console.log('🔴 Chart creation skipped:', { chart: !!this.chart, canvas: !!this.chartCanvas, data: !!this.data });
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.log('🔴 No canvas context');
      return;
    }

    // Destroy existing chart
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const defaultOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          enabled: true
        }
      },
      scales: this.type === 'pie' || this.type === 'doughnut' ? undefined : {
        x: {
          display: true
        },
        y: {
          display: true,
          beginAtZero: true
        }
      }
    };

    const mergedOptions = { ...defaultOptions, ...this.options };

    console.log('📈 Creating chart:', { type: this.type, data: this.data, options: mergedOptions });

    this.chartInstance = new this.chart(ctx, {
      type: this.type,
      data: this.data,
      options: mergedOptions
    });

    console.log('✅ Chart created successfully');
  }

  private updateChart(): void {
    if (this.chartInstance && this.data) {
      this.chartInstance.data = this.data;
      this.chartInstance.update();
    } else if (this.chart && this.data) {
      this.createChart();
    }
  }

  hasData(): boolean {
    return !!(this.data && this.data.datasets && this.data.datasets.length > 0 &&
              this.data.labels && this.data.labels.length > 0);
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}