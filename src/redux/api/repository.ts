import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseService } from './_baseQuery';
import { BasicParameter, IResponse, RepositoryApi } from './types';

export const repositoryService = createApi({
  reducerPath: 'repositoryService',
  baseQuery: baseService(),
  endpoints: (build) => ({
    GetRepositoryFetch: build.query<IResponse<string>, void>({
      query: () => ({
        method: 'GET',
        url: '/repository/fetch',
      }),
    }),
    GetLastFetchRepository: build.query<IResponse<RepositoryApi.ResponseLastFetch>, void>({
      query: () => ({
        method: 'GET',
        url: '/repository/last-fetch',
      }),
    }),
    GetRepository: build.query<IResponse<RepositoryApi.ResponseGetRepository>, BasicParameter>({
      query: (params) => ({
        method: 'GET',
        url: '/repository',
        params,
      }),
    }),
  }),
});

export const { useLazyGetRepositoryFetchQuery, useGetRepositoryQuery, useLazyGetLastFetchRepositoryQuery } = repositoryService;
