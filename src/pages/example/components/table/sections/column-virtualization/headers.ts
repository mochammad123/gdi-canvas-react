import { IHeader } from '@knittotextile/react-ui';
import { User } from '@/lib/variables/table-sample';

export const getVirtualizedHeaders = (): IHeader<User>[] => [
  // Freeze Left
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Name', width: 180, freeze: 'left' },

  // Scrollable columns (these will be virtualized)
  { key: 'email', caption: 'Email', width: 200 },
  { key: 'phone', caption: 'Phone', width: 150 },
  { key: 'company', caption: 'Company', width: 200 },
  { key: 'jobTitle', caption: 'Job Title', width: 180 },
  { key: 'department', caption: 'Department', width: 150 },
  { key: 'city', caption: 'City', width: 120 },
  { key: 'country', caption: 'Country', width: 120 },
  { key: 'joinDate', caption: 'Join Date', width: 120 },
  { key: 'experience', caption: 'Experience', width: 100 },
  { key: 'skills', caption: 'Skills', width: 150 },
  { key: 'username', caption: 'Username', width: 120 },

  // Freeze Right
  { key: 'salary', caption: 'Salary', width: 120, freeze: 'right' },
  { key: 'status', caption: 'Status', width: 100, freeze: 'right' },
];

export const getNonVirtualizedHeaders = (): IHeader<User>[] => [
  // Freeze Left
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Name', width: 180, freeze: 'left' },

  { key: 'email', caption: 'Email', width: 200 },
  { key: 'phone', caption: 'Phone', width: 150 },
  { key: 'username', caption: 'Username', width: 120 },

  { key: 'company', caption: 'Company', width: 200 },
  { key: 'jobTitle', caption: 'Job Title', width: 180 },
  { key: 'department', caption: 'Department', width: 150 },
  { key: 'joinDate', caption: 'Join Date', width: 120 },
  { key: 'experience', caption: 'Experience', width: 100 },
  { key: 'city', caption: 'City', width: 120 },
  { key: 'country', caption: 'Country', width: 120 },
  { key: 'salary', caption: 'Salary', width: 120, freeze: 'right' },
  { key: 'status', caption: 'Status', width: 100, freeze: 'right' },
];
