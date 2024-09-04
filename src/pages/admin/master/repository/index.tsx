import Button from '@/components/Button';
import { CardDataTableContainer } from '@/components/Container';
import { InputSearch } from '@/components/Input';
import KNUI from '@/components/KNUI';
import Pagination, { DataPerPageTable } from '@/components/Pagination';
import Title from '@/components/Title';
import { useLastFetchRepository, useParams, useResponseData } from '@/lib/hooks';
import { KNUI_LABEL } from '@/lib/variables/constants';
import { useGetRepositoryQuery } from '@/redux/api/repository';
import { RepositoryApi } from '@/redux/api/types';
import TableRepository from './components/TableRepository';

export default function DataRepositoryPage() {
  const { search, setSearch, setPage, perPage, page, setPerPage, onNextPrev } = useParams();
  const { data, isLoading, isFetching } = useRepository({ search, perPage, page });
  const { dataSource, paginate } = useResponseData<RepositoryApi.ResponseGetRepository["data"][]>(data);
  const { lastFetchRepo, fetchLastRepository, isLoading: isLoadingLastFetchRepo } = useLastFetchRepository();

  return (
    <div className="relative pb-5">
      <section className="py-[1.25rem] relative">
        <CardDataTableContainer className="max-w-[75.375rem] mx-auto flex flex-col gap-y-[.625rem]">
          <div className="flex justify-between items-center">
            <Title
              text={
                <>
                  List Repository {lastFetchRepo && <span className="font-normal">(terakhir di-fetch: {lastFetchRepo})</span>}
                </>
              }
            />
            <Button
              isLoading={isLoadingLastFetchRepo}
              className="w-[6.75rem] py-[.5rem] flex justify-center items-center"
              onClick={() => fetchLastRepository()}>
              Fetch Data
            </Button>
          </div>
          <InputSearch
            placeholder="Cari repository"
            className="w-[19.6875rem]"
            onChangeValue={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
          <TableRepository search={search} data={dataSource} isLoading={isFetching || isLoading} className="h-[60vh] overflow-auto" />
          <div className="flex justify-between items-end">
            <DataPerPageTable
              activePage={perPage}
              className="mt-[.625rem]"
              onClick={(page) => {
                setPage(1);
                setPerPage(page);
              }}
            />
            <Pagination currentPage={page} onUpdatePage={setPage} totalPage={paginate?.totalPage} onNext={onNextPrev} onPrev={onNextPrev} />
          </div>
        </CardDataTableContainer>
      </section>
      <KNUI text={KNUI_LABEL.master.repository} />
    </div>
  );
}

function useRepository({ search, perPage, page }: { search: string; perPage: number; page: number }) {
  const { data, isLoading, isFetching } = useGetRepositoryQuery({
    search,
    perPage,
    page,
  });

  return {
    data,
    isLoading,
    isFetching,
  };
}
