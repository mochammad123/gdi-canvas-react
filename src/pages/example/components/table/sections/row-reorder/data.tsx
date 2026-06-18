import { IHeader } from '@knittotextile/react-ui';
import { generateUserData, User } from '@/lib/variables/table-sample';

export const generateUsers = (count: number): User[] => generateUserData(count);

/**
 * Headers untuk row reorder.
 * @param reorderOnlyFromToggle - true: drag hanya dari kolom handle (wajib ada row-reorder), false: drag dari seluruh row
 */
export const getUserHeaders = (reorderOnlyFromToggle = false): IHeader<User>[] => [
  ...(reorderOnlyFromToggle
    ? [
        {
          key: 'row-reorder' as const,
          caption: '',
          width: 40,
          hideFilter: { sort: true, search: true, filterSelection: true, filterAdvance: true },
          hideHeaderAction: true,
          disableResizeColumn: true,
        },
      ]
    : []),
  { key: 'id', caption: 'ID', width: 80 },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
  { key: 'company', caption: 'Company', width: 200 },
  { key: 'position', caption: 'Position', width: 180 },
  { key: 'phone', caption: 'Phone', width: 150 },
  { key: 'city', caption: 'City', width: 150 },
  { key: 'country', caption: 'Country', width: 120 },
  { key: 'salary', caption: 'Salary', width: 120, renderCell: (item: User) => `$${item.salary.toLocaleString()}` },
];
