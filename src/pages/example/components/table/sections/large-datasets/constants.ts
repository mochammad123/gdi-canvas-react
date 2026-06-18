export const CODE_EXAMPLES = {
  basicUsage: `import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { useMemo } from 'react';

const LargeDatasetTable = () => {
  // Generate large dataset (1M records)
  const data = useMemo(() => {
    return Array.from({ length: 1000000 }, (_, index) => ({
      id: index + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      // ... other fields
    }));
  }, []);

  const headers: IHeader<(typeof data)[0]>[] = [
    { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
    { key: 'name', caption: 'Name', width: 200, freeze: 'left' },
    { key: 'email', caption: 'Email', width: 250 },
    // ... other headers
  ];

  return (
    <KnittoTable
      headers={headers}
      data={data}
      rowKey="id"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
    />
  );
};`,

  optimization: `// Performance optimization techniques

// 1. Memoize data generation
const data = useMemo(() => generateLargeEmployeeData(1000000), []);

// 2. Use freeze columns for important data
const headers = [
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Name', width: 200, freeze: 'left' },
  // ... other columns
];

// 3. Optimize row height
<KnittoTable
  rowHeight={32} // Fixed height for better performance
  // ... other props
/>

// 4. Use efficient filtering
const filteredData = useMemo(() => {
  return data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [data, searchTerm]);`,
};
