import { memo, useMemo, useState } from 'react';
import { CODE_EXAMPLE_ONCLICK } from '../utils/constants';
import { generateEmployeeData } from '../utils/data-generator';
import { getEmployeeHeaders } from '../utils/table-headers';
import { KnittoTable } from '@knittotextile/react-ui';
import CodeBlock from '../../../components/code-block';
import ToggleShowCode from '@/components/toggle-show-code';

const OnclickDocumentation = () => {
  const [selectedRow, setSelectedRow] = useState<unknown | null>(null);
  const [showCode, setShowCode] = useState(false);

  const data = useMemo(() => generateEmployeeData(), []);
  const headers = useMemo(() => getEmployeeHeaders(), []);

  const memoizeSelectedRow = useMemo(() => selectedRow, [selectedRow]);

  console.log('SELECTED ROW', memoizeSelectedRow);

  return (
    <section>
      <div className="flex justify-between items-center mb-1.5">
        <span className="global-report-title">3. onClick Documentation</span>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="border rounded-lg p-6 bg-muted/30">
        <div className="space-y-4">
          <div className="h-80">
            <KnittoTable
              rowKey="id"
              isLoading={false}
              headers={headers}
              data={data}
              useRegularTable
              onClickRow={(item, rowIndex, columnIndex, groupOfItems) => {
                setSelectedRow({ item, rowIndex, columnIndex, groupOfItems });
              }}
            />
          </div>

          <div>
            <h5>Selected Row Data:</h5>
            <span>Cek console untuk melihat data yang dipilih</span>
          </div>

          {showCode && <CodeBlock code={CODE_EXAMPLE_ONCLICK} title="onClick Implementation Example" />}
        </div>
      </div>
    </section>
  );
};

export default memo(OnclickDocumentation);
