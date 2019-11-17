# Material Crud Manager

## Description

Simple and Customizable Interface to List, Create, Edit, Delete, Restore, Swap, and Import Items.

[![Travis CI](https://travis-ci.org/sebastianpaiva/ngx-crud-manager.svg?branch=master)](https://travis-ci.org/sebastianpaiva/ngx-crud-manager)
[![Latest Stable Version](https://img.shields.io/npm/v/ngx-crud-manager.svg)](https://www.npmjs.com/package/ngx-crud-manager/core)
[![License](https://img.shields.io/npm/l/ngx-crud-manager.svg)](https://www.npmjs.com/package/ngx-crud-manager)
[![NPM Downloads](https://img.shields.io/npm/dm/ngx-crud-manager.svg)](https://www.npmjs.com/package/ngx-crud-manager)

# Usage
## Installation
Install:
```
npm install --save ngx-crud-manager
```

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

**item.service.ts**

```
@Injectable({
  providedIn: "root"
})
export class ItemService implements ICRUDService{
  apiUrl = "localhost:3000/api"
  constructor(private http:HttpClient) {
    
  }
  index(value = null,page = 1){
    return this.http.get(this.apiUrl+'/items',SetupParams({search: value, page: page}));
  }
  create(value){
    return this.http.post(this.apiUrl+'/items',{
      item: value
    },SetupParams());
  }
  update(id,value){
    return this.http.update(this.apiUrl+'/items',{
      item: value
    },SetupParams());
  }
  destroy(id){
    return this.http.delete(this.apiUrl+'/items/'+id,SetupParams());
  }
  restore(id){
    return this.http.delete(this.apiUrl+'/items/'+id+'/restore',SetupParams());
  }
```

## Adding the interface to a component

**items.component.html**

```

```




