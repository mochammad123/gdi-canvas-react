import { generateEmployeeData } from '@/lib/variables/table-sample';
import { memo, useMemo, useState } from 'react';
import { CODE_EXAMPLE_BASIC, getEmployeeHeaders } from '../data';
import { KnittoTable } from '@/components/ui/knitto-table';
import ToggleShowCode from '@/components/toggle-show-code';
import CodeBlock from '../../../components/code-block';

function BasicImplementation() {
  const [showCode, setShowCode] = useState(false);
  const data = useMemo(() => generateEmployeeData(50), []);
  const headers = useMemo(() => getEmployeeHeaders(), []);

  return (
    <section className="mb-2.5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="global-report-title">1. Basic Implementation</span>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>
      <div className="h-80 mt-2.5">
        <KnittoTable useRegularTable data={data} headers={headers} rowKey="id" />
      </div>
      {showCode && <CodeBlock code={CODE_EXAMPLE_BASIC} title="Basic Implementation Example" />}
    </section>
  );
}

export default memo(BasicImplementation);
