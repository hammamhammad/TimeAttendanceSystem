/** ERP spec §7D + §15 — column types + filter operators + descriptors */

/** Sentinel value used by list filters when a column wants to surface
 *  null/empty rows as a clickable option (e.g. "Root Department" for a
 *  parent-department column where root rows have a null parent name).
 *  When this value is selected, the data-table rewrites the filter
 *  descriptor to use `isEmpty` / `isNotEmpty` so the predicate engine
 *  matches the empty rows. */
export const FILTER_EMPTY_SENTINEL = '__filter_empty_value__';

export type ColumnType =
  | 'string'
  | 'number'
  | 'money'
  | 'percentage'
  | 'date'
  | 'dateTime'
  | 'boolean'
  | 'enum'
  | 'status'
  | 'reference'
  | 'phone'
  | 'email';

export type FilterOperator =
  // string
  | 'contains' | 'notContains' | 'startsWith' | 'endsWith'
  // comparable
  | 'equals' | 'notEquals'
  | 'greaterThan' | 'greaterOrEqual' | 'lessThan' | 'lessOrEqual' | 'between'
  // date
  | 'before' | 'after' | 'today' | 'thisWeek' | 'thisMonth' | 'thisYear'
  // boolean
  | 'isTrue' | 'isFalse'
  // enum / reference
  | 'isAnyOf'
  // universal
  | 'isEmpty' | 'isNotEmpty';

export interface FilterDescriptor {
  /** The flat/dotted field path (e.g. `accountName`, `Account.AccountName`). */
  field: string;
  /** Human-readable label shown in chip bar. */
  label: string;
  type: ColumnType;
  operator: FilterOperator;
  value?: any;
  value2?: any; // second value for between
}

export interface OperatorOption {
  value: FilterOperator;
  labelKey: string; // i18n key
  needsValue: boolean;
  needsSecondValue?: boolean;
}

/** Operators per column type — keep it simple, the spec's 22 canon included. */
export const OPERATOR_CONFIG: Record<ColumnType, OperatorOption[]> = {
  string: [
    { value: 'contains', labelKey: 'filter.op.contains', needsValue: true },
    { value: 'notContains', labelKey: 'filter.op.notContains', needsValue: true },
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'notEquals', labelKey: 'filter.op.notEquals', needsValue: true },
    { value: 'startsWith', labelKey: 'filter.op.startsWith', needsValue: true },
    { value: 'endsWith', labelKey: 'filter.op.endsWith', needsValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  number: [
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'notEquals', labelKey: 'filter.op.notEquals', needsValue: true },
    { value: 'greaterThan', labelKey: 'filter.op.greaterThan', needsValue: true },
    { value: 'greaterOrEqual', labelKey: 'filter.op.greaterOrEqual', needsValue: true },
    { value: 'lessThan', labelKey: 'filter.op.lessThan', needsValue: true },
    { value: 'lessOrEqual', labelKey: 'filter.op.lessOrEqual', needsValue: true },
    { value: 'between', labelKey: 'filter.op.between', needsValue: true, needsSecondValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  money: [
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'greaterThan', labelKey: 'filter.op.greaterThan', needsValue: true },
    { value: 'lessThan', labelKey: 'filter.op.lessThan', needsValue: true },
    { value: 'between', labelKey: 'filter.op.between', needsValue: true, needsSecondValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  percentage: [
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'greaterThan', labelKey: 'filter.op.greaterThan', needsValue: true },
    { value: 'lessThan', labelKey: 'filter.op.lessThan', needsValue: true },
    { value: 'between', labelKey: 'filter.op.between', needsValue: true, needsSecondValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  date: [
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'before', labelKey: 'filter.op.before', needsValue: true },
    { value: 'after', labelKey: 'filter.op.after', needsValue: true },
    { value: 'between', labelKey: 'filter.op.between', needsValue: true, needsSecondValue: true },
    { value: 'today', labelKey: 'filter.op.today', needsValue: false },
    { value: 'thisWeek', labelKey: 'filter.op.thisWeek', needsValue: false },
    { value: 'thisMonth', labelKey: 'filter.op.thisMonth', needsValue: false },
    { value: 'thisYear', labelKey: 'filter.op.thisYear', needsValue: false },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  dateTime: [
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'before', labelKey: 'filter.op.before', needsValue: true },
    { value: 'after', labelKey: 'filter.op.after', needsValue: true },
    { value: 'between', labelKey: 'filter.op.between', needsValue: true, needsSecondValue: true },
    { value: 'today', labelKey: 'filter.op.today', needsValue: false },
    { value: 'thisWeek', labelKey: 'filter.op.thisWeek', needsValue: false },
    { value: 'thisMonth', labelKey: 'filter.op.thisMonth', needsValue: false },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  boolean: [
    { value: 'isTrue', labelKey: 'filter.op.isTrue', needsValue: false },
    { value: 'isFalse', labelKey: 'filter.op.isFalse', needsValue: false },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
  ],
  enum: [
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'notEquals', labelKey: 'filter.op.notEquals', needsValue: true },
    { value: 'isAnyOf', labelKey: 'filter.op.isAnyOf', needsValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  status: [
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'notEquals', labelKey: 'filter.op.notEquals', needsValue: true },
    { value: 'isAnyOf', labelKey: 'filter.op.isAnyOf', needsValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  reference: [
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'notEquals', labelKey: 'filter.op.notEquals', needsValue: true },
    { value: 'isAnyOf', labelKey: 'filter.op.isAnyOf', needsValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  phone: [
    { value: 'contains', labelKey: 'filter.op.contains', needsValue: true },
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'startsWith', labelKey: 'filter.op.startsWith', needsValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
  email: [
    { value: 'contains', labelKey: 'filter.op.contains', needsValue: true },
    { value: 'equals', labelKey: 'filter.op.equals', needsValue: true },
    { value: 'endsWith', labelKey: 'filter.op.endsWith', needsValue: true },
    { value: 'isEmpty', labelKey: 'filter.op.isEmpty', needsValue: false },
    { value: 'isNotEmpty', labelKey: 'filter.op.isNotEmpty', needsValue: false },
  ],
};
