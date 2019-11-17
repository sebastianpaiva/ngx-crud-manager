import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export interface ICRUDService {
  index?: (search?: string, page?: number, ...path) => Observable<HttpResponse<PagedResponse | any>>;
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
