import Button from '@/components/Button';
import { CardDataTableContainer } from '@/components/Container';
import { InputSearch } from '@/components/Input';
import KNUI from '@/components/KNUI';
import Pagination, { DataPerPageTable } from '@/components/Pagination';
import Title from '@/components/Title';
import { useLastFetchRepository, useParams, useResponseData } from '@/lib/hooks';
import { KNUI_LABEL } from '@/lib/variables/constants';
import { useGetEnvQuery } from '@/redux/api/env';
import { EnvApi } from '@/redux/api/types';
import TableEnvironment from './components/TableEnvironment';

export default function DataEnvironmentPage() {
  const { search, setSearch, setPage, perPage, page, setPerPage, onNextPrev } = useParams();
  const { data, isLoading, isFetching, refetch } = useGetEnvQuery({ search, perPage, page });
  const { dataSource, paginate } = useResponseData<EnvApi.ResponseGetEnv["data"][]>(data);
  const { lastFetchRepo } = useLastFetchRepository();

  return (
    <>
      <section className="py-[1.25rem] relative">
        <CardDataTableContainer className="max-w-[75.375rem] mx-auto flex flex-col gap-y-[.625rem]">
          <div className="flex justify-between items-center">
            <Title
              text={
                <>
                  List Env {lastFetchRepo && <span className="font-normal">(terakhir di-fetch: {lastFetchRepo})</span>}
                </>
              }
            />
            <Button disabled={isFetching} className="!w-[5.375rem] shrink-0 !h-[2.3125rem] flex justify-center items-center" onClick={refetch}>Refresh</Button>
          </div>
          <InputSearch
            placeholder="Cari Env"
            className="w-[19.6875rem]"
            onChangeValue={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
          <TableEnvironment search={search} data={dataSource} isLoading={isFetching || isLoading} className="h-[60vh] overflow-auto" />
          <div className="flex justify-between items-end">
            <DataPerPageTable
              activePage={perPage}
              className="mt-[.625rem]"
              onClick={(page) => {
                setPage(1);
                setPerPage(page);
              }}
            />
            <Pagination currentPage={page} onNext={onNextPrev} onPrev={onNextPrev} onUpdatePage={setPage} totalPage={paginate?.totalPage} />
          </div>
        </CardDataTableContainer>
      </section>
    </>
  );
}
