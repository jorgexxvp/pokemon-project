import type { AxiosError, AxiosHeaders } from 'axios';
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useLoginStore } from '../zustand/useLoginStore';
import { ROUTE_HOME, ROUTE_LOGIN, URL_HOST } from '../..';

class Api {
  protected api: AxiosInstance;

  public constructor(config?: AxiosRequestConfig) {
    this.api = axios.create(config);
  }

  protected get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.get(url, config);
  }

  protected post<T, P = unknown, R = AxiosResponse<T>>(
    url: string,
    params?: P,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.post(url, params, config);
  }

  protected patch<T, D = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.patch<T, R>(url, data, config);
  }
  protected put<T, D = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.put<T, R>(url, data, config);
  }

  protected delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.api.delete<T, R>(url, config);
  }

  protected success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}

export class PublicApi extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super({
      ...config,
    });

    this.api.interceptors.request.use(
      async (param: InternalAxiosRequestConfig) => {
        return {
          ...param,
          url: param.url,
        };
      },
    );

    this.api.interceptors.response.use(
      (response) => response,
      (err: AxiosError) => {
        return Promise.reject(err);
      },
    );
  }
}

export class PrivateApi extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super({
      ...config,
    });

    const name = useLoginStore.getState().name;

    const LOGIN_URL = `${URL_HOST}${ROUTE_LOGIN}`;

    if (!name && window.location.pathname !== ROUTE_LOGIN) {
      window.location.href = LOGIN_URL;
    }

    this.api.interceptors.request.use((param: InternalAxiosRequestConfig) => {
      param.headers = {
        ...param.headers,
      } as unknown as AxiosHeaders;
      return param;
    });

    // this.api.interceptors.response.use(
    //   (response) => response,
    //   (err: AxiosError) => {
    //     console.log(err);
    //     if (err.response) {
    //       if (err.response.status === 401) {
    //         useLoginStore.getState().logout();
    //       }
    //     } else {
    //       window.location.href = '/';
    //     }
    //     return Promise.reject(err);
    //   },
    // );
  }
}
