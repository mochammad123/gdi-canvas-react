import clsx from 'clsx';

export default function Label({ className, children }: React.ComponentPropsWithoutRef<'label'>) {
  return <label className={clsx('global-report-title inline-block text-black-100 dark:text-greyish-semi-white', className)}>{children}</label>;
}
