import { useCallback, useMemo, useState } from 'react';

import CodeBlock from '../../../components/code-block';
import ToggleShowCode from '@/components/toggle-show-code';
import { KnittoTable } from '@knittotextile/react-ui';

import { generateUsers, getUserHeaders } from '../data';
import { CODE_EXAMPLE_VIRTUAL_FROM_TOGGLE, CODE_EXAMPLE_VIRTUAL_WHOLE_ROW } from '../constants';
import { User } from '@/lib/variables/table-sample';
import clsx from 'clsx';

const VirtualTableImplementation = () => {
  const [showCode, setShowCode] = useState(false);
  const [data, setData] = useState(() => generateUsers(50));
  const [reorderOnlyFromToggle, setReorderOnlyFromToggle] = useState(false);
  const headers = useMemo(() => getUserHeaders(reorderOnlyFromToggle), [reorderOnlyFromToggle]);

  const handleReorderRows = useCallback((fromIndex: number, toIndex: number) => {
    setData((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  }, []);

  const handleClickRow = useCallback((row: User) => {
    console.log('Row clicked:', row);
  }, []);

  return (
    <section className="mb-2.5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="global-report-title">2. Virtual Table Mode</span>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Mode default dengan row virtualization. Cocok untuk dataset besar.</p>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={reorderOnlyFromToggle} onChange={(e) => setReorderOnlyFromToggle(e.target.checked)} className="rounded" />
          <span className="text-sm">Reorder hanya dari kolom drag handle</span>
        </label>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {reorderOnlyFromToggle ? '(Drag dari ikon ⋮⋮ saja)' : '(Drag dari seluruh row)'}
        </span>
      </div>
      <div className="h-80 mt-2.5">
        <KnittoTable
          data={data}
          filterHeight={32}
          headerHeight={40}
          headerMode="double"
          headers={headers}
          rowHeight={32}
          rowKey="id"
          onReorderRows={handleReorderRows}
          reorderOnlyFromToggle={reorderOnlyFromToggle}
          onClickRow={handleClickRow}
          classNameCell={(_, __, ___, opts) => {
            return clsx({
              'border-l! border-l-blue-950!': opts?.isFirstIndex && opts?.isRowHighlighted,
              'border-r! border-r-blue-950!': opts?.isLastIndex && opts?.isRowHighlighted,
              'border-y! border-y-blue-950! bg-[#ECEEFF]': opts?.isRowHighlighted,
            });
          }}
        />
      </div>
      {showCode && (
        <CodeBlock
          code={reorderOnlyFromToggle ? CODE_EXAMPLE_VIRTUAL_FROM_TOGGLE : CODE_EXAMPLE_VIRTUAL_WHOLE_ROW}
          title={reorderOnlyFromToggle ? 'Virtual Table — Reorder dari Handle' : 'Virtual Table — Reorder dari Whole Row'}
        />
      )}
    </section>
  );
};

export default VirtualTableImplementation;
