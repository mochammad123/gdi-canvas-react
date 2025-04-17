import IcCaret from '../icons/ic-caret';

export default function SelectDropdownIndicator({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 ">
      <IcCaret className="!w-[.65rem] transition-all duration-150 text-knitto-black-80" rotate={isOpen ? 'top' : 'bottom'} />
    </div>
  );
}
