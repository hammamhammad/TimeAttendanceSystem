export interface PublicHoliday {
  id: number;
  name: string;
  nameAr?: string;
  holidayType: HolidayType;
  isActive: boolean;
  isNational: boolean;
  branchId?: number;
  branchName?: string;
  description?: string;
  effectiveFromYear?: number;
  effectiveToYear?: number;
  countryCode?: string;
  priority: number;
  patternDescription: string;
  nextOccurrence?: string;
  hasConflicts: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePublicHolidayRequest {
  name: string;
  nameAr?: string;
  specificDate?: string;
  month?: number;
  day?: number;
  holidayType: HolidayType;
  isActive?: boolean;
  isNational?: boolean;
  branchId?: number;
  description?: string;
  effectiveFromYear?: number;
  effectiveToYear?: number;
  countryCode?: string;
  priority?: number;
  weekOfMonth?: number;
  dayOfWeek?: number;
  pattern?: string;
  patternData?: any;
}

export interface UpdatePublicHolidayRequest {
  name: string;
  nameAr?: string;
  specificDate?: string;
  month?: number;
  day?: number;
  holidayType: HolidayType;
  isActive?: boolean;
  isNational?: boolean;
  branchId?: number;
  description?: string;
  effectiveFromYear?: number;
  effectiveToYear?: number;
  countryCode?: string;
  priority?: number;
  weekOfMonth?: number;
  dayOfWeek?: number;
  pattern?: string;
  patternData?: any;
}

export interface HolidayCalendarDay {
  date: string;
  holidays: PublicHoliday[];
  isHoliday: boolean;
  primaryHoliday?: PublicHoliday;
  hasConflicts: boolean;
  isWeekend: boolean;
  metadata?: { [key: string]: any };
}

export interface HolidayCalendarResponse {
  year: number;
  branchId?: number;
  branchName?: string;
  calendarDays: HolidayCalendarDay[];
  totalHolidayDays: number;
  totalHolidays: number;
  monthlyHolidayCounts: { [month: number]: number };
  calendarMetadata?: { [key: string]: any };
}

export interface PublicHolidaysResponse {
  holidays: PublicHoliday[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface HolidayImportRequest {
  template: HolidayTemplate;
  year: number;
  branchId?: number;
  countryCode: string;
  overwriteExisting?: boolean;
}

export enum HolidayType {
  OneTime = 0,
  Annual = 1,
  Monthly = 2,
  Floating = 3
}

export enum HolidayTemplate {
  USA_Federal = 'USA_Federal',
  UK_BankHolidays = 'UK_BankHolidays',
  SaudiArabia_National = 'SaudiArabia_National'
}

export interface HolidayDateResponse {
  date: string;
  holidays: PublicHoliday[];
}