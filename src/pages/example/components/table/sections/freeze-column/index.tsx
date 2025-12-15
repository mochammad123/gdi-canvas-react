import { memo, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { CODE_EXAMPLE, generateSampleData, getEmployeeHeaders } from './utils';
import { KnittoTable } from '@/components/ui/knitto-table';

function FreezeColumn({ id }: { id: string }) {
  const [showCode, setShowCode] = useState(false);
  const data = useMemo(() => generateSampleData(), []);
  const headers = useMemo(() => getEmployeeHeaders(), []);

  return (
    <ContentSection id={id} title="Freeze Column" showCode={showCode} setShowCode={setShowCode} className="mb-10">
      <div className="h-96 mb-2.5 mt-2.5">
        <KnittoTable headers={headers} data={data} rowKey="id" headerMode="double" rowHeight={32} headerHeight={40} filterHeight={32} />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLE} title="Freeze Column Example" />}
    </ContentSection>
  );
}

export default memo(FreezeColumn);
