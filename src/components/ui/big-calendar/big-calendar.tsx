import { useCalendarDays } from './hooks/use-calendar-days';
import { useScheduleSlots } from './hooks/use-schedule-slots';
import { CalendarHeader } from './components/calendar-header';
import { CalendarDay } from './components/calendar-day';
import { WeekScheduleSlots } from './components/week-schedule-slots';
import dayjs from 'dayjs';
import { formatWithLocale } from './utils/utils';

const BigCalendar = ({
  currentDate = dayjs().format('MM-YYYY'),
  dateFormat = 'MM-YYYY',
  callbackDateConfig = { format: 'YYYY-MM-DD', locale: 'en' },
  scheduleDateFormat = 'YYYY-MM-DD',
  dayConfig = { format: 'ddd', locale: 'en' },
  schedules = [],
  maxVisibleSlots = 4,
  stylesConfig = { cellWeekHeight: 200 },
  onScheduleClick,
  onOverflowSchedulesClick,
  onDayClick,
  overflowScheduleMessage = (schedules) => `+ ${schedules.length} Schedule${schedules.length > 1 ? 's' : ''} more`,
}: IScheduleCalendarProps) => {
  const { weeks, firstDayOfMonth } = useCalendarDays(currentDate, dateFormat);
  const { getScheduleSlotsForWeek, getSchedulesForDay } = useScheduleSlots({
    schedules,
    scheduleDateFormat,
    maxVisibleSlots,
  });

  const formatCallbackDate = (date: dayjs.Dayjs) => {
    return formatWithLocale(date, callbackDateConfig.format, callbackDateConfig.locale);
  };

  return (
    <div className="w-full">
      {/* Render calendar header with day names (Sun, Mon, etc.) based on dayConfig format and locale */}
      <CalendarHeader dayConfig={dayConfig} />

      <div className="grid grid-cols-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="relative">
            {/* Grid for displaying calendar days (dates) */}
            <div className="grid grid-cols-7">
              {week.map((day) => (
                <CalendarDay
                  key={day.toString()}
                  day={day}
                  firstDayOfMonth={firstDayOfMonth}
                  cellHeight={stylesConfig.cellWeekHeight}
                  schedules={getSchedulesForDay(day)}
                  onDayClick={onDayClick}
                  formatCallbackDate={formatCallbackDate}
                />
              ))}
            </div>

            {/*
              Render schedule slots for the current week
              - Handles visible schedule slots up to maxVisibleSlots
              - Manages overflow schedules with "more" slot
              - Positions schedules based on their start and end dates
            */}
            <WeekScheduleSlots
              week={week}
              {...getScheduleSlotsForWeek(week)}
              maxVisibleSlots={maxVisibleSlots}
              onScheduleClick={onScheduleClick}
              onOverflowSchedulesClick={onOverflowSchedulesClick}
              overflowScheduleMessage={overflowScheduleMessage}
              formatCallbackDate={formatCallbackDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BigCalendar;
