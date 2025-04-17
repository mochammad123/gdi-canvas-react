import { createContext, useContext } from 'react';
import { ISelect, ISelectOption } from '../types';

export interface ISelectContext extends Omit<ISelect, 'onChangeSingleOption' | 'onChangeMultipleOption' | 'onResetSelection'> {
  isDropdownOpen?: boolean;
  displayValue?: string;
  selectedOptionIcon?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
  onResetSelection?: () => void;
  onSearchQuery?: (query: string) => void;
  onSelectOption?: (value: ISelectOption['value']) => void;
  onHideDropdown?: () => void;
  onSelectOptionIcon?: (icon: React.ReactNode) => void;
  onToggleDropdown?: (isOpen: boolean) => void;
}

export const SelectContext = createContext<ISelectContext>({
  options: [],
});

export const useSelectContext = () => useContext(SelectContext);
