import ContentSection from '../../components/content-section';
import { memo, useMemo, useState } from 'react';
import CodeBlock from '../../components/code-block';
import { generateUsers, getGroupedHeaders } from './utils';
import { KnittoTable } from '@knittotextile/react-ui';

function HeaderGrouping({ id }: { id: string }) {
  const [showCode, setShowCode] = useState(false);

  const data = useMemo(() => generateUsers(100), []);
  const headers = useMemo(() => getGroupedHeaders(), []);

  return (
    <ContentSection id={id} title="Header Grouping" showCode={showCode} setShowCode={setShowCode} className="mb-10">
      <p className="text-xs text-gray-600 dark:text-black-40 mb-2">
        Catatan: Untuk membuat group header, key harus diawali dengan <code className="dark:text-greyish-semi-white">group-header-</code>.
      </p>

      <div className="h-80 mb-2.5 mt-2.5">
        <KnittoTable data={data} headers={headers} rowKey="id" headerMode="double" rowHeight={32} headerHeight={40} filterHeight={32} />
      </div>

      {showCode && (
        <div className="mt-4">
          <CodeBlock code={HEADER_GROUPING_EXAMPLE} title="Header Grouping Example" />
        </div>
      )}
    </ContentSection>
  );
}

export default memo(HeaderGrouping);

export const HEADER_GROUPING_EXAMPLE = `import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { generateUserData, User } from '@/lib/variables/table-sample';

const users = generateUserData(100);

// Catatan: key group harus diawali dengan "group-header-"
const headers: IHeader<User>[] = [
  { key: 'id', caption: 'ID', width: 80, hideFilter: { search: true, filterSelection: true, filterAdvance: true } },
  { key: 'name', caption: 'Name', width: 200 },
  {
    key: 'group-header-contact',
    caption: 'Contact',
    children: [
      { key: 'email', caption: 'Email', width: 220 },
      { key: 'phone', caption: 'Phone', width: 140 },
    ],
  },
  {
    key: 'group-header-location',
    caption: 'Location',
    children: [
      { key: 'address', caption: 'Address', width: 240 },
      { key: 'city', caption: 'City', width: 150 },
      { key: 'country', caption: 'Country', width: 140 },
    ],
  },
  { key: 'salary', caption: 'Salary', width: 120, renderCell: (item) => '$' + item.salary.toLocaleString() },
];

const Example = () => {
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
