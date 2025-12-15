import { memo, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import ToggleShowCode from '@/components/toggle-show-code';
import { getNonVirtualizedHeaders, getVirtualizedHeaders } from './headers';
import { CODE_EXAMPLE_NON_VIRTUALIZED, CODE_EXAMPLE_VIRTUALIZED } from './constants';
import { generateUserData } from '@/lib/variables/table-sample';
import { KnittoTable } from '@/components/ui/knitto-table';

function ColumnVirtualization({ id }: { id: string }) {
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);

  const data = useMemo(() => generateUserData(500), []);
  const headersVirtualized = useMemo(() => getVirtualizedHeaders(), []);
  const headersNonVirtualized = useMemo(() => getNonVirtualizedHeaders(), []);

  return (
    <ContentSection id={id} title="Column Virtualization" className="mb-10">
      {/* 1. Column Virtualization Enabled */}
      <div className="flex justify-between items-center mb-2">
        <span className="global-report-title">1. Column Virtualization Enabled</span>
        <ToggleShowCode show={showCode1} setShow={setShowCode1} />
      </div>
      <p className="text-xs text-gray-600 mb-2">Catatan: Secara default, column virtualization sudah aktif</p>
      <div className="h-80 mb-2.5">
        <KnittoTable
          headers={headersVirtualized}
          data={data}
          rowKey="id"
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={32}
          enableColumnVirtualization
        />
      </div>
      {showCode1 && <CodeBlock code={CODE_EXAMPLE_VIRTUALIZED} title="Column Virtualization Enabled" />}

      {/* 2. Column Virtualization Disabled */}
      <div className="flex justify-between items-center mt-6 mb-2">
        <span className="global-report-title">2. Column Virtualization Disabled</span>
        <ToggleShowCode show={showCode2} setShow={setShowCode2} />
      </div>
      <p className="text-xs text-gray-600 mb-2">
        Catatan: Disabled column virtualization berguna ketika ingin membuat dynamic row height. <br /> Kekurangannya ketika terdapat kolom dalam
        jumlah besar kemungkinan akan mempengaruhi performa
      </p>
      <div className="h-80 mb-2.5">
        <KnittoTable
          headers={headersNonVirtualized}
          data={data}
          rowKey="id"
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={32}
          enableColumnVirtualization={false}
        />
      </div>
      {showCode2 && <CodeBlock code={CODE_EXAMPLE_NON_VIRTUALIZED} title="Column Virtualization Disabled" />}
    </ContentSection>
  );
}

export default memo(ColumnVirtualization);
