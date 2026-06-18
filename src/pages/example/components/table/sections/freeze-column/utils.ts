import { IHeader } from '@knittotextile/react-ui';
import { Employee, generateEmployeeData } from '@/lib/variables/table-sample';

export const getEmployeeHeaders = (): IHeader<Employee>[] => [
  { key: 'name', caption: 'Name', width: 200, freeze: 'left' },
  { key: 'email', caption: 'Email', width: 250 },
  { key: 'company', caption: 'Company', width: 200 },
  { key: 'position', caption: 'Position', width: 180 },
  { key: 'phone', caption: 'Phone', width: 150 },
  { key: 'address', caption: 'Address', width: 200 },
  { key: 'city', caption: 'City', width: 150 },
  { key: 'country', caption: 'Country', width: 120 },
  { key: 'department', caption: 'Department', width: 150 },
  { key: 'startDate', caption: 'Start Date', width: 120 },
  { key: 'status', caption: 'Status', width: 100, freeze: 'right' },
  {
    key: 'salary',
    caption: 'Salary',
    width: 120,
    freeze: 'right',
    renderCell: (item) => `$${item.salary.toLocaleString()}`,
  },
];

export const generateSampleData = (): Employee[] => {
  return generateEmployeeData(30);
};

export const CODE_EXAMPLE = `import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { Employee, generateEmployeeData } from '@/lib/variables/table-sample';

const MyTable = () => {
  const [data] = useState<Employee[]>(generateEmployeeData(30));

  // Define table headers with freeze columns
  const headers: IHeader<(typeof data)[0]>[] = [
    { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
    { key: 'name', caption: 'Name', width: 200, freeze: 'left' },
    { key: 'email', caption: 'Email', width: 250 },
    { key: 'company', caption: 'Company', width: 200 },
    { key: 'position', caption: 'Position', width: 180 },
    { key: 'phone', caption: 'Phone', width: 150 },
    { key: 'city', caption: 'City', width: 150 },
    { key: 'country', caption: 'Country', width: 120 },
    { key: 'status', caption: 'Status', width: 100, freeze: 'right' },
    {
      key: 'salary',
      caption: 'Salary',
      width: 120,
      freeze: 'right',
      renderCell: (item) => \`$\${item.salary.toLocaleString()}\`,
    },
  ];

  return (
    <KnittoTable
      headers={headers}
      data={data}
      rowKey="id"
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
    />
  );
};`;
