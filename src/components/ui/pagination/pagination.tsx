import { formatRupiah } from '@/lib/utils/utils';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../button';
import InputWithSuffix from '../inputs/input-with-suffix';
import { IInputWithSufixProps } from '../inputs/types';
import { Typography } from '../typhography';
import BtnChevron from './components/btn-chevron';

const positionList = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};
export default function Pagination({
  page,
  onNext,
  onPrev,
  onApplyPage,
  perPage,
  onApplyPerPage,
  totalData,
  position = 'left',
}: {
  page: number | null;
  onNext?: (page: number) => void;
  onPrev?: (page: number) => void;
  onApplyPage: (page: number | null) => void;
  onApplyPerPage: (page: number) => void;
  perPage: number | null;
  totalData: number;
  position?: 'left' | 'center' | 'right';
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentPerPage, setCurrentPerPage] = useState(perPage);
  const onUpdatePerPage = (value: number | null) => setCurrentPerPage(value);

  const getFrom = () => {
    if (page === 1) return 1;
    return (page || 1) * (perPage || 1) - (perPage || 1);
  };

  const getTo = () => {
    const value = (perPage || 1) * (page || 1);
    if (value > totalData) return totalData;
    return value;
  };

  useEffect(() => {
    if (!page) return;
    setCurrentPage(page);
  }, [page]);

  const totalPage = Math.ceil(totalData / (perPage || 1));
  const disabledBtnNext = (currentPage || 1) >= totalPage;
  const disabledBtnPrev = currentPage === 1;

  return (
    <div className={clsx('flex gap-x-[10px] items-center w-full', positionList[position])} ref={wrapperRef}>
      <div className="flex items-center gap-x-[10px]">
        <BtnChevron disabled={disabledBtnPrev} rotate="left" onClick={() => onPrev && onPrev(-1)} />
        <Typography as="global-paragraph">Halaman</Typography>
      </div>

      <InputNumberRange
        value={currentPage || ''}
        onArrowUp={(value) => {
          if (value >= totalPage) {
            setCurrentPage(totalPage);
            return;
          }
          setCurrentPage(value);
        }}
        onArrowDown={(value) => {
          if (value <= 0) {
            setCurrentPage(1);
            return;
          }
          setCurrentPage(value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onApplyPage(currentPage);
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          let value = +e.target.value;
          if (value > totalPage) {
            value = totalPage;
          }
          setCurrentPage(value || null);
        }}
      />

      <Typography as="global-paragraph">dari</Typography>
      <Typography as="global-paragraph">{formatRupiah(totalPage, true)}</Typography>
      <BtnChevron rotate="right" onClick={() => onNext && onNext(1)} disabled={disabledBtnNext} />

      <Separator />

      <Typography as="global-paragraph">Hasil per Halaman</Typography>
      <InputNumberRange
        disabledRange
        value={currentPerPage || ''}
        className="text-center pl-[4px]"
        onArrowUp={onUpdatePerPage}
        onArrowDown={onUpdatePerPage}
        onChange={(e) => {
          let value = +e.target.value;
          if (value >= totalData) {
            value = totalData;
          }
          setCurrentPerPage(value || null);
        }}
      />

      <Button className="h-[32px] !px-[16px] !py-[5.5px] w-[98px] shrink-0 flex justify-center" onClick={() => onApplyPerPage(currentPerPage || 1)}>
        Terapkan
      </Button>

      <Separator />

      <DataFromTo from={getFrom()} to={getTo()} total={totalData} />
    </div>
  );
}

function Separator() {
  return <div className="w-[1px] h-[20px] bg-[#D9D9D9]" />;
}

function DataFromTo({ from, to, total }: { from: number; to: number; total: number }) {
  return (
    <div className="flex items-center gap-x-1 min-w-[200px]">
      <Typography as="global-paragraph" className="text-center">
        {formatRupiah(from, true)}
      </Typography>
      <Typography as="global-paragraph">-</Typography>
      <Typography as="global-paragraph" className="text-center">
        {formatRupiah(to, true)}
      </Typography>
      <Typography as="global-paragraph">dari</Typography>
      <Typography as="global-paragraph">{formatRupiah(total, true)}</Typography>
    </div>
  );
}

function InputNumberRange({
  disabledRange = false,
  className,
  onArrowUp,
  onArrowDown,
  value,
  ...props
}: IInputWithSufixProps & {
  onArrowUp: (value: number) => void;
  onArrowDown: (value: number) => void;
  disabledRange?: boolean;
}) {
  return (
    <InputWithSuffix
      type="number"
      classNameInput={clsx('rounded-none !w-[56px] h-[37px] !border-black-20 peer', className, {
        '!pr-4 ': !disabledRange,
      })}
      suffix={
        disabledRange ? null : (
          <CaretRange
            onClickUp={() => {
              onArrowUp(+(value || 0) + 1);
            }}
            onClickDown={() => {
              onArrowDown(+(value || 0) - 1);
            }}
          />
        )
      }
      classNamePosition="!top-[22px] opacity-0 peer-focus:opacity-100 group-hover:opacity-100"
      className="text-center rounded-none group"
      onKeyUp={(e) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        if (e.key === 'ArrowUp') {
          onArrowUp(+value + 1);
          e.preventDefault();
          return;
        }
        if (e.key === 'ArrowDown') {
          if (+value === 1) return;
          onArrowDown(+value - 1);
          e.preventDefault();
          return;
        }
      }}
      value={value}
      {...props}
    />
  );
}

function CaretRange({ onClickUp, onClickDown }: { onClickUp: () => void; onClickDown: () => void }) {
  return (
    <div className="relative">
      <CaretUp onClick={onClickUp} />
      <CaretDown onClick={onClickDown} />
    </div>
  );
}

function CaretUp({ onClick }: { onClick: () => void }) {
  return (
    <svg
      onClick={onClick}
      className="hover:opacity-65 absolute -top-1.5"
      stroke="#9A9A9A"
      fill="#9A9A9A"
      strokeWidth={0}
      viewBox="0 0 320 512"
      height="14px"
      width="14px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
    </svg>
  );
}

function CaretDown({ onClick }: { onClick: () => void }) {
  return (
    <svg
      onClick={onClick}
      className="hover:opacity-65 -bottom-2"
      stroke="#9A9A9A"
      fill="#9A9A9A"
      strokeWidth={0}
      viewBox="0 0 320 512"
      height="14px"
      width="14px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
    </svg>
  );
}
