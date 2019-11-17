import {Observable} from 'rxjs';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

export interface ICRUDService {
  index?: (search?: string, page?: number, ...args) => Observable<HttpResponse<PagedResponse | any>>;
  get?: (id: number, ...args) => Observable<HttpResponse<any>>;
  create?: (value: any, ...args) => Observable<HttpResponse<any>>;
  update?: (id: number, value: any, ...args) => Observable<HttpResponse<any>>;
  destroy?: (id: number, ...args) => Observable<HttpResponse<any>>;
  restore?: (id: number, ...args) => Observable<HttpResponse<any>>;
  clone?: (id: number, ...args) => Observable<HttpResponse<any>>;
  import?: (items: any[], ...args) => Observable<HttpResponse<any | any[]>>;
  swap?: (orderedIds, ...args) => Observable<HttpResponse<any | any[]>>;
  model?: string;
}

export interface PagedResponse {
  items: any[];
  page: number;
  total: number;
  total_pages: number;
}
export interface BaseOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe: 'response';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
