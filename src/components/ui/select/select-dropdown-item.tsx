import { memo, useMemo } from 'react';
import clsx from 'clsx';
import { ISelectDropdownItem } from './types';
import { Typography } from '../typhography';
import { useSelectContext } from './service/select-context';
import SelectCheckbox from './components/select-checkbox';

const SelectDropdownItem = (props: ISelectDropdownItem) => {
  const { style, onSelect, label, value, icon, disabled, optionIndex, selectedIndex } = props;
  const { value: selectedValue, multiple } = useSelectContext();

  const isSelected = useMemo(() => {
    if ((typeof value === 'string' || typeof value === 'number') && !multiple) {
      return selectedValue === value; // Single value comparison
    }
    return Array.isArray(selectedValue) && selectedValue.includes(value); // Multiple value comparison
  }, [value, selectedValue, multiple]);

  return (
    <div
      onClick={() => !disabled && onSelect?.()}
      style={style}
      className={clsx(
        'dropdown-item h-8 flex items-center cursor-pointer text-black-80 pl-1',
        'hover:bg-knitto-blue-60!',
        isSelected && 'bg-knitto-blue-60!',
        optionIndex === selectedIndex && 'bg-knitto-blue-60!',
        disabled && 'cursor-default! text-greyish-down! hover:bg-transparent!',
        multiple && 'gap-1.5'
      )}
    >
      {icon && <div className="mr-1.5">{icon}</div>}
      {multiple && <SelectCheckbox readOnly checked={isSelected} />}
      {typeof label === 'string' ? <Typography as="global-paragraph">{label}</Typography> : label}
    </div>
  );
};

export default memo(SelectDropdownItem);
