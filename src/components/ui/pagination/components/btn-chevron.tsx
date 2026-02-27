import { Button } from '@/components/ui/button';
import ChevronIcon from '@/components/ui/icon/chevron';
import clsx from 'clsx';

export default function BtnChevron({
  onClick,
  rotate,
  disabled,
  ...props
}: {
  onClick: () => void;
  disabled?: boolean;
  rotate: 'left' | 'right' | 'top' | 'bottom';
} & React.ComponentPropsWithoutRef<'button'>) {
  const { color: _omitColor, ...buttonProps } = props;
  return (
    <Button
      variant="text"
      className={clsx('border-none !p-0 size-[16px] flex justify-center items-center shadow-none !bg-transparent cursor-pointer', {
        'opacity-50': disabled,
      })}
      onClick={onClick}
      disabled={disabled}
      {...buttonProps}
    >
      <ChevronIcon rotate={rotate} color="#9A9A9A" />
    </Button>
  );
}
