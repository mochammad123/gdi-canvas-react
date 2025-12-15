import { memo, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import ToggleShowCode from '@/components/toggle-show-code';
import { getAdvancedHeaders, getBasicHeaders } from './headers';
import { CODE_EXAMPLE_BASIC, CODE_EXAMPLE_WITH_CUSTOM_CELL } from './constants';
import { generateProductData } from '@/lib/variables/table-sample';
import { KnittoTable } from '@/components/ui/knitto-table';

function DynamicRowHeight({ id }: { id: string }) {
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);

  const data = useMemo(() => generateProductData(120), []);
  const basicHeaders = useMemo(() => getBasicHeaders(), []);
  const advancedHeaders = useMemo(() => getAdvancedHeaders(), []);

  return (
    <ContentSection id={id} title="Dynamic Row Height" className="mb-10">
      {/* Configuration Requirements */}
      <div className="border rounded-md p-3 mb-4 bg-white">
        <div className="font-semibold mb-2">Persyaratan Konfigurasi</div>
        <div className="text-sm font-medium mb-1">Properti Wajib</div>
        <div className="text-xs bg-gray-50 border rounded px-2 py-1 inline-block mr-2">enableColumnVirtualization={'{false}'}</div>
        <span className="text-[10px] text-red-600 mr-3 align-middle">Wajib</span>
        <div className="mt-2 text-sm text-gray-700">
          Column virtualization harus dinonaktifkan untuk menggunakan tinggi baris dinamis. Fitur ini membutuhkan semua kolom dirender agar pengukuran
          tinggi baris akurat.
        </div>
        <div className="mt-3">
          <div className="text-xs bg-gray-50 border rounded px-2 py-1 inline-block mr-2">useDynamicRowHeight={'{true}'}</div>
          <span className="text-[10px] text-red-600 align-middle">Wajib</span>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          Mengaktifkan fitur tinggi baris dinamis. Tabel akan otomatis mengukur dan menyesuaikan tinggi baris berdasarkan konten.
        </div>
      </div>

      {/* 1. Basic Dynamic Row Height */}
      <div className="flex justify-between items-center mb-2">
        <span className="global-report-title">1. Basic Dynamic Row Height</span>
        <ToggleShowCode show={showCode1} setShow={setShowCode1} />
      </div>
      <div className="h-80 mb-3">
        <KnittoTable
          headers={basicHeaders}
          data={data}
          rowKey="id"
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={28}
          enableColumnVirtualization={false}
          useDynamicRowHeight
        />
      </div>
      {showCode1 && <CodeBlock code={CODE_EXAMPLE_BASIC} title="Basic Dynamic Row Height" />}

      {/* 2. Advanced with Multiple Line Content */}
      <div className="flex justify-between items-center mb-2 mt-6">
        <span className="global-report-title">2. Advanced with Multiple Line Content</span>
        <ToggleShowCode show={showCode2} setShow={setShowCode2} />
      </div>
      <div className="h-80 mb-3">
        <KnittoTable
          headers={advancedHeaders}
          data={data}
          rowKey="id"
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={28}
          enableColumnVirtualization={false}
          useDynamicRowHeight
        />
      </div>
      {showCode2 && <CodeBlock code={CODE_EXAMPLE_WITH_CUSTOM_CELL} title="Advanced Dynamic Row Height" />}
    </ContentSection>
  );
}

export default memo(DynamicRowHeight);
