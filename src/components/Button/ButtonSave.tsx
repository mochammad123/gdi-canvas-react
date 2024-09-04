import clsx from "clsx";
import Button from "./Button";
import { IButtonPropsWithText } from "./types";

export default function ButtonSave({
  className,
  text,
  ...props
}: IButtonPropsWithText) {
  return (
    <Button
      type="submit"
      variant="navy"
      className={clsx(
        "flex justify-center items-center w-full h-[2.3125rem] p-0",
        className
      )}
      {...props}
    >
     {text ? text : "Simpan"}
    </Button>
  );
}
