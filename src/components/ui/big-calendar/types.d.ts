interface ISchedule {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  backgroundColor?: string;
  textColor?: string;
}

interface IScheduleWithPosition extends ISchedule {
  weekStart: dayjs.Dayjs;
  weekEnd: dayjs.Dayjs;
  startOffset: number;
  span: number;
  totalSpan: number;
  absoluteStart: dayjs.Dayjs;
}

interface StylesConfig {
  cellWeekHeight: number;
}

type DayFormat = 'd' | 'dd' | 'ddd' | 'dddd';
type LocaleSupport = 'id' | 'en';

interface IDayConfig {
  format: DayFormat;
  locale: LocaleSupport;
}

interface IDateConfig {
  format: string;
  locale: LocaleSupport;
}

interface IScheduleCalendarProps {
  /** Current date to display in calendar. Must match the dateFormat pattern */
  currentDate?: string;
  /** Format pattern for parsing the currentDate prop. Default: 'YYYY-MM-DD' */
  dateFormat?: string;
  /** Format pattern for date values in callbacks. Default: { format: 'YYYY-MM-DD', locale: 'en' } */
  callbackDateConfig?: IDateConfig;
  /** Format pattern for schedule startDate and endDate. Default: 'YYYY-MM-DD' */
  scheduleDateFormat?: string;
  /** Configuration for day names format and locale */
  dayConfig?: IDayConfig;
  /** Array of schedules to display in calendar */
  schedules?: ISchedule[];
  /** Maximum number of visible schedule slots. Default: 4 */
  maxVisibleSlots?: number;
  /** Custom styles that can be changed  */
  stylesConfig?: StylesConfig;
  /** Callback when an schedule is clicked */
  onScheduleClick?: (data: { date: string; schedule: ISchedule }) => void;
  /** Callback when overflow schedules slot is clicked */
  onOverflowSchedulesClick?: (data: { date: string; schedules: ISchedule[] }) => void;
  /** Callback when a calendar day cell is clicked */
  onDayClick?: (data: { date: string; schedules: ISchedule[] }) => void;
  /**
   * Custom message for overflow schedules text.
   * Receives array of overflow schedules and should return formatted string.
   * Default: (schedules) => `+ ${schedules.length} Schedule${schedules.length > 1 ? 's' : ''} more`
   */
  overflowScheduleMessage?: (schedules: ISchedule[]) => string;
}
