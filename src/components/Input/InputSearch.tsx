import clsx from "clsx";
import SearchIcon from "../icon/Search";
import InputDebounce from "./InputDebounce";
import { IInputDebounceProps } from "./types";

export default function InputSearch({
  onChangeValue,
  classNameInput,
  noIcon,
  ...props
}: IInputDebounceProps) {
  return (
    <InputDebounce
      onChangeValue={onChangeValue}
      suffix={!noIcon && <SearchIcon size=".9375rem" color="var(--black-60)" />}
      classNamePosition="top-4 right-[.5313rem]"
      classNameInput={clsx("!pl-2 !h-8 pr-10", classNameInput)}
      {...props}
    />
  );
}
