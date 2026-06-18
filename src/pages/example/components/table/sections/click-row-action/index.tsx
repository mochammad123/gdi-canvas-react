import { memo, useMemo, useRef, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { CODE_EXAMPLE, generateSampleData, getProductHeaders } from './data';
import { Product } from '@/lib/variables/table-sample';
import { KnittoTable, useClickOutside } from '@knittotextile/react-ui';
import clsx from 'clsx';

const StatCard = ({ title, content }: { title: string; content: string }) => (
  <div className="border dark:border-black-60 rounded-md p-3 bg-white dark:bg-black-80">
    <div className="text-sm font-semibold mb-1 dark:text-greyish-semi-white">{title}</div>
    <div className="text-sm text-gray-700 dark:text-black-40 min-h-5">{content}</div>
  </div>
);

function ClickRowAction({ id }: { id: string }) {
  const [showCode, setShowCode] = useState(false);

  const data = useMemo(() => generateSampleData(), []);
  const headers = useMemo(() => getProductHeaders(), []);

  const [selectedRow, setSelectedRow] = useState<Product | null>(null);
  const [doubleClickedRow, setDoubleClickedRow] = useState<Product | null>(null);
  const [interactionLog, setInteractionLog] = useState<string[]>([]);
  const [contextMenu, setContextMenu] = useState<{ show: boolean; x: number; y: number; row: Product | null }>({
    show: false,
    x: 0,
    y: 0,
    row: null,
  });
  const menuRef = useRef<HTMLDivElement | null>(null);

  const pushLog = (text: string) =>
    setInteractionLog((prev) => {
      const next = [text, ...prev];
      return next.slice(0, 6);
    });

  useClickOutside([menuRef], () => contextMenu.show && setContextMenu({ show: false, x: 0, y: 0, row: null }));

  return (
    <ContentSection id={id} title="Click Row Action" showCode={showCode} setShowCode={setShowCode} className="mb-10">
      <div className="flex gap-4 mt-2.5">
        <div className="flex-1 h-96">
          <KnittoTable
            headers={headers}
            data={data}
            rowKey="id"
            headerMode="double"
            rowHeight={32}
            headerHeight={40}
            filterHeight={32}
            onClickRow={(item) => {
              setSelectedRow(item);
              pushLog(`Clicked: ${item.name}`);
            }}
            onDoubleClickRow={(item) => {
              setDoubleClickedRow(item);
              pushLog(`Double-clicked: ${item.name}`);
            }}
            onRightClickRow={(item, pos) => {
              pushLog(`Right-clicked: ${item.name} at (${pos.x}, ${pos.y})`);
              setContextMenu({ show: true, x: pos.x, y: pos.y, row: item });
            }}
            classNameCell={(_, __, ___, opts) => {
              return clsx({
                'border-l! border-l-blue-950!': opts?.isFirstIndex && opts?.isRowHighlighted,
                'border-r! border-r-blue-950!': opts?.isLastIndex && opts?.isRowHighlighted,
                'border-y! border-y-blue-950! bg-[#ECEEFF]': opts?.isRowHighlighted,
              });
            }}
          />
        </div>

        <div className="w-80 flex flex-col gap-3">
          <StatCard title="Selected Row" content={selectedRow ? selectedRow.name : 'No row selected'} />
          <StatCard title="Double-Clicked Row" content={doubleClickedRow ? doubleClickedRow.name : 'No row double-clicked'} />
          <div className="border dark:border-black-60 rounded-md p-3 bg-white dark:bg-black-80">
            <div className="text-sm font-semibold mb-1 dark:text-greyish-semi-white">Interaction Log</div>
            {interactionLog.length === 0 ? (
              <div className="text-sm text-gray-700 dark:text-black-40">No interactions yet</div>
            ) : (
              <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-black-40 space-y-1">
                {interactionLog.map((log, idx) => (
                  <li key={`${log}-${idx}`}>{log}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {contextMenu.show && (
        <div
          ref={menuRef}
          className="fixed z-50 w-48 bg-white dark:bg-black-80 border dark:border-black-60 rounded-md shadow-md text-sm dark:text-greyish-semi-white"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="block w-full text-left px-3 py-2 hover:bg-blue-50 dark:hover:bg-knitto-blue-60/20"
            onClick={() => {
              if (contextMenu.row) pushLog(`View details: ${contextMenu.row.name}`);
              setContextMenu({ show: false, x: 0, y: 0, row: null });
            }}
          >
            View details
          </button>
          <button
            className="block w-full text-left px-3 py-2 hover:bg-blue-50 dark:hover:bg-knitto-blue-60/20"
            onClick={() => {
              if (contextMenu.row) pushLog(`Edit: ${contextMenu.row.name}`);
              setContextMenu({ show: false, x: 0, y: 0, row: null });
            }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => {
              if (contextMenu.row) pushLog(`Delete: ${contextMenu.row.name}`);
              setContextMenu({ show: false, x: 0, y: 0, row: null });
            }}
          >
            Delete
          </button>
        </div>
      )}

      {showCode && <CodeBlock code={CODE_EXAMPLE} title="Click Row Action Example" />}
    </ContentSection>
  );
}

export default memo(ClickRowAction);
