import { FilterDescriptor, FilterOperator } from './types';

/** Resolve a dotted path like `account.name` from any object. */
function resolve(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function toLower(v: any): string {
  if (v === null || v === undefined) return '';
  const s = String(v);
  // Strip HTML tags + collapse whitespace so row values carrying rendered
  // badge markup still match their stripped filter values.
  const stripped = /<[^>]+>/.test(s) ? s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : s;
  return stripped.toLowerCase();
}

function toNumber(v: any): number | null {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(/,/g, ''));
  return isNaN(n) ? null : n;
}

function toDate(v: any): Date | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

function stripDigits(v: any): string {
  return toLower(v).replace(/[^0-9]/g, '');
}

function startOfDay(d: Date): Date { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function endOfDay(d: Date): Date { const x = new Date(d); x.setHours(23, 59, 59, 999); return x; }
function startOfWeek(d: Date): Date { const x = startOfDay(d); x.setDate(x.getDate() - x.getDay()); return x; }
function startOfMonth(d: Date): Date { const x = startOfDay(d); x.setDate(1); return x; }
function startOfYear(d: Date): Date { const x = startOfDay(d); x.setMonth(0, 1); return x; }

function isInRange(d: Date, from: Date, to: Date): boolean {
  const t = d.getTime();
  return t >= from.getTime() && t <= to.getTime();
}

/** Apply a single descriptor to one row. Returns true if row passes filter. */
export function matches(row: any, f: FilterDescriptor): boolean {
  const raw = resolve(row, f.field);

  // Universal — empty/not-empty work on any type
  if (f.operator === 'isEmpty') return raw === null || raw === undefined || raw === '';
  if (f.operator === 'isNotEmpty') return !(raw === null || raw === undefined || raw === '');

  switch (f.type) {
    case 'string':
    case 'email':
    case 'enum':
    case 'status':
    case 'reference': {
      const a = toLower(raw);
      const b = toLower(f.value);
      switch (f.operator) {
        case 'contains': return a.includes(b);
        case 'notContains': return !a.includes(b);
        case 'equals': return a === b;
        case 'notEquals': return a !== b;
        case 'startsWith': return a.startsWith(b);
        case 'endsWith': return a.endsWith(b);
        case 'isAnyOf': {
          const list = Array.isArray(f.value) ? f.value.map(toLower) : toLower(f.value).split(',').map(s => s.trim()).filter(Boolean);
          return list.includes(a);
        }
      }
      return true;
    }

    case 'phone': {
      const a = stripDigits(raw);
      const b = stripDigits(f.value);
      switch (f.operator) {
        case 'contains': return a.includes(b);
        case 'equals': return a === b;
        case 'startsWith': return a.startsWith(b);
      }
      return true;
    }

    case 'number':
    case 'money':
    case 'percentage': {
      const a = toNumber(raw);
      const b = toNumber(f.value);
      if (a === null) return false;
      switch (f.operator) {
        case 'equals': return a === b;
        case 'notEquals': return a !== b;
        case 'greaterThan': return b !== null && a > b;
        case 'greaterOrEqual': return b !== null && a >= b;
        case 'lessThan': return b !== null && a < b;
        case 'lessOrEqual': return b !== null && a <= b;
        case 'between': {
          const b2 = toNumber(f.value2);
          if (b === null || b2 === null) return true;
          const [lo, hi] = [b, b2].sort((x, y) => x - y);
          return a >= lo && a <= hi;
        }
      }
      return true;
    }

    case 'date':
    case 'dateTime': {
      const a = toDate(raw);
      const b = toDate(f.value);
      if (a === null) return false;
      const now = new Date();
      switch (f.operator) {
        case 'equals': return b !== null && startOfDay(a).getTime() === startOfDay(b).getTime();
        case 'before': return b !== null && a.getTime() < b.getTime();
        case 'after': return b !== null && a.getTime() > b.getTime();
        case 'between': {
          const b2 = toDate(f.value2);
          if (b === null || b2 === null) return true;
          const [lo, hi] = [b, b2].sort((x, y) => x.getTime() - y.getTime());
          return isInRange(a, startOfDay(lo), endOfDay(hi));
        }
        case 'today': return isInRange(a, startOfDay(now), endOfDay(now));
        case 'thisWeek': {
          const end = endOfDay(now);
          return isInRange(a, startOfWeek(now), end);
        }
        case 'thisMonth': return isInRange(a, startOfMonth(now), endOfDay(now));
        case 'thisYear': return isInRange(a, startOfYear(now), endOfDay(now));
      }
      return true;
    }

    case 'boolean': {
      const isTruthy = raw === true || raw === 'true' || raw === 1;
      const isFalsy = raw === false || raw === 'false' || raw === 0;
      switch (f.operator) {
        case 'isTrue': return isTruthy;
        case 'isFalse': return isFalsy;
      }
      return true;
    }
  }
  return true;
}

/** AND-combines all filters. Empty filter list passes everything. */
export function applyFilters<T>(rows: T[], filters: FilterDescriptor[]): T[] {
  if (!filters || filters.length === 0) return rows;
  return rows.filter(row => filters.every(f => matches(row, f)));
}
