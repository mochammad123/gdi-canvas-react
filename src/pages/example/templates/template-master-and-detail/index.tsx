import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ContainerInput from '@/components/ui/container/container-input';
import InputwithLabel from '@/components/ui/inputs/input-with-label';
import Label from '@/components/ui/label';
import Pagination from '@/components/ui/pagination';
import RadioWithLabel from '@/components/ui/radio/radio-with-label';
import { Select } from '@/components/ui/select';
import { IDataHeader } from '@/components/ui/table-virtual';
import TableVirtual from '@/components/ui/table-virtual/table-virtual';
import { Typography } from '@/components/ui/typhography';
import FeedbackError from '@/components/ui/typhography/feedback-error-input';
import { useParams } from '@/lib/hooks/hooks';
import { exportDataToExcel, generateColumnWidths } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import { Controller, FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { IDummyDataResponse, useResponseDataQuery } from '../hooks/use-response-data-query';

const formSchema = z.object({
  category: z.string().min(1, { message: 'Kategori wajib diisi' }),
  chemical: z.string().min(1, { message: 'Chemical wajib diisi' }),
  status: z.string().min(1, { message: 'Status wajib diisi' }),
});
type FormSchema = z.infer<typeof formSchema>;
export default function TemplateMasterAndDetail() {
  const { page, setPage, perPage, setPerPage, onNextPrev } = useParams();
  const {
    allData,
    header: headerMaster,
    data: dataMaster,
    totalData: totalDataMaster,
    perPage: currentPerPageMaster,
  } = useResponseDataQuery({ page: page || 1, perPage: perPage || 100 });
  const [selectedMasterDataId, setSelectedMasterDataId] = useState<number>(-1);
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      chemical: '',
      status: 'aktif',
    },
  });
  return (
    <section className="management-master-and-detail">
      <FormAdd className="sidebar" form={form} onSave={() => {}} />
      <MasterData
        className="master"
        header={headerMaster}
        data={dataMaster}
        totalData={totalDataMaster}
        page={page || 1}
        perPage={currentPerPageMaster}
        setPage={setPage}
        setPerPage={setPerPage}
        onNextPrev={onNextPrev}
        onExport={() => {
          const dataSet: unknown[] = [];
          Object.keys(allData).forEach((page) => {
            dataSet.push(...allData[+page]);
          });
          const columnWidths = generateColumnWidths(dataSet);
          const title = `Laporan Penjualan Semua (Master)`;

          exportDataToExcel(dataSet, title, 'Sheet 1', columnWidths);
        }}
        onClickHistory={() => navigate('/example/master-and-detail/history')}
        onClickRow={setSelectedMasterDataId}
      />
      <DetailData className="detail" selectedMasterDataId={selectedMasterDataId} />
    </section>
  );
}

const responseData: { value: number | string; label: string }[] = Array(50000)
  .fill(1)
  .map((_, index) => ({
    value: `${index + 1}`,
    label: `Chemical ${index + 1}`,
  }));

function FormAdd({ className, form, onSave }: { className: string; form: UseFormReturn<FormSchema>; onSave: (values: FormSchema) => void }) {
  return (
    <aside className={clsx('p-1 relative', className)}>
      <Card className="h-full sticky top-2">
        <CardContent className="p-3">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSave)} noValidate className="flex flex-col gap-y-3">
              <Controller
                control={form.control}
                name="category"
                render={({ field, formState: { errors } }) => (
                  <ContainerInput>
                    <InputwithLabel label="Nama Kategori*" placeholder="Tulis nama kategori" {...field} />
                    {errors.category?.message && <FeedbackError text={errors.category.message} />}
                  </ContainerInput>
                )}
              />

              <Controller
                control={form.control}
                name="chemical"
                render={({ field, formState: { errors } }) => (
                  <ContainerInput>
                    <Select
                      label="Chemical*"
                      options={responseData}
                      onChangeSingleOption={(value) => form.setValue('chemical', value as string)}
                      onResetSelection={() => form.setValue('chemical', '')}
                      placeHolder="Pilih Chemical"
                      {...field}
                    />
                    {errors.chemical?.message && <FeedbackError text={errors.chemical.message} />}
                  </ContainerInput>
                )}
              />

              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <ContainerInput>
                    <Label>Status</Label>
                    <div className="flex gap-x-4">
                      <RadioWithLabel label="Aktif" checked={field.value === 'aktif'} onChecked={() => form.setValue('status', 'aktif')} />
                      <RadioWithLabel
                        label="Tidak aktif"
                        checked={field.value === 'tidak aktif'}
                        onChecked={() => form.setValue('status', 'tidak aktif')}
                      />
                    </div>
                  </ContainerInput>
                )}
              />

              <div className="flex flex-col gap-y-2">
                <Button className="w-full flex items-center justify-center">Simpan</Button>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  Reset
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </aside>
  );
}

function MasterData({
  onExport,
  onClickHistory,
  onClickRow,
  className,
  page,
  setPage,
  setPerPage,
  onNextPrev,
  perPage,
  data,
  header,
  totalData,
}: {
  className: string;
  page: number;
  perPage: number;
  data: IDummyDataResponse[];
  header: IDataHeader<IDummyDataResponse>[];
  totalData: number;
  setPage: (page: number | null) => void;
  setPerPage: (page: number) => void;
  onNextPrev: (page: number) => void;
  onClickRow: (id: number) => void;
  onExport: () => void;
  onClickHistory: () => void;
}) {
  return (
    <div className={clsx('px-3 pt-4 bg-white shadow-md h-[320px]', className)}>
      <div className="flex justify-between items-center mb-2">
        <Typography as="global-strong">Master Kategori</Typography>
        <div className="flex gap-x-2">
          <Button size="sm" onClick={() => onExport()}>
            Export
          </Button>
          <Button size="sm" onClick={() => onClickHistory()}>
            History
          </Button>
        </div>
      </div>
      <div className="h-[200px] mb-2">
        <TableVirtual
          useAutoWidth
          headers={header}
          dataSource={data}
          stickyHeaderHeight={40}
          rowHeight={28}
          onClickRow={(data) => {
            onClickRow(data.name as number);
          }}
          renderActionCard={(data: unknown, _rowIndex) => {
            const selectedData = data as IDummyDataResponse;
            const actions = [
              {
                label: 'Edit',
                onClick: () => console.log('EDIT ==> ' + JSON.stringify(selectedData)),
              },
              {
                label: 'Hapus',
                onClick: () => console.log('HAPUS ==> ' + JSON.stringify(selectedData)),
              },
            ];

            return (
              <div className={clsx('shadow-lg w-[3.813rem] flex flex-col space-y-1')}>
                {actions.map(({ label, onClick }, idx) => (
                  <button
                    key={'table-action' + idx}
                    className="global-report-content text-start hover:bg-blue-950 hover:text-white py-1 pl-2 cursor-pointer"
                    onClick={onClick}
                  >
                    {label}
                  </button>
                ))}
              </div>
            );
          }}
        />
      </div>
      <Pagination
        page={page}
        onNext={onNextPrev}
        onPrev={onNextPrev}
        onApplyPage={setPage}
        perPage={perPage}
        totalData={totalData}
        onApplyPerPage={(page) => setPerPage(page)}
      />
    </div>
  );
}
function DetailData({ className, selectedMasterDataId }: { className: string; selectedMasterDataId: number | null }) {
  const { page, setPage, perPage, setPerPage, onNextPrev } = useParams();
  const {
    header,
    data,
    totalData,
    perPage: currentPerPage,
  } = useResponseDataQuery({ id: selectedMasterDataId || 0, page: page || 1, perPage: perPage || 100 });

  return (
    <div className={clsx('px-3 pt-4 bg-white shadow-md h-[400px] mt-1', className)}>
      <Typography as="global-strong">Detail Chemical</Typography>
      <div className="h-[300px] mt-2">
        <TableVirtual useAutoWidth headers={header} dataSource={selectedMasterDataId ? data : []} stickyHeaderHeight={40} rowHeight={28} />
      </div>
      <Pagination
        page={page}
        onNext={onNextPrev}
        onPrev={onNextPrev}
        onApplyPage={setPage}
        perPage={currentPerPage}
        totalData={totalData}
        onApplyPerPage={setPerPage}
      />
    </div>
  );
}
