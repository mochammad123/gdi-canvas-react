import clsx from 'clsx';
import { createElement } from 'react';

const defaultTag = 'p';

const baseTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type TBaseTag = (typeof baseTags)[number];

// add more class on 'tailwind.typography.ts'
const globalClass = [
  'global-paragraph',
  'global-strong',
  'global-report-title',
  'global-report-content',
  'global-button',
  'global-report-content',
  'global-hint',
] as const;

type TGlobalClass = (typeof globalClass)[number];

export default function Typography({
  as,
  children,
  className,
  ...props
}: { as: TBaseTag | TGlobalClass } & React.HTMLAttributes<TBaseTag | HTMLParagraphElement>) {
  return baseTags.includes(as as TBaseTag)
    ? createElement(as, { className, ...props }, children)
    : createElement(defaultTag, { className: clsx(as, className), ...props }, children);
}
