import { Typography } from '../../typhography';
import dayjs from 'dayjs';
import { SCHEDULE_HEIGHT, SCHEDULE_HORIZONTAL_MARGIN } from '../utils/constants';

interface IOverflowScheduleSlotProps {
  day: dayjs.Dayjs;
  dayIndex: number;
  totalSlotHeight: number;
  hiddenSchedules: ISchedule[];
  overflowShceduleMessage: (schedules: ISchedule[]) => string;
  onOverflowSchedulesClick?: (data: { date: string; schedules: ISchedule[] }) => void;
  formatCallbackDate: (date: dayjs.Dayjs) => string;
}

export const OverflowScheduleSlot = ({
  day,
  dayIndex,
  totalSlotHeight,
  hiddenSchedules,
  overflowShceduleMessage,
  onOverflowSchedulesClick,
  formatCallbackDate,
}: IOverflowScheduleSlotProps) => {
  return (
    <div
      className="absolute flex bg-knitto-blue-40 items-center cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80 pointer-events-auto"
      onClick={(e) => {
        e.stopPropagation();
        onOverflowSchedulesClick?.({
          date: formatCallbackDate(day),
          schedules: hiddenSchedules,
        });
      }}
      style={{
        top: totalSlotHeight + 8,
        left: `${(dayIndex * 100) / 7}%`,
        width: `calc(${100 / 7}% - ${SCHEDULE_HORIZONTAL_MARGIN * 4}px)`,
        padding: '0 4px',
        borderRadius: '4px',
        height: SCHEDULE_HEIGHT,
        margin: `0 ${SCHEDULE_HORIZONTAL_MARGIN}px`,
        marginLeft: '4px',
      }}
    >
      <Typography as="global-report-content" className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black">
        {overflowShceduleMessage(hiddenSchedules)}
      </Typography>
    </div>
  );
};
