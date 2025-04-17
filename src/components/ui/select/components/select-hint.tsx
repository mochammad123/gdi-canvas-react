import clsx from 'clsx';
import { Typography } from '../../typhography';
import { useSelectContext } from '../service/select-context';

export default function SelectHint() {
  const { hint, warning, error } = useSelectContext();

  return (
    <Typography as="global-hint" className={clsx({ 'text-burnt-orange-100': warning, 'text-red-500': error })}>
      {hint}
    </Typography>
  );
}
