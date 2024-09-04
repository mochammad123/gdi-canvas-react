import clsx from "clsx";
import Spinner from "../Icon/Spinner";
import { IButtonProps } from "./types";

const variantButton = {
  navy: "bg-navy-100 text-white disabled:bg-greyish-down disabled:opacity-100",
  "outline-white": "bg-transparent text-black border border-white",
  "text-navy": "bg-transparent text-navy-100 !shadow-none",
  "burnt-orange": "bg-burnt-orange-100 text-white",
  "outline-navy": "bg-white border border-navy-100 text-navy-100",
  transparent: "bg-transparent !shadow-none",
};

export type IVariantsButton = keyof typeof variantButton;
export default function Button({
  children,
  className,
  variant = "navy",
  isLoading,
  disabled,
  ...props
}: IButtonProps) {
  const variantClass = variantButton[variant];
  return (
    <button
      disabled={isLoading || disabled}
      className={clsx(
        "shadow hover:opacity-90 rounded-sm global-button",
        variantClass,
        className,
        {
          "flex justify-end items-center": isLoading,
        }
      )}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
