import { Button, DatePicker, Modal, Typography } from '@knittotextile/react-ui';
import Input from '@/components/ui/inputs/input';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import type { ISchedule } from '@knittotextile/react-ui/big-calendar';

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
    <Modal isOpen={isShow} onOpenChange={(open) => !open && onHide()}>
      <Modal.Backdrop isDismissable={false}>
        <Modal.Container size="sm">
          <Modal.Dialog aria-label="Add schedule">
            <Modal.Header>
              <Modal.Heading>Add Schedule</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body>
              <section>
                <Typography as="global-report-title">Title</Typography>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </section>
              <section className="mt-3">
                <div className="flex flex-row gap-2">
                  <Typography as="global-report-title" className="flex-1">
                    Start Date
                  </Typography>
                  <Typography as="global-report-title" className="flex-1">
                    End Date
                  </Typography>
                </div>
                <div className="flex flex-row gap-2">
                  <DatePicker value={startDate} onChange={setStartDate} formatDate="YYYY-MM-DD" />
                  <DatePicker value={endDate} onChange={setEndDate} formatDate="YYYY-MM-DD" />
                </div>
              </section>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" color="navy" onClick={onHide}>
                Close
              </Button>
              <Button color="navy" onClick={addSchedule}>
                Add
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
