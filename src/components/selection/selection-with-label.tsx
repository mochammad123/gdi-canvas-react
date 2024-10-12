import Label from "@/components/label";
import clsx from "clsx";
import React from "react";
import Selection from "./Selection";
import { ISelectionProps } from "./types";

const SelectionWithLabel = React.forwardRef<
  HTMLInputElement,
  ISelectionProps & { label: string; classNameWrapper?: string }
>(({ label, classNameWrapper, disabled, ...props }, ref) => {
  return (
    <div className={clsx("flex flex-col gap-y-[.375rem]", classNameWrapper)}>
      <Label>{label}</Label>
      <Selection {...props} disabled={disabled} ref={ref} />
    </div>
  );
});
SelectionWithLabel.displayName = "Selection-WithLabel";

export default SelectionWithLabel;