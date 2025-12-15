import { Typography } from '@/components/ui/typhography';
import CodeBlock from '../../../components/code-block';
import { useState } from 'react';
import ToggleShowCode from '@/components/toggle-show-code';
import { generateUsers, getUserHeaders } from '../utils';
import { KnittoTable } from '@/components/ui/knitto-table';

const users = generateUsers(20);
const headers = getUserHeaders(true);

function CustomRender() {
  const [showCode, setShowCode] = useState(false);

  const modifiedHeaders = headers.map((header) => ({
    ...header,
    ...(header.key === 'name' && {
      renderHeader: () => (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold">
          <span className="text-xs">👤 Name</span>
        </div>
      ),
    }),
    ...(header.key === 'email' && {
      renderHeader: () => (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold">
          <span className="text-xs">📧 Email</span>
        </div>
      ),
    }),
  }));

  return (
    <div className="flex flex-col mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <Typography as="global-report-title" className="mb-1.5">
          4. Custom Render
        </Typography>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="h-80 mb-2.5">
        <KnittoTable data={users} filterHeight={32} headerHeight={40} headerMode="double" headers={modifiedHeaders} rowHeight={32} rowKey="id" />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLE} title="Custom Render Example" />}
    </div>
  );
}

export default CustomRender;

const CODE_EXAMPLE = `import { KnittoTable, type IHeader } from '@knitto/knitto-table';
import { generateUserData, User } from '@/lib/variables/table-sample';

// Generate sample data
const users = generateUserData(20);

const MyTable = () => {
  // Define table headers
  const headers: IHeader<User>[] = [
    { key: 'id', caption: 'ID', width: 80, 
     hideFilter: { search: true, filterSelection: true, filterAdvance: true }
    },
    { key: 'name', caption: 'Name', width: 200,
     renderHeader: () => (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-r
          from-cyan-500 to-blue-600 text-white font-bold">
          <span className="text-xs">📧 Email</span>
        </div>
      ),
    },
    { key: 'email', caption: 'Email', width: 250,
      renderHeader: () => (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-r
          from-cyan-500 to-blue-600 text-white font-bold">
          <span className="text-xs">📧 Email</span>
        </div>
      )
    },
    { key: 'company', caption: 'Company', width: 200,
     hideFilter: { search: true, filterAdvance: true }
    },
    { key: 'position', caption: 'Position', width: 180 },
  ];

  return (
    <KnittoTable
      headers={headers}
      data={users}
      rowKey="id"
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
    />
  );
};`;
