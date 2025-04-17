import IcClose from '../icons/ic-close';

export default function SelectResetToggle({ onReset }: { onReset: () => void }) {
  return (
    <button
      className="absolute right-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      onClick={(e) => {
        e.stopPropagation();
        onReset();
      }}
    >
      <IcClose className="!w-5 text-knitto-black-80" />
    </button>
  );
}
