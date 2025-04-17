import clsx from 'clsx';
import { useSelectContext } from './service/select-context';
import SelectMultipleIndicator from './components/select-multiple-indicator';
import { useMemo } from 'react';
import SelectInput from './components/select-input';
import SelectResetToggle from './components/select-reset-toggle';
import SelectDropdownIndicator from './components/select-dropdown-indicator';

const SelectBox = () => {
  const {
    inputRef,
    error,
    isDropdownOpen,
    warning,
    disabled,
    prefixIcon,
    value,
    disableSearch,
    placeHolder,
    displayValue,
    onSearchQuery,
    selectedOptionIcon,
    onResetSelection,
    onToggleDropdown,
  } = useSelectContext();

  const selectionInputClass = useMemo(
    () =>
      clsx(
        'selection-input relative flex items-center size-full border border-black-40 pl-1',
        'transform transition-all duration-200',
        isDropdownOpen && 'border-navy-100',
        error && 'border-red-500',
        warning && 'border-burnt-orange-100',
        disabled ? 'cursor-default bg-greyish-down !border-greyish-down' : 'cursor-pointer bg-white'
      ),
    [isDropdownOpen, error, warning, disabled]
  );

  return (
    <div className={selectionInputClass} onClick={() => !disabled && onToggleDropdown?.(true)}>
      <div className="h-max">{prefixIcon}</div>
      {Array.isArray(value) && value.length > 0 && <SelectMultipleIndicator itemCount={value.length} />}
      {selectedOptionIcon && <div className="pl-1">{selectedOptionIcon}</div>}

      <SelectInput
        ref={inputRef}
        placeholder={placeHolder}
        disabled={disabled || disableSearch}
        readOnly={disabled || disableSearch}
        onChange={(e) => onSearchQuery?.(e.target.value)}
        value={displayValue}
        className={clsx(
          'cursor-pointer pr-[3.2rem] border-none !h-full !font-source-sans-pro !rounded-none pl-1.5',
          disabled && '!bg-greyish-down',
          disableSearch && '!bg-white'
        )}
      />

      {!disabled && value && <SelectResetToggle onReset={() => onResetSelection?.()} />}
      <SelectDropdownIndicator isOpen={isDropdownOpen ?? false} />
    </div>
  );
};

export default SelectBox;
