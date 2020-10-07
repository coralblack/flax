/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {AxiosResponse, ResponseType} from 'axios';
import LRU from 'lru-cache';
import queryString from 'query-string';
import {MutableRefObject} from 'react';

const cache = new LRU({max: 100, maxAge: 1000 * 60 * 10});

type QueryType = string | number | boolean;
type Queries = {[key: string]: QueryType | QueryType[]};
type Headers = {[key: string]: string};
type DataTypeValues = string | number | boolean | null;
type DataType = {
  [key: string]: DataTypeValues | MutableRefObject<HTMLElement> | DataType;
};
type Data = DataType | (() => DataType) | string;

export interface FxApiRequest {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  url: string;
  cacheMaxAge?: number;
  throttle?: boolean;
  delay?: number;
  responseType?: ResponseType;
  query?: Queries;
  headers?: Headers;
  data?: Data;
}

interface RequestProps extends FxApiRequest {
  refreshId?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Resolver = (data: any) => void;
type Rejector = (reason: Error) => void;

const resolvers: {
  [key: string]: Array<{resolve: Resolver; reject: Rejector}>;
} = {};
const resolver = (
  resolver: {resolve: Resolver; reject: Rejector},
  key: string | null,
  resp: AxiosResponse | null,
  error: Error | null
) => {
  if (!key) {
    if (error) {
      resolver.reject(error);
    } else {
      resolver.resolve({data: resp?.data, response: resp});
    }
    return;
  }

  const res = resolvers[key].splice(0, resolvers[key].length);

  res.forEach(({resolve, reject}) => {
    if (error) {
      reject(error);
    } else {
      resolve({data: resp?.data, response: resp});
    }
  });
};

const dataMapper = (data: DataType | string | null | undefined) => {
  if (!data) return data;
  if (typeof data !== 'object') return data;

  return Object.keys(data).reduce<{[key: string]: any}>((p, c) => {
    if (typeof data[c] === 'object') {
      if ((data[c] as any).current instanceof HTMLElement) {
        p[c] = (data[c] as any).current.value;
      } else {
        p[c] = dataMapper(data[c] as any);
      }
    } else {
      p[c] = data[c];
    }
    return p;
  }, {});
};

export type FxResp<T> = {data: T; response: AxiosResponse};

export function request<T>(props: RequestProps): Promise<FxResp<T>> {
  return new Promise<FxResp<T>>((resolve, reject) => {
    setTimeout(() => {
      const url = ((u, query) => {
        const qs = queryString.stringify(query);
        return u + (qs ? (u.includes('?') ? '&' : '?') + qs : '');
      })(props.url, props.query || {});

      const cacheKey =
        props.method === 'GET' && props.cacheMaxAge && props.cacheMaxAge > 0
          ? ''
          : null;
      const cached = cacheKey && cache.get(cacheKey);
      const lazyGroup =
        props.method === 'GET' && props.throttle
          ? `${props.method} ${url}`
          : null;

      if (lazyGroup) {
        resolvers[lazyGroup] = resolvers[lazyGroup] || [];
        resolvers[lazyGroup].push({resolve, reject});

        // Duplicated `GET` request,
        if (resolvers[lazyGroup].length > 1) {
          return;
        }
      }

      if (cached) {
        resolve(cached);
        return;
      }

      const start = new Date().getTime();

      axios
        .request<T>({
          method: props.method,
          url,
          headers: props.headers,
          responseType: props.responseType,
          data: dataMapper(
            typeof props.data === 'function' ? props.data() : props.data
          ),
        })
        .then(resp => {
          const delay = (props.delay || 0) - (new Date().getTime() - start);

          setTimeout(() => {
            resolver({resolve, reject}, lazyGroup, resp, null);
          }, Math.max(0, delay));
        })
        .catch(err => {
          resolver({resolve, reject}, lazyGroup, null, err);
        });
    }, 25);
  });
}
