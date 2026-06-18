import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { memo, useState } from 'react';
import { generateUsers, getUserHeaders } from './utils';
import { KnittoTable } from '@knittotextile/react-ui';

const users = generateUsers(100);
const headers = getUserHeaders();

function BasicUsage({ id }: { id: string }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <ContentSection id={id} title="Basic Usage" showCode={showCode} setShowCode={setShowCode} className="mb-10">
      <div className="h-80 mb-2.5 mt-2.5">
        <KnittoTable data={users} filterHeight={32} headerHeight={40} headerMode="double" headers={headers} rowHeight={32} rowKey="id" />
      </div>

      {showCode && (
        <div className="mt-4">
          <CodeBlock code={BASIC_USAGE_EXAMPLE} title="Basic Usage Example" />
        </div>
      )}
    </ContentSection>
  );
}

export default memo(BasicUsage);

export const BASIC_USAGE_EXAMPLE = `import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { generateUserData, User } from '@/lib/variables/table-sample';

// Generate sample data
const users = generateUserData(100);

const MyTable = () => {
  // Define table headers
  const headers: IHeader<User>[] = [
    { key: 'id', caption: 'ID', width: 80, hideFilter: { search: true, filterSelection: true, filterAdvance: true } },
    { key: 'name', caption: 'Name', width: 200 },
    { key: 'email', caption: 'Email', width: 250 },
    { key: 'company', caption: 'Company', width: 200 },
    { key: 'position', caption: 'Position', width: 180 },
    { key: 'phone', caption: 'Phone', width: 150 },
    { key: 'city', caption: 'City', width: 150 },
    { key: 'country', caption: 'Country', width: 120 },
    {
      key: 'salary',
      caption: 'Salary',
      width: 120,
      renderCell: (item) => \`$\${item.salary.toLocaleString()}\`,
    },
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
