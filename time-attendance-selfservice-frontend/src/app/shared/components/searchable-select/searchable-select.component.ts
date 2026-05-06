import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  HostListener,
  ElementRef,
  signal,
  computed,
  inject
} from '@angular/core';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { I18nService } from '../../../core/i18n/i18n.service';

export interface SearchableSelectOption {
  value: any;
  label: string;
  subLabel?: string;
  code?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-searchable-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchableSelectComponent,
      multi: true
    }
  ]
})
export class SearchableSelectComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
  public i18n = inject(I18nService);
  private sanitizer = inject(DomSanitizer);
  private host: ElementRef<HTMLElement> = inject(ElementRef);

  // --- Existing inputs (unchanged) ---
  // options is signal-backed so the `filteredOptions` / `hasResults` /
  // `shouldShowEmptyMessage` computeds actually re-evaluate when the parent
  // updates the array via @Input. A plain @Input would not be tracked by
  // computed(), causing stale empty results after async option loading.
  private _options = signal<SearchableSelectOption[]>([]);
  @Input() set options(val: SearchableSelectOption[]) {
    this._options.set(val ?? []);
  }
  get options(): SearchableSelectOption[] {
    return this._options();
  }
  @Input() placeholder: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() clearable: boolean = true;
  @Input() required: boolean = false;
  @Input() searchable: boolean = true;
  @Input() maxDropdownHeight: string = '280px';
  @Input() noResultsMessage: string = '';
  @Input() loadingMessage: string = '';
  @Input() emptyMessage: string = '';
  @Input() allowCustomValue: boolean = false;
  @Input() customValueMessage: string = '';
  @Input() value: any = null;
  @Input() isInvalid: boolean = false;

  // --- New ERP-spec opt-in inputs (all backward-compatible) ---
  /** Returns the URL that the selected chip should link to (State 3). Opens in a new tab. */
  @Input() hrefFn?: (option: SearchableSelectOption) => string | null;
  /** Font Awesome class for the entity icon (e.g. 'fa-building'). Rendered in dropdown rows + selected chip. */
  @Input() entityIcon: string = 'fa-hashtag';
  /** Meta label shown to the right of the selected chip (e.g. 'ORG-000012'). 'code' → option.code, 'value' → option.value. */
  @Input() metaField: 'subLabel' | 'value' | 'code' | 'none' = 'subLabel';
  /** Hide actions on the selected chip → State 4 (auto-populated / inherited from parent record). */
  @Input() readOnly: boolean = false;
  /** Show "↑↓ navigate · Enter select · Esc close" hint in dropdown footer. */
  @Input() showKeyboardHint: boolean = true;
  /** Wrap matched substring in <mark> tags. */
  @Input() highlightMatch: boolean = true;

  // --- Outputs ---
  @Output() selectionChange = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  // --- Reactive state ---
  searchTerm = signal<string>('');
  showDropdown = signal<boolean>(false);
  selectedValue = signal<any>(null);
  selectedOption = signal<SearchableSelectOption | null>(null);
  highlightedIndex = signal<number>(-1);
  /** Forces search mode even when a value is selected (click "Change"). */
  editMode = signal<boolean>(false);

  filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.options;
    }
    return this.options.filter(option =>
      option.label.toLowerCase().includes(term) ||
      (option.subLabel && option.subLabel.toLowerCase().includes(term)) ||
      (option.code && option.code.toLowerCase().includes(term)) ||
      String(option.value).toLowerCase().includes(term)
    );
  });

  displayValue = computed(() => {
    if (this.editMode() || (this.searchTerm() && this.showDropdown())) {
      return this.searchTerm();
    }
    return this.selectedOption()?.label || '';
  });

  /** True when State 3 (selected chip) should render — has a value and not in edit mode. */
  showSelectedChip = computed(() =>
    !!this.selectedOption() && !this.editMode() && !this.showDropdown()
  );

  hasResults = computed(() => this.filteredOptions().length > 0);

  shouldShowNoResults = computed(() =>
    this.showDropdown() &&
    !this.loading &&
    this.searchTerm().trim().length > 0 &&
    !this.hasResults() &&
    !this.allowCustomValue
  );

  shouldShowEmptyMessage = computed(() =>
    this.showDropdown() &&
    !this.loading &&
    this.options.length === 0 &&
    this.searchTerm().trim().length === 0
  );

  shouldShowCustomValueOption = computed(() =>
    this.allowCustomValue &&
    this.searchTerm().trim().length > 0 &&
    !this.hasResults() &&
    !this.loading
  );

  resultCountLabel = computed(() => {
    const count = this.filteredOptions().length;
    const template = this.i18n.t('lookup.results_found');
    return template.replace('{{count}}', String(count));
  });

  keyboardHint = computed(() => this.i18n.t('lookup.keyboard_hint'));

  // --- ControlValueAccessor ---
  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue.set(value);
    const option = this.options.find(opt => opt.value === value) || null;
    this.selectedOption.set(option);
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  ngOnInit(): void {
    if (!this.noResultsMessage) this.noResultsMessage = this.i18n.t('common.noResultsFound');
    if (!this.loadingMessage) this.loadingMessage = this.i18n.t('common.loading');
    if (!this.emptyMessage) this.emptyMessage = this.i18n.t('common.no_data');
    if (!this.customValueMessage) this.customValueMessage = this.i18n.t('common.create');
    if (this.value !== null && this.value !== undefined) this.writeValue(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.writeValue(changes['value'].currentValue);
    }
    if (changes['options'] && !changes['options'].firstChange) {
      const currentValue = this.selectedValue();
      if (currentValue !== null && currentValue !== undefined) {
        const option = this.options.find(opt => opt.value === currentValue) || null;
        this.selectedOption.set(option);
      }
    }
  }

  ngOnDestroy(): void { /* noop */ }

  onInputFocus(): void {
    if (this.disabled || this.readOnly) return;
    this.showDropdown.set(true);
    this.highlightedIndex.set(-1);
    this.focus.emit();
    if (this.selectedOption()) {
      this.searchTerm.set('');
    }
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.showDropdown.set(true);
    this.highlightedIndex.set(value.trim() ? 0 : -1);
    this.searchChange.emit(value);
  }

  onSelectOption(option: SearchableSelectOption, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (option.disabled) return;
    this.selectedValue.set(option.value);
    this.selectedOption.set(option);
    this.searchTerm.set('');
    this.showDropdown.set(false);
    this.editMode.set(false);
    this.highlightedIndex.set(-1);
    this.onChange(option.value);
    this.selectionChange.emit(option.value);
  }

  onSelectCustomValue(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!this.allowCustomValue || !this.searchTerm().trim()) return;
    const customValue = this.searchTerm().trim();
    const option: SearchableSelectOption = { value: customValue, label: customValue };
    this.selectedValue.set(customValue);
    this.selectedOption.set(option);
    this.searchTerm.set('');
    this.showDropdown.set(false);
    this.editMode.set(false);
    this.onChange(customValue);
    this.selectionChange.emit(customValue);
  }

  onClear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedValue.set(null);
    this.selectedOption.set(null);
    this.searchTerm.set('');
    this.editMode.set(false);
    this.onChange(null);
    this.selectionChange.emit(null);
  }

  onChange_edit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const currentLabel = this.selectedOption()?.label || '';
    this.editMode.set(true);
    this.searchTerm.set(currentLabel);
    this.showDropdown.set(true);
    setTimeout(() => {
      const input = this.host.nativeElement.querySelector('input.form-control') as HTMLInputElement | null;
      input?.focus();
      input?.select();
    }, 0);
  }

  onToggleDropdown(): void {
    if (this.disabled || this.readOnly) return;
    if (this.showDropdown()) {
      this.showDropdown.set(false);
    } else {
      this.onInputFocus();
      setTimeout(() => {
        const input = this.host.nativeElement.querySelector('input.form-control') as HTMLInputElement | null;
        input?.focus();
      }, 0);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.showDropdown()) {
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
        this.onInputFocus();
        event.preventDefault();
      }
      return;
    }
    const options = this.filteredOptions();
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const next = Math.min(this.highlightedIndex() + 1, options.length - 1);
        this.highlightedIndex.set(next);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prev = Math.max(this.highlightedIndex() - 1, 0);
        this.highlightedIndex.set(prev);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        const idx = this.highlightedIndex();
        if (idx >= 0 && options[idx]) {
          this.onSelectOption(options[idx]);
        } else if (this.shouldShowCustomValueOption()) {
          this.onSelectCustomValue();
        }
        break;
      }
      case 'Escape': {
        event.preventDefault();
        this.showDropdown.set(false);
        this.editMode.set(false);
        this.searchTerm.set('');
        break;
      }
      case 'Tab': {
        this.showDropdown.set(false);
        this.onTouched();
        break;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      if (this.showDropdown()) {
        this.showDropdown.set(false);
        this.editMode.set(false);
        this.searchTerm.set('');
        this.onTouched();
        this.blur.emit();
      }
    }
  }

  getMeta(option: SearchableSelectOption): string {
    switch (this.metaField) {
      case 'subLabel': return option.subLabel || '';
      case 'code': return option.code || '';
      case 'value': return option.value !== null && option.value !== undefined ? String(option.value) : '';
      case 'none': default: return '';
    }
  }

  getHref(option: SearchableSelectOption): string | null {
    return this.hrefFn ? this.hrefFn(option) : null;
  }

  renderHighlighted(label: string): SafeHtml {
    const term = this.searchTerm().trim();
    if (!this.highlightMatch || !term) {
      return this.sanitizer.bypassSecurityTrustHtml(this.escapeHtml(label));
    }
    const escaped = this.escapeHtml(label);
    const escapedTerm = this.escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    const marked = escaped.replace(regex, '<mark>$1</mark>');
    return this.sanitizer.bypassSecurityTrustHtml(marked);
  }

  private escapeHtml(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  trackByValue(index: number, option: SearchableSelectOption): any {
    return option.value;
  }

  public focusInput(): void { this.onInputFocus(); }
  public clear(): void { this.onClear(new Event('clear')); }
  public search(term: string): void {
    this.searchTerm.set(term);
    this.showDropdown.set(true);
  }
}
