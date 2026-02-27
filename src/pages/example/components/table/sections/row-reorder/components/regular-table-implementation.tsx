import { useCallback, useMemo, useState } from 'react';

import CodeBlock from '../../../components/code-block';
import ToggleShowCode from '@/components/toggle-show-code';
import { KnittoTable } from '@/components/ui/knitto-table';

import { generateUsers, getUserHeaders } from '../data';
import { CODE_EXAMPLE_REGULAR_FROM_TOGGLE, CODE_EXAMPLE_REGULAR_WHOLE_ROW } from '../constants';

const RegularTableImplementation = () => {
  const [showCode, setShowCode] = useState(false);
  const [data, setData] = useState(() => generateUsers(20));
  const [reorderOnlyFromToggle, setReorderOnlyFromToggle] = useState(false);
  const headers = useMemo(() => getUserHeaders(reorderOnlyFromToggle), [reorderOnlyFromToggle]);

  const handleReorderRows = useCallback((fromIndex: number, toIndex: number) => {
    setData((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  }, []);

  return (
    <section className="mb-2.5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="global-report-title">1. Regular Table Mode</span>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Gunakan <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">useRegularTable</code> untuk mode tabel native HTML.
      </p>
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
          useRegularTable
        />
      </div>
      {showCode && (
        <CodeBlock
          code={reorderOnlyFromToggle ? CODE_EXAMPLE_REGULAR_FROM_TOGGLE : CODE_EXAMPLE_REGULAR_WHOLE_ROW}
          title={reorderOnlyFromToggle ? 'Regular Table — Reorder dari Handle' : 'Regular Table — Reorder dari Whole Row'}
        />
      )}
    </section>
  );
};

export default RegularTableImplementation;
