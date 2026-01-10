import {
  environment
} from "./chunk-TNEZPYQG.js";
import {
  HttpClient,
  HttpParams,
  Injectable,
  catchError,
  inject,
  map,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/shared/models/public-holiday.model.ts
var HolidayType;
(function(HolidayType2) {
  HolidayType2[HolidayType2["OneTime"] = 0] = "OneTime";
  HolidayType2[HolidayType2["Annual"] = 1] = "Annual";
  HolidayType2[HolidayType2["Monthly"] = 2] = "Monthly";
  HolidayType2[HolidayType2["Floating"] = 3] = "Floating";
})(HolidayType || (HolidayType = {}));
var HolidayTemplate;
(function(HolidayTemplate2) {
  HolidayTemplate2["USA_Federal"] = "USA_Federal";
  HolidayTemplate2["UK_BankHolidays"] = "UK_BankHolidays";
  HolidayTemplate2["SaudiArabia_National"] = "SaudiArabia_National";
})(HolidayTemplate || (HolidayTemplate = {}));

// src/app/pages/settings/public-holidays/public-holidays.service.ts
var _PublicHolidaysService = class _PublicHolidaysService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/api/v1/public-holidays`;
  /**
   * Get paginated list of public holidays with filtering options
   */
  getPublicHolidays(page = 1, pageSize = 10, searchTerm, year, branchId, holidayType, isActive, isNational, countryCode) {
    let params = new HttpParams().set("page", page.toString()).set("pageSize", pageSize.toString());
    if (searchTerm) {
      params = params.set("searchTerm", searchTerm);
    }
    if (year !== void 0) {
      params = params.set("year", year.toString());
    }
    if (branchId !== void 0) {
      params = params.set("branchId", branchId.toString());
    }
    if (holidayType !== void 0) {
      params = params.set("holidayType", holidayType.toString());
    }
    if (isActive !== void 0) {
      params = params.set("isActive", isActive.toString());
    }
    if (isNational !== void 0) {
      params = params.set("isNational", isNational.toString());
    }
    if (countryCode) {
      params = params.set("countryCode", countryCode);
    }
    return this.http.get(this.baseUrl, { params });
  }
  /**
   * Get a specific public holiday by ID
   */
  getPublicHolidayById(id, includeConflicts = false, year) {
    let params = new HttpParams();
    if (includeConflicts) {
      params = params.set("includeConflicts", "true");
    }
    if (year !== void 0) {
      params = params.set("year", year.toString());
    }
    return this.http.get(`${this.baseUrl}/${id}`, { params });
  }
  /**
   * Create a new public holiday
   */
  createPublicHoliday(request) {
    console.log("Creating public holiday with request:", request);
    console.log("Request URL:", this.baseUrl);
    console.log("Request payload (stringified):", JSON.stringify(request));
    return this.http.post(this.baseUrl, request);
  }
  /**
   * Update an existing public holiday
   */
  updatePublicHoliday(id, request) {
    return this.http.put(`${this.baseUrl}/${id}`, request);
  }
  /**
   * Delete a public holiday
   */
  deletePublicHoliday(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  /**
   * Get holiday calendar for a specific year
   */
  getHolidayCalendar(year, branchId, includeInactive = false, format) {
    let params = new HttpParams();
    if (branchId !== void 0) {
      params = params.set("branchId", branchId.toString());
    }
    if (includeInactive) {
      params = params.set("includeInactive", "true");
    }
    if (format) {
      params = params.set("format", format);
    }
    return this.http.get(`${this.baseUrl}/calendar/${year}`, { params });
  }
  /**
   * Get holidays for a specific month
   */
  getHolidayDates(year, month, branchId) {
    let params = new HttpParams();
    if (branchId !== void 0) {
      params = params.set("branchId", branchId.toString());
    }
    return this.http.get(`${this.baseUrl}/dates/${year}/${month}`, { params });
  }
  /**
   * Import holiday template
   */
  importHolidayTemplate(request) {
    return this.http.post(`${this.baseUrl}/import`, request);
  }
  /**
   * Export holidays for a specific year
   */
  exportHolidays(year, format = "json", branchId, includeInactive = false) {
    let params = new HttpParams().set("format", format);
    if (branchId !== void 0) {
      params = params.set("branchId", branchId.toString());
    }
    if (includeInactive) {
      params = params.set("includeInactive", "true");
    }
    return this.http.get(`${this.baseUrl}/export/${year}`, {
      params,
      responseType: "blob"
    });
  }
  /**
   * Check if a specific date is a holiday
   */
  isHoliday(date, branchId) {
    let params = new HttpParams().set("date", date);
    if (branchId !== void 0) {
      params = params.set("branchId", branchId.toString());
    }
    return this.http.get(`${this.baseUrl}/is-holiday`, { params });
  }
  /**
   * Get available holiday templates
   */
  getAvailableTemplates() {
    return [
      HolidayTemplate.USA_Federal,
      HolidayTemplate.UK_BankHolidays,
      HolidayTemplate.SaudiArabia_National
    ];
  }
  /**
   * Get holiday type options for UI
   */
  getHolidayTypes() {
    return [
      {
        value: HolidayType.OneTime,
        label: "One Time",
        description: "Holiday occurs only once on a specific date"
      },
      {
        value: HolidayType.Annual,
        label: "Annual",
        description: "Holiday occurs every year on the same date"
      },
      {
        value: HolidayType.Monthly,
        label: "Monthly",
        description: "Holiday occurs every month on the same day"
      },
      {
        value: HolidayType.Floating,
        label: "Floating",
        description: "Holiday occurs on a relative date (e.g., first Monday of March)"
      }
    ];
  }
  /**
   * Get branches for dropdown selection
   */
  getBranches() {
    return this.http.get(`${environment.apiUrl}/api/v1/branches/all`).pipe(map((response) => response.value), catchError((error) => {
      console.error("Failed to load branches:", error);
      return throwError(() => error);
    }));
  }
  /**
   * Validate holiday data before submission
   */
  validateHolidayData(request) {
    const errors = [];
    if (!request.name || request.name.trim().length === 0) {
      errors.push("Holiday name is required");
    }
    if (request.holidayType === HolidayType.OneTime || request.holidayType === HolidayType.Annual) {
      if (!request.specificDate && (!request.month || !request.day)) {
        errors.push("Specific date or month/day is required for this holiday type");
      }
    }
    if (request.holidayType === HolidayType.Floating) {
      if (!request.weekOfMonth || !request.dayOfWeek || !request.month) {
        errors.push("Week of month, day of week, and month are required for floating holidays");
      }
    }
    if (request.effectiveFromYear && request.effectiveToYear) {
      if (request.effectiveFromYear > request.effectiveToYear) {
        errors.push("Effective from year cannot be after effective to year");
      }
    }
    if (request.priority !== void 0 && (request.priority < 1 || request.priority > 100)) {
      errors.push("Priority must be between 1 and 100");
    }
    return errors;
  }
};
__name(_PublicHolidaysService, "PublicHolidaysService");
__publicField(_PublicHolidaysService, "\u0275fac", /* @__PURE__ */ __name(function PublicHolidaysService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PublicHolidaysService)();
}, "PublicHolidaysService_Factory"));
__publicField(_PublicHolidaysService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PublicHolidaysService, factory: _PublicHolidaysService.\u0275fac, providedIn: "root" }));
var PublicHolidaysService = _PublicHolidaysService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublicHolidaysService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  HolidayType,
  HolidayTemplate,
  PublicHolidaysService
};
//# sourceMappingURL=chunk-SBZVYMGF.js.map
