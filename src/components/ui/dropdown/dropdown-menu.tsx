import clsx from 'clsx';
import { Typography } from '@knittotextile/react-ui';
import { IDropdownMenuItem } from './types';

export default function DropdownMenu({
  menus,
  onClick,
  width = 'min-w-[65px]',
}: {
  width?: string;
  menus: IDropdownMenuItem[];
  onClick: (selected: IDropdownMenuItem) => void;
}) {
  return (
    <div className={clsx('bg-white dark:bg-black-80 dark:border dark:border-black-60 shadow-md absolute top-0 right-1 py-1 dropdown-menu', width)}>
      {menus.map((menu, key) => (
        <DropdownItem key={key} value={menu.value} text={menu.text} onClick={() => onClick(menu)} />
      ))}
    </div>
  );
}

function DropdownItem({ value, text, onClick }: { value: string | number; text: string; onClick: (value: string | number, text: string) => void }) {
  return (
    <Typography
      as="global-report-content"
      className="px-2 py-1 text-black-100 dark:text-greyish-semi-white hover:bg-navy-100 dark:hover:bg-black-60 hover:text-white hover:font-medium cursor-pointer"
      onClick={() => onClick(value, text)}
    >
      {text}
    </Typography>
  );
}
