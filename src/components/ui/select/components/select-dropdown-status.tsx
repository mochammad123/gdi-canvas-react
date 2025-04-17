interface ISelectDropdownStatus {
  style: React.CSSProperties;
  text: string;
}

export default function SelectDropdownStatus({ style, text }: ISelectDropdownStatus) {
  return (
    <div style={style} className="flex justify-center items-center text-black-40 p-10 text-sm">
      {text}
    </div>
  );
}
