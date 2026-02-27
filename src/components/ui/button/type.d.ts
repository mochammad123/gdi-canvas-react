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
