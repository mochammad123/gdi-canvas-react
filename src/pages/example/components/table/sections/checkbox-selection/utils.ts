import { IHeader } from '@/components/ui/knitto-table';
import { Employee, generateEmployeeData } from '@/lib/variables/table-sample';

export const CODE_EXAMPLE = `import { KnittoTable, type IHeader } from '@knitto/knitto-table';
import { generateEmployeeData, Employee } from '@/lib/variables/table-sample';


const CheckboxSelectionTable = () => {
  const [data] = useState(generateEmployeeData(100));
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [deselectedRows, setDeselectedRows] = useState<(string | number)[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  // Define table headers with checkbox selection
  const headers: IHeader<(typeof data)[0]>[] = [
    { 
      key: 'row-selection', 
      caption: '', 
      width: 50,
      hideHeaderAction: true,
      hideFilter: {
        sort: true,
        search: true,
        filterSelection: true,
        filterAdvance: true,
      }
    },
    { key: 'name', caption: 'Name', width: 200 },
    { key: 'email', caption: 'Email', width: 250 },
    { key: 'company', caption: 'Company', width: 200 },
    { key: 'position', caption: 'Position', width: 180 },
    { key: 'phone', caption: 'Phone', width: 150 },
    { key: 'city', caption: 'City', width: 150 },
    { key: 'country', caption: 'Country', width: 120 },
    { key: 'department', caption: 'Department', width: 120 },
    { key: 'status', caption: 'Status', width: 100 },
    {
      key: 'salary',
      caption: 'Salary',
      width: 120,
      renderCell: (item) => \`$\${item.salary.toLocaleString()}\`,
    },
  ];

  // Handle checkbox selection changes
  const handleCheckboxSelection = (
    selectedRows: (string | number)[],
    deselectedRows: (string | number)[],
    isSelectAll: boolean
  ) => {
    setSelectedRows(selectedRows);
    setDeselectedRows(deselectedRows);
    setIsSelectAll(isSelectAll);
  };

  return (
    <KnittoTable
      headers={headers}
      data={data}
      rowKey="id"
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
      onChangeCheckboxRowSelection={handleCheckboxSelection}
    />
  );
};`;

export const getEmployeeHeaders = (): IHeader<Employee>[] => [
  {
    key: 'row-selection',
    caption: '',
    width: 50,
    hideHeaderAction: true,
    hideFilter: {
      sort: true,
      search: true,
      filterSelection: true,
      filterAdvance: true,
    },
  },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
  { key: 'company', caption: 'Company', width: 200 },
  { key: 'position', caption: 'Position', width: 180 },
  { key: 'phone', caption: 'Phone', width: 150 },
  { key: 'city', caption: 'City', width: 150 },
  { key: 'country', caption: 'Country', width: 120 },
  { key: 'department', caption: 'Department', width: 120 },
  { key: 'status', caption: 'Status', width: 100 },
  {
    key: 'salary',
    caption: 'Salary',
    width: 120,
    renderCell: (item) => `$${item.salary.toLocaleString()}`,
  },
];

export const generateSampleData = (): Employee[] => {
  return generateEmployeeData(50);
};
