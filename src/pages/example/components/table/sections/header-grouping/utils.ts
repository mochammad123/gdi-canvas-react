import { IHeader } from '@/components/ui/knitto-table';
import { generateUserData, User } from '@/lib/variables/table-sample';

export const generateUsers = (count: number): User[] => {
  return generateUserData(count);
};

export const getGroupedHeaders = (): IHeader<User>[] => [
  { key: 'id', caption: 'ID', width: 80, hideFilter: { search: true, filterSelection: true, filterAdvance: true } },
  { key: 'name', caption: 'Name', width: 200 },
  {
    // Penting: key group harus diawali dengan "group-header-"
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
  {
    key: 'salary',
    caption: 'Salary',
    width: 120,
    renderCell: (item: User) => `$${item.salary.toLocaleString()}`,
  },
];
