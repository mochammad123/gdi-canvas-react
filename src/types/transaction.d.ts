interface IResponseDataJob {
  id: number;
  created_date: string;
  nama: string;
  cabang: string;
  branch: string;
  app_port: string;
  app_path: string;
  url_repo: string;
  env: string;
}

interface IResponseDataJobGroup {
  id: number;
  created_date: string;
  nama: string;
}

interface IResponseSelectDataJob extends Omit<IResponseDataJob, 'env'> {}
