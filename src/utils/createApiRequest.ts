import { compile } from 'path-to-regexp';
import { prependSymbolIfExists } from '@/utils/prependSymbolIfExists';

type CreateApiRequestArgs = {
  url: string;
  opts?: RequestInit;
};

type ApiRequestArgs<QueryParams = unknown, UrlParams = unknown> = {
  urlParams?: UrlParams;
  queryParams?: QueryParams;
};

export const compileApiUrl = (
  url: CreateApiRequestArgs['url'],
  urlParams?: ApiRequestArgs['urlParams'],
): string => {
  return url.includes(':')
    ? compile(url)(urlParams as Record<string, string>)
    : url;
};

export const createApiRequest = (baseUrl: string) => {
  return <Result, QueryParams, UrlParams>({
    url,
    opts,
  }: CreateApiRequestArgs) => {
    return async (
      params?: ApiRequestArgs<QueryParams, UrlParams>,
    ): Promise<Result> => {
      const resultUrl = [
        baseUrl,
        compileApiUrl(url, params?.urlParams),
        prependSymbolIfExists(
          '?',
          params?.queryParams
            ? new URLSearchParams(
                params?.queryParams as Record<string, string>,
              ).toString()
            : '',
        ),
      ].join('');

      const response = await fetch(resultUrl, opts);
      const result = await response.json();

      if (response.status < 400) {
        return result as Result;
      }

      const responseError = {
        type: 'Error',
        message: result.message || 'Something went wrong',
        data: result.data || '',
        code: result.code || '',
      };

      let error = new Error();
      error = { ...error, ...responseError };
      throw error;
    };
  };
};
