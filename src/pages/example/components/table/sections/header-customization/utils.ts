import { IHeader } from '@/components/ui/knitto-table';
import { generateUserData, User } from '@/lib/variables/table-sample';

export const generateUsers = (count: number): User[] => {
  return generateUserData(count);
};

export const getUserHeaders = (cutColumn = false): IHeader<User>[] => [
  { key: 'id', caption: 'ID', width: 80, hideFilter: { search: true, filterSelection: true, filterAdvance: true } },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
  { key: 'company', caption: 'Company', width: 200 },
  { key: 'position', caption: 'Position', width: 180 },
  ...(!cutColumn
    ? [
        { key: 'phone', caption: 'Phone', width: 150 },
        { key: 'city', caption: 'City', width: 150 },
        { key: 'country', caption: 'Country', width: 120 },
        { key: 'salary', caption: 'Salary', width: 120, renderCell: (item: User) => `$${item.salary.toLocaleString()}` },
      ]
    : []),
];
