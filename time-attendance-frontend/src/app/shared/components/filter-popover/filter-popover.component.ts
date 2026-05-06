import { Component, Input, Output, EventEmitter, signal, computed, inject, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ColumnType, FilterDescriptor, FilterOperator, OPERATOR_CONFIG } from '../../utils/filter-engine/types';

@Component({
  selector: 'app-filter-popover',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-popover"
         [style.top.px]="top"
         [style.left.px]="left"
         (click)="$event.stopPropagation()">
      <div class="filter-popover__header">
        <span>
          <i class="fas fa-filter"></i>
          {{ i18n.t('common.filter') }}
          <span class="filter-popover__field">— {{ fieldLabel }}</span>
        </span>
        <button type="button" class="filter-popover__close" (click)="close.emit()">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="filter-popover__body">
        <div class="mb-2">
          <label class="filter-popover__label">{{ i18n.t('filter.condition') }}</label>
          <select class="form-control form-select form-select-sm"
                  [ngModel]="operator()"
                  (ngModelChange)="onOperatorChange($event)">
            @for (op of operators(); track op.value) {
              <option [value]="op.value">{{ i18n.t(op.labelKey) }}</option>
            }
          </select>
        </div>

        @if (needsValue()) {
          <div class="mb-2">
            <label class="filter-popover__label">{{ i18n.t('filter.value') }}</label>

            @switch (widgetType()) {
              @case ('list') {
                @if (options.length > 0) {
                  <!-- Searchable checklist for enum/reference/status/boolean -->
                  <input type="text"
                         class="form-control form-control-sm mb-1"
                         [ngModel]="listSearch()"
                         (ngModelChange)="listSearch.set($event)"
                         [placeholder]="i18n.t('common.search') + '...'" />
                  <div class="filter-popover__list">
                    @for (opt of filteredOptions(); track opt.value) {
                      <div class="filter-popover__list-item"
                           [class.selected]="isOptionSelected(opt.value)"
                           (click)="toggleListValue(opt.value)">
                        <span class="text-truncate">{{ opt.label }}</span>
                        @if (isOptionSelected(opt.value)) {
                          <i class="fas fa-check"></i>
                        }
                      </div>
                    }
                    @if (filteredOptions().length === 0) {
                      <div class="filter-popover__list-empty">
                        {{ i18n.t('filter.no_match') }}
                      </div>
                    }
                  </div>
                } @else {
                  <!-- No distinct values in the current data — let the user
                       jump to a presence operator instead of typing into a
                       useless input. -->
                  <div class="filter-popover__no-options">
                    <div class="filter-popover__no-options-text">
                      {{ i18n.t('filter.no_values') }}
                    </div>
                    @if (hasPresenceOps()) {
                      <div class="filter-popover__no-options-actions">
                        <button type="button" class="filter-popover__chip"
                                (click)="onOperatorChange('isEmpty')">
                          {{ i18n.t('filter.op.isEmpty') }}
                        </button>
                        <button type="button" class="filter-popover__chip"
                                (click)="onOperatorChange('isNotEmpty')">
                          {{ i18n.t('filter.op.isNotEmpty') }}
                        </button>
                      </div>
                    }
                  </div>
                }
              }
              @case ('number') {
                <input type="number" class="form-control form-control-sm"
                       [ngModel]="value()" (ngModelChange)="value.set($event)"
                       [placeholder]="i18n.t('filter.enter_value')" />
              }
              @case ('date') {
                <input type="date" class="form-control form-control-sm"
                       [ngModel]="value()" (ngModelChange)="value.set($event)" />
              }
              @default {
                <input type="text" class="form-control form-control-sm"
                       [ngModel]="value()" (ngModelChange)="value.set($event)"
                       [placeholder]="i18n.t('filter.enter_value')" />
              }
            }
          </div>
        }

        @if (needsSecondValue()) {
          <div class="mb-2">
            <label class="filter-popover__label">{{ i18n.t('filter.to') }}</label>
            @if (widgetType() === 'date') {
              <input type="date" class="form-control form-control-sm"
                     [ngModel]="value2()" (ngModelChange)="value2.set($event)" />
            } @else {
              <input type="number" class="form-control form-control-sm"
                     [ngModel]="value2()" (ngModelChange)="value2.set($event)" />
            }
          </div>
        }
      </div>

      <div class="filter-popover__footer">
        <button type="button" class="btn btn-secondary btn-sm" (click)="onClear()">
          {{ i18n.t('common.clear') }}
        </button>
        <button type="button" class="btn btn-primary btn-sm" (click)="onApply()">
          {{ i18n.t('common.apply') }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { position: fixed; z-index: 1055; }
    .filter-popover {
      position: fixed;
      width: 320px;
      background: #fff;
      border: 1px solid var(--app-gray-200);
      border-radius: var(--app-border-radius-md, 8px);
      box-shadow: var(--app-shadow-lg);
      overflow: hidden;
      font-family: inherit;
    }
    .filter-popover__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px;
      background: var(--app-gray-50);
      border-bottom: 1px solid var(--app-gray-100);
      font-size: 13px;
      font-weight: 600;
      color: var(--app-gray-700);
    }
    .filter-popover__header i.fa-filter { color: var(--app-primary-500); margin-right: 6px; }
    .filter-popover__field { font-weight: 400; color: var(--app-gray-500); }
    .filter-popover__close {
      background: transparent;
      border: none;
      color: var(--app-gray-400);
      cursor: pointer;
      font-size: 12px;
    }
    .filter-popover__body { padding: 12px; }
    .filter-popover__label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--app-gray-600);
      margin-bottom: 4px;
    }
    .filter-popover__footer {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      padding: 10px 12px;
      border-top: 1px solid var(--app-gray-100);
      background: var(--app-gray-25, #FCFCFD);
    }
    .filter-popover .form-control,
    .filter-popover .form-select {
      font-size: 13px;
      padding: 6px 10px;
    }
    .filter-popover__list {
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid var(--app-gray-200);
      border-radius: var(--app-border-radius-sm, 6px);
      background: #fff;
    }
    .filter-popover__list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px;
      cursor: pointer;
      font-size: 13px;
      color: var(--app-gray-700);
      transition: background-color 0.1s ease;
      gap: 8px;
    }
    .filter-popover__list-item:hover { background: var(--app-gray-50); }
    .filter-popover__list-item.selected {
      background: var(--app-primary-50);
      color: var(--app-primary-700);
      font-weight: 500;
    }
    .filter-popover__list-item.selected i.fa-check {
      color: var(--app-primary-500);
      font-size: 11px;
    }
    .filter-popover__list-empty {
      padding: 20px 10px;
      text-align: center;
      color: var(--app-gray-400);
      font-size: 12px;
    }
    .filter-popover__no-options {
      border: 1px dashed var(--app-gray-200);
      border-radius: var(--app-border-radius-sm, 6px);
      padding: 14px 12px;
      background: var(--app-gray-25, #FCFCFD);
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
    .filter-popover__no-options-text {
      font-size: 12px;
      color: var(--app-gray-500);
      text-align: center;
    }
    .filter-popover__no-options-actions {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .filter-popover__chip {
      background: #fff;
      border: 1px solid var(--app-gray-200);
      border-radius: 999px;
      padding: 4px 12px;
      font-size: 12px;
      color: var(--app-gray-700);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .filter-popover__chip:hover {
      background: var(--app-primary-50);
      border-color: var(--app-primary-200, #C7D2FE);
      color: var(--app-primary-700);
    }
  `]
})
export class FilterPopoverComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private host = inject(ElementRef);

  @Input() field!: string;
  @Input() fieldLabel: string = '';
  @Input() initial?: FilterDescriptor;
  @Input() top: number = 0;
  @Input() left: number = 0;

  // columnType and options are signal-backed so the computeds below
  // (operators / widgetType / filteredOptions) actually re-evaluate when
  // the parent supplies their real values via @Input bindings. A plain
  // @Input would not be tracked by computed(), causing the popover to
  // memoize a stale 'text' widget on first open until the user changed
  // the operator dropdown — which is the bug we're fixing.
  private _columnType = signal<ColumnType>('string');
  @Input() set columnType(val: ColumnType) {
    this._columnType.set(val ?? 'string');
  }
  get columnType(): ColumnType {
    return this._columnType();
  }

  private _options = signal<{ label: string; value: any }[]>([]);
  @Input() set options(val: { label: string; value: any }[]) {
    this._options.set(val ?? []);
  }
  get options(): { label: string; value: any }[] {
    return this._options();
  }

  @Output() apply = new EventEmitter<FilterDescriptor>();
  @Output() clear = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  operator = signal<FilterOperator>('contains');
  value = signal<any>('');
  value2 = signal<any>('');
  listSearch = signal<string>('');

  operators = computed(() => OPERATOR_CONFIG[this.columnType] ?? OPERATOR_CONFIG.string);

  selectedOp = computed(() => this.operators().find(o => o.value === this.operator()) ?? this.operators()[0]);
  needsValue = computed(() => !!this.selectedOp()?.needsValue);
  needsSecondValue = computed(() => !!this.selectedOp()?.needsSecondValue);

  widgetType = computed<'text' | 'number' | 'date' | 'list'>(() => {
    // Dedicated widgets by type take priority
    if (this.columnType === 'number' || this.columnType === 'money' || this.columnType === 'percentage') return 'number';
    if (this.columnType === 'date' || this.columnType === 'dateTime') return 'date';

    const op = this.operator();
    const picksFromList = op === 'equals' || op === 'notEquals' || op === 'isAnyOf';

    // For list-bounded types (reference/enum/status), use the list widget whenever
    // the operator picks from a discrete set. The empty state inside the list
    // explains "no values to filter" — clearer than a free-text fallback for a
    // column whose universe of values is finite.
    if (picksFromList && this.isListType()) return 'list';

    // For free-text types (string/email/phone), use the list only when we
    // actually have a manageable set of distinct values to choose from.
    if (picksFromList && this.options.length > 0) return 'list';

    return 'text';
  });

  filteredOptions = computed(() => {
    const term = this.listSearch().toLowerCase().trim();
    if (!term) return this.options;
    return this.options.filter(o =>
      o.label.toLowerCase().includes(term) ||
      String(o.value).toLowerCase().includes(term)
    );
  });

  /** True when the column type supports `isEmpty`/`isNotEmpty` — used to
   *  surface presence-operator chips when there are no distinct values. */
  hasPresenceOps = computed(() => {
    const ops = this.operators();
    return ops.some(o => o.value === 'isEmpty') && ops.some(o => o.value === 'isNotEmpty');
  });

  /** Selected values for list-widget operators. For equals → single value; for isAnyOf → array. */
  selectedListValues = signal<any[]>([]);

  ngOnInit() {
    const ops = this.operators();
    if (this.initial) {
      this.operator.set(this.initial.operator);
      this.value.set(this.initial.value ?? '');
      this.value2.set(this.initial.value2 ?? '');
      if (this.initial.value != null) {
        if (Array.isArray(this.initial.value)) this.selectedListValues.set(this.initial.value);
        else this.selectedListValues.set([this.initial.value]);
      }
    } else {
      // Prefer `equals` when distinct options are available — matches the
      // one-click checklist UX from the spec. Falls back to the type's default.
      const preferred = (this.isListType() || this.options.length > 0)
        ? (ops.find(o => o.value === 'equals')?.value ?? ops[0]?.value)
        : ops[0]?.value;
      this.operator.set(preferred ?? 'contains');
    }
  }

  onOperatorChange(op: FilterOperator) {
    this.operator.set(op);
    if (!this.selectedOp()?.needsValue) {
      this.value.set('');
      this.selectedListValues.set([]);
    }
    if (!this.selectedOp()?.needsSecondValue) this.value2.set('');
  }

  isOptionSelected(v: any): boolean {
    return this.selectedListValues().some(s => String(s) === String(v));
  }

  toggleListValue(v: any) {
    const op = this.operator();
    if (op === 'isAnyOf') {
      // Multi-select
      const current = this.selectedListValues();
      const i = current.findIndex(x => String(x) === String(v));
      if (i === -1) this.selectedListValues.set([...current, v]);
      else {
        const next = [...current];
        next.splice(i, 1);
        this.selectedListValues.set(next);
      }
    } else {
      // Single-select (equals/notEquals) — replace
      this.selectedListValues.set(this.isOptionSelected(v) ? [] : [v]);
    }
  }

  onApply() {
    let outValue: any = undefined;
    let outValue2: any = undefined;
    if (this.needsValue()) {
      if (this.widgetType() === 'list') {
        const sel = this.selectedListValues();
        if (sel.length === 0) return; // nothing to apply
        outValue = this.operator() === 'isAnyOf' ? sel.join(',') : sel[0];
      } else {
        outValue = this.value();
      }
    }
    if (this.needsSecondValue()) outValue2 = this.value2();

    const desc: FilterDescriptor = {
      field: this.field,
      label: this.fieldLabel,
      type: this.columnType,
      operator: this.operator(),
      value: outValue,
      value2: outValue2,
    };
    this.apply.emit(desc);
  }

  onClear() {
    this.value.set('');
    this.value2.set('');
    this.selectedListValues.set([]);
    this.listSearch.set('');
    this.clear.emit();
  }

  private isListType(): boolean {
    return this.columnType === 'enum' || this.columnType === 'status'
        || this.columnType === 'reference' || this.columnType === 'boolean';
  }

  @HostListener('document:keydown.escape')
  onEscape() { this.close.emit(); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.host.nativeElement.contains(e.target)) this.close.emit();
  }
}
