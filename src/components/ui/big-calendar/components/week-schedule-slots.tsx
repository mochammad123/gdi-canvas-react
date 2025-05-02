import dayjs from 'dayjs';
import { ScheduleSlot } from './schedule-slot';
import { OverflowScheduleSlot } from './overflow-schedule-slot';
import { SCHEDULE_HEIGHT, SCHEDULE_HORIZONTAL_MARGIN, SCHEDULE_MARGIN } from '../utils/constants';

interface WeekScheduleSlotsProps {
  week: dayjs.Dayjs[];
  slots: {
    schedules: IScheduleWithPosition[];
    start: number;
    end: number;
  }[];
  remainingSchedules: IScheduleWithPosition[];
  maxVisibleSlots: number;
  onScheduleClick?: (data: { date: string; schedule: ISchedule }) => void;
  onOverflowSchedulesClick?: (data: { date: string; schedules: ISchedule[] }) => void;
  overflowScheduleMessage: (schedules: ISchedule[]) => string;
  formatCallbackDate: (date: dayjs.Dayjs) => string;
}

export const WeekScheduleSlots = ({
  week,
  slots,
  remainingSchedules,
  maxVisibleSlots,
  onScheduleClick,
  onOverflowSchedulesClick,
  overflowScheduleMessage,
  formatCallbackDate,
}: WeekScheduleSlotsProps) => {
  const totalSlotHeight = maxVisibleSlots * (SCHEDULE_HEIGHT + SCHEDULE_MARGIN);

  return (
    <div className="absolute top-8 left-0 right-0 pointer-events-none">
      {/* Render visible schedule slots */}
      {slots.map((slot, slotIndex) => (
        <div
          key={slotIndex}
          className="relative w-full"
          style={{
            height: SCHEDULE_HEIGHT,
            marginTop: slotIndex === 0 ? '4px' : SCHEDULE_MARGIN,
            padding: `0 ${SCHEDULE_HORIZONTAL_MARGIN}px`,
          }}
        >
          {slot.schedules.map((schedule) => (
            <ScheduleSlot key={schedule.id} schedule={schedule} onScheduleClick={onScheduleClick} formatCallbackDate={formatCallbackDate} />
          ))}
        </div>
      ))}

      {/* Render overflow schedule slots */}
      {remainingSchedules.length > 0 &&
        week.map((day, dayIndex) => {
          const daySchedules = remainingSchedules.filter((schedule) => dayjs(day).isBetween(schedule.weekStart, schedule.weekEnd, 'day', '[]'));

          if (daySchedules.length > 0) {
            return (
              <OverflowScheduleSlot
                key={day.toString()}
                day={day}
                dayIndex={dayIndex}
                totalSlotHeight={totalSlotHeight}
                hiddenSchedules={daySchedules}
                overflowShceduleMessage={overflowScheduleMessage}
                onOverflowSchedulesClick={onOverflowSchedulesClick}
                formatCallbackDate={formatCallbackDate}
              />
            );
          }
          return null;
        })}
    </div>
  );
};
