/* eslint-disable react-refresh/only-export-components */
import clsx from "clsx";
import React, { HTMLInputTypeAttribute, ReactNode, useRef } from "react";
import EyeIcon from "../Icon/EyeIcon";
import Input from "./Input";
import { IInputWithSufixProps } from "./types";

const InputWithSuffix = React.forwardRef<
  HTMLInputElement,
  IInputWithSufixProps
>(
  (
    { suffix, className, classNameInput, classNamePosition, type, onClickSuffix, ...props },
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickSuffix = () => {
      if (type === "password" && wrapperRef.current) {
        const inputEl = wrapperRef.current.querySelector("input");
        if (!inputEl) return;

        inputEl.type = inputEl.type === "password" ? "text" : "password";
        const eyeIconStroke = inputEl.nextElementSibling?.querySelector(
          ".eye-icon > .eye-icon__stroke"
        );
        if (!eyeIconStroke) return;
        eyeIconStroke.classList.toggle("hidden");
        return;
      }
      onClickSuffix && onClickSuffix();
    };

    if (!suffix && type !== "password") {
      return (
        <Input type={type} className={classNameInput} ref={ref} {...props} />
      );
    }

    return (
      <div className={clsx("relative", className)} ref={wrapperRef}>
        <Input type={type} className={classNameInput} ref={ref} {...props} />
        <Suffix
          type={type}
          className={classNamePosition}
          onClick={handleClickSuffix}
        >
          {suffix}
        </Suffix>
      </div>
    );
  }
);

InputWithSuffix.displayName = "Input-WithSuffix";

function Suffix({
  type,
  children,
  className,
  onClick,
}: {
  className?: string;
  type: HTMLInputTypeAttribute | undefined;
  children?: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className={clsx(
        "right-1 cursor-pointer absolute top-1/2 -translate-y-1/2",
        className,
        {
          "right-2.5 hover:opacity-90": type === "password",
        }
      )}
      onClick={onClick}
    >
      {type === "password" && <EyeIcon />}
      {children}
    </div>
  );
}

export default InputWithSuffix;
