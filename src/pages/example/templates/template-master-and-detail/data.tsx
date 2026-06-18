import { IHeader } from '@knittotextile/react-ui';
import { clsx } from 'clsx';

type IDummyData = {
  id: number;
  category: string;
  chemical: string;
  isActive: string;
};
export const headersMaster: IHeader<IDummyData>[] = [
  { key: 'category', caption: 'Kategori' },
  { key: 'category', caption: 'Kategori' },
  { key: 'chemical', caption: 'Chemical' },
  {
    key: 'isActive',
    caption: 'Aktif',
    renderCell: (data) => (
      <div className={clsx('w-max p-1 rounded text-xs text-white', data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70')}>
        {data?.isActive ? 'Active' : 'Inactive'}
      </div>
    ),
  },
];

export const dummyDataMaster: IDummyData[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  category: `Kategori ${index}`,
  chemical: `Chemical ${index}`,
  isActive: `${index % 2 === 0 ? 'Aktif' : 'Tidak aktif'}`,
}));
