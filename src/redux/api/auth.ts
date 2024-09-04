import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseService } from './_baseQuery';
import { AuthApi, IResponse } from './types';

export const authService = createApi({
  reducerPath: 'authService',
  baseQuery: baseService(),
  endpoints: (build) => ({
    authLogin: build.mutation<IResponse<AuthApi.ResponseLogin>, AuthApi.PayloadLogin>({
      query: (payload) => ({
        method: 'POST',
        url: '/auth/login',
        body: payload,
      }),
    }),
    authMe: build.query<IResponse<AuthApi.Me>, void>({
      query: () => ({
        method: 'GET',
        url: '/auth/me',
      }),
    }),
  }),
});

export const { useAuthLoginMutation, useAuthMeQuery } = authService;
