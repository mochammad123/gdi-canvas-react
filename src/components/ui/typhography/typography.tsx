import clsx from 'clsx';
import { createElement } from 'react';

const defaultTag = 'p';

const baseTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type TBaseTag = (typeof baseTags)[number];

// add more class on 'tailwind.typography.ts'
export const globalClass = [
  'global-paragraph',
  'global-strong',
  'global-report-title',
  'global-report-content',
  'global-button',
  'global-report-content',
  'global-hint',
  'global-description',
] as const;

type TGlobalClass = (typeof globalClass)[number];

const Typography = ({
  as,
  children,
  className,
  ...props
}: { as: TBaseTag | TGlobalClass } & React.HTMLAttributes<TBaseTag | HTMLParagraphElement>) => {
  return baseTags.includes(as as TBaseTag)
    ? createElement(as, { className, ...props }, children)
    : createElement(defaultTag, { className: clsx(as, className), ...props }, children);
};

Typography.displayName = 'Typography';

export default Typography;
