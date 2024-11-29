interface IResponseDataRepository {
    id: number;
    created_date:string;
    name:string;
    url:string;
    status:string;
}

interface IResponseDataEnvironment {
    id: number;
    created_date:string;
    catatan_env:string;
    nama_env:string;
    value_env:string;
    nama_cabang:string;
    nama_variant:string;
    script:string;
}
interface IResponseDataRepository {
    id: number;
    created_date:string;
    name:string;
    url:string;
    status:string;
}

interface IResponseDataBranch {
    id: number;
    created_date: string;
    nama: string;
    ip_address: string;
    credential_id: string;
    tipe_cabang: string;
}
