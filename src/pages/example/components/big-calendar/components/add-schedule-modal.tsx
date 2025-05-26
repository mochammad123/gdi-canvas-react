import Input from '@/components/ui/inputs/input';
import InputDatePicker from '@/components/ui/inputs/input-date-picker';
import Confirmation from '@/components/ui/modal/modal-confirmation';
import { Typography } from '@/components/ui/typhography';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type AddAddScheduleModalProps = {
  isShow: boolean;
  onHide: () => void;
  onConfirm: (shcedule: ISchedule) => void;
};

export const AddScheduleModal = ({ isShow, onConfirm, onHide }: AddAddScheduleModalProps) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    if (isShow) {
      setTitle('');
      setStartDate(dayjs().format('YYYY-MM-DD'));
      setEndDate(dayjs().format('YYYY-MM-DD'));
    }
  }, [isShow]);

  const addSchedule = () => {
    if (title) {
      onConfirm({
        id: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
        startDate: startDate,
        endDate: endDate,
        title: title,
      });
    }
  };

  return (
    <Confirmation show={isShow} onHide={onHide} onConfirm={addSchedule} buttonConfirmText="Add" buttonCancelText="Close">
      <Typography as="h5">Add Schedule</Typography>
      <section className="mt-4">
        <Typography as="global-report-title">Title</Typography>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </section>
      <section className="mt-3 mb-8">
        <div className="flex flex-row gap-2">
          <Typography as="global-report-title" className="flex-1">
            Start Date
          </Typography>
          <Typography as="global-report-title" className="flex-1">
            End Date
          </Typography>
        </div>
        <div className="flex flex-row gap-2">
          <InputDatePicker value={startDate} onChange={setStartDate} formatDate="YYYY-MM-DD" />
          <InputDatePicker value={endDate} onChange={setEndDate} formatDate="YYYY-MM-DD" />
        </div>
      </section>
    </Confirmation>
  );
};
