import clsx from 'clsx';
import { Typography } from '../Text';

export default function Title({ text, className }: { text: string | React.ReactNode; className?: string }) {
  return (
    <Typography as="global-strong" className={clsx(className)}>
      {text}
    </Typography>
  );
}
