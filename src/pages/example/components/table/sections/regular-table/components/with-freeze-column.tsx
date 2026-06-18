import { generateEmployeeData } from '@/lib/variables/table-sample';
import { memo, useMemo, useState } from 'react';
import { CODE_EXAMPLE_WITH_FREEZE, getEmployeeHeaders } from '../data';
import { KnittoTable } from '@knittotextile/react-ui';
import ToggleShowCode from '@/components/toggle-show-code';
import CodeBlock from '../../../components/code-block';

function WithFreezeColumn() {
  const [showCode, setShowCode] = useState(false);
  const data = useMemo(() => generateEmployeeData(50), []);
  const headers = useMemo(() => getEmployeeHeaders({ withFreeze: true }), []);

  return (
    <section>
      <div className="flex justify-between items-center mb-1.5">
        <span className="global-report-title">2. With Freeze Column</span>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>
      <div className="h-80 mt-2.5">
        <KnittoTable useRegularTable data={data} headers={headers} rowKey="id" />
      </div>
      {showCode && <CodeBlock code={CODE_EXAMPLE_WITH_FREEZE} title="With Freeze Column Example" />}
    </section>
  );
}

export default memo(WithFreezeColumn);
