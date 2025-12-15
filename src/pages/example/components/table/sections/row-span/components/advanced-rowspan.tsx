import { memo, useMemo, useState } from 'react';
import { generateSalesReportData } from '../utils/data-generator';
import { getSalesReportHeaders } from '../utils/table-headers';
import { CODE_EXAMPLE_ADVANCED_ROWSPAN } from '../utils/constants';
import { KnittoTable } from '@/components/ui/knitto-table';
import CodeBlock from '../../../components/code-block';
import ToggleShowCode from '@/components/toggle-show-code';

function AdvancedRowspanSection() {
  const [showCode, setShowCode] = useState(false);

  const data = useMemo(() => generateSalesReportData(), []);
  const headers = useMemo(() => getSalesReportHeaders(), []);

  return (
    <section className="mb-2.5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="global-report-title">2. Advanced Rowspan with Colspan</span>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="h-80">
        <KnittoTable useRegularTable data={data} headers={headers} rowKey="id" />
      </div>

      {showCode && (
        <div className="mt-4">
          <CodeBlock code={CODE_EXAMPLE_ADVANCED_ROWSPAN} title="Advanced Rowspan with Colspan Example" />
        </div>
      )}
    </section>
  );
}

export default memo(AdvancedRowspanSection);
