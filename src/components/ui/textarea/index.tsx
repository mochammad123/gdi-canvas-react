import clsx from "clsx";
import * as React from "react";

interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={clsx(
          "flex min-h-[5rem] w-full rounded-md border border-black-40 p-2 resize-none",
          "placeholder:text-black-40 focus-visible:outline-none disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

