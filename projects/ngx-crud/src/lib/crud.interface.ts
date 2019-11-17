import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export interface ICRUDService {
  index?: (search?: string, page?: number, ...path) => Observable<HttpResponse<PagedResponse | any>>;
  get?: (id: number, ...path) => Observable<HttpResponse<any>>;
  create?: (value: any, ...path) => Observable<HttpResponse<any>>;
  update?: (id: number, value: any, ...path) => Observable<HttpResponse<any>>;
  destroy?: (id: number, ...path) => Observable<HttpResponse<any>>;
  restore?: (id: number, ...path) => Observable<HttpResponse<any>>;
  clone?: (id: number, ...path) => Observable<HttpResponse<any>>;
  import?: (items: any[], ...path) => Observable<HttpResponse<any | any[]>>;
  swap?: (orderedIds) => Observable<HttpResponse<any | any[]>>;
  model: string;
}

export interface PagedResponse {
  items: any[];
  page: number;
  total: number;
  total_pages: number;
}
