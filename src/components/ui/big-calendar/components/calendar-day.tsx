import dayjs from 'dayjs';
import { Typography } from '../../typhography';

interface ICalendarDayProps {
  day: dayjs.Dayjs;
  firstDayOfMonth: dayjs.Dayjs;
  cellHeight: number;
  schedules: ISchedule[];
  onDayClick?: (data: { date: string; schedules: ISchedule[] }) => void;
  formatCallbackDate: (date: dayjs.Dayjs) => string;
}

export const CalendarDay = ({ day, firstDayOfMonth, cellHeight, schedules, onDayClick, formatCallbackDate }: ICalendarDayProps) => {
  return (
    <div
      className={`border border-[#B7BECB] p-2 cursor-pointer hover:bg-knitto-blue-40`}
      style={{ height: `${cellHeight}px` }}
      onClick={() =>
        onDayClick?.({
          date: formatCallbackDate(day),
          schedules,
        })
      }
    >
      <Typography as="global-strong" className={`text-center ${day.isSame(firstDayOfMonth, 'month') ? 'text-black' : 'text-black/50'}`}>
        {day.date() === 1 ? `${day.date()} ${day.format('MMM')}` : day.date()}
      </Typography>
    </div>
  );
};
