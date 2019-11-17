# Material Crud Manager

## Description

Simple and Customizable Interface to List, Create, Edit, Delete, Restore, Swap, and Import Items.

[![Travis CI](https://travis-ci.org/sebastianpaiva/ngx-crud-manager.svg?branch=master)](https://travis-ci.org/sebastianpaiva/ngx-crud-manager)
[![Latest Stable Version](https://img.shields.io/npm/v/ngx-crud-manager.svg)](https://www.npmjs.com/package/ngx-crud-manager/core)
[![License](https://img.shields.io/npm/l/ngx-crud-manager.svg)](https://www.npmjs.com/package/ngx-crud-manager)
[![NPM Downloads](https://img.shields.io/npm/dm/ngx-crud-manager.svg)](https://www.npmjs.com/package/ngx-crud-manager)

# Usage
## Installation
Install package:

`
npm install --save ngx-crud-manager
`

Add Angular Material (skip if you already installed it):

`ng add @angular/material`

## Setup
Just import the module to your app.module.ts

```
imports: [
  ...
  NgxCrudModule
]
```

## Creating your first CRUD Service

In order to make our interface work with your api, you need to declare a service with the ICRUDService Methods.

The library also has a SetupParams function in order to make things easier for you.

Make sure you have HttpClientModule and RouterModule.forRoot() imported.

**item.service.ts**

```
@Injectable({
  providedIn: 'root'
})
export class ItemService implements ICRUDService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {

  }
  index(value = null, page = 1){
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
```

## Adding the interface to a component

**app.component.html**

```
<ngx-crud-manager [service]="itemService"></ngx-crud-manager>
```

**app.component.ts**

```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public itemService: ItemService){

  }
}
```




