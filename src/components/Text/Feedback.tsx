import clsx from "clsx";

export default function FeedbackError({ children,className }: { children: React.ReactNode; className?:string }) {
    return <div className={clsx("input-error-text min-h-[1.0938rem] mt-1",className)}>{children}</div>
}