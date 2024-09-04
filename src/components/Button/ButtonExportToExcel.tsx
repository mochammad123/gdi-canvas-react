import Button from ".";
import { IButtonProps } from "./types";

export default function ButtonExportToExcel({ ...props }: IButtonProps) {
  return (
    <Button
      className="flex justify-center items-center w-[8.5625rem] h-[2.3125rem]"
      variant="navy"
      {...props}
    >
      Export to Excel
    </Button>
  );
}
