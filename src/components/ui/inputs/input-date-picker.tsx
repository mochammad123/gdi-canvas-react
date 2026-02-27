import { useOnClickOutside } from '@/lib/hooks/hooks';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarIcon from '../icon/calendar';
import CloseIcon from '../icon/close';
import InputWithSuffix from './input-with-suffix';
import { ICustomCalendarProps, IInputProps } from './types';
import 'react-calendar/dist/Calendar.css';

type Value = Parameters<NonNullable<CalendarProps['onChange']>>[0];
type View = NonNullable<CalendarProps['defaultView']>;

const InputDatePicker = React.forwardRef<
  HTMLInputElement,
  {
    calendarProps?: ICustomCalendarProps & Omit<CalendarProps, 'onDrillDown'>;
    view?: View;
    formatDate?: string;
    value: Date | string;
    disableValueFormat?: boolean;
    onChange?: (value: string) => void;
    classNameInput?: string;
  } & Omit<IInputProps, 'onChange'>
>(({ formatDate = 'YYYY-MM-DD', value, onChange, classNameInput, view = 'month', calendarProps, ...props }, ref) => {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef, () => {
    const calendarEl = wrapperRef.current?.querySelector('.react-calendar') as HTMLDivElement;
    calendarEl?.classList.remove('animate-dropdownIn');
    calendarEl?.classList.add('animate-dropdownOut');
    setTimeout(() => {
      setShow(false);
    }, 300);
  });

  const handleChange = (value: Value) => {
    if (!value) return;
    const dateValue: string = dayjs(value as Date).format('YYYY-MM-DD');
    setShow(false);
    onChange?.(dateValue);
  };

  useEffect(() => {
    if (!show || !wrapperRef.current) return;
    const rect = wrapperRef.current.querySelector('input')?.getBoundingClientRect();
    if (!rect) return;
    const calendarEl = wrapperRef.current.querySelector('.react-calendar') as HTMLDivElement;
    const calendarHeight = calendarEl?.getBoundingClientRect().height || 0;
    if (!calendarHeight || !calendarEl) return;

    if (rect.top + calendarHeight > window.innerHeight) {
      calendarEl.style.bottom = `${rect.height}px`;
    }

    adjustHoverOnWeekMode(calendarEl);
  }, [show]);

  const adjustHoverOnWeekMode = (el: HTMLDivElement) => {
    const oneWeeksInDays = 7;

    const wrapperEl = el.querySelectorAll('.react-calendar__month-view__days .react-calendar__month-view__days__day');

    if (!wrapperEl.length) return;
    Array.from(wrapperEl).forEach((el, index) => {
      if (index % oneWeeksInDays === 0) {
        el.classList.add('hover-week');
      }
    });
  };

  const getDisplayValue = useMemo(() => {
    if (!value) return '';
    return dayjs(value).format(formatDate);
  }, [value, formatDate]);

  return (
    <div ref={wrapperRef} className="relative">
      <InputWithSuffix
        placeholder="Pilih Tanggal"
        suffix={value ? <BtnClose onClick={() => onChange?.('')} /> : <CalendarIcon className="w-[1rem] me-1" color="#9fa2b2" />}
        onClick={() => setShow((o) => !o)}
        onClickSuffix={() => setShow(true)}
        value={getDisplayValue || ''}
        classNameInput={classNameInput}
        onChange={() => ''}
        ref={ref}
        {...props}
      />
      {show && (
        <Calendar
          className={clsx('z-[999] absolute animate-dropdownIn')}
          locale="id-ID"
          value={value}
          onChange={handleChange}
          defaultView={view}
          {...calendarProps}
          onActiveStartDateChange={(args) => {
            if (calendarProps?.onActiveStartDateChange) {
              calendarProps.onActiveStartDateChange(args);
            }
            if (args.view === 'month') {
              const calendarEl = wrapperRef.current?.querySelector('.react-calendar') as HTMLDivElement;
              if (!calendarEl) return;
              setTimeout(() => {
                adjustHoverOnWeekMode(calendarEl);
              }, 300);
            }
          }}
          onDrillDown={({ action, activeStartDate, value, view }) => {
            calendarProps?.onDrillDown?.({ action, activeStartDate, value, view }, () => setShow(false));
          }}
        />
      )}
    </div>
  );
});

function BtnClose({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
        'absolute transition-all duration-200 ease-in-out right-0 me-1 -top-2 z-[999] w-4 h-4',
        'flex items-center justify-center rounded-full bg-gray-300',
        'hover:bg-gray-400 cursor-pointer pointer-events-auto'
      )}
    >
      <CloseIcon color="white" width=".5rem" height=".5rem" />
    </div>
  );
}
InputDatePicker.displayName = 'Input-Date-Picker';

export default InputDatePicker;
