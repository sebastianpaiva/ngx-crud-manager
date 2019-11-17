import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered items
let items = JSON.parse(localStorage.getItem('items')) || [{id: 1, name: 'Teclado'}];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/items') && method === 'GET':
          return getItems();
        case url.endsWith('/items') && method === 'POST':
          return createItem();
        case url.match(/\/items\/\d+$/) && method === 'DELETE':
          return deleteItem();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function createItem() {
      const item = body.item;
      item.id = items.length ? Math.max(...items.map(x => x.id)) + 1 : 1;
      items.push({id: item.id, name: item.name});
      localStorage.setItem('items', JSON.stringify(items));

      return ok(item);
    }

    function getItems() {
      return ok({
        items: [...items],
        page: 1,
        total_pages: 1,
        total: items.length
      });
    }

    function deleteItem() {
      items = items.filter(x => x.id !== idFromUrl());
      localStorage.setItem('items', JSON.stringify(items));
      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1],0);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
