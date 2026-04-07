import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { environment } from '../../../../environments/environment';

export interface FileUploadedEvent {
  fileUrl: string;
  fileName: string;
  fileId: number;
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() label: string = '';
  @Input() accept: string = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx';
  @Input() maxSizeMB: number = 10;
  @Input() entityType?: string;
  @Input() entityId?: number;
  @Input() fieldName?: string;
  @Input() category?: string;
  @Input() currentFileUrl?: string;
  @Input() currentFileName?: string;

  @Output() fileUploaded = new EventEmitter<FileUploadedEvent>();
  @Output() fileRemoved = new EventEmitter<void>();

  uploading = signal(false);
  uploadedFile = signal<FileUploadedEvent | null>(null);
  error = signal<string>('');

  private http = inject(HttpClient);
  i18n = inject(I18nService);

  get displayLabel(): string {
    return this.label || this.i18n.t('files.upload');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size > this.maxSizeMB * 1024 * 1024) {
      this.error.set(this.i18n.t('files.too_large'));
      input.value = '';
      return;
    }

    this.uploading.set(true);
    this.error.set('');

    const formData = new FormData();
    formData.append('file', file);

    let url = `${environment.apiUrl}/api/v1/files/upload`;
    const params: string[] = [];
    if (this.entityType) params.push(`entityType=${encodeURIComponent(this.entityType)}`);
    if (this.entityId) params.push(`entityId=${this.entityId}`);
    if (this.fieldName) params.push(`fieldName=${encodeURIComponent(this.fieldName)}`);
    if (this.category) params.push(`category=${encodeURIComponent(this.category)}`);
    if (params.length) url += '?' + params.join('&');

    this.http.post<any>(url, formData).subscribe({
      next: (res) => {
        const result: FileUploadedEvent = {
          fileUrl: res.fileUrl,
          fileName: res.originalFileName,
          fileId: res.id
        };
        this.uploadedFile.set(result);
        this.fileUploaded.emit(result);
        this.uploading.set(false);
      },
      error: (err) => {
        const message = err?.error?.message || this.i18n.t('files.upload_failed');
        this.error.set(message);
        this.uploading.set(false);
      }
    });

    // Reset file input so the same file can be re-selected
    input.value = '';
  }

  removeFile(): void {
    this.uploadedFile.set(null);
    this.fileRemoved.emit();
  }

  getFullFileUrl(relativeUrl: string): string {
    if (relativeUrl.startsWith('http')) return relativeUrl;
    return `${environment.apiUrl}${relativeUrl}`;
  }
}
