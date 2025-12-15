import { memo, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { CODE_EXAMPLE, generateSampleData, getEmployeeHeaders } from './utils';
import { KnittoTable } from '@/components/ui/knitto-table';

const StatCard = ({ title, value, subtitle, className }: { title: string; value: string | number; subtitle: string; className?: string }) => (
  <div className={`flex-1 border rounded-md p-4 ${className || ''}`}>
    <div className="text-sm font-semibold mb-2">{title}</div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-xs">{subtitle}</div>
  </div>
);

const CheckboxSelectionSection = ({ id }: { id: string }) => {
  const [showCode, setShowCode] = useState(false);

  const data = useMemo(() => generateSampleData(), []);
  const headers = useMemo(() => getEmployeeHeaders(), []);

  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [deselectedRows, setDeselectedRows] = useState<(string | number)[]>([]);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);

  return (
    <ContentSection id={id} title="Checkbox Selection" showCode={showCode} setShowCode={setShowCode} className="mb-10">
      <div className="flex gap-4 mb-4 mt-2.5">
        <StatCard
          title="Selected Rows"
          value={selectedRows.length}
          subtitle={selectedRows.length ? `${selectedRows.length} rows selected` : 'No rows selected'}
          className="bg-blue-50 text-blue-700 border-blue-100"
        />
        <StatCard
          title="Deselected Rows"
          value={deselectedRows.length}
          subtitle={deselectedRows.length ? `${deselectedRows.length} rows deselected` : 'No rows deselected'}
          className="bg-orange-50 text-orange-700 border-orange-100"
        />
        <StatCard
          title="Select All Status"
          value={isSelectAll ? 'Active' : 'Inactive'}
          subtitle={isSelectAll ? 'All rows selected (except deselected)' : 'Individual selection mode'}
          className={`border-green-100 ${isSelectAll ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}
        />
      </div>

      <div className="h-80 mb-2.5 mt-2.5">
        <KnittoTable
          headers={headers}
          data={data}
          rowKey="id"
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={32}
          onChangeCheckboxRowSelection={(sel, desel, all) => {
            setSelectedRows(sel);
            setDeselectedRows(desel);
            setIsSelectAll(all);
          }}
        />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLE} title="Checkbox Selection Example" />}
    </ContentSection>
  );
};

export default memo(CheckboxSelectionSection);
