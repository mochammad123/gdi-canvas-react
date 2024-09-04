import clsx from "clsx";
import Button from "./Button";
import { IButtonPropsWithText } from "./types";

export default function ButtonCancel({
  className,
  text,
  ...props
}: IButtonPropsWithText) {
  return (
    <Button
      variant="outline-navy"
      className={clsx(
        "flex justify-center items-center w-[4.3125rem] h-[2.3125rem] disabled:opacity-70",
        className
      )}
      {...props}
    >
     {text ? text : "Batal"}
    </Button>
  );
}
