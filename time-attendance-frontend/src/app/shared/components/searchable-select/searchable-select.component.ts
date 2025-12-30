import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, signal, computed, inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';

export interface SearchableSelectOption {
  value: any;
  label: string;
  subLabel?: string;
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

  // Input properties
  @Input() options: SearchableSelectOption[] = [];
  @Input() placeholder: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() clearable: boolean = true;
  @Input() required: boolean = false;
  @Input() searchable: boolean = true;
  @Input() maxDropdownHeight: string = '200px';
  @Input() noResultsMessage: string = '';
  @Input() loadingMessage: string = '';
  @Input() emptyMessage: string = '';
  @Input() allowCustomValue: boolean = false;
  @Input() customValueMessage: string = '';
  @Input() value: any = null;
  @Input() isInvalid: boolean = false;

  // Output events
  @Output() selectionChange = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  // Signals for reactive state management
  searchTerm = signal<string>('');
  showDropdown = signal<boolean>(false);
  selectedValue = signal<any>(null);
  selectedOption = signal<SearchableSelectOption | null>(null);

  // Computed properties
  filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.options;
    }

    return this.options.filter(option =>
      option.label.toLowerCase().includes(term) ||
      (option.subLabel && option.subLabel.toLowerCase().includes(term)) ||
      String(option.value).toLowerCase().includes(term)
    );
  });

  displayValue = computed(() => {
    if (this.searchTerm() && this.showDropdown()) {
      return this.searchTerm();
    }
    return this.selectedOption()?.label || '';
  });

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

  // ControlValueAccessor implementation
  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue.set(value);
    const option = this.options.find(opt => opt.value === value) || null;
    this.selectedOption.set(option);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    // Set default messages using i18n
    if (!this.noResultsMessage) {
      this.noResultsMessage = this.i18n.t('common.noResultsFound');
    }
    if (!this.loadingMessage) {
      this.loadingMessage = this.i18n.t('common.loading');
    }
    if (!this.emptyMessage) {
      this.emptyMessage = this.i18n.t('common.no_data');
    }
    if (!this.customValueMessage) {
      this.customValueMessage = this.i18n.t('common.create');
    }

    // Initialize value from input
    if (this.value !== null && this.value !== undefined) {
      this.writeValue(this.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Handle value changes from parent component
    if (changes['value'] && !changes['value'].firstChange) {
      this.writeValue(changes['value'].currentValue);
    }

    // Handle options changes - update selected option if options change
    if (changes['options'] && !changes['options'].firstChange) {
      const currentValue = this.selectedValue();
      if (currentValue !== null && currentValue !== undefined) {
        const option = this.options.find(opt => opt.value === currentValue) || null;
        this.selectedOption.set(option);
      }
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  onInputFocus(): void {
    if (this.disabled) return;

    this.showDropdown.set(true);
    this.focus.emit();

    // Clear search term to show all options when focusing
    if (this.selectedOption()) {
      this.searchTerm.set('');
    }
  }

  onInputBlur(): void {
    // Delay hiding dropdown to allow for option clicks
    setTimeout(() => {
      this.showDropdown.set(false);
      this.onTouched();
      this.blur.emit();
    }, 200);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.searchTerm.set(value);
    this.showDropdown.set(true);
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
    this.selectedValue.set(customValue);
    this.selectedOption.set({
      value: customValue,
      label: customValue
    });
    this.searchTerm.set('');
    this.showDropdown.set(false);

    this.onChange(customValue);
    this.selectionChange.emit(customValue);
  }

  onClear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.selectedValue.set(null);
    this.selectedOption.set(null);
    this.searchTerm.set('');

    this.onChange(null);
    this.selectionChange.emit(null);
  }

  onToggleDropdown(): void {
    if (this.disabled) return;

    if (this.showDropdown()) {
      this.showDropdown.set(false);
    } else {
      this.onInputFocus();
    }
  }

  trackByValue(index: number, option: SearchableSelectOption): any {
    return option.value;
  }

  // Public methods for external control
  public focusInput(): void {
    // Can be called externally to focus the component
    this.onInputFocus();
  }

  public clear(): void {
    this.onClear(new Event('clear'));
  }

  public search(term: string): void {
    this.searchTerm.set(term);
    this.showDropdown.set(true);
  }
}