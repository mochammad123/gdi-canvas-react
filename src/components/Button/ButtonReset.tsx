import clsx from "clsx";
import Button from "./Button";
import { IButtonPropsWithText } from "./types";

export default function ButtonReset({ variant, className, ...props }: IButtonPropsWithText){
    return <Button type="reset" variant={variant ? variant : "outline-navy"} className={clsx("flex justify-center items-center disabled:opacity-70 w-full h-[2.3125rem]",className)} {...props }>Reset</Button>
}