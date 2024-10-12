import clsx from "clsx";

export default function Label({ className, children }: React.ComponentPropsWithoutRef<"label">){
    return <label className={clsx("global-report-title inline-block",className)}>{children}</label>
}