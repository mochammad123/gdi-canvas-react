import { forwardRef, useEffect, useRef, useState } from 'react';
import Calendar, { Value } from 'react-calendar';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useOnClickOutside } from '@/lib/hooks/hooks';
import { Typography } from '../typhography';
import CalendarIcon from '../icon/calendar';
import { Button } from '../button';
import { IInputDateRangePicker, IDateRangeFieldToggle, IDateRangeCalendar } from './types';

// ============================ ↓ START of MAIN COMPONENT ↓ ============================
const InputDateRangePicker = (props: IInputDateRangePicker) => {
  const { value, mode = 'double', onChange, label, placeholder, error, classNames, keepCalendarOnBottom = false, minDate, maxDate } = props;

  const wrapperAllRef = useRef<HTMLDivElement>(null);
  const wrapperToggleRef = useRef<HTMLDivElement>(null);
  const wrapperCalendarRef = useRef<HTMLDivElement>(null);

  const [toogleMode, setToogleMode] = useState<'single' | 'double'>(mode);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState<string | null>(null);
  const [topMargin, setTopMargin] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useOnClickOutside(wrapperAllRef, () => setIsCalendarOpen(false));

  // Kalau calendar open dan ada scroll, maka calendar langsung di close
  useEffect(() => {
    if (!isCalendarOpen || keepCalendarOnBottom) return;

    window.addEventListener('scroll', () => setIsCalendarOpen(false));
    return () => {
      window.removeEventListener('scroll', () => setIsCalendarOpen(false));
    };
  }, [isCalendarOpen, keepCalendarOnBottom]);

  useEffect(() => {
    setToogleMode(mode);
  }, [mode]);

  useEffect(() => {
    if (isCalendarOpen) {
      setIsVisible(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isCalendarOpen]);

  const handleOpenCalendar = () => {
    if (!isCalendarOpen) {
      if (keepCalendarOnBottom) {
        setCalendarPosition('bottom');
      } else if (wrapperToggleRef.current) {
        const toggleRect = wrapperToggleRef.current.getBoundingClientRect();
        const estimatedCalendarHeight = 320;
        const wouldOverflowBottom = toggleRect.bottom + estimatedCalendarHeight + 8 > window.innerHeight;

        setCalendarPosition(wouldOverflowBottom ? 'top' : 'bottom');

        // Kalau calendar muncul di atas toggle dan overflow viewport, maka tambah space nya
        if (wouldOverflowBottom) {
          const SPACER = 50;
          const calendarOverflowTop = toggleRect.top - (estimatedCalendarHeight + SPACER);

          if (calendarOverflowTop < 0) setTopMargin(calendarOverflowTop + -SPACER);
          else setTopMargin(0);
        }
      }
    }
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleApplyDateRange = (value: { startDate: string; endDate: string }) => {
    onChange(value);
    setIsCalendarOpen(false);
  };

  const renderToggleDatePicker = () => {
    switch (toogleMode) {
      case 'double':
        return (
          <>
            <DateRangeFieldToggle
              isCalendarOpen={isCalendarOpen}
              label={label?.startDate}
              value={value.startDate}
              placeholder={placeholder?.startDate}
              error={error?.startDate}
              classNames={classNames}
            />
            <DateRangeFieldToggle
              isCalendarOpen={isCalendarOpen}
              label={label?.endDate}
              value={value.endDate}
              placeholder={placeholder?.endDate}
              error={error?.endDate}
              classNames={classNames}
            />
          </>
        );
      case 'single':
        return (
          <DateRangeFieldToggle
            isCalendarOpen={isCalendarOpen}
            label={label?.startDate}
            value={value.startDate || value.endDate ? value.startDate + ' - ' + value.endDate : ''}
            placeholder={placeholder?.startDate}
            classNames={classNames}
          />
        );
    }
  };

  return (
    <div ref={wrapperAllRef} className="relative w-full">
      <div ref={wrapperToggleRef} className="w-full flex space-x-2.5" onClick={handleOpenCalendar}>
        {renderToggleDatePicker()}
      </div>

      {isVisible && (
        <DateRangeCalendar
          ref={wrapperCalendarRef}
          value={value}
          onApplyDateRange={handleApplyDateRange}
          minDate={minDate}
          maxDate={maxDate}
          isAnimating={isAnimating}
          isCalendarOpen={isCalendarOpen}
          className={clsx(calendarPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1')}
          style={{ marginBottom: topMargin }}
        />
      )}
    </div>
  );
};
// ============================ ↑ END of MAIN COMPONENT ↑ ============================

// ============================ ↓ START of CHILD COMPONENT ↓ ============================
const DateRangeFieldToggle = (props: IDateRangeFieldToggle) => {
  const { label, value, isCalendarOpen, placeholder, error, classNames } = props;

  return (
    <div className="w-full">
      {label && (
        <Typography as="global-report-title" className="mb-0.5">
          {label}
        </Typography>
      )}
      <div
        className={clsx(
          'h-10 w-full flex justify-between items-center px-2.5 bg-white rounded cursor-pointer',
          isCalendarOpen ? 'border-navy-100 border' : 'border border-black-40',
          classNames?.toggle
        )}
      >
        <Typography as="global-paragraph" className={clsx('line-clamp-1', !value && 'text-black-40!', classNames?.toggleText)}>
          {value || placeholder}
        </Typography>
        <CalendarIcon />
      </div>
      {error && (
        <Typography as="global-hint" className="text-red-500 font-normal!">
          {error}
        </Typography>
      )}
    </div>
  );
};

const DateRangeCalendar = forwardRef<HTMLDivElement, IDateRangeCalendar & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, value, onApplyDateRange, minDate, maxDate, isAnimating, isCalendarOpen, ...divProps }, ref) => {
    const boxRef = useRef<HTMLDivElement>(null);

    const [activeDate, setActiveDate] = useState<'start' | 'end' | null>(null);
    const [dateRangeValue, setDateRangeValue] = useState<[Date | null, Date | null]>([null, null]);

    useEffect(() => {
      if (!value.startDate || !value.endDate) return;
      setDateRangeValue([dayjs(value.startDate, 'YYYY-MM-DD').toDate(), dayjs(value.endDate, 'YYYY-MM-DD').toDate()]);
    }, [value]);

    const handleDateChange = (value: Value) => {
      if (!value) return;

      const minDateObj = minDate ? dayjs(minDate, 'YYYY-MM-DD').toDate() : null;
      const maxDateObj = maxDate ? dayjs(maxDate, 'YYYY-MM-DD').toDate() : null;

      if (Array.isArray(value)) {
        let [start, end] = value;

        if (minDateObj && start && start < minDateObj) {
          start = minDateObj;
        }
        if (maxDateObj && start && start > maxDateObj) {
          start = maxDateObj;
        }
        if (minDateObj && end && end < minDateObj) {
          end = minDateObj;
        }
        if (maxDateObj && end && end > maxDateObj) {
          end = maxDateObj;
        }

        setDateRangeValue([start, end]);
      } else {
        let selectedDate = value;

        if (minDateObj && selectedDate < minDateObj) {
          selectedDate = minDateObj;
        }
        if (maxDateObj && selectedDate > maxDateObj) {
          selectedDate = maxDateObj;
        }

        if (activeDate === 'start') {
          if (dateRangeValue[1] && selectedDate > dateRangeValue[1]) {
            setDateRangeValue([selectedDate, selectedDate]);
            return;
          }
          setDateRangeValue([selectedDate, dateRangeValue[1] || selectedDate]);
        } else if (activeDate === 'end') {
          if (dateRangeValue[0] && selectedDate < dateRangeValue[0]) {
            setDateRangeValue([selectedDate, selectedDate]);
            return;
          }
          setDateRangeValue([dateRangeValue[0] || selectedDate, selectedDate]);
        }
      }
    };

    const handleClickNow = () => {
      const now = dayjs().toDate();
      const minDateObj = minDate ? dayjs(minDate, 'YYYY-MM-DD').toDate() : null;
      const maxDateObj = maxDate ? dayjs(maxDate, 'YYYY-MM-DD').toDate() : null;

      let selectedDate = now;
      if (minDateObj && selectedDate < minDateObj) {
        selectedDate = minDateObj;
      }
      if (maxDateObj && selectedDate > maxDateObj) {
        selectedDate = maxDateObj;
      }

      setDateRangeValue([selectedDate, selectedDate]);
    };

    const handleClickOk = () => {
      if (dateRangeValue[0] && dateRangeValue[1]) {
        onApplyDateRange({
          startDate: dayjs(dateRangeValue[0] as Date).format('YYYY-MM-DD'),
          endDate: dayjs(dateRangeValue[1] as Date).format('YYYY-MM-DD'),
        });

        setActiveDate(null);
        setDateRangeValue([null, null]);
      }
    };

    const renderDateRangeBox = (value: string, className: string, onClick: () => void, isStart: boolean) => {
      return (
        <div className="w-full space-y-0.5">
          <div
            ref={boxRef}
            className={clsx(
              'w-full h-7 rounded border border-black-40 flex items-center pl-1.5 cursor-pointer hover:bg-knitto-blue-40 transition-all duration-75 ease-in-out',
              className
            )}
            onClick={() => onClick()}
          >
            <Typography as="global-paragraph" className="text-sm!">
              {value}
            </Typography>
          </div>
          <span className="text-black-40 text-[8px] line-clamp-1 italic">Klik untuk memilih tanggal {isStart ? 'awal' : 'akhir'}.</span>
        </div>
      );
    };

    const startDate = dateRangeValue[0] ? dayjs(dateRangeValue[0] as Date).format('YYYY-MM-DD') : '-';
    const endDate = dateRangeValue[1] ? dayjs(dateRangeValue[1] as Date).format('YYYY-MM-DD') : '-';

    return (
      <div
        ref={ref}
        className={clsx(
          'bg-white absolute border border-navy-100 rounded p-2.5 z-[999] transition-all duration-300 ease-in-out animate-fadeIn',
          isAnimating ? (isCalendarOpen ? 'animate-dropdownIn' : 'animate-dropdownOut') : '',
          className
        )}
        style={divProps?.style}
      >
        <div className="h-[2.938rem] bg-white flex justify-between items-center gap-x-2.5">
          {renderDateRangeBox(
            startDate,
            activeDate === 'start' ? 'border-2 border-navy-100 bg-knitto-blue-40' : '',
            () => startDate.length && setActiveDate('start'),
            true
          )}
          {renderDateRangeBox(
            endDate,
            activeDate === 'end' ? 'border-2 border-navy-100 bg-knitto-blue-40' : '',
            () => endDate.length && setActiveDate('end'),
            false
          )}
        </div>

        <Calendar
          selectRange={activeDate === null}
          returnValue={activeDate === null ? 'range' : activeDate}
          locale="id-ID"
          className="w-full!"
          onChange={handleDateChange}
          value={dateRangeValue}
          minDate={minDate ? dayjs(minDate, 'YYYY-MM-DD').toDate() : undefined}
          maxDate={maxDate ? dayjs(maxDate, 'YYYY-MM-DD').toDate() : undefined}
        />

        <div className="h-[2.938rem] bg-white border-t border-black-40 flex justify-between items-center">
          <Button type="button" variant="text" className="p-0! border-none shadow-none" onClick={handleClickNow}>
            Now
          </Button>
          <Button type="button" rounded className="px-5!" disabled={!dateRangeValue[0] || !dateRangeValue[1]} onClick={handleClickOk}>
            Ok
          </Button>
        </div>
      </div>
    );
  }
);
// ============================ ↑ END of CHILD COMPONENT ↑ ============================
export default InputDateRangePicker;
