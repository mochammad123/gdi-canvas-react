import clsx from "clsx";
import React from "react";
import Label from "../Label";
import { Textarea } from "./index";
import { ITextareaProps } from "./types";

export interface InputProps extends ITextareaProps {
  classNameWrapper?: string;
  classNameInput?: string;
  label: string;
}

const TextareawithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ classNameWrapper, classNameInput, label, ...props }, ref) => {
    return (
      <div
        className={clsx("flex flex-col gap-y-[6px]", classNameWrapper)}
        ref={ref}
      >
        <Label>{label}</Label>
        <Textarea className={classNameInput} {...props} />
      </div>
    );
  }
);
TextareawithLabel.displayName = "Textarea-WithLabel";

export default TextareawithLabel;
