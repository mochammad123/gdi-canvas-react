import { useReactToPrint } from "react-to-print";
import Button from "./Button";
import { IButtonPropsWithText } from "./types";

export default function ButtonPrint({
  text,
  printEl,
  pageStyle,
  onAfterPrint,
  ...props
}: IButtonPropsWithText & {
  printEl: HTMLDivElement | null;
  pageStyle?: string;
  onAfterPrint?: () => void;
}) {
  const onPrint = useReactToPrint({
    content: () => (printEl ? printEl : null),
    pageStyle,
    onAfterPrint,
  });

  return (
    <Button
      className="w-[4.1875rem] h-[2.3125rem] flex justify-center items-center"
      variant="navy"
      onClick={() => onPrint()}
      {...props}
    >
      {text ? text : "Print"}
    </Button>
  );
}
