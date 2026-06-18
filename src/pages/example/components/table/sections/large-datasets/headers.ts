import { IHeader } from '@knittotextile/react-ui';
import { EmployeeData } from '@/lib/variables/table-sample';

export const getEmployeeHeaders = (): IHeader<EmployeeData>[] => [
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Name', width: 200, freeze: 'left' },
  { key: 'email', caption: 'Email', width: 250 },
  { key: 'phone', caption: 'Phone', width: 150 },
  { key: 'department', caption: 'Department', width: 150 },
  { key: 'position', caption: 'Position', width: 180 },
  {
    key: 'salary',
    caption: 'Salary',
    width: 120,
    renderCell: (item) => `$${item.salary.toLocaleString()}`,
  },
  { key: 'startDate', caption: 'Start Date', width: 120 },
  { key: 'performance', caption: 'Rating', width: 100 },
  { key: 'manager', caption: 'Manager', width: 180 },
  { key: 'location', caption: 'Location', width: 150 },
  { key: 'country', caption: 'Country', width: 120 },
  { key: 'status', caption: 'Status', width: 120, freeze: 'right' },
];
