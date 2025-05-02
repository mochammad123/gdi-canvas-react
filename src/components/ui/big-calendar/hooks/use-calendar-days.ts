import { useMemo } from 'react';
import dayjs from 'dayjs';

export const useCalendarDays = (currentDate: string, dateFormat: string) => {
  const normalizedDate = useMemo(() => {
    if (!currentDate) return dayjs();
    return dayjs(currentDate, dateFormat);
  }, [currentDate, dateFormat]);

  // Get the first and last day of the current month
  const firstDayOfMonth = useMemo(() => normalizedDate.startOf('month'), [normalizedDate]);
  const lastDayOfMonth = useMemo(() => normalizedDate.endOf('month'), [normalizedDate]);

  // Get total days needed for the calendar grid (35 or 42)
  const totalDaysNeeded = useMemo(() => {
    const firstDayWeekday = firstDayOfMonth.day();
    const daysInMonth = lastDayOfMonth.date();
    const totalDays = firstDayWeekday + daysInMonth;
    // If total days is more than 35, we need 42 cells (6 rows)
    return totalDays > 35 ? 42 : 35;
  }, [firstDayOfMonth, lastDayOfMonth]);

  // Get days from previous month that appear in the current month's calendar
  const prevMonthDays = useMemo(() => {
    const firstDayWeekday = firstDayOfMonth.day();
    if (firstDayWeekday === 0) return [];
    return Array.from({ length: firstDayWeekday }, (_, index) => {
      return dayjs(firstDayOfMonth).subtract(firstDayWeekday - index, 'day');
    });
  }, [firstDayOfMonth]);

  // Get all days of the current month
  const currentMonthDays = useMemo(() => {
    return Array.from({ length: lastDayOfMonth.date() }, (_, index) => dayjs(firstDayOfMonth).add(index, 'day'));
  }, [firstDayOfMonth, lastDayOfMonth]);

  // Get days from next month that appear in the current month's calendar
  const nextMonthDays = useMemo(() => {
    const remainingDays = totalDaysNeeded - (prevMonthDays.length + currentMonthDays.length);
    return Array.from({ length: remainingDays }, (_, index) => dayjs(lastDayOfMonth).add(index + 1, 'day'));
  }, [prevMonthDays.length, currentMonthDays.length, lastDayOfMonth, totalDaysNeeded]);

  // Combine all days from previous month, current month and next month
  const allDays = useMemo(() => [...prevMonthDays, ...currentMonthDays, ...nextMonthDays], [prevMonthDays, currentMonthDays, nextMonthDays]);

  // Group days into weeks (7 days per week)
  const weeks = useMemo(() => {
    const weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }
    return weeks;
  }, [allDays]);

  return {
    weeks,
    firstDayOfMonth,
    lastDayOfMonth,
  };
};
