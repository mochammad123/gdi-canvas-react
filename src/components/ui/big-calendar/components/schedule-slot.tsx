import dayjs from 'dayjs';
import { Typography } from '../../typhography';
import { SCHEDULE_HEIGHT, SCHEDULE_HORIZONTAL_MARGIN } from '../utils/constants';

interface IScheduleSlotProps {
  schedule: IScheduleWithPosition;
  onScheduleClick?: (data: { date: string; schedule: ISchedule }) => void;
  formatCallbackDate: (date: dayjs.Dayjs) => string;
}

export const ScheduleSlot = ({ schedule, onScheduleClick, formatCallbackDate }: IScheduleSlotProps) => {
  const handleScheduleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const dayWidth = rect.width / schedule.span;
    const clickedDayOffset = Math.floor(clickX / dayWidth);

    const clickedDate = dayjs(schedule.weekStart).add(clickedDayOffset, 'day');

    onScheduleClick?.({
      date: formatCallbackDate(clickedDate),
      schedule,
    });
  };

  return (
    <div
      className="absolute flex items-center cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80 pointer-events-auto"
      onClick={handleScheduleClick}
      style={{
        backgroundColor: schedule.backgroundColor ?? '#0F163F',
        color: schedule.textColor ?? '#ffffff',
        height: SCHEDULE_HEIGHT,
        left: `${(schedule.startOffset * 100) / 7}%`,
        width: `calc(${(schedule.span * 100) / 7}% - ${SCHEDULE_HORIZONTAL_MARGIN * 4}px)`,
        padding: '0 4px',
        borderRadius: '4px',
        marginLeft: '4px',
      }}
    >
      <Typography as="global-report-content" className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm">
        {schedule.title}
      </Typography>
    </div>
  );
};
