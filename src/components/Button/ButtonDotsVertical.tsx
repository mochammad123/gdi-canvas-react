import clsx from 'clsx';
import DotsVertical from '../Icon/DotsVertical';
import Button from './Button';
import { IButtonProps } from './types';

export default function ButtonDotsVertical({ className, ...props }: IButtonProps) {
  return (
    <Button
      className={clsx(
        'w-5 h-5 bg-transparent !shadow-none flex justify-center items-center cursor-pointer rounded-sm',
        {
          'hover:bg-knitto-blue-60': 'on-hover',
        },
        className
      )}
      {...props}
    >
      <DotsVertical />
    </Button>
  );
}
