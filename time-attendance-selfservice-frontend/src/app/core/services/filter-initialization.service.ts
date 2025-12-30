import { Injectable, inject } from '@angular/core';
import { FilterRegistryService } from './filter-registry.service';
import { FILTER_CONFIGURATIONS } from '../configs/filter-configurations';

@Injectable({
  providedIn: 'root'
})
export class FilterInitializationService {
  private filterRegistry = inject(FilterRegistryService);

  constructor() {
    this.initializeConfigurations();
  }

  private initializeConfigurations(): void {
    // Register all module configurations
    Object.keys(FILTER_CONFIGURATIONS).forEach(moduleName => {
      this.filterRegistry.registerModule(moduleName, FILTER_CONFIGURATIONS[moduleName]);
    });

    console.log(`Registered ${Object.keys(FILTER_CONFIGURATIONS).length} filter configurations`);
  }

  // Method to re-initialize if needed
  reinitialize(): void {
    this.initializeConfigurations();
  }

  // Method to get all registered modules
  getRegisteredModules(): string[] {
    return this.filterRegistry.getAllModules();
  }
}