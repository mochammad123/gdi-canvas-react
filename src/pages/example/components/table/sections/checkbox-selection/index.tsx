import { memo, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { CODE_EXAMPLE, generateSampleData, getEmployeeHeaders } from './utils';
import { KnittoTable } from '@knittotextile/react-ui';

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
          className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 border-blue-100 dark:border-blue-800"
        />
        <StatCard
          title="Deselected Rows"
          value={deselectedRows.length}
          subtitle={deselectedRows.length ? `${deselectedRows.length} rows deselected` : 'No rows deselected'}
          className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-200 border-orange-100 dark:border-orange-800"
        />
        <StatCard
          title="Select All Status"
          value={isSelectAll ? 'Active' : 'Inactive'}
          subtitle={isSelectAll ? 'All rows selected (except deselected)' : 'Individual selection mode'}
          className={`border-green-100 dark:border-green-800 ${isSelectAll ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-200' : 'bg-gray-50 dark:bg-black-60 text-gray-700 dark:text-black-40'}`}
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
