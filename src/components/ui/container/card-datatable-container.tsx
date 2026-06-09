import clsx from 'clsx';
import { Card } from '../card';
import { Typography } from '../typhography';

export default function CardDataTableContainer({
  title,
  children,
  className,
}: {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={clsx(['bg-white border-none! min-h-[calc(100vh-3.25rem)] shadow-md py-[.625rem]', 'shadow-lg'], className)}>
      {title && (
        <Typography as="global-strong" className="py-[.4063rem] px-4">
          {title}
        </Typography>
      )}
      {children}
    </Card>
  );
}
