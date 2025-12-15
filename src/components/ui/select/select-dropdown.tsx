import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import clsx from 'clsx';
import { ISelectDropdown, ISelectOption } from './types';
import { useSensorKeyboard } from './utils';
import { useSelectContext } from './service/select-context';
import useOnClickOutside from './hooks/use-click-outside';
import SelectDropdownItem from './select-dropdown-item';

const SelectDropdown = (props: ISelectDropdown) => {
  const { isAnimatingIn, className, ...properties } = props;
  const { onSelectOption, onSelectOptionIcon, options, isLoading, onHideDropdown } = useSelectContext();

  const parentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

  const virtualizer = useVirtualizer({
    count: options?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 5,
  });

  // Force virtualizer to recalculate when options change or component mounts
  useLayoutEffect(() => {
    if (parentRef.current && options?.length) {
      virtualizer.measure();
    }
  }, [options?.length, virtualizer]);

  useOnClickOutside(dropdownRef, (currentTarget, _) => {
    if (currentTarget?.closest('.selection-box')?.contains(dropdownRef.current)) return;
    onHideDropdown?.();
  });

  useSensorKeyboard(['ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Escape'], (key, e) => {
    if (key === 'ArrowDown' || key === 'ArrowUp') e?.preventDefault();

    switch (key) {
      case 'ArrowUp':
        setSelectedOptionIndex((prev) => (prev > 0 ? prev - 1 : options?.length - 1));
        break;
      case 'ArrowDown':
        setSelectedOptionIndex((prev) => (prev < options?.length - 1 ? prev + 1 : 0));
        break;
      case 'Enter':
        if (selectedOptionIndex === -1) return;
        onSelectOption?.(options?.[selectedOptionIndex]?.value);
        onSelectOptionIcon?.(options?.[selectedOptionIndex]?.icon);
        break;
      case 'Tab':
        onHideDropdown?.();
        break;
      case 'Escape':
        onHideDropdown?.();
        break;
    }
  });

  // SCROLL TO VIEW FOR VIRTUALIZATION
  useEffect(() => {
    if (selectedOptionIndex !== -1 && selectedOptionIndex < (options?.length || 0)) {
      virtualizer.scrollToIndex(selectedOptionIndex, {
        align: 'auto',
        behavior: 'smooth',
      });
    }
  }, [selectedOptionIndex, options?.length, virtualizer]);

  const handleSelectOption = (option: ISelectOption) => {
    onSelectOption?.(option.value);
    option?.icon && onSelectOptionIcon?.(option.icon);
  };

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        'selection-dropdown absolute z-[999999999] w-full my-0.5 bg-white border border-navy-100',
        'transition-all duration-300 ease-out',
        isAnimatingIn ? 'animate-dropdown-in' : 'animate-dropdown-out',
        className
      )}
      {...properties}
    >
      <div className="h-[11rem] overflow-auto" ref={parentRef}>
        {isLoading ? (
          <div className="flex justify-center items-center h-full text-black-40 p-10 text-sm">Sedang memuat...</div>
        ) : !options?.length ? (
          <div className="flex justify-center items-center h-full text-black-40 p-10 text-sm">Data tidak tersedia</div>
        ) : (
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const option = options?.[virtualItem.index];
              if (!option) return null;

              return (
                <SelectDropdownItem
                  key={'selection-dropdown-key-' + virtualItem.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                  onSelect={() => handleSelectOption(option)}
                  optionIndex={virtualItem.index}
                  selectedIndex={selectedOptionIndex}
                  {...option}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SelectDropdown);
