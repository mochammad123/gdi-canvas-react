import { memo, useCallback, useDeferredValue, useMemo, useState, useTransition } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { getEmployeeHeaders } from './headers';
import { CODE_EXAMPLES } from './constants';
import { EmployeeData, generateDatasetAsync } from '@/lib/variables/table-sample';
import { KnittoTable } from '@knittotextile/react-ui';

function LargeDataset({ id }: { id: string }) {
  const [showCode, setShowCode] = useState(false);
  const [data, setData] = useState<EmployeeData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const headers = useMemo(() => getEmployeeHeaders(), []);
  const deferredData = useDeferredValue(data);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);

    // Generate data di background tanpa blocking UI
    const result = await generateDatasetAsync(100000);

    // Gunakan startTransition untuk non-blocking update
    startTransition(() => {
      setData(result);
      setIsGenerating(false);
    });
  }, [startTransition]);

  return (
    <ContentSection id={id} title="Large Dataset (100,000 records)" showCode={showCode} setShowCode={setShowCode} className="mb-10">
      <div className="p-3 border dark:border-black-60 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-sm mb-3">
        <span className="font-semibold mr-1">Example:</span>
        100,000 employee records. Klik tombol di bawah untuk generate dataset. Perhatikan performa tabel tetap halus meskipun dataset besar.
      </div>

      <div className="mb-3">
        <button
          className="px-3 py-1.5 text-xs border dark:border-black-60 rounded bg-white dark:bg-black-80 dark:text-greyish-semi-white hover:bg-black-20 dark:hover:bg-black-60 disabled:opacity-50"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating…' : 'Generate 100K Records'}
        </button>
      </div>

      <div className="h-96 mb-2.5 mt-2.5">
        <KnittoTable
          headers={headers}
          data={deferredData}
          rowKey="id"
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={32}
          isLoading={isGenerating || isPending}
        />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLES.basicUsage} title="Large Dataset Example" />}
    </ContentSection>
  );
}

export default memo(LargeDataset);
