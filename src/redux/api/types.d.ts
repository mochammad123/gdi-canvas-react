interface IResponse<T = null> {
  message: string;
  result: T;
}

interface ISuccessMessage {
  message: string;
}

interface BasicParameter {
  search?: string;
  perPage: number;
  page: number;
}

interface ResponseWithPaginate<TData = any> {
  data: TData;
  paginate: {
    page: number;
    perPage: number;
    totalItem: number;
    totalPage: number;
  };
}

declare namespace AuthApi {
  interface ResponseLogin {
    token: string;
  }
  interface PayloadLogin {
    username: string;
    password: string;
  }
  interface Me {
    id: number;
    username: string;
    fullname: string;
  }
}

declare namespace RepositoryApi {
  interface ResponseGetRepository
    extends ResponseWithPaginate<{
      id: number;
      create_date: string;
      name: string;
      url: string;
      app_port: number;
      app_path: string;
      status_aktif: string;
    }> {}

  interface ResponseLastFetch {
    last_fetch_repo: string;
    last_fetch_repo_epoch_time: string;
  }
}

declare namespace EnvApi {
  interface ResponseGetEnv
    extends ResponseWithPaginate<{
      id: number;
      create_date: string;
      catatan_env: string;
      nama_env: string;
      value_env: string;
      nama_cabang: string;
      nama_variabel: string;
      script: string;
    }> {}
}

declare namespace BranchApi {
  interface ResponseGetBranch
    extends ResponseWithPaginate<{
      id: number;
      create_date: string;
      name: string;
      ip_address: string;
      credentialid: string;
      tipe_cabang: string;
    }> {}
}

declare namespace JobApi {
  interface ResponseGetJob
    extends ResponseWithPaginate<{
      id: number;
      create_date: string;
      name: string;
      cabang: string;
      branch: string;
      app_port: number;
      app_path: string;
      jenis_server: string;
      url_repo: string;
      tipe_runtime: string;
      job_name: string;
      status_last_build: string;
      nama_cabang: string;
    }> {}

  interface PayloadCreateJob {
    name: string;
    branch: string;
    app_port: number;
    app_path: string;
    jenis_server: string;
    tipe_runtime_pipeline: string;
    url_repo: string;
    cabang: number[];
    env: number[];
  }

  interface ResponseGetEnvByJobId
    extends ResponseWithPaginate<{
      id: number;
    }> {}

  interface ResponseGetComboBoxBranch {
    id: number;
    create_date: string;
    name: string;
    ip_address: string;
    credentialid: string;
    tipe_cabang: string;
  }
  interface ParameterGetEnvByJobId extends Omit<BasicParameter, 'search'> {
    id?: number;
  }
}

declare namespace JobGroupApi {
  interface ResponseGetJobGroup
    extends ResponseWithPaginate<{
      id: number;
      create_date: string;
      nama_job: string;
      catatan: string;
    }> {}

  interface PayloadCreateJobGroup {
    name: string;
    jobs: number[];
  }

  interface ResponseGetDetailJobGroupById
    extends ResponseWithPaginate<
      JobApi.ResponseGetJob['data'] & {
        id_group: number;
      }
    > {}

  interface ParameterGetDetailJobGroupById extends Omit<BasicParameter, 'search'> {
    id?: number;
  }
}

declare namespace ComboBoxApi {
  interface ResponseGetComboBoxRepoBranch {
    id: number;
    name: string;
    branch_tipe: string;
  }
  interface ResponseGetComboBoxBranchName {
    id: number;
    name: string;
  }

  interface ResponseGetComboBoxEnv {
    id: number;
    create_date: string;
    catatan_env: string;
    nama_env: string;
    value_env: string;
    nama_cabang: string;
    nama_variabel: string;
    script: string;
  }

  interface ResponseGetComboBoxRepository {
    id: number;
    name: string;
    url: string;
  }
}

declare namespace HistoryJobApi {
  interface ResponseGetHistoryJob
    extends ResponseWithPaginate<{
      id: number;
      create_date: string;
      jenis_job: string;
      jenis_transaksi?: any;
      id_user: number;
      nama_job: string;
      fullname: string;
    }> {}

  interface ParameterHistoryJob extends BasicParameter {
    tanggal_awal: string;
    tanggal_akhir: string;
  }
}
