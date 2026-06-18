import { useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { CODE_EXAMPLE, getAdvancedHeaders } from './data';
import { generateSampleData, SampleData } from '@/lib/variables/table-sample';
import { KnittoTable } from '@knittotextile/react-ui';

const CalculationFooter = ({ data, columnKey }: { data: SampleData[]; columnKey: keyof SampleData | string }) => {
  const isNumeric = (val: unknown) => typeof val === 'number' && !Number.isNaN(val);
  const values = data.map((d) => d[columnKey as keyof SampleData]).filter(isNumeric) as number[];

  if (!values.length) return <span className="text-xs text-gray-600 dark:text-black-40">—</span>;

  const sum = values.reduce((acc, n) => acc + n, 0);
  const avg = sum / values.length;

  return (
    <div className="px-1.5 py-1 text-[11px] leading-none">
      <div className="font-medium">Σ {sum.toLocaleString()}</div>
      <div className="text-gray-600 dark:text-black-40">μ {avg.toLocaleString()}</div>
    </div>
  );
};

const TotalsFooter = () => <span className="text-xs font-medium px-1.5">Totals</span>;

const ActionsFooter = () => (
  <div className="flex items-center gap-1 px-1.5 py-1">
    <button className="px-2 py-0.5 rounded bg-blue-600 text-white text-[11px]">Export</button>
    <button className="px-2 py-0.5 rounded bg-gray-200 dark:bg-black-60 dark:text-greyish-semi-white text-[11px]">Reset</button>
  </div>
);

function Footer({ id }: { id: string }) {
  const [showCode, setShowCode] = useState(false);

  const data = useMemo(() => generateSampleData(30), []);
  const headers = useMemo(() => getAdvancedHeaders(data, CalculationFooter, TotalsFooter, ActionsFooter), [data]);

  return (
    <ContentSection id={id} title="Footer" showCode={showCode} setShowCode={setShowCode} className="mb-10">
      <div className="h-96 mb-2.5 mt-2.5">
        <KnittoTable
          data={data}
          filterHeight={32}
          footerHeight={40}
          headerHeight={40}
          headerMode="double"
          headers={headers}
          rowHeight={32}
          rowKey="id"
          useFooter={true}
        />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLE} title="Footer Example" />}
    </ContentSection>
  );
}

export default Footer;
