import { useOnClickOutside } from '@/lib/hooks';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value, View } from 'react-calendar/dist/cjs/shared/types';
import CalendarIcon from '../icon/calendar';
import InputWithSuffix from './input-with-suffix';
import { ICustomCalendarProps, IInputProps } from './types';

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
>(({ formatDate = 'YYYY-MM-DD', value, onChange, classNameInput, view = 'month', calendarProps, disableValueFormat, ...props }, ref) => {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef, () => setShow(false));

  const handleChange = (value: Value) => {
    if (!value) return;
    const dateValue: string = dayjs(value as Date).format(formatDate);
    setShow(false);
    onChange && onChange(dateValue);
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
  return (
    <div ref={wrapperRef} className="relative">
      <InputWithSuffix
        placeholder="Pilih Tanggal"
        suffix={<CalendarIcon />}
        onClick={() => setShow((o) => !o)}
        onClickSuffix={() => setShow(true)}
        value={value && !disableValueFormat ? dayjs(value).format(formatDate) : value || ''}
        classNameInput={classNameInput}
        onChange={() => ''}
        ref={ref}
        {...props}
      />
      {show && (
        <Calendar
          className="z-[999] absolute"
          locale="id-ID"
          value={value}
          onChange={handleChange}
          defaultView={view}
          {...calendarProps}
          onActiveStartDateChange={(args) => {
            calendarProps?.onActiveStartDateChange && calendarProps?.onActiveStartDateChange(args);
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

InputDatePicker.displayName = 'Input-Date-Picker';

export default InputDatePicker;
