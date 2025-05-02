import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Typography } from '../../typhography';
import { formatWithLocale } from '../utils/utils';

interface ICalendarHeaderProps {
  /** Configuration for day names format and locale */
  dayConfig: IDayConfig;
}

export const CalendarHeader = ({ dayConfig }: ICalendarHeaderProps) => {
  // Generate day names based on format and locale
  const dayNames = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = dayjs().day(index);
      return formatWithLocale(date, dayConfig.format, dayConfig.locale);
    });
  }, [dayConfig.format, dayConfig.locale]);

  return (
    <div className="grid grid-cols-7">
      {dayNames.map((day) => (
        <Typography
          as="global-strong"
          key={day}
          className="h-7 flex items-center justify-center text-white bg-knitto-blue-100 border border-[#B7BECB]"
        >
          {day}
        </Typography>
      ))}
    </div>
  );
};
