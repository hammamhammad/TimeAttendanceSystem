import { Injectable } from '@angular/core';

export interface CsvColumn {
  key: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class CsvExportService {
  /**
   * Download the rows as a CSV file. Handles UTF-8 BOM for Excel compatibility,
   * CRLF line endings, and proper escaping of quotes/commas/newlines.
   */
  export<T extends Record<string, any>>(
    columns: CsvColumn[],
    rows: T[],
    filename: string = 'export.csv'
  ): void {
    const header = columns.map(c => this.escape(c.label)).join(',');
    const dataRows = rows.map(row =>
      columns.map(c => this.escape(this.valueOf(row, c.key))).join(',')
    );
    const csv = [header, ...dataRows].join('\r\n');
    // UTF-8 BOM so Excel on Windows opens as UTF-8
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    this.download(blob, filename);
  }

  private valueOf(row: any, path: string): string {
    const v = path.split('.').reduce((acc, k) => acc?.[k], row);
    if (v === null || v === undefined) return '';
    if (v instanceof Date) return v.toISOString();
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  }

  private escape(value: string): string {
    if (value === null || value === undefined) return '';
    const needsQuoting = /[",\r\n]/.test(value);
    const escaped = value.replace(/"/g, '""');
    return needsQuoting ? `"${escaped}"` : escaped;
  }

  private download(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
