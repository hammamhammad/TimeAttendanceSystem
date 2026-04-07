export interface CustomReportDefinition {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  dataSource: string;
  columnsJson: string;
  filtersJson?: string;
  sortingJson?: string;
  branchId?: number;
  createdByUserId: number;
  createdByUsername?: string;
  isPublic: boolean;
  isActive: boolean;
  scheduledReportCount: number;
  createdAtUtc: string;
}

export interface ScheduledReport {
  id: number;
  customReportDefinitionId: number;
  reportName?: string;
  cronExpression: string;
  emailRecipients: string;
  format: string;
  formatName?: string;
  isActive: boolean;
  lastRunAt?: string;
  nextRunAt?: string;
  lastRunStatus?: string;
  createdAtUtc: string;
}

export interface DataSourceMetadata {
  name: string;
  displayName: string;
  columns: DataSourceColumn[];
}

export interface DataSourceColumn {
  name: string;
  displayName: string;
  dataType: string;
}
