import { initialValues } from "./selection";

export interface ISelectionOption {
  [key: string | number]: string | number;
}
export interface ISelectedOption {
  key: string | number;
  value: string | number;
}

export interface ISelectionProps {
  values?: string[];
  value?: string;
  disabled?: boolean;
  required?: boolean;
  isLoading?: boolean;
  multiple?: boolean;
  classNameInput?: string;
  options: ISelectionOption;
  enableSearch?: boolean;
  placeholder?: string;
  onSelect: (selected: ISelectedOption) => void;
  customDisplayValue?: (value: string | string[]) => string;
  onClear?: () => void;
  onClickSelectAll?: () => void;
}

export interface ISelectionInputProps extends  Pick<ISelectionProps, "required" | "values" | "value" | "placeholder" | "multiple" | "options" | "customDisplayValue" | "onClear"> {
  classNameInput?: string;
  onClickSelection: () => void;
  state: typeof initialValues
}

export interface ISelectionDropdownProps extends Pick<ISelectionProps, "values" | "isLoading" | "multiple" | "options" | "enableSearch"> {
  onSelect: (selectedOption: ISelectedOption) => void;
  hideDropdown: () => void;
  onPressArrowUp: () => void;
  onClickSelectAll?: () => void;
  state: typeof initialValues;
  onPressArrowDown: (filtered: string[]) => void;
}

export interface IDropdownItemProps extends Pick<ISelectionProps, "values" | "multiple"> {
  index: number;
  item: ISelectedOption;
  state: typeof initialValues;
  onClick: () => void;
}
