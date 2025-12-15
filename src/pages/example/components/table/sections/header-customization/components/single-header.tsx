import { Typography } from '@/components/ui/typhography';
import CodeBlock from '../../../components/code-block';
import { memo, useState } from 'react';
import ToggleShowCode from '@/components/toggle-show-code';
import { generateUsers, getUserHeaders } from '../utils';
import { KnittoTable } from '@/components/ui/knitto-table';

const users = generateUsers(20);
const headers = getUserHeaders(true);

function SingleHeader() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="flex flex-col mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <Typography as="global-report-title" className="mb-1.5">
          1. Single Header
        </Typography>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="h-64 mb-2.5">
        <KnittoTable data={users} filterHeight={32} headerHeight={40} headerMode="single" headers={headers} rowHeight={32} rowKey="id" />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLE} title="Single Header Example" />}
    </div>
  );
}

export default memo(SingleHeader);

const CODE_EXAMPLE = `import { KnittoTable, type IHeader } from '@knitto/knitto-table';
import { generateUserData, User } from '@/lib/variables/table-sample';

// Generate sample data
const users = generateUserData(20);

const MyTable = () => {
  // Define table headers
  const headers: IHeader<User>[] = [
    { key: 'id', caption: 'ID', width: 80, hideFilter: { search: true, filterSelection: true, filterAdvance: true } },
    { key: 'name', caption: 'Name', width: 200 },
    { key: 'email', caption: 'Email', width: 250 },
    { key: 'company', caption: 'Company', width: 200 },
    { key: 'position', caption: 'Position', width: 180 },
  ];

  return (
    <KnittoTable
      headers={headers}
      data={users}
      rowKey="id"
      headerMode="single"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
    />
  );
};`;
