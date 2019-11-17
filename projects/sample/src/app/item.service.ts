import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SetupParams} from '../../../ngx-crud/src/lib/functions/params';
import {ICRUDService} from '../../../ngx-crud/src/lib/crud.interface';


@Injectable({
  providedIn: 'root'
})
export class ItemService implements ICRUDService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {

  }
  index(value = null, page = 1) {
    return this.http.get(this.apiUrl + '/items', SetupParams({search: value, page}));
  }
  create(value) {
    return this.http.post(this.apiUrl + '/items', {
      item: value
    }, SetupParams());
  }
  update(id, value) {
    return this.http.put(this.apiUrl + '/items', {
      item: value
    }, SetupParams());
  }
  destroy(id) {
    return this.http.delete(this.apiUrl + '/items/' + id, SetupParams());
  }
  restore(id) {
    return this.http.delete(this.apiUrl + '/items/' + id + '/restore', SetupParams());
  }
}
