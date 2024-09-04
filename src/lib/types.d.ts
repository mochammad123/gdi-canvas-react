export interface IuseModal<TModalName> {
  show?: boolean;
  modalName?: TModalName;
}

export interface IExcelColumnWidth {
  wch: number;
}

export interface IuseParams {
  search?: string;
  perPage?: number;
  page?: number;
  tanggal_awal?: string;
  tanggal_akhir?: string;
}
