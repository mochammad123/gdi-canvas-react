import { EmptyDataTable } from "@/components/Empty";
import { ShimmerTableRows } from "@/components/Shimmer/ShimmerTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { useSortData } from "@/lib/hooks";
import { EnvApi } from "@/redux/api/types";
import clsx from "clsx";
import dayjs from "dayjs";

export default function TableEnvironment({
  className,
  data,
  isLoading,
  search,
}: {
  search?:string;
  className?: string;
  data: EnvApi.ResponseGetEnv["data"][];
  isLoading: boolean;
}) {

  const { data: dataSorted, fieldSorted, registerSort } = useSortData({
    data,
  });

  return (
    <>
      <div className={clsx("relative", className)}>
        <Table className="table-admin stripped-rows sticky-header table-hover">
          <TableHeader>
            <TableRow fieldSorted={fieldSorted}>
              <TableHead className="w-[6.625rem]" {...registerSort("id")}>Id</TableHead>
              <TableHead className="w-[10.5rem]" {...registerSort("create_date")}>Create Date</TableHead>
              <TableHead className="w-[9.375rem]" {...registerSort("catatan_env")}>Catatan Env</TableHead>
              <TableHead className="w-[10.0938rem]" {...registerSort("nama_env")}>Nama Env</TableHead>
              <TableHead className="w-[10.0938rem]" {...registerSort("value_env")}>Value Env</TableHead>
              <TableHead className="w-[9.1875rem]" {...registerSort("nama_cabang")}>Nama Cabang</TableHead>
              <TableHead className="w-[10.4375rem]" {...registerSort("nama_variabel")}>Nama Variant</TableHead>
              <TableHead className="w-[6.625rem]" {...registerSort("script")}>Script</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <ShimmerTableRows cells={8} rows={20} />
            ) : !dataSorted.length ? (
              <EmptyDataTable colSpan={8} searched={search} />
            ) : dataSorted.map((item, key) => (
              <TableRow key={key}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.create_date ? dayjs(item.create_date).format("YYYY-MM-DD HH:mm") : ""}</TableCell>
                <TableCell>{item.catatan_env}</TableCell>
                <TableCell>{item.nama_env}</TableCell>
                <TableCell>{item.value_env}</TableCell>
                <TableCell>{item.nama_cabang}</TableCell>
                <TableCell>{item.nama_variabel}</TableCell>
                <TableCell>{item.script}</TableCell>

              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </div>
    </>
  );
}
