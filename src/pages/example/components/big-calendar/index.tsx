import { BigCalendar } from '@/components/ui/big-calendar';
import { useToast } from '@/components/ui/toast';
import { Typography } from '@/components/ui/typhography';
import dayjs from 'dayjs';
import { useState } from 'react';
import { schedules } from './constants';
import { ActionBigCalendar } from './components/action-big-calendar';
import { AddScheduleModal } from './components/add-schedule-modal';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const bigCalendarPageExampleCode = `
// Required imports:
// import { BigCalendar } from '@/components/ui/big-calendar';
// import { useToast } from '@/components/ui/toast';
// import { Typography } from '@/components/ui/typhography';
// import dayjs from 'dayjs';
// import { useState } from 'react';
// import { schedules } from './constants'; // Your initial schedules
// import { ActionBigCalendar } from './components/action-big-calendar';
// import { AddScheduleModal } from './components/add-schedule-modal';

// Example JSX structure:
function BigCalendarPageExample() {
  const toast = useToast();
  const [monthYear, setMonthYear] = useState(dayjs().format('MM-YYYY'));
  const [isModalShow, setIsModalShow] = useState(false);
  const [sampleSchedules, setSampleSchedules] = useState<ISchedule[]>(schedules);

  const showToast = (message: string) => {
    toast.open('info', message);
  };

  const addSchedule = (schedule: ISchedule) => {
    setSampleSchedules((currentSchedules) => [...currentSchedules, schedule]);
    setIsModalShow(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4 bg-white p-5 rounded shadow">
      <ActionBigCalendar monthYear={monthYear} setMonthYear={setMonthYear} addSchedule={() => setIsModalShow(true)} />
      <BigCalendar
        currentDate={monthYear}
        // ... other props like dateFormat, schedules, maxVisibleSlots, etc.
        onDayClick={({ date, schedules }) => showToast(\`\${date} : \${schedules.length} Jadwal\`)}
        onScheduleClick={({ date, schedule }) => showToast(\`\${date} : \${schedule.title}\`)}
        // ... other event handlers
      />
      <AddScheduleModal isShow={isModalShow} onConfirm={addSchedule} onHide={() => setIsModalShow(false)} />
    </div>
  );
}
`;

export default function BigCalendarPage() {
  const toast = useToast();
  const [monthYear, setMonthYear] = useState(dayjs().format('MM-YYYY'));
  const [isModalShow, setIsModalShow] = useState(false);
  const [sampleSchedules, setSampleSchedules] = useState<ISchedule[]>(schedules);
  const [showCode, setShowCode] = useState(false);

  const showToast = (message: string) => {
    toast.open('info', message);
  };

  const addSchedule = (schedule: ISchedule) => {
    setSampleSchedules((currentSchedules) => [...currentSchedules, schedule]);
    setIsModalShow(false);
  };

  return (
    <div className="p-4 bg-knitto-blue-20 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Typography as="h3">Big Calendar</Typography>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>
      <div className="h-2 w-72 bg-burnt-orange-100" />
      <div className="grid grid-cols-1 gap-4 bg-white p-5 rounded shadow">
        <ActionBigCalendar monthYear={monthYear} setMonthYear={setMonthYear} addSchedule={() => setIsModalShow(true)} />
        <BigCalendar
          currentDate={monthYear}
          dateFormat="MM-YYYY"
          schedules={sampleSchedules}
          maxVisibleSlots={4}
          dayConfig={{
            format: 'ddd',
            locale: 'en',
          }}
          scheduleDateFormat="YYYY-MM-DD"
          callbackDateConfig={{
            format: 'dddd, D MMM YYYY',
            locale: 'en',
          }}
          stylesConfig={{
            cellWeekHeight: 200,
          }}
          onDayClick={({ date, schedules }) => {
            showToast(`${date} : ${schedules.length} Jadwal`);
          }}
          onOverflowSchedulesClick={({ date, schedules }) => {
            showToast(`${date} : ${schedules.length} Jadwal`);
          }}
          onScheduleClick={({ date, schedule }) => {
            showToast(`${date} : ${schedule.title}`);
          }}
          overflowScheduleMessage={(schedules) => `${schedules.length} Other schedule`}
        />
      </div>
      <AddScheduleModal isShow={isModalShow} onConfirm={addSchedule} onHide={() => setIsModalShow(false)} />
      <ContentExampleCode show={showCode} code={bigCalendarPageExampleCode} />
    </div>
  );
}
