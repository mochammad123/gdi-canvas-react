import clsx from 'clsx';

export default function ToggleShowCode({ show, setShow, className }: { show: boolean; className?: string; setShow: (show: boolean) => void }) {
  return (
    <button
      className={clsx(
        'w-max inline-flex items-center bg-gray-400 text-white rounded-md p-1 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
        show && '!bg-blue-900',
        className
      )}
      onClick={() => setShow(!show)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5">
        <path
          fill="currentColor"
          d="m12.89 3l1.96.4L11.11 21l-1.96-.4zm6.7 9L16 8.41V5.58L22.42 12L16 18.41v-2.83zM1.58 12L8 5.58v2.83L4.41 12L8 15.58v2.83z"
        ></path>
      </svg>
    </button>
  );
}
