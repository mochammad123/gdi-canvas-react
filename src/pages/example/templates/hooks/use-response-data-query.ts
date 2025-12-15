import { IHeader } from '@/components/ui/knitto-table';
import { useMemo } from 'react';

export type IDummyDataResponse = {
  id: number;
  name: string;
  category: string;
  chemical: string;
  active: string;
  data: number;
};
const responseData = (filter: { id?: number | string; currentPage: number; currentPerPage: number }) => {
  const { id, currentPage = 1, currentPerPage = 100 } = filter;
  let temp: Record<number, IDummyDataResponse[]> = {};
  let totalData = 1000;
  let totalPage = Math.ceil(totalData / currentPerPage);
  let counter = 1;
  Array(totalPage)
    .fill(1)
    .forEach((_, page) => {
      temp[page + 1] = Array(currentPerPage)
        .fill(1)
        .map((_, key) => {
          counter++;
          return {
            id: counter,
            name: `Name ${(key + 1) * (page + 1)}`,
            category: `Kategori ${page + 1}`,
            chemical: `Chemical ${page + 1}`,
            active: `${key % 2 === 0 ? 'Aktif' : 'Tidak aktif'}`,
            date: new Date().getTime(),
          };
        }) as unknown as IDummyDataResponse[];
    });

  if (id && Object.keys(temp).length) {
    const tempFilter = [] as IDummyDataResponse[];
    Object.keys(temp).forEach((_, page) => {
      const find = temp[page + 1].find((item) => {
        return item.name === id.toString();
      });
      if (find) {
        tempFilter.push(find);
      }
    });
    if (tempFilter.length) {
      const totalPageFilter = Math.ceil(tempFilter.length / currentPerPage);
      const tempData: Record<number, IDummyDataResponse[]> = {};

      Array(totalPageFilter)
        .fill(1)
        .forEach((page) => {
          tempData[+page] = tempFilter.slice(+page, +page * currentPerPage);
        });
      temp = tempData;
      totalPage = totalPageFilter;
      totalData = tempFilter.length;
    }
  }

  const header: IHeader<IDummyDataResponse>[] = [
    { key: 'name', caption: 'Nama' },
    { key: 'category', caption: 'Kategori' },
    { key: 'chemical', caption: 'Chemical' },
    { key: 'active', caption: 'Status' },
    { key: 'action', caption: '', width: 32, noStretch: true },
  ];

  return {
    header,
    data: temp[currentPage],
    allData: temp,
    totalData,
    totalPage,
    perPage: currentPerPage,
    page: currentPage,
  };
};
export function useResponseDataQuery({ page, perPage, id }: { page: number; perPage: number; id?: number | string }) {
  const data = useMemo(() => responseData({ id, currentPage: page, currentPerPage: perPage }), [id, page, perPage]);
  return data;
}
