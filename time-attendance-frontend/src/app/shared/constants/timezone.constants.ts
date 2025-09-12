export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: 'UTC+00:00' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)', offset: 'UTC-05:00' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)', offset: 'UTC-06:00' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)', offset: 'UTC-07:00' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)', offset: 'UTC-08:00' },
  { value: 'Europe/London', label: 'London, Edinburgh, Dublin', offset: 'UTC+00:00' },
  { value: 'Europe/Paris', label: 'Paris, Madrid, Amsterdam', offset: 'UTC+01:00' },
  { value: 'Europe/Berlin', label: 'Berlin, Rome, Stockholm', offset: 'UTC+01:00' },
  { value: 'Europe/Moscow', label: 'Moscow, St. Petersburg', offset: 'UTC+03:00' },
  { value: 'Asia/Dubai', label: 'Dubai, Abu Dhabi', offset: 'UTC+04:00' },
  { value: 'Asia/Riyadh', label: 'Riyadh, Kuwait', offset: 'UTC+03:00' },
  { value: 'Asia/Qatar', label: 'Doha', offset: 'UTC+03:00' },
  { value: 'Asia/Bahrain', label: 'Manama', offset: 'UTC+03:00' },
  { value: 'Asia/Karachi', label: 'Islamabad, Karachi', offset: 'UTC+05:00' },
  { value: 'Asia/Kolkata', label: 'New Delhi, Mumbai', offset: 'UTC+05:30' },
  { value: 'Asia/Shanghai', label: 'Beijing, Shanghai, Hong Kong', offset: 'UTC+08:00' },
  { value: 'Asia/Tokyo', label: 'Tokyo, Osaka, Sapporo', offset: 'UTC+09:00' },
  { value: 'Asia/Seoul', label: 'Seoul', offset: 'UTC+09:00' },
  { value: 'Australia/Sydney', label: 'Sydney, Melbourne', offset: 'UTC+10:00' },
  { value: 'Pacific/Auckland', label: 'Auckland, Wellington', offset: 'UTC+12:00' }
];