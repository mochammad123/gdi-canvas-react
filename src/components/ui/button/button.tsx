import clsx from 'clsx';
import Spinner from '../icon/spinner';

const variantButtons = {
  contain: 'text-white',
  outline: 'bg-transparent',
  text: 'bg-transparent border-none',
};

const colorButtons = {
  navy: 'text-navy-100 bg-navy-100 border border-navy-100',
  'steel-blue': 'text-steel-blue-100  bg-steel-blue-100 border border-steel-blue-100',
  'burnt-orange': 'text-burnt-orange-100 bg-burnt-orange-100 border border-burnt-orange-100',
  white: 'text-white border border-white',
};

const sizeButtons = {
  sm: 'px-2 py-[4.5px]',
  lg: 'px-4 py-2',
};

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof variantButtons;
  color?: keyof typeof colorButtons;
  size?: keyof typeof sizeButtons;
  rounded?: boolean;
  loading?: boolean;
  LeftIcon?: () => JSX.Element;
  RightIcon?: () => JSX.Element;
  badge?: number;
}

const Button = ({
  children,
  className,
  variant = 'contain',
  color = 'navy',
  loading,
  size = 'lg',
  rounded = false,
  disabled = false,
  LeftIcon,
  RightIcon,
  badge,
  ...props
}: IButtonProps) => {
  const colorClass: string = colorButtons[color];
  const variantClass: string = variantButtons[variant];
  const sizeClass: string = (LeftIcon || RightIcon) && children === undefined ? 'px-3 py-2' : sizeButtons[size];

  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        'shadow hover:opacity-90 global-button relative',
        colorClass,
        variantClass,
        sizeClass,
        {
          rounded,
          'flex justify-end items-center': loading,
          '!bg-[#B7BECB] !text-[#8E8F93] border-none hover:!opacity-100': disabled,
        },
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center gap-3.5">
        {LeftIcon && <LeftIcon />}
        {children}
        {RightIcon && <RightIcon />}
      </div>
      {loading && (
        <div className={clsx('absolute top-0 left-0 bottom-0 right-0', 'flex justify-center items-center', colorClass)}>
          <Spinner />
        </div>
      )}
      {badge && badge > 0 ? (
        <span
          className={clsx(
            'size-5 rounded-full absolute -right-2.5 -top-2.5 border border-white bg-burnt-orange-100',
            'global-report-title flex justify-center',
            {
              'bg-steel-blue-100': color === 'burnt-orange',
            }
          )}
          aria-label={`button-span-badge`}
        >
          {badge > 9 ? '+9' : badge}
        </span>
      ) : null}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
