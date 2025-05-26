import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { memo, useState } from 'react';
import ContentExampleCode from '../content-example-code';
import ToggleShowCode from '../toggle-show-code';
import { generateTableFilterOptions } from '@/components/ui/table-virtual/utils';
import { Typography } from '@/components/ui/typhography';
import TextCode from './text-code';

interface IDataSource {
  [key: string]: string | number;
}

const headers = [
  {
    key: 'bulan',
    caption: 'Bulan',
  },
  {
    key: 'cabang',
    caption: 'Cabang',
  },
  {
    key: 'penjualan_OpenB_frequensi_CloseB',
    caption: 'Penjualan (frequensi)',
    table: [
      {
        key: 'jmlrollan',
        caption: 'Rollan',
      },
      {
        key: 'jmlkgandiatas5',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'jmlkgandibawah5',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'jmlaksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'jmltotal',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'penjualan_OpenB_kg_CloseB',
    caption: 'Penjualan (kg)',
    table: [
      {
        key: 'rollan',
        caption: 'Rollan',
      },
      {
        key: 'kgandiatas5',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'kgandibawah5',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'aksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'total',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'penjualan_OpenB_rupiah_CloseB',
    caption: 'Penjualan (rupiah)',
    table: [
      {
        key: 'rollanuang',
        caption: 'Rollan',
      },
      {
        key: 'kgandiatas5uang',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'kgandibawah5uang',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'aksesorisuang',
        caption: 'Aksesoris',
      },
      {
        key: 'totaluang',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'ratio_OpenB_frequensi_CloseB',
    caption: 'Ratio (frequensi)',
    table: [
      {
        key: 'ratioFrequensiRollan',
        caption: 'Rollan',
      },
      {
        key: 'ratioFrequensiLebih5kg',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'ratioFrequensiKurang5Kg',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'ratioFrequensiAksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'ratioFrequensiTotal',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'ratio_OpenB_kg_CloseB',
    caption: 'Ratio (kg)',
    table: [
      {
        key: 'ratioKgRollan',
        caption: 'Rollan',
      },
      {
        key: 'ratioKgLebih5kg',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'ratioKgKurang5Kg',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'ratioKgAksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'ratioKgTotal',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'ratio_OpenB_rupiah_CloseB',
    caption: 'Ratio (rupiah)',
    table: [
      {
        key: 'ratioRupiahRollan',
        caption: 'Rollan',
      },
      {
        key: 'ratioRupiahLebih5kg',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'ratioRupiahKurang5Kg',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'ratioRupiahAksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'ratioRupiahTotal',
        caption: 'Total',
      },
    ],
  },
];

const dataSource: IDataSource[] = [
  {
    bulan: '2025-02-01',
    cabang: 'HOLIS',
    jmlrollan: 111,
    jmlkgandiatas5: 0,
    jmlkgandibawah5: 353,
    jmlaksesoris: 101,
    jmltotal: 565,
    rollan: 2775,
    kgandiatas5: 0,
    kgandibawah5: 246.58,
    aksesoris: 210.64,
    total: 3232.22,
    rollanuang: 265837500,
    kgandiatas5uang: 0,
    kgandibawah5uang: 8717135,
    aksesorisuang: 23240150,
    totaluang: 297794785,
    ratioFrequensiRollan: '19.65%',
    ratioFrequensiLebih5kg: '0.00%',
    ratioFrequensiKurang5Kg: '62.48%',
    ratioFrequensiAksesoris: '17.88%',
    ratioFrequensiTotal: '100.00%',
    ratioKgRollan: '85.85%',
    ratioKgLebih5kg: '0.00%',
    ratioKgKurang5Kg: '7.63%',
    ratioKgAksesoris: '6.52%',
    ratioKgTotal: '100.00%',
    ratioRupiahRollan: '89.27%',
    ratioRupiahLebih5kg: '0.00%',
    ratioRupiahKurang5Kg: '2.93%',
    ratioRupiahAksesoris: '7.80%',
    ratioRupiahTotal: '100.00%',
  },
  {
    bulan: '2025-03-01',
    cabang: 'HOLIS',
    jmlrollan: 77,
    jmlkgandiatas5: 4,
    jmlkgandibawah5: 397,
    jmlaksesoris: 49,
    jmltotal: 527,
    rollan: 1914.35,
    kgandiatas5: 39,
    kgandibawah5: 285.55,
    aksesoris: 569.04,
    total: 2807.94,
    rollanuang: 128417150.12,
    kgandiatas5uang: 4955440.05,
    kgandibawah5uang: 6286985.0048,
    aksesorisuang: 68213395,
    totaluang: 207872970.1748,
    ratioFrequensiRollan: '14.61%',
    ratioFrequensiLebih5kg: '0.76%',
    ratioFrequensiKurang5Kg: '75.33%',
    ratioFrequensiAksesoris: '9.30%',
    ratioFrequensiTotal: '100.00%',
    ratioKgRollan: '68.18%',
    ratioKgLebih5kg: '1.39%',
    ratioKgKurang5Kg: '10.17%',
    ratioKgAksesoris: '20.27%',
    ratioKgTotal: '100.00%',
    ratioRupiahRollan: '61.78%',
    ratioRupiahLebih5kg: '2.38%',
    ratioRupiahKurang5Kg: '3.02%',
    ratioRupiahAksesoris: '32.81%',
    ratioRupiahTotal: '100.00%',
  },
  {
    bulan: '2025-04-01',
    cabang: 'HOLIS',
    jmlrollan: 16,
    jmlkgandiatas5: 0,
    jmlkgandibawah5: 41,
    jmlaksesoris: 2,
    jmltotal: 59,
    rollan: 400,
    kgandiatas5: 0,
    kgandibawah5: 43.77,
    aksesoris: 4.67,
    total: 448.44,
    rollanuang: 40775000,
    kgandiatas5uang: 0,
    kgandibawah5uang: 4624905,
    aksesorisuang: 407690,
    totaluang: 45807595,
    ratioFrequensiRollan: '27.12%',
    ratioFrequensiLebih5kg: '0.00%',
    ratioFrequensiKurang5Kg: '69.49%',
    ratioFrequensiAksesoris: '3.39%',
    ratioFrequensiTotal: '100.00%',
    ratioKgRollan: '89.20%',
    ratioKgLebih5kg: '0.00%',
    ratioKgKurang5Kg: '9.76%',
    ratioKgAksesoris: '1.04%',
    ratioKgTotal: '100.00%',
    ratioRupiahRollan: '89.01%',
    ratioRupiahLebih5kg: '0.00%',
    ratioRupiahKurang5Kg: '10.10%',
    ratioRupiahAksesoris: '0.89%',
    ratioRupiahTotal: '100.00%',
  },
];

const TableSubHeader = () => {
  const [show, setShow] = useState<boolean>(false);

  const dataHeaders = headers?.map(({ key, caption, table }) => {
    const typedKey = key as keyof IDataSource;

    return {
      key: typedKey,
      caption,
      filterOptions: generateTableFilterOptions(dataSource, typedKey),
      useSearch: true,
      useFilter: true,
      fixedWidth: 170,
      children: table?.map(({ key: subKey, caption: subCaption }) => {
        const subTypedKey = subKey as keyof IDataSource;
        return {
          key: subTypedKey,
          caption: subCaption,
          filterOptions: generateTableFilterOptions(dataSource, subTypedKey),
          useSearch: true,
          useFilter: true,
          fixedWidth: 170,
        };
      }) as ITableVirtual<IDataSource>['headers'],
    };
  }) as ITableVirtual<IDataSource>['headers'];

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Tambah properti <TextCode text="children" /> pada Header. Lihat pada contoh kode dibawah untuk lebih detail.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="w-full h-[25rem]">
        <TableVirtual headerModel="single-row" stickyHeaderHeight={36} headers={dataHeaders} dataSource={dataSource} />
      </div>
      <ContentExampleCode show={show} code={StandarSingleRowExample} />
    </>
  );
};

export default memo(TableSubHeader);

export const StandarSingleRowExample = `
import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { generateTableFilterOptions } from '@/components/ui/table-virtual/utils';

interface IDataSource {
  [key: string]: string | number;
}

const headers = [
  {
    key: 'bulan',
    caption: 'Bulan',
  },
  {
    key: 'cabang',
    caption: 'Cabang',
  },
  {
    key: 'penjualan_OpenB_frequensi_CloseB',
    caption: 'Penjualan (frequensi)',
    table: [
      {
        key: 'jmlrollan',
        caption: 'Rollan',
      },
      {
        key: 'jmlkgandiatas5',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'jmlkgandibawah5',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'jmlaksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'jmltotal',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'penjualan_OpenB_kg_CloseB',
    caption: 'Penjualan (kg)',
    table: [
      {
        key: 'rollan',
        caption: 'Rollan',
      },
      {
        key: 'kgandiatas5',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'kgandibawah5',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'aksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'total',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'penjualan_OpenB_rupiah_CloseB',
    caption: 'Penjualan (rupiah)',
    table: [
      {
        key: 'rollanuang',
        caption: 'Rollan',
      },
      {
        key: 'kgandiatas5uang',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'kgandibawah5uang',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'aksesorisuang',
        caption: 'Aksesoris',
      },
      {
        key: 'totaluang',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'ratio_OpenB_frequensi_CloseB',
    caption: 'Ratio (frequensi)',
    table: [
      {
        key: 'ratioFrequensiRollan',
        caption: 'Rollan',
      },
      {
        key: 'ratioFrequensiLebih5kg',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'ratioFrequensiKurang5Kg',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'ratioFrequensiAksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'ratioFrequensiTotal',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'ratio_OpenB_kg_CloseB',
    caption: 'Ratio (kg)',
    table: [
      {
        key: 'ratioKgRollan',
        caption: 'Rollan',
      },
      {
        key: 'ratioKgLebih5kg',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'ratioKgKurang5Kg',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'ratioKgAksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'ratioKgTotal',
        caption: 'Total',
      },
    ],
  },
  {
    key: 'ratio_OpenB_rupiah_CloseB',
    caption: 'Ratio (rupiah)',
    table: [
      {
        key: 'ratioRupiahRollan',
        caption: 'Rollan',
      },
      {
        key: 'ratioRupiahLebih5kg',
        caption: 'Kg - An > 5 Kg',
      },
      {
        key: 'ratioRupiahKurang5Kg',
        caption: 'Kg - An <= 5 Kg',
      },
      {
        key: 'ratioRupiahAksesoris',
        caption: 'Aksesoris',
      },
      {
        key: 'ratioRupiahTotal',
        caption: 'Total',
      },
    ],
  },
];

const dataSource: IDataSource[] = [
  {
    bulan: '2025-04-01',
    cabang: 'HOLIS',
    jmlrollan: 15,
    jmlkgandiatas5: 0,
    jmlkgandibawah5: 41,
    jmlaksesoris: 2,
    jmltotal: 58,
    rollan: 375,
    kgandiatas5: 0,
    kgandibawah5: 43.77,
    aksesoris: 4.67,
    total: 423.44,
    rollanuang: 40775000,
    kgandiatas5uang: 0,
    kgandibawah5uang: 4624905,
    aksesorisuang: 407690,
    totaluang: 45807595,
    ratioFrequensiRollan: '25.86%',
    ratioFrequensiLebih5kg: '0.00%',
    ratioFrequensiKurang5Kg: '70.69%',
    ratioFrequensiAksesoris: '3.45%',
    ratioFrequensiTotal: '100.00%',
    ratioKgRollan: '88.56%',
    ratioKgLebih5kg: '0.00%',
    ratioKgKurang5Kg: '10.34%',
    ratioKgAksesoris: '1.10%',
    ratioKgTotal: '100.00%',
    ratioRupiahRollan: '89.01%',
    ratioRupiahLebih5kg: '0.00%',
    ratioRupiahKurang5Kg: '10.10%',
    ratioRupiahAksesoris: '0.89%',
    ratioRupiahTotal: '100.00%',
  },
];

const TableSubHeader = () => {
  const [show, setShow] = useState<boolean>(false);

  const dataHeaders = headers?.map(({ key, caption, table }) => {
    const typedKey = key as keyof IDataSource;

    return {
      key: typedKey,
      caption,
      filterOptions: generateTableFilterOptions(dataSource, typedKey),
      useSearch: true,
      useFilter: true,
      fixedWidth: 170,
      children: table?.map(({ key: subKey, caption: subCaption }) => {
        const subTypedKey = subKey as keyof IDataSource;
        return {
          key: subTypedKey,
          caption: subCaption,
          filterOptions: generateTableFilterOptions(dataSource, subTypedKey),
          useSearch: true,
          useFilter: true,
          fixedWidth: 170,
        };
      }) as ITableVirtual<IDataSource>['headers'],
    };
  }) as ITableVirtual<IDataSource>['headers'];

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2"></div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="w-full h-[25rem]">
        <TableVirtual headerModel="single-row" stickyHeaderHeight={36} headers={dataHeaders} dataSource={dataSource} />
      </div>
      <ContentExampleCode show={show} code={StandarSingleRowExample} />
    </>
  );
};
`;
