import clsx from "clsx";
import Button from "./Button";
import { IButtonPropsWithText } from "./types";

export default function ButtonFilter({ text, className, ...props }: IButtonPropsWithText) {
  return (
    <Button
      className={clsx("w-[4.3125rem] h-8 flex justify-center items-center",className)}
      variant="navy"
      {...props}
    >
      {text ? text : "Filter"}
    </Button>
  );
}
