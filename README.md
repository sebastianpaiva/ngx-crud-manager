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

### Creating your first CRUD Service

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

### Adding the interface to a component

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

### Adding a custom form

Using ReactiveForms we create a new Form with our required fields

**app.component.ts**

```
export class AppComponent {
  formGroup = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  constructor(
    public itemService: ItemService,
    private fb: FormBuilder,
  ) {

  }
}
```

Then we add our form template to the component and setup our crud manager **formTemplate** and **formGroup** values

**app.component.html**

```
<ngx-crud-manager [service]="itemService" [formTemplate]="formTemplate" [formGroup]="formGroup"></ngx-crud-manager>

<ng-template #formTemplate let-form="form">
  <form [formGroup]="form">
    <mat-form-field>
      <input matInput type="text" placeholder="Item Name" required formControlName="name" name="name">
    </mat-form-field>
  </form>
</ng-template>
```

### Setting a custom list item display

We create a item template and setup it in the crud manager

```
<ng-template #itemTemplate let-item>
  <span>{{item.id}} - {{item.name}}</span>
</ng-template>
<ngx-crud-manager [service]="itemService" [itemTemplate]="itemTemplate"></ngx-crud-manager>
```

### Nested Routes

If you have routes like /collection/:id/items you can add arguments to the manager

app.component.html
```
<ngx-crud-manager [service]="itemService" [formTemplate]="formTemplate" [formGroup]="formGroup" [args]=[collection.id]></ngx-crud-manager>
```

CRUD Manager with call your service with aditional arguments

item.service.ts
```
create(value,collection_id) {
    return this.http.post(this.apiUrl + 'collection/'+collection_id+'/items', {
      item: value
    }, SetupParams());
  }
```

You can use this to add custom params

app.component.html
```
<ngx-crud-manager [service]="itemService" [formTemplate]="formTemplate" [formGroup]="formGroup" [args]=[collection.id,{token: token}]></ngx-crud-manager>
```
item.service.ts
```
create(value,collection_id,params) {
    return this.http.post(this.apiUrl + 'collection/'+collection_id+'/items', {
      item: value
    }, SetupParams(params));
  }
```

## Demo

You can use the manager [here](https://ngx-crud-manager.firebaseapp.com)

### Feel free to fork and improve this.








