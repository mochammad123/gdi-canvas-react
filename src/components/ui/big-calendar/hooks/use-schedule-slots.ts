import dayjs from 'dayjs';

interface UseScheduleSlotsProps {
  schedules: ISchedule[];
  scheduleDateFormat: string;
  maxVisibleSlots: number;
}

export const useScheduleSlots = ({ schedules, scheduleDateFormat, maxVisibleSlots }: UseScheduleSlotsProps) => {
  // Process schedules for a specific week and organize them into slots
  const getScheduleSlotsForWeek = (weekDays: dayjs.Dayjs[]) => {
    const weekStart = weekDays[0];
    const weekEnd = weekDays[6];

    // Filter and map schedules that intersect with the current week
    // This includes schedules that start before the week and end after the week
    const weekSchedules = schedules
      .filter((schedule) => {
        const scheduleStart = dayjs(schedule.startDate, scheduleDateFormat);
        const scheduleEnd = dayjs(schedule.endDate, scheduleDateFormat);

        if (!scheduleStart.isValid() || !scheduleEnd.isValid()) {
          console.warn(`Invalid date format for schedule "${schedule.title}". Schedule dates must match format "${scheduleDateFormat}"`);
          return false;
        }

        return scheduleStart.isSameOrBefore(weekEnd, 'day') && scheduleEnd.isSameOrAfter(weekStart, 'day');
      })
      .map((schedule) => {
        const scheduleStart = dayjs(schedule.startDate, scheduleDateFormat);
        const scheduleEnd = dayjs(schedule.endDate, scheduleDateFormat);
        const start = scheduleStart.isBefore(weekStart) ? weekStart : scheduleStart;
        const end = scheduleEnd.isAfter(weekEnd) ? weekEnd : scheduleEnd;
        const totalSpan = scheduleEnd.diff(scheduleStart, 'day') + 1;
        const weekSpan = end.diff(start, 'day') + 1;

        return {
          ...schedule,
          weekStart: start,
          weekEnd: end,
          startOffset: start.diff(weekStart, 'day'),
          span: weekSpan,
          totalSpan,
          absoluteStart: scheduleStart,
        };
      })
      .sort((a, b) => {
        // Prioritize based on the number of days in the active week
        const spanDiff = b.span - a.span;
        if (spanDiff !== 0) return spanDiff;

        // If the span is the same, prioritize the one with the earlier start date
        return a.absoluteStart.diff(b.absoluteStart);
      });

    const slots: { schedules: IScheduleWithPosition[]; start: number; end: number }[] = [];

    // Check if a schedule overlaps with any schedule in a slot
    const hasOverlap = (slot: { schedules: IScheduleWithPosition[] }, schedule: IScheduleWithPosition) => {
      const scheduleStart = schedule.startOffset;
      const scheduleEnd = schedule.startOffset + schedule.span - 1;

      return slot.schedules.some((existing) => {
        const existingStart = existing.startOffset;
        const existingEnd = existing.startOffset + existing.span - 1;
        return !(scheduleEnd < existingStart || scheduleStart > existingEnd);
      });
    };

    // Process each schedule and try to fit it into an existing slot
    // If no suitable slot is found and we haven't reached maxSlots, create a new slot
    weekSchedules.forEach((schedule) => {
      let slotFound = false;

      for (let i = 0; i < slots.length && !slotFound; i++) {
        if (!hasOverlap(slots[i], schedule)) {
          slots[i].schedules.push(schedule);
          slotFound = true;
        }
      }

      if (!slotFound && slots.length < maxVisibleSlots) {
        slots.push({
          schedules: [schedule],
          start: 0,
          end: 7,
        });
      }
    });

    // Sort schedules within each slot by start offset
    slots.forEach((slot) => {
      slot.schedules.sort((a, b) => a.startOffset - b.startOffset);
    });

    return {
      slots,
      remainingSchedules: weekSchedules.filter((schedule) => !slots.some((slot) => slot.schedules.some((e) => e.id === schedule.id))),
    };
  };

  // Get all schedules that occur on a specific day
  const getSchedulesForDay = (day: dayjs.Dayjs) => {
    return schedules.filter((schedule) => {
      const scheduleStart = dayjs(schedule.startDate, scheduleDateFormat);
      const scheduleEnd = dayjs(schedule.endDate, scheduleDateFormat);

      if (!scheduleStart.isValid() || !scheduleEnd.isValid()) {
        return false;
      }

      return day.isBetween(scheduleStart, scheduleEnd, 'day', '[]');
    });
  };

  return {
    getScheduleSlotsForWeek,
    getSchedulesForDay,
  };
};
