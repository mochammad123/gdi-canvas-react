import clsx from "clsx";
import Typography from "./Typography";

export default function TextHint({ text, className }: { text:string; className?:string }){
    return <Typography as="global-hint" className={clsx("text-black-60", className)}>{text}</Typography>
}