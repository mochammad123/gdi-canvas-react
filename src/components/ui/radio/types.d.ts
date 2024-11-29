export interface IRadioProps extends React.ComponentPropsWithoutRef<'input'> {
  onChecked: (checked: boolean) => void;
}
