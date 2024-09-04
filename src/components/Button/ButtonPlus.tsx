import Button from "./Button";

export default function ButtonPlus({
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      type="button"
      variant="navy"
      className="flex justify-center !text-[16px] items-center shrink-0 w-10 h-10"
      {...props}
    >
      +
    </Button>
  );
}
