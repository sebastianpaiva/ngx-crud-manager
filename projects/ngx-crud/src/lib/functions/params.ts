import {HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseOptions} from '../crud.interface';

export function SetupParams(addParams?): BaseOptions {
  const headers = new HttpHeaders();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  const paramsObject = {
  };
  for (const key in addParams) {
    if (key && addParams[key]) {
      paramsObject[key] = addParams[key];
    }
  }
  const params = new HttpParams({fromObject: paramsObject});
  const options: BaseOptions = {
    headers,
    observe: 'response',
    responseType: 'json',
    reportProgress: false,
    params
  };
  return options;
}
