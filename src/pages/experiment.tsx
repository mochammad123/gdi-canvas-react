import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { useMemo } from 'react';

interface IData {
  name: string;
  nama_depan: string;
  nama_belakang: string;
  email: string;
  age: number;
  age_1: number;
  age_2: number;
  isActive: boolean;
  createdAt: string;
  phone: string;
  address: string;
  city: string;
}

const dummyData: IData[] = Array.from({ length: 20 }).map((_, index) => ({
  name: `Name ${index}`,
  email: `email${index}@gmail.com`,
  age: index,
  isActive: index % 2 === 0,
  createdAt: new Date().toLocaleString(),
  phone: `08${index}-${index}-${index}`,
  address: `Alamat ${index}`,
  city: `Kota ${index}`,
  nama_depan: `Nama Depan ${index}`,
  nama_belakang: `Nama Belakang ${index}`,
  age_1: index,
  age_2: index + 1,
}));

export default function Experiment() {
  const headers = useMemo(() => {
    const commonHeaders: ITableVirtual<IData>['headers'] = [
      {
        key: 'name',
        caption: 'Nama',
        freezed: true,
        children: [
          { key: 'nama_depan', caption: 'Nama Depan' },
          { key: 'nama_belakang', caption: 'Nama Belakang' },
        ],
      },
      { key: 'email', caption: 'Email' },
      {
        key: 'age',
        caption: 'Umur',
        className: '!text-end',
        freezedRight: true,
        children: [
          { key: 'age_1', caption: 'Umur 1', fixedWidth: 140 },
          { key: 'age_2', caption: 'Umur 2', fixedWidth: 140 },
        ],
      },
      { key: 'isActive', caption: 'Aktif', render: (data) => (data?.isActive ? 'Active' : 'Inactive') },
      { key: 'createdAt', caption: 'Tanggal Daftar' },
      { key: 'phone', caption: 'No. Telepon' },
      { key: 'address', caption: 'Alamat', fixedWidth: 160, renderSummary: () => 'Total Alamat' },
      { key: 'city', caption: 'Kota', fixedWidth: 100 },
      { key: 'action', caption: '', fixedWidth: 32, freezedRight: true },
    ];

    return commonHeaders.map((header) => ({ ...header, useFilter: true, useSearch: true }));
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col p-5">
      <div className="w-[95%] h-[500px]">
        <TableVirtual
          useFooter
          headerModel="double-row"
          stickyHeaderHeight={32}
          headers={headers}
          dataSource={dummyData}
          onClickRow={(data, rowIndex) => console.log('On Click Row => ', { rowIndex, data })}
        />
      </div>
    </div>
  );
}
