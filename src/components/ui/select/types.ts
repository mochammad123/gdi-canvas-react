import { ReactNode } from 'react';

export interface ISelect extends React.HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
  disabled?: boolean;
  disableSearch?: boolean;
  warning?: boolean;
  error?: boolean;
  isLoading?: boolean;
  ignoreUnknownValue?: boolean;
  label?: string;
  hint?: string;
  value?: ISelectOption['value'] | ISelectOption['value'][] | null;
  placeHolder?: string;
  options: ISelectOption[];
  prefixIcon?: ReactNode;
  onChangeSingleOption?: (value: ISelectOption['value'] | null, query?: string) => void;
  onChangeMultipleOption?: (value: ISelectOption['value'][] | null, query?: string) => void;
  onResetSelection?: () => void;
}

export interface ISelectOption {
  label: ReactNode | string;
  value: string | number;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface ISelectDropdown extends React.HTMLAttributes<HTMLDivElement> {
  isAnimatingIn?: boolean;
}

export interface ISelectDropdownItem extends ISelectOption {
  style?: React.CSSProperties;
  onSelect?: () => void;
  optionIndex: number;
  selectedIndex: number;
}
