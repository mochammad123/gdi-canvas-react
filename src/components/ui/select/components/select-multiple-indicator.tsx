import { Typography } from '../../typhography';

export default function SelectMultipleIndicator({ itemCount }: { itemCount: number }) {
  return (
    <Typography as="global-paragraph" className="pl-1.5 shrink-0 !text-knitto-blue-100 !font-medium">
      {itemCount} item dipilih
    </Typography>
  );
}
