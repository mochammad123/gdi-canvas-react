import { memo } from 'react';

type CodeBlockProps = {
  code: string;
  title: string;
};

const CodeBlock = ({ code, title }: CodeBlockProps) => {
  return (
    <div className="border overflow-hidden">
      <div className="bg-muted px-4 py-2 border-b">
        <span className="text-sm font-medium">{title}</span>
      </div>
      <pre className="p-4 overflow-x-auto bg-gray-100">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  );
};

export default memo(CodeBlock);
