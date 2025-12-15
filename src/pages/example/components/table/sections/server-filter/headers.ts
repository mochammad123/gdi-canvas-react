import { IHeader } from '@/components/ui/knitto-table';
import type { CombinedData } from './types';

export const getUserHeaders = (): IHeader<CombinedData>[] => [
  { key: 'id', caption: 'ID', width: 80 },
  {
    key: 'name',
    caption: 'Name',
    width: 180,
    filterSelectionOptions: ['Leanne Graham', 'Ervin Howell', 'Clementine Bauch', 'Patricia Lebsack'],
  },
  {
    key: 'username',
    caption: 'Username',
    width: 120,
    filterSelectionOptions: ['Bret', 'Antonette', 'Samantha', 'Karianne'],
  },
  { key: 'email', caption: 'Email', width: 200 },
  {
    key: 'phone',
    caption: 'Phone',
    width: 150,
    filterSelectionOptions: ['1-770-736-8031 x56442', '010-692-6593 x09125', '1-463-123-4447'],
  },
  {
    key: 'website',
    caption: 'Website',
    width: 120,
    filterSelectionOptions: ['hildegard.org', 'anastasia.net', 'ramiro.info', 'kale.biz'],
  },
  {
    key: 'address' as keyof CombinedData,
    caption: 'City',
    width: 120,
    filterSelectionOptions: ['Gwenborough', 'Wisokyburgh', 'McKenziehaven', 'South Elvis'],
    renderCell: (item) => item.address.city,
  },
  {
    key: 'company' as keyof CombinedData,
    caption: 'Company',
    width: 150,
    filterSelectionOptions: ['Romaguera-Crona', 'Deckow-Crist', 'Romaguera-Jacobson', 'Robel-Corkery'],
    renderCell: (item) => item.company.name,
  },
  {
    key: 'postCount',
    caption: 'Posts',
    width: 80,
  },
];
