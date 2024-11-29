import { ReactNode } from 'react';
import { OnArgs } from 'react-calendar';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface IInputDebounceProps extends IInputProps {
  classNameInput?: string;
  onChangeValue: (value: string) => void;
  suffix?: React.ReactNode;
  noIcon?: boolean;
}

export interface IInputWithSufixProps extends IInputProps {
  suffix?: ReactNode;
  className?: string;
  classNameInput?: string;
  classNamePosition?: string;
  onClickSuffix?: () => void;
}

export interface ICustomCalendarProps {
  onDrillDown?: ({ action, activeStartDate, value, view }: OnArgs, cb?: () => void) => void;
}
