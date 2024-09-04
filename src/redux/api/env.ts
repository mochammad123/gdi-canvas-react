import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseService } from './_baseQuery';
import { BasicParameter, IResponse } from './types';

export const envService = createApi({
  reducerPath: 'envService',
  baseQuery: baseService(),
  endpoints: (build) => ({
    GetEnv: build.query<IResponse<string>, BasicParameter>({
      query: (params) => ({
        method: 'GET',
        url: '/env',
        params
      }),
    }),
  }),
});

export const { useGetEnvQuery } = envService;
