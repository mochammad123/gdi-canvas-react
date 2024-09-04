import clsx from "clsx";
import React from "react";
import { IInputProps } from "./types";

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ disabled, type, readOnly,onChange, className, ...props }, ref) => {
    
    return (
        <input
          className={clsx(
            "h-10 rounded-[4px] text-base py-[.625rem] px-[.5rem] placeholder-black-40",
            "flex w-full text-black-100 border border-black-40 global-paragraph",
            "outline-none focus:border-knitto-blue-100 focus:text-black-60",
            "read-only:bg-greyish-semi-dark-50",
            className,
            {
              "pointer-events-none bg-greyish-semi-dark-50": disabled,
              
            }
          )}
          type={type}
          ref={ref}
          disabled={false}
          readOnly={readOnly}
          onChange={(e) => {
            if(type === "number" && +e.target.value < 0){
              e.target.value = "0";
            };
            onChange && onChange(e);
          }}
          {...props}
        />
    );
  }
);
Input.displayName = "Input";

export default Input;
