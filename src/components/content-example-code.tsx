import clsx from 'clsx';

export default function ContentExampleCode({ show, code }: { show: boolean; code: string }) {
  return (
    <div
      className={clsx(
        'overflow-auto max-w-full bg-gray-100 dark:bg-black-60 rounded-md transition-all duration-300',
        show ? 'max-h-[500px] opacity-100 mt-5' : 'max-h-0 opacity-0'
      )}
    >
      <pre className="whitespace-pre text-sm text-gray-800 dark:text-greyish-semi-white h-max">
        <code>{code}</code>
      </pre>
    </div>
  );
}
