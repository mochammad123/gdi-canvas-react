import { memo, useEffect, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import clsx from 'clsx';
import { ISelectDropdown, ISelectOption } from './types';
import { useSensorKeyboard } from './utils';
import { useSelectContext } from './service/select-context';
import useOnClickOutside from './hooks/use-click-outside';
import SelectDropdownItem from './select-dropdown-item';
import AutoSizer from 'react-virtualized-auto-sizer';
import SelectDropdownStatus from './components/select-dropdown-status';

const SelectDropdown = (props: ISelectDropdown) => {
  const { isAnimatingIn, className, ...properties } = props;
  const { onSelectOption, onSelectOptionIcon, options, isLoading, onHideDropdown } = useSelectContext();

  const listRef = useRef<FixedSizeList>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

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

  //  SCROLL TO VIEW FOR VIRTUALIZATION
  useEffect(() => {
    if (selectedOptionIndex !== null && listRef.current) {
      listRef.current.scrollToItem(selectedOptionIndex, 'smart');
    }
  }, [selectedOptionIndex]);

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
      <div className="h-[11rem] overflow-auto">
        <AutoSizer>
          {({ width, height }) => {
            return isLoading ? (
              <SelectDropdownStatus style={{ height, width }} text="Sedang memuat..." />
            ) : !options?.length ? (
              <SelectDropdownStatus style={{ height, width }} text="Data tidak tersedia" />
            ) : (
              <FixedSizeList ref={listRef} height={height} width={width} itemCount={options?.length || 0} itemSize={32} overscanCount={5}>
                {({ index, style }) => (
                  <SelectDropdownItem
                    style={style}
                    key={'selection-dropdown-key-' + index}
                    onSelect={() => handleSelectOption(options?.[index])}
                    optionIndex={index}
                    selectedIndex={selectedOptionIndex}
                    {...options?.[index]}
                  />
                )}
              </FixedSizeList>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default memo(SelectDropdown);
