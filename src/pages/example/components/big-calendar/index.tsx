import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { BigCalendar, Typography, useToast } from '@knittotextile/react-ui';
import type { ISchedule } from '@knittotextile/react-ui/big-calendar';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ActionBigCalendar } from './components/action-big-calendar';
import { AddScheduleModal } from './components/add-schedule-modal';
import { generateSampleSchedules } from './constants';

const bigCalendarPageExampleCode = `
import { BigCalendar, useToast } from '@knittotextile/react-ui';
import dayjs from 'dayjs';
import { useState } from 'react';
import { generateSampleSchedules } from './constants';
import { ActionBigCalendar } from './components/action-big-calendar';
import { AddScheduleModal } from './components/add-schedule-modal';
import type { ISchedule } from '@knittotextile/react-ui/big-calendar';

export default function BigCalendarPageExample() {
  const toast = useToast();
  const [monthYear, setMonthYear] = useState(dayjs().format('MM-YYYY'));
  const [isModalShow, setIsModalShow] = useState(false);
  const [sampleSchedules, setSampleSchedules] = useState<ISchedule[]>(() => generateSampleSchedules());

  const showToast = (message: string) => {
    toast.show({ variant: 'info', message });
  };

  const addSchedule = (schedule: ISchedule) => {
    setSampleSchedules((currentSchedules) => [...currentSchedules, schedule]);
    setIsModalShow(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4 bg-white dark:bg-black-80 p-5 rounded shadow">
      <ActionBigCalendar monthYear={monthYear} setMonthYear={setMonthYear} addSchedule={() => setIsModalShow(true)} />
      <BigCalendar
        currentDate={monthYear}
        dateFormat="MM-YYYY"
        schedules={sampleSchedules}
        maxVisibleSlots={4}
        dayConfig={{ format: 'ddd', locale: 'en' }}
        scheduleDateFormat="YYYY-MM-DD"
        callbackDateConfig={{ format: 'dddd, D MMM YYYY', locale: 'en' }}
        stylesConfig={{ cellWeekHeight: 200 }}
        onDayClick={({ date, schedules }) => showToast(\`\${date} : \${schedules.length} Jadwal\`)}
        onOverflowSchedulesClick={({ date, schedules }) => showToast(\`\${date} : \${schedules.length} Jadwal\`)}
        onScheduleClick={({ date, schedule }) => showToast(\`\${date} : \${schedule.title}\`)}
        overflowScheduleMessage={(schedules) => \`\${schedules.length} Other schedule\`}
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
  const [sampleSchedules, setSampleSchedules] = useState<ISchedule[]>(() => generateSampleSchedules());
  const [showCode, setShowCode] = useState(false);

  const showToast = (message: string) => {
    toast.show({ variant: 'info', message });
  };

  const addSchedule = (schedule: ISchedule) => {
    setSampleSchedules((currentSchedules) => [...currentSchedules, schedule]);
    setIsModalShow(false);
  };

  return (
    <div className="p-4 bg-knitto-blue-20 dark:bg-black-100 flex flex-col gap-3 mb-10">
      <div className="flex justify-between items-center">
        <Typography as="h3">Big Calendar</Typography>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>
      <div className="h-2 w-72 bg-burnt-orange-100" />
      <div className="grid grid-cols-1 gap-4 bg-white dark:bg-black-80 p-5 rounded shadow">
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
