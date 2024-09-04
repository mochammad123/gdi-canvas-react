import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query/react";
export type TEndpointBuilder<TName> = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    object,
    FetchBaseQueryMeta
  >,
  never,
  TName
>;

export interface IResponse<T> {
  status: number;
  values: T & { status?: string; message?: string };
}

export interface ISuccessMessage {
  message: string;
}

export interface IResponseSuccesfully extends IResponse<{ message: string }> {}

export interface IError {
  status: string;
}
