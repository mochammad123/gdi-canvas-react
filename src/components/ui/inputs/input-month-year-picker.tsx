import { useOnClickOutside } from '@/lib/hooks/hooks';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../button';
import CalendarIcon from '../icon/calendar';
import CloseIcon from '../icon/close';
import { LIST_MONTHS } from './constant';
import { useScrollToSelected } from './hooks/use-scroll-to-selected';
import InputWithSuffix from './input-with-suffix';

const currentDate = new Date();
export default function InputMonthYearPicker({
  from,
  to,
  value,
  onChange,
}: {
  from?: number;
  to?: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const splitValue = useMemo(() => value.split('-'), [value]);
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState(+splitValue?.[0] || 1);
  const [year, setYear] = useState(+splitValue?.[1] || currentDate.getFullYear());

  const currentValue = useMemo(() => (value ? `${splitValue?.[0]?.padStart(2, '0')}-${splitValue?.[1]}` : ''), [splitValue, value]);

  const handleNow = () => {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    onChange(`${month.toString().padStart(2, '0')}-${year}`);
    setShow(false);
  };

  const handleOk = () => {
    onChange(`${month.toString().padStart(2, '0')}-${year}`);
    setShow(false);
  };

  useEffect(() => {
    if (!show) return;
    setMonth(+splitValue?.[0] || 1);
    setYear(+splitValue?.[1] || currentDate.getFullYear());
  }, [show, splitValue]);

  return (
    <div className="relative">
      <InputWithSuffix
        placeholder="Pilih Tanggal"
        suffix={value ? <BtnClose onClick={() => onChange('')} /> : <CalendarIcon className="w-[1rem] me-1" color="#9fa2b2" />}
        onClick={() => setShow((o) => !o)}
        onClickSuffix={() => setShow(true)}
        value={currentValue}
        onChange={() => ''}
      />
      {show && (
        <DropdownPicker onHide={() => setShow(false)}>
          <div className="flex">
            <ListMonth active={month} onSelect={setMonth} />
            <ListYear from={from || 1970} to={to || currentDate.getFullYear()} active={year} onSelect={setYear} />
          </div>
          <div className="flex justify-between px-1">
            <Button onClick={handleNow} size="sm" variant="outline" className="border-none shadow-none">
              Now
            </Button>
            <Button className="px-3" size="sm" rounded onClick={handleOk}>
              Ok
            </Button>
          </div>
        </DropdownPicker>
      )}
    </div>
  );
}

function DropdownPicker({ children, onHide }: { children: React.ReactNode; onHide: () => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperRef, () => {
    wrapperRef.current?.classList.add('animate-dropdownOut');
    wrapperRef.current?.classList.remove('animate-dropdownIn');
    setTimeout(() => {
      onHide();
    }, 300);
  });

  useEffect(() => {
    if (!wrapperRef.current) return;
    const inputEl = wrapperRef.current.parentElement?.querySelector('input');
    if (!inputEl) return;
    const rect = inputEl.getBoundingClientRect();
    const calendarEl = wrapperRef.current.getBoundingClientRect();
    if (rect.top + calendarEl.height + 100 > window.innerHeight) {
      wrapperRef.current.style.bottom = `${rect.height}px`;
    }
  }, []);
  return (
    <div ref={wrapperRef} className="absolute z-[999] shadow-md rounded-md bg-white p-2 left-0 right-0 animate-dropdownIn">
      {children}
    </div>
  );
}

function ListMonth({ active, onSelect }: { active: number; onSelect: (month: number) => void }) {
  const listMonth = useMemo(() => Object.keys(LIST_MONTHS).map((i) => +i), []);
  const wrapperRef = useRef<HTMLUListElement>(null);
  const { flushSyncUI } = useScrollToSelected({
    nodeRef: wrapperRef,
    listValue: listMonth,
    selectedValue: active,
  });
  return (
    <ul className="flex flex-col gap-y-1 w-full overflow-y-scroll h-[300px] scrollbar pb-[16.7rem]" ref={wrapperRef}>
      {listMonth.map((month, key) => {
        const activeMonth = +month === active;
        return (
          <li
            key={key}
            className={clsx('px-2 py-1.5 rounded-md text-[.84rem] cursor-pointer ', {
              'bg-navy-100 text-white hover:navy-100': activeMonth,
              'hover:bg-gray-200': !activeMonth,
            })}
            onClick={() => {
              onSelect(+month);
              flushSyncUI();
            }}
          >
            {LIST_MONTHS[+month]}
          </li>
        );
      })}
    </ul>
  );
}

function ListYear({ from, to, active, onSelect }: { from: number; to: number; active: number; onSelect: (month: number) => void }) {
  const listYear = useMemo(() => Array.from({ length: to - from + 1 }).map((_, index) => from + index), [from, to]);
  const wrapperRef = useRef<HTMLUListElement>(null);
  const { flushSyncUI } = useScrollToSelected({
    nodeRef: wrapperRef,
    listValue: listYear,
    selectedValue: active,
  });
  return (
    <ul className="flex flex-col gap-y-1 w-full overflow-y-scroll h-[300px] scrollbar pb-[16.7rem]" ref={wrapperRef}>
      {listYear.map((year, key) => {
        const activeYear = +year === active;
        return (
          <li
            key={key}
            className={clsx('px-2 py-1.5 rounded-md text-[.84rem] cursor-pointer ', {
              'bg-navy-100 text-white hover:navy-100': activeYear,
              'hover:bg-gray-200': !activeYear,
            })}
            onClick={() => {
              onSelect(+year);
              flushSyncUI();
            }}
          >
            {year}
          </li>
        );
      })}
    </ul>
  );
}

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
