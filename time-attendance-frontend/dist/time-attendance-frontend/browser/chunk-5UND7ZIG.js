import {
  Injectable,
  effect,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-54H4HALB.js";
import {
  __async,
  __glob,
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// import("./translations/**/*.json") in src/app/core/i18n/i18n.service.ts
var globImport_translations_json = __glob({
  "./translations/ar.json": () => import("./chunk-G2D6FICH.js"),
  "./translations/en.json": () => import("./chunk-QAD4WHI6.js")
});

// src/app/core/i18n/i18n.service.ts
var _I18nService = class _I18nService {
  translations = signal({}, ...ngDevMode ? [{ debugName: "translations" }] : []);
  locale = signal("en", ...ngDevMode ? [{ debugName: "locale" }] : []);
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
  updateDocumentLanguage(locale) {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }
  /**
   * Dynamically loads translation files for the specified locale with error handling.
   * Implements lazy loading for performance optimization and graceful error handling.
   *
   * @param locale - The locale for which to load translations
   */
  loadTranslations(locale) {
    return __async(this, null, function* () {
      try {
        const translations = yield globImport_translations_json(`./translations/${locale}.json`);
        this.translations.set(translations.default || translations);
      } catch (error) {
        console.warn(`Failed to load translations for locale: ${locale}`, error);
        this.translations.set({});
      }
    });
  }
  /**
   * Sets the current application locale and triggers reactive translation updates.
   * Automatically loads translations and updates document language attributes.
   *
   * @param locale - The locale to set as current
   */
  setLocale(locale) {
    this.locale.set(locale);
  }
  /**
   * Translates a key to the current locale's text with fallback to the key itself.
   * Supports nested key notation with dot separation for hierarchical organization.
   *
   * @param key - The translation key to translate
   * @returns The translated text or the key itself if translation is not found
   */
  t(key) {
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
  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== void 0 ? current[key] : void 0;
    }, obj);
  }
  /**
   * Gets the current application locale.
   *
   * @returns The currently active locale
   */
  getCurrentLocale() {
    return this.locale();
  }
  /**
   * Determines if the current locale uses right-to-left (RTL) text direction.
   * Used for layout and styling decisions in the user interface.
   *
   * @returns True if the current locale is RTL, false otherwise
   */
  isRtl() {
    return this.locale() === "ar";
  }
};
__name(_I18nService, "I18nService");
__publicField(_I18nService, "\u0275fac", /* @__PURE__ */ __name(function I18nService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _I18nService)();
}, "I18nService_Factory"));
__publicField(_I18nService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _I18nService, factory: _I18nService.\u0275fac, providedIn: "root" }));
var I18nService = _I18nService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(I18nService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/environments/environment.ts
var environment = {
  production: false,
  apiUrl: "http://localhost:5099"
};

export {
  environment,
  I18nService
};
//# sourceMappingURL=chunk-5UND7ZIG.js.map
