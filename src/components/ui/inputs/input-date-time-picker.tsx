import { useOnClickOutside } from '@/lib/hooks/hooks';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value, View } from 'react-calendar/dist/cjs/shared/types';
import CalendarIcon from '../icon/calendar';
import InputWithSuffix from './input-with-suffix';
import { ICustomCalendarProps, IInputProps, Time } from './types';
import { Card } from '../card';
import { Button } from '../button';
import CloseIcon from '../icon/close';

const timeData = {
  hour: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')),
  minute: Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')),
  second: Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')),
};

const InputDateTimePicker = React.forwardRef<
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
  const [dateValue, setDateValue] = useState<string>('');
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const hourListRef = useRef<HTMLDivElement | null>(null);
  const minuteListRef = useRef<HTMLDivElement | null>(null);
  const secondListRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [selectedTime, setSelectedTime] = useState<Time>({
    hour: '00',
    minute: '00',
    second: '00',
  });

  useOnClickOutside(wrapperRef, () => setShow(false));

  const handleOnChange = (dateTimeValue: string) => {
    onChange?.(dateTimeValue);
  };

  const handleChange = (value: Value) => {
    if (!value) return;
    const date: string = dayjs(value as Date).format('YYYY-MM-DD');

    handleOnChange(date);
    setDateValue(date);
  };

  useEffect(() => {
    if (!show || !wrapperRef.current) return;
    const rect = wrapperRef.current.querySelector('input')?.getBoundingClientRect();
    if (!rect) return;
    const calendarEl = wrapperRef.current.querySelector('.card-date-time') as HTMLDivElement;
    const calendarHeight = calendarEl?.getBoundingClientRect().height || 0;
    if (!calendarHeight || !calendarEl) return;

    if (rect.top + calendarHeight + 100 > window.innerHeight) {
      calendarEl.style.bottom = `${rect.height}px`;
    }

    adjustHoverOnWeekMode(calendarEl);
  }, [show, isVisible]);

  const scrollToSelected = (ref: React.RefObject<HTMLDivElement>, value: string) => {
    if (ref.current) {
      const selectedItem = ref.current.querySelector(`li[data-value="${value}"]`);
      if (selectedItem) {
        ref.current.scrollTo({
          top: (selectedItem as HTMLElement).offsetTop - (ref.current as HTMLElement).offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };
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
  const handleTimeChange = (field: keyof Time, value: string) => {
    setSelectedTime((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'hour') scrollToSelected(hourListRef, value);
    if (field === 'minute') scrollToSelected(minuteListRef, value);
    if (field === 'second') scrollToSelected(secondListRef, value);
  };

  const formattedTime = `${selectedTime.hour}:${selectedTime.minute}:${selectedTime.second}`;

  const handleDateNow = () => {
    const now = dayjs();
    const date = now.format('YYYY-MM-DD');
    const time = now.format('HH:mm:ss');

    setSelectedTime((prev) => ({
      ...prev,
      hour: now.format('HH'),
      minute: now.format('mm'),
      second: now.format('ss'),
    }));

    scrollToSelected(hourListRef, now.format('HH'));
    scrollToSelected(minuteListRef, now.format('mm'));
    scrollToSelected(secondListRef, now.format('ss'));

    setCurrentDateTime(`${date} ${time}`);
    return `${date}T${time}`;
  };

  useEffect(() => {
    setCurrentDateTime('');
  }, [dateValue]);

  useEffect(() => {
    if (show) {
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
  }, [show]);

  useEffect(() => {
    if (!show || !wrapperRef.current) return;

    scrollToSelected(hourListRef, selectedTime.hour);
    scrollToSelected(minuteListRef, selectedTime.minute);
    scrollToSelected(secondListRef, selectedTime.second);
  }, [isVisible, selectedTime.hour, selectedTime.minute, selectedTime.second, show]);

  const getDisplayValue = useMemo(() => {
    const value = dateValue || currentDateTime;
    if (!value) return '';
    return dayjs(value).format(formatDate);
  }, [dateValue, currentDateTime, formatDate]);

  return (
    <div ref={wrapperRef} className="group relative">
      <InputWithSuffix
        className="group"
        placeholder="Pilih Tanggal & Waktu"
        suffix={
          getDisplayValue ? (
            <div
              className="absolute transition-all duration-200 ease-in-out right-0 me-1 -top-2 z-[999] w-4 h-4 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                setDateValue('');
                setSelectedTime((prev) => ({
                  ...prev,
                  hour: '00',
                  minute: '00',
                  second: '00',
                }));
                setCurrentDateTime('');
                handleOnChange('');
                setShow(false);
              }}
            >
              <CloseIcon color="white" width=".5rem" height=".5rem" />
            </div>
          ) : (
            <CalendarIcon className="w-[1rem] me-1" color="#9fa2b2" />
          )
        }
        onClick={() => setShow((o) => !o)}
        onClickSuffix={() => setShow(true)}
        value={currentDateTime ? currentDateTime : value && !disableValueFormat ? dayjs(value).format(formatDate) + ' ' + formattedTime : value || ''}
        classNameInput={classNameInput}
        onChange={() => ''}
        ref={ref}
        {...props}
      />
      {isVisible && (
        <Card
          className={`flex flex-col absolute z-[999] card-date-time transition-all duration-300 ease-in-out animate-fadeIn ${isAnimating ? (show ? 'animate-dropdownIn' : 'animate-dropdownOut') : ''}`}
        >
          <div className="flex rounded-b-none">
            <div className="mx-3 bg-white">
              <Calendar
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
                  calendarProps?.onDrillDown?.({ action, activeStartDate, value, view });
                }}
              />
            </div>
            <div>
              <div className="flex flex-col w-30 h-full rounded-md bg-white">
                <div className="w-full text-center my-5t text-[.95rem] mt-4 mb-4">{formattedTime}</div>
                <div className="flex flex-row h-[16.8rem]">
                  {['hour', 'minute', 'second'].map((unit, key) => (
                    <div
                      className="overflow-y-scroll text-center w-14 scrollbar"
                      key={key}
                      ref={unit === 'hour' ? hourListRef : unit === 'minute' ? minuteListRef : secondListRef}
                    >
                      <ul className="mb-[15.2rem]" key={unit}>
                        {timeData[unit as keyof Time].map((value) => (
                          <li
                            key={value}
                            data-value={value}
                            className={`rounded-md py-[.2rem] text-[.84rem] cursor-pointer ${selectedTime[unit as keyof Time] === value ? 'bg-navy-100 text-white hover:navy-100' : 'hover:bg-gray-200'}`}
                            onClick={() => handleTimeChange(unit as keyof Time, value)}
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between border-t-2 p-3 bg-white rounded-md rounded-t-none">
            <Button
              variant="text"
              className="border-none shadow-none"
              onClick={() => {
                const dateTimeNow = handleDateNow();
                handleOnChange(dateTimeNow);
              }}
            >
              Now
            </Button>
            <Button
              disabled={dateValue || currentDateTime ? false : true}
              rounded
              className="px-10"
              onClick={() => {
                setShow(false);
                if (!currentDateTime) {
                  handleOnChange(`${dateValue}T${formattedTime}`);
                }
              }}
            >
              Ok
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
});

InputDateTimePicker.displayName = 'Input-Date-Time-Picker';

export default React.memo(InputDateTimePicker);
