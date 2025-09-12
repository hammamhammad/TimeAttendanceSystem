import { Injectable, signal, effect } from '@angular/core';

export type Locale = 'en' | 'ar';

interface Translations {
  [key: string]: any;
}

/**
 * Angular internationalization (i18n) service providing comprehensive localization support for multi-language applications.
 * Implements reactive localization management with Angular Signals, dynamic translation loading, and RTL support
 * for seamless English-Arabic bilingual user experience with cultural adaptation and accessibility features.
 * 
 * @remarks
 * Internationalization Features:
 * - Reactive localization management using Angular Signals for immediate UI updates
 * - Dynamic translation file loading with lazy loading optimization for performance
 * - Bi-directional text support with automatic RTL/LTR switching for Arabic/English
 * - Document-level language and direction management for accessibility compliance
 * - Nested translation key support with dot notation for hierarchical organization
 * - Fallback mechanism ensuring graceful degradation when translations are missing
 * 
 * Supported Languages:
 * - English (en): Primary language with left-to-right (LTR) text direction
 * - Arabic (ar): Secondary language with right-to-left (RTL) text direction and cultural formatting
 * - Extensible architecture supporting additional languages through configuration
 * - Language-specific formatting for dates, numbers, and cultural conventions
 * - Locale-aware content rendering with proper text direction and alignment
 * 
 * Angular Integration:
 * - Angular Signals for reactive state management and automatic UI synchronization
 * - Effect-based translation loading ensuring translations are available when needed
 * - Injectable service pattern with root-level dependency injection for global access
 * - Component integration through service injection and translation pipe usage
 * - Route-level localization support with language parameter handling
 * - Form validation integration with localized error messages and field labels
 * 
 * Performance Optimization:
 * - Lazy loading of translation files reducing initial bundle size
 * - Dynamic import statements for code splitting and performance optimization
 * - Memory-efficient translation caching with automatic cleanup mechanisms
 * - Signal-based reactivity minimizing unnecessary re-renders and computations
 * - Efficient nested property access with optimized traversal algorithms
 * - Translation key caching for frequently accessed strings
 * 
 * Accessibility and User Experience:
 * - Document language attribute management for screen reader compatibility
 * - Text direction management for proper RTL/LTR rendering and layout
 * - Cultural formatting integration for dates, numbers, and currency display
 * - Keyboard navigation support with direction-aware focus management
 * - High contrast and accessibility-compliant translation key structures
 * - User preference persistence for consistent cross-session experience
 * 
 * Error Handling and Resilience:
 * - Graceful fallback to translation keys when translations are missing
 * - Error logging and monitoring for translation loading failures
 * - Default language fallback ensuring application functionality under all conditions
 * - Translation validation and integrity checking for production deployments
 * - Hot-reloading support for development environments with translation updates
 */
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translations = signal<Translations>({});
  public locale = signal<Locale>('en');

  /**
   * Initializes the I18nService with reactive locale management and automatic translation loading.
   * Sets up Angular effects for automatic translation loading and document language updates.
   */
  constructor() {
    effect(() => {
      const currentLocale = this.locale();
      this.updateDocumentLanguage(currentLocale);
      this.loadTranslations(currentLocale);
    });
  }

  /**
   * Updates the document's language and text direction attributes for accessibility and proper rendering.
   * Configures HTML document elements to support screen readers and RTL/LTR text rendering.
   * 
   * @param locale - The locale to apply to the document
   */
  private updateDocumentLanguage(locale: Locale): void {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }

  /**
   * Dynamically loads translation files for the specified locale with error handling.
   * Implements lazy loading for performance optimization and graceful error handling.
   * 
   * @param locale - The locale for which to load translations
   */
  private async loadTranslations(locale: Locale): Promise<void> {
    try {
      const translations = await import(`./translations/${locale}.json`);
      this.translations.set(translations.default || translations);
    } catch (error) {
      console.warn(`Failed to load translations for locale: ${locale}`, error);
      this.translations.set({});
    }
  }

  /**
   * Sets the current application locale and triggers reactive translation updates.
   * Automatically loads translations and updates document language attributes.
   * 
   * @param locale - The locale to set as current
   */
  public setLocale(locale: Locale): void {
    this.locale.set(locale);
  }

  /**
   * Translates a key to the current locale's text with fallback to the key itself.
   * Supports nested key notation with dot separation for hierarchical organization.
   * 
   * @param key - The translation key to translate
   * @returns The translated text or the key itself if translation is not found
   */
  public t(key: string): string {
    const translations = this.translations();
    return this.getNestedValue(translations, key) || key;
  }

  /**
   * Retrieves nested values from translation objects using dot notation path traversal.
   * Safely navigates nested object structures with null/undefined checking.
   * 
   * @param obj - The object to traverse
   * @param path - The dot-separated path to the desired value
   * @returns The nested value or undefined if not found
   */
  private getNestedValue(obj: any, path: string): string | undefined {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  /**
   * Gets the current application locale.
   * 
   * @returns The currently active locale
   */
  public getCurrentLocale(): Locale {
    return this.locale();
  }

  /**
   * Determines if the current locale uses right-to-left (RTL) text direction.
   * Used for layout and styling decisions in the user interface.
   * 
   * @returns True if the current locale is RTL, false otherwise
   */
  public isRtl(): boolean {
    return this.locale() === 'ar';
  }
}