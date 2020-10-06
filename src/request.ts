import axios, {AxiosResponse} from 'axios';
import LRU from 'lru-cache';
import queryString from 'query-string';

const cache = new LRU({max: 100, maxAge: 1000 * 60 * 10});

type QueryType = string | number | boolean;
type Query = {[key: string]: QueryType | QueryType[]};
export interface FxApiRequest {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  url: string;
  cacheMaxAge?: number;
  throttle?: boolean;
  delay?: number;
  query?: Query;
}

interface RequestProps extends FxApiRequest {
  count: number;
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

      setTimeout(() => {
        axios
          .request<T>({
            method: props.method,
            url,
          })
          .then(resp => {
            resolver({resolve, reject}, lazyGroup, resp, null);
          })
          .catch(err => {
            resolver({resolve, reject}, lazyGroup, null, err);
          });
      }, 25);
    }, props.delay || 0);
  });
}
