import ToggleShowCode from '@/components/toggle-show-code';
import { KnittoTable } from '@knittotextile/react-ui';
import { useMemo, useState } from 'react';
import CodeBlock from '../../../components/code-block';
import { getEmployeeHeaders } from '../utils/table-headers';
import { generateEmployeeData } from '../utils/data-generator';
import { CODE_EXAMPLE_BASIC_ROWSPAN } from '../utils/constants';

function BasicRowspan() {
  const [showCode, setShowCode] = useState(false);

  const data = useMemo(() => generateEmployeeData(), []);
  const headers = useMemo(() => getEmployeeHeaders(), []);

  return (
    <section className="mb-2.5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="global-report-title">1. Basic Rowspan</span>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="h-80 mb-2.5">
        <KnittoTable useRegularTable data={data} headers={headers} rowKey="id" />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLE_BASIC_ROWSPAN} title="Basic Rowspan Example" />}
    </section>
  );
}

export default BasicRowspan;
