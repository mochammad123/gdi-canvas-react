import { ReactNode } from 'react';
import { OnArgs } from 'react-calendar';

export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: React.HTMLInputTypeAttribute;
}

export interface IInputDebounceProps extends IInputProps {
  classNameInput?: string;
  onChangeValue: (value: string) => void;
  suffix?: React.ReactNode;
  noIcon?: boolean;
}

export interface IInputWithSufixProps extends IInputProps {
  suffix?: ReactNode;
  className?: string;
  classNameInput?: string;
  classNamePosition?: string;
  onClickSuffix?: () => void;
}

export interface ICustomCalendarProps {
  onDrillDown?: ({ action, activeStartDate, value, view }: OnArgs, cb?: () => void) => void;
}

interface Time {
  hour: string;
  minute: string;
  second: string;
}

// ============================= ↓ Start of Input Date Range Picker ↓ =============================
export interface IInputDateRangePicker {
  /** Mode tampilan: 'single' untuk satu field, 'double' untuk dua field terpisah */
  mode?: 'single' | 'double';
  /** Label untuk field start date dan end date */
  label?: { startDate?: string; endDate?: string };
  /** Pesan error untuk field start date dan end date */
  error?: { startDate?: string; endDate?: string };
  /** Placeholder text untuk field start date dan end date */
  placeholder?: { startDate?: string; endDate?: string };
  /** Custom class names untuk toggle button dan text */
  classNames?: { toggle?: string; toggleText?: string };
  /** Nilai tanggal yang dipilih dalam format string (YYYY-MM-DD) */
  value: { startDate: string; endDate: string };
  /** Jika true, calendar akan tetap berada di bawah field meskipun tidak ada ruang */
  keepCalendarOnBottom?: boolean;
  /** Tanggal minimum yang bisa dipilih dalam format string (YYYY-MM-DD) */
  minDate?: string;
  /** Tanggal maksimum yang bisa dipilih dalam format string (YYYY-MM-DD) */
  maxDate?: string;
  /** Callback yang dipanggil ketika nilai tanggal berubah */
  onChange: (value: { startDate: string; endDate: string }) => void;
}

export interface IDateRangeFieldToggle {
  /** Label untuk field toggle */
  label?: string;
  /** Nilai tanggal yang ditampilkan dalam format string (YYYY-MM-DD) */
  value: string;
  /** Placeholder text ketika field kosong */
  placeholder?: string;
  /** Pesan error yang ditampilkan di bawah field */
  error?: string;
  /** Status apakah calendar sedang terbuka atau tidak */
  isCalendarOpen: boolean;
  /** Custom class names untuk toggle button dan text (menggunakan type dari IInputDateRangePicker) */
  classNames?: IInputDateRangePicker['classNames'];
}

export interface IDateRangeCalendar {
  /** Custom className untuk wrapper calendar */
  className: string;
  /** Nilai tanggal yang dipilih dalam format string (YYYY-MM-DD) */
  value: { startDate: string; endDate: string };
  /** Tanggal minimum yang bisa dipilih dalam format string (YYYY-MM-DD) */
  minDate?: string;
  /** Tanggal maksimum yang bisa dipilih dalam format string (YYYY-MM-DD) */
  maxDate?: string;
  /** Callback yang dipanggil ketika user mengklik tombol apply pada calendar */
  onApplyDateRange: (value: { startDate: string; endDate: string }) => void;
  /** Status apakah animasi sedang berjalan */
  isAnimating: boolean;
  /** Status apakah calendar sedang terbuka */
  isCalendarOpen: boolean;
}
// ============================= ↑ End of Input Date Range Picker ↑ =============================
