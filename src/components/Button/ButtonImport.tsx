import { useRef } from "react";
import Button from ".";
import { IButtonPropsWithText } from "./types";
export default function ButtonImport({
  text,
  onChange,
  ...props
}: Omit<IButtonPropsWithText ,"onChange">& {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
        onChange={onChange}
      />
      <Button
        variant="navy"
        className="flex justify-center items-center w-20 h-[2.3125rem]"
        onClick={() => inputRef.current?.click()}
        {...props}
      >
        {text ? text : "Import"}
      </Button>
    </>
  );
}
