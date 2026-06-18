import dayjs from 'dayjs';
import type { ISchedule } from '@knittotextile/react-ui/big-calendar';

const SCHEDULE_COLORS = [
  { backgroundColor: '#456EF4', textColor: '#ffffff' },
  { backgroundColor: '#0EB942', textColor: '#ffffff' },
  { backgroundColor: '#b90e41', textColor: '#ffffff' },
  { backgroundColor: '#b9b60e', textColor: '#ffffff' },
  { backgroundColor: '#5e0eb9', textColor: '#ffffff' },
  { backgroundColor: '#69b90e', textColor: '#ffffff' },
] as const;

const SCHEDULE_TITLES = [
  'Mastering Digital Marketing',
  'Introduction to Data Science',
  'UI/UX Design Workshop',
  'Cloud Computing Essentials',
  'Cybersecurity Fundamentals',
  'Creative Writing for Beginners',
] as const;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSchedule(month: dayjs.Dayjs, index: number): ISchedule {
  const daysInMonth = month.daysInMonth();
  const startDay = randomInt(1, Math.max(1, daysInMonth - 4));
  const endDay = randomInt(startDay, Math.min(startDay + randomInt(0, 4), daysInMonth));
  const color = SCHEDULE_COLORS[index % SCHEDULE_COLORS.length];

  return {
    id: `${month.format('YYYY-MM')}-${index + 1}`,
    title: SCHEDULE_TITLES[index % SCHEDULE_TITLES.length],
    startDate: month.date(startDay).format('YYYY-MM-DD'),
    endDate: month.date(endDay).format('YYYY-MM-DD'),
    backgroundColor: color.backgroundColor,
    textColor: color.textColor,
  };
}

/** 6 sample schedules: 2 di bulan lalu, 2 di bulan ini, 2 di bulan depan */
export function generateSampleSchedules(): ISchedule[] {
  const currentMonth = dayjs();
  const prevMonth = currentMonth.subtract(1, 'month');
  const nextMonth = currentMonth.add(1, 'month');

  return [
    createSchedule(prevMonth, 0),
    createSchedule(prevMonth, 1),
    createSchedule(currentMonth, 2),
    createSchedule(currentMonth, 3),
    createSchedule(nextMonth, 4),
    createSchedule(nextMonth, 5),
  ];
}
