import { useOnClickOutside } from '@/lib/hooks/hooks';
import { useEffect, useRef, useState } from 'react';
import InputDebounce from '../inputs/input-debounce';
import { Button } from '../button';
import ChevronIcon from '../icon/chevron';

export default function Pagination({
  currentPage,
  onNext,
  onPrev,
  onUpdatePage,
  totalPage,
}: {
  currentPage: number;
  onNext?: (page: number) => void;
  onPrev?: (page: number) => void;
  onUpdatePage?: (page: number) => void;
  totalPage: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [editable, setEditable] = useState(false);

  useOnClickOutside(wrapperRef, () => setEditable(false));

  useEffect(() => {
    if (!editable) return;
    const inputEl = wrapperRef.current?.querySelector('input');
    if (!inputEl) return;
    inputEl.select();
    inputEl.focus();
  }, [editable]);

  return (
    <div className="flex gap-x-4" ref={wrapperRef}>
      <Button variant="text" onClick={() => onPrev && onPrev(-1)} disabled={currentPage === 1}>
        <ChevronIcon rotate="left" />
      </Button>
      <div
        className="w-[2.25rem] h-[2.25rem] flex justify-center items-center global-button"
        onClick={() => {
          setEditable(true);
        }}
      >
        {editable ? (
          <InputDebounce
            onChangeValue={() => ''}
            className="text-center rounded-none"
            onKeyUp={(e) => {
              const page = +e.currentTarget.value;
              if (page <= 0) return;
              if (e.key === 'Enter') {
                onUpdatePage && onUpdatePage(page > totalPage ? totalPage : page);
                setEditable(false);
              }
            }}
            value={currentPage || ''}
          />
        ) : (
          currentPage
        )}
      </div>
      <Button variant="text" onClick={() => onNext && onNext(1)} disabled={totalPage === currentPage || !totalPage}>
        <ChevronIcon rotate="right" />
      </Button>
    </div>
  );
}
