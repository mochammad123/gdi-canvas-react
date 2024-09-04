import { EmptyDataTable } from '@/components/Empty';
import { ShimmerTableRows } from '@/components/Shimmer/ShimmerTable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { useSortData } from '@/lib/hooks';
import { RepositoryApi } from '@/redux/api/types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function TableRepository({
  className,
  data,
  isLoading,
  search
}: {
  search: string,
  className?: string;
  data: RepositoryApi.ResponseGetRepository["data"][];
  isLoading: boolean;
}) {
  const { data: dataSorted, registerSort } = useSortData({
    data,
  });

  return (
    <>
      <div className={clsx('relative', className)}>
        <Table className="table-admin stripped-rows sticky-header table-hover">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[6.625rem]" {...registerSort("id")}>Id</TableHead>
              <TableHead className="w-[10.5rem]" {...registerSort("create_date")}>Create Date</TableHead>
              <TableHead className="w-[10.625rem]" {...registerSort("name")}>Name</TableHead>
              <TableHead className="w-[33.4375rem]" {...registerSort("url")}>Url</TableHead>
              <TableHead className="w-[10.4375rem]" {...registerSort("status_aktif")}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <ShimmerTableRows cells={5} rows={20} />
            ) : !dataSorted.length ? (
              <EmptyDataTable colSpan={5} searched={search} />
            ) : (
              dataSorted.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.create_date}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Link target='_blank' className='text-link' to={item.url}>{item.url}</Link>
                  </TableCell>
                  <TableCell>{item.status_aktif}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
