interface IuseModal<TModalName> {
  show?: boolean;
  modalName?: TModalName;
}

interface IExcelColumnWidth {
  wch: number;
}

interface IuseParams {
  search?: string;
  perPage?: number;
  page?: number;
  tanggal_awal?: string;
  tanggal_akhir?: string;
}
