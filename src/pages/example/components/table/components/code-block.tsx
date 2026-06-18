import { memo } from 'react';

type CodeBlockProps = {
  code: string;
  title: string;
};

const CodeBlock = ({ code, title }: CodeBlockProps) => {
  return (
    <div className="border dark:border-black-60 overflow-hidden rounded-md">
      <div className="bg-muted dark:bg-black-60 px-4 py-2 border-b dark:border-black-60">
        <span className="text-sm font-medium dark:text-greyish-semi-white">{title}</span>
      </div>
      <pre className="p-4 overflow-x-auto bg-gray-100 dark:bg-black-60">
        <code className="text-sm dark:text-greyish-semi-white">{code}</code>
      </pre>
    </div>
  );
};

export default memo(CodeBlock);
