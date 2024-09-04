import clsx from "clsx";
import ChevronIcon from "../Icon/Chevron";
import Button from "./Button";
import { IButtonChevronProps } from "./types";

export default function ButtonChevron({
  arrow = "left",
  onClick,
  className,
  ...props
}: IButtonChevronProps) {
  return (
    <Button
      variant="transparent"
      className={clsx(
        "w-[2.25rem] h-[2.25rem] disabled:!opacity-55 flex justify-center items-center border !rounded-full !border-black-40",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <ChevronIcon rotate={arrow} />
    </Button>
  );
}
