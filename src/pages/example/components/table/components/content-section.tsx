import ToggleShowCode from '@/components/toggle-show-code';
import { Typography } from '@/components/ui/typhography';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ContentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id: string;
  title: string;
  showCode?: boolean;
  setShowCode?: (show: boolean) => void;
}

function ContentSection({ children, id, title, showCode, setShowCode, className, ...props }: ContentSectionProps) {
  return (
    <section id={id} className={clsx('p-2.5 bg-white border rounded-md', className)} {...props}>
      <div className="flex justify-between items-center">
        <Typography as="h4" className="mb-2.5">
          {title}
        </Typography>
        {setShowCode && <ToggleShowCode show={showCode ?? false} setShow={setShowCode} />}
      </div>

      {children}
    </section>
  );
}

export default ContentSection;
