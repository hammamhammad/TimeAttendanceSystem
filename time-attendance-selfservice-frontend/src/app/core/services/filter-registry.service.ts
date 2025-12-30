import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, of } from 'rxjs';
import {
  UnifiedFilterConfig,
  FilterDefinition,
  FilterData,
  ModuleFilterRegistry,
  CommonFilterTypes
} from '../../shared/models/unified-filter.model';
import { SearchableSelectOption } from '../../shared/components/searchable-select/searchable-select.component';
import { I18nService } from '../i18n/i18n.service';

/**
 * Simplified FilterRegistryService for Self-Service Portal
 * This version does not include admin-level filtering capabilities
 */
@Injectable({
  providedIn: 'root'
})
export class FilterRegistryService {
  private http = inject(HttpClient);
  private i18n = inject(I18nService);

  private registry: ModuleFilterRegistry = {};
  private dataCache = new BehaviorSubject<FilterData>({});

  constructor() {
    // Self-service portal doesn't need complex filter initialization
  }

  registerModule(moduleName: string, config: UnifiedFilterConfig): void {
    this.registry[moduleName] = config;
  }

  getModuleConfig(moduleName: string): UnifiedFilterConfig | null {
    return this.registry[moduleName] || null;
  }

  getAllModules(): string[] {
    return Object.keys(this.registry);
  }

  getCachedData(): Observable<FilterData> {
    return this.dataCache.asObservable();
  }

  buildFilterOptions(filterDef: FilterDefinition, cachedData: FilterData, currentFilters?: any): SearchableSelectOption[] {
    const allOption: SearchableSelectOption = {
      value: '',
      label: this.i18n.t('common.all')
    };

    switch (filterDef.type) {
      case CommonFilterTypes.Status:
        if (filterDef.statusEnum && filterDef.statusLabels) {
          return [
            allOption,
            ...Object.keys(filterDef.statusEnum)
              .filter(key => isNaN(Number(key)))
              .map(key => ({
                value: filterDef.statusEnum![key],
                label: this.i18n.t(filterDef.statusLabels![key] || key)
              }))
          ];
        }
        return [allOption];

      case CommonFilterTypes.Custom:
        return filterDef.options?.map(option => ({
          ...option,
          label: this.i18n.t(option.label)
        })) || [allOption];

      default:
        return [allOption];
    }
  }

  buildActiveInactiveOptions(): SearchableSelectOption[] {
    return [
      { value: '', label: this.i18n.t('common.all') },
      { value: 'true', label: this.i18n.t('common.active') },
      { value: 'false', label: this.i18n.t('common.inactive') }
    ];
  }

  clearCache(): void {
    this.dataCache.next({});
  }
}
