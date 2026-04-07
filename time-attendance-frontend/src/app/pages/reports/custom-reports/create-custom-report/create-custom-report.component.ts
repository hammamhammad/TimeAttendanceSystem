import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { CustomReportService } from '../../../../core/services/custom-report.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { DataSourceMetadata } from '../../../../shared/models/custom-report.model';

@Component({
  selector: 'app-create-custom-report',
  standalone: true,
  imports: [ReactiveFormsModule, FormSectionComponent],
  templateUrl: './create-custom-report.component.html',
  styleUrls: ['./create-custom-report.component.css']
})
export class CreateCustomReportComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(CustomReportService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  form!: FormGroup;
  loading = signal(false);
  isEditMode = signal(false);
  reportId = signal<number | null>(null);
  dataSources = signal<DataSourceMetadata[]>([]);
  selectedColumns = signal<string[]>([]);

  availableColumns = computed(() => {
    const ds = this.form?.get('dataSource')?.value;
    const source = this.dataSources().find(s => s.name === ds);
    return source?.columns ?? [];
  });

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      descriptionAr: [''],
      dataSource: ['', Validators.required],
      isPublic: [false]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.reportId.set(+id);
      this.loadReport(+id);
    }

    this.loadDataSources();
  }

  loadDataSources() {
    this.service.getDataSources().subscribe({
      next: (sources: DataSourceMetadata[]) => this.dataSources.set(sources),
      error: () => this.notificationService.error(this.i18n.t('common.load_error'))
    });
  }

  loadReport(id: number) {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (report: any) => {
        this.form.patchValue({
          name: report.name,
          nameAr: report.nameAr,
          description: report.description,
          descriptionAr: report.descriptionAr,
          dataSource: report.dataSource,
          isPublic: report.isPublic
        });
        try {
          this.selectedColumns.set(JSON.parse(report.columnsJson || '[]'));
        } catch { this.selectedColumns.set([]); }
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.load_error'));
        this.loading.set(false);
      }
    });
  }

  toggleColumn(colName: string) {
    const current = this.selectedColumns();
    if (current.includes(colName)) {
      this.selectedColumns.set(current.filter(c => c !== colName));
    } else {
      this.selectedColumns.set([...current, colName]);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);

    const data = {
      ...this.form.value,
      columnsJson: JSON.stringify(this.selectedColumns()),
      filtersJson: null,
      sortingJson: null
    };

    const request = this.isEditMode()
      ? this.service.update(this.reportId()!, { id: this.reportId(), ...data })
      : this.service.create(data);

    request.subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t(this.isEditMode() ? 'common.updated' : 'common.created'));
        this.router.navigate(['/reports/custom-reports']);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.save_error'));
        this.loading.set(false);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/reports/custom-reports']);
  }
}
