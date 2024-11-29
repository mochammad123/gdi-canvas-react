import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react';
type TEndpointBuilder<TName> = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
  never,
  TName
>;

interface IResponse<T> {
  status: number;
  values: T & { status?: string; message?: string };
}

interface ISuccessMessage {
  message: string;
}

interface IResponseSuccesfully extends IResponse<{ message: string }> {}

interface IError {
  status: string;
}
