import { useOnClickOutside } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import ButtonChevron from "../Button/ButtonChevron";
import { InputDebounce } from "../Input";

export default function Pagination({
  currentPage,
  onNext,
  onPrev,
  onUpdatePage,
  totalPage
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
    const inputEl = wrapperRef.current?.querySelector("input");
    if (!inputEl) return;
    inputEl.select();
    inputEl.focus();
  }, [editable]);

  return (
    <div className="flex gap-x-4" ref={wrapperRef}>
      <ButtonChevron disabled={currentPage === 1} arrow="left" onClick={() => onPrev && onPrev(-1)} />
      <div
        className="w-[2.25rem] h-[2.25rem] flex justify-center items-center global-button"
        onClick={() => {
          setEditable(true);
        }}
      >
        {editable ? (
          <InputDebounce
            onChangeValue={() => ""}
            className="text-center rounded-none"
            onKeyUp={(e) => {
              const page = +e.currentTarget.value;
              if (page <= 0) return;
              if (e.key === "Enter") {
                onUpdatePage && onUpdatePage(page > totalPage ? totalPage : page );
                setEditable(false);
              }
            }}
            value={currentPage || ""}
          />
        ) : (
          currentPage
        )}
      </div>
      <ButtonChevron disabled={totalPage === currentPage || !totalPage} arrow="right" onClick={() => onNext && onNext(1)} />
    </div>
  );
}
