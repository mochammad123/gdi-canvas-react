import clsx from 'clsx';
import { Typography } from '../typhography';
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
    <div style={{ boxShadow: '0px 4px 8px 0px #00000026' }} className={clsx('bg-white absolute top-0 right-1 py-1 dropdown-menu', width)}>
      {menus.map((menu, key) => (
        <DropdownItem key={key} value={menu.value} text={menu.text} onClick={() => onClick(menu)} />
      ))}
    </div>
  );
}

function DropdownItem({ value, text, onClick }: { value: string | number; text: string; onClick: (value: string | number, text: string) => void }) {
  return (
    <Typography as="global-report-content" className="px-2 py-1 hover:bg-navy-100 hover:text-white hover:font-medium cursor-pointer" onClick={() => onClick(value, text)}>
      {text}
    </Typography>
  );
}
