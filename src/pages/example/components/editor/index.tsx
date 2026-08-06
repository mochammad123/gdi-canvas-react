import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { Editor, Typography } from '@knittotextile/react-ui';
import { useState, type ReactNode } from 'react';

const basicCode = `import { Editor } from '@knittotextile/react-ui';

export default function Example() {
  return (
    <Editor
      placeholder="Mulai menulis..."
      onChange={(value) => console.log(value.markdown)}
    />
  );
}`;

const toolbarCode = `import { Editor, DEFAULT_TOOLBAR_ITEMS } from '@knittotextile/react-ui';

export default function Example() {
  return (
    <Editor
      placeholder="Toolbar minimal..."
      toolbar={{
        position: 'top',
        type: 'classic',
        items: ['bold', 'italic', 'underline', 'bulletList', 'numberedList'],
      }}
    />
  );
}`;

const triggerCode = `import { Editor } from '@knittotextile/react-ui';

const dataTrigger = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

export default function Example() {
  return (
    <Editor
      placeholder="Ketik / untuk melihat command..."
      triggerChars={['/']}
      dataTrigger={dataTrigger}
    />
  );
}`;

const readOnlyCode = `import { Editor } from '@knittotextile/react-ui';

export default function Example() {
  return (
    <Editor
      readOnly
      defaultValue="# Judul\\n\\nIni adalah konten **read-only**."
    />
  );
}`;

const floatingCode = `import { Editor } from '@knittotextile/react-ui';

export default function Example() {
  return (
    <Editor
      placeholder="Floating toolbar..."
      toolbar={{ type: 'floating' }}
    />
  );
}`;

export default function EditorPage() {
  const [showBasic, setShowBasic] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  const [showReadOnly, setShowReadOnly] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [editorValue, setEditorValue] = useState('');

  return (
    <div className="p-4 flex flex-col gap-3 mb-10">
      <Typography as="h3">Editor</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Basic Editor">
          <ToggleShowCode show={showBasic} setShow={setShowBasic} />
          <Editor placeholder="Mulai menulis..." onChange={(value) => setEditorValue(value.markdown)} />
          <div className="mt-2 p-2 bg-black-5 dark:bg-black-90 rounded text-sm">
            <Typography as="global-paragraph">Output:</Typography>
            <pre className="whitespace-pre-wrap">{editorValue || '(belum ada input)'}</pre>
          </div>
          <ContentExampleCode show={showBasic} code={basicCode} />
        </Card>

        <Card title="Custom Toolbar">
          <ToggleShowCode show={showToolbar} setShow={setShowToolbar} />
          <Editor
            placeholder="Toolbar minimal..."
            toolbar={{
              position: 'top',
              type: 'classic',
              items: ['bold', 'italic', 'underline', 'bulletList', 'numberedList'],
            }}
          />
          <ContentExampleCode show={showToolbar} code={toolbarCode} />
        </Card>

        <Card title="Trigger Command (/command)">
          <ToggleShowCode show={showTrigger} setShow={setShowTrigger} />
          <Editor
            placeholder="Ketik / untuk melihat command..."
            triggerChars={['/']}
            dataTrigger={[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' },
              { value: 'angular', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'solid', label: 'Solid' },
            ]}
          />
          <ContentExampleCode show={showTrigger} code={triggerCode} />
        </Card>

        <Card title="Read Only">
          <ToggleShowCode show={showReadOnly} setShow={setShowReadOnly} />
          <Editor
            readOnly
            defaultValue="# Judul Dokumen\n\nIni adalah konten **read-only** yang tidak bisa diedit.\n\n- Item 1\n- Item 2\n- Item 3"
          />
          <ContentExampleCode show={showReadOnly} code={readOnlyCode} />
        </Card>

        <Card title="Floating Toolbar">
          <ToggleShowCode show={showFloating} setShow={setShowFloating} />
          <Editor placeholder="Sorot teks untuk melihat toolbar floating..." toolbar={{ type: 'floating' }} />
          <ContentExampleCode show={showFloating} code={floatingCode} />
        </Card>
      </div>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white dark:bg-black-80 shadow-md h-full">
      <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white">
        {title}
      </Typography>
      {children}
    </div>
  );
};
