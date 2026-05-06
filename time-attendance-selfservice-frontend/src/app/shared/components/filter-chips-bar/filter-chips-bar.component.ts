import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FilterDescriptor } from '../../utils/filter-engine/types';

@Component({
  selector: 'app-filter-chips-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (filters.length > 0) {
      <div class="filter-chips-bar">
        @for (f of filters; track trackByFilter($index, f)) {
          <span class="filter-chip">
            <strong>{{ f.label }}</strong>
            <span class="filter-chip__op">{{ i18n.t('filter.op.' + f.operator) }}</span>
            @if (f.operator !== 'isEmpty' && f.operator !== 'isNotEmpty' &&
                 f.operator !== 'isTrue' && f.operator !== 'isFalse' &&
                 f.operator !== 'today' && f.operator !== 'thisWeek' &&
                 f.operator !== 'thisMonth' && f.operator !== 'thisYear') {
              <span class="filter-chip__val">{{ formatValue(f) }}</span>
            }
            <button type="button" (click)="onRemove(f)" [attr.aria-label]="i18n.t('common.remove')">×</button>
          </span>
        }
        @if (filters.length > 1) {
          <button type="button" class="filter-chips-bar__clear-all" (click)="clearAll.emit()">
            {{ i18n.t('common.clear_all') }}
          </button>
        }
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
    .filter-chips-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      padding: 8px 14px;
      background: var(--app-gray-25, #FCFCFD);
      border: 1px solid var(--app-gray-200);
      border-top: none;
      font-size: 12px;
    }
    .filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: var(--app-primary-50, #EEF2FF);
      color: var(--app-primary-700, #2D3EB3);
      padding: 3px 8px;
      border-radius: 12px;
    }
    .filter-chip__op { color: var(--app-primary-600); }
    .filter-chip__val {
      font-family: var(--app-font-family-mono);
      font-size: 11px;
    }
    .filter-chip button {
      background: transparent;
      border: none;
      color: var(--app-primary-600);
      cursor: pointer;
      padding: 0 0 0 4px;
      font-size: 14px;
      line-height: 1;
    }
    .filter-chips-bar__clear-all {
      background: transparent;
      border: none;
      color: var(--app-gray-600);
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
      padding: 0;
      margin-left: 4px;
    }
  `]
})
export class FilterChipsBarComponent {
  readonly i18n = inject(I18nService);

  @Input() filters: FilterDescriptor[] = [];
  @Output() remove = new EventEmitter<FilterDescriptor>();
  @Output() clearAll = new EventEmitter<void>();

  onRemove(f: FilterDescriptor) { this.remove.emit(f); }

  trackByFilter(_i: number, f: FilterDescriptor): string {
    return `${f.field}:${f.operator}`;
  }

  formatValue(f: FilterDescriptor): string {
    const v = f.value;
    const v2 = f.value2;
    if (f.operator === 'between' && v !== undefined && v2 !== undefined) {
      return `${v} – ${v2}`;
    }
    if (Array.isArray(v)) return v.join(', ');
    return v == null ? '' : String(v);
  }
}
