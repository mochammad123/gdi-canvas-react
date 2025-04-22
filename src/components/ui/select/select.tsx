import { memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

import SelectProvider from './service/select-provider';
import { ISelect, ISelectOption } from './types';
import { extractTextFromLabel, useSensorKeyboard } from './utils';
import { Typography } from '../typhography';
import SelectHint from './components/select-hint';
import { useDropdownOverflow } from './hooks/use-dropdown-overflow';
import { useAnimateDropdown } from './hooks/use-animate-dropdown';
import SelectDropdown from './select-dropdown';
import SelectBox from './select-box';
import './select.css';

const Select = (props: ISelect) => {
  const {
    label,
    warning,
    error,
    disableSearch,
    prefixIcon,
    isLoading,
    placeHolder,
    hint,
    disabled,
    value,
    options,
    multiple,
    className,
    ignoreUnknownValue,
    onChangeMultipleOption,
    onChangeSingleOption,
    onResetSelection,
    ...properties
  } = props;

  const selectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOptionIcon, setSelectedOptionIcon] = useState<ReactNode | null>(null);

  //  Selection Options & Filter Options
  const selectionOptions = useMemo(() => {
    return options?.filter((option) => {
      if (typeof option.label === 'string') {
        return option.label.toLowerCase().includes(searchQuery.toLowerCase());
      }

      const labelText = extractTextFromLabel(option.label).toLowerCase();
      return labelText.includes(searchQuery.toLowerCase() || '');
    });
  }, [searchQuery, options]);

  //  Option Lookup for Label Rendering
  const optionLookup = useMemo(() => {
    const lookup: Record<string | number, React.ReactNode> = {};
    selectionOptions.forEach((option) => {
      lookup[option.value] = option.label;
    });
    return lookup;
  }, [selectionOptions]);

  const { openDropdown, setOpenDropdown, showDropdown, animatingIn } = useAnimateDropdown();
  useDropdownOverflow({ openDropdown, showDropdown, selectionRef });

  useEffect(() => {
    if (!ignoreUnknownValue) return;

    const newSearchQuery = value as string;
    if (value && !Array.isArray(value) && !optionLookup[value]) {
      return setSearchQuery(newSearchQuery);
    }
  }, [ignoreUnknownValue, optionLookup, value]);

  useSensorKeyboard(['ArrowDown'], (_key, e) => {
    e?.preventDefault();
    if (document.activeElement === inputRef.current) {
      setOpenDropdown(true);
    }
  });

  const handleSelectOption = useCallback(
    (selectedValue: ISelectOption['value']) => {
      setSearchQuery('');
      if (!multiple) {
        setOpenDropdown(false);
        onChangeSingleOption?.(selectedValue);
        return;
      }

      const selectedValues = Array.isArray(value) ? value : [];
      const isSelected = selectedValues.includes(selectedValue);

      const updatedValues = isSelected ? selectedValues.filter((v) => v !== selectedValue) : [...selectedValues, selectedValue];

      onChangeMultipleOption?.(updatedValues);
    },
    [value, multiple]
  );

  const handleSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setSelectedOptionIcon(null);

      /**
       * Jika tidak ada prop ignoreUnknownValue:
       *   Kembalikan value null dan search query ke parent.
       * Jika ada prop ignoreUnknownValue:
       *   Jika value ada di option, kembalikan nilai searcg query sebagai value ke parent.
       */
      if (!ignoreUnknownValue) {
        onChangeSingleOption?.(null, query);
      } else {
        onChangeSingleOption?.(query, query);
      }
    },
    [onChangeSingleOption, ignoreUnknownValue]
  );

  const handleResetSelection = () => {
    setSearchQuery('');
    onResetSelection?.();
  };

  const displayValue = useMemo(() => {
    if (searchQuery) return searchQuery;
    if (value && !Array.isArray(value)) return extractTextFromLabel(optionLookup[value] || '');
    return '';
  }, [searchQuery, value, optionLookup]);

  return (
    <SelectProvider
      inputRef={inputRef}
      options={selectionOptions}
      value={value}
      hint={hint}
      displayValue={displayValue}
      isLoading={isLoading}
      placeHolder={placeHolder}
      error={error}
      multiple={multiple}
      warning={warning}
      disabled={disabled}
      disableSearch={disableSearch}
      prefixIcon={prefixIcon}
      selectedOptionIcon={selectedOptionIcon}
      onSelectOption={handleSelectOption}
      onHideDropdown={() => setOpenDropdown(false)}
      onSelectOptionIcon={setSelectedOptionIcon}
      onToggleDropdown={setOpenDropdown}
      onResetSelection={handleResetSelection}
      onSearchQuery={handleSearchQuery}
    >
      <div ref={selectionRef} className={clsx('flex flex-col space-y-1 w-full', className)} {...properties}>
        {label && <Typography as="global-report-title">{label}</Typography>}

        <div className="selection-box relative w-full h-[2.5rem] group">
          <SelectBox />
          {showDropdown && !disabled && <SelectDropdown isAnimatingIn={animatingIn} />}
        </div>

        {hint && <SelectHint />}
      </div>
    </SelectProvider>
  );
};

export default memo(Select);
