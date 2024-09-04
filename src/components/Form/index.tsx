import clsx from "clsx";

export default function Form({
  children,
  isValidated,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & { isValidated?: boolean }) {
  return (
    <form
      noValidate
      className={clsx(className, {
        "form-validated": isValidated,
      })}
      {...props}
    >
      {children}
    </form>
  );
}
