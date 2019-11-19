import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {ICRUDService, PagedResponse} from './crud.interface';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {interval, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {NgxCrudImportComponent} from './ngx-crud-import/ngx-crud-import.component';
import {first} from 'rxjs/operators';
import {NgxCrudFormComponent} from './ngx-crud-form/ngx-crud-form.component';
// import {AngularFireDatabase} from '@angular/fire/database';
// import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'ngx-crud-manager',
  templateUrl: './ngx-crud.component.html',
  styleUrls: [
    './ngx-crud.component.styl',
    'styles/material.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {class: 'ngx-crud'}
})
export class NgxCrudComponent implements OnInit, OnDestroy {
  @ViewChild('infiniteScroll', {static: false}) infiniteScroll;
  @ViewChild('loadMore', {static: false}) loadMore;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() formTemplate: TemplateRef<any>;
  @Input() service: ICRUDService;
  @Input() items: any[];
  @Input() formGroup: FormGroup;
  @Input() clone = false;
  @Input() args: any[] = [];
  @Input() PAGE_SIZE = 25;
  @Output() back = new EventEmitter();
  error = false;
  loadingMore = false;
  canLoadMore = true;
  formArray: FormArray = new FormArray([]);
  formSearch: FormControl = new FormControl('');
  formSearchSub: Subscription;
  totalItems = 0;
  page = 1;
  private searchOBS: Subscription;
  importing = false;
  loadingPage = false;
  progress = 0;
  current = 0;
  total = 0;
  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    // private db: AngularFireDatabase,
    // private company: AdminService
  ) {
  }
  ngOnInit() {
    if (!this.args || !Array.isArray(this.args)) {
      this.args = [];
    }
    /*
    const id = this.company.local$.getValue().id;
    this.db.object('company/' + id + '/imports/' + this.service.model).valueChanges().subscribe((value: any) => {
      let current = 0;
      let total = 0;
      for (const cid in value) {
        if (value[cid] && value[cid].current !== value[cid].total) {
          current += value[cid].current;
          total += value[cid].total;
        }
      }
      if (total !== 0) {
        this.importing = true;
        this.progress = Number.parseFloat((current / total * 100).toFixed(2));
        this.current = current;
        this.total = total;
      }else {
        this.importing = false;
      }
    });
    */
    // SETUP SCROLLER
    this.loadMoreItems();
    if (!this.items) {
      this.loadItems(1);
    }
    this.formSearchSub = this.formSearch.valueChanges.subscribe((value) => {
      this.searchItem();
    });
  }
  setPage(page: PageEvent) {
    this.loadItems(page.pageIndex + 1);
  }
  loadItems(page) {
    if (this.page === 1) {
      this.loadingPage = true;
    }
    this.service.index(this.formSearch.value, page, ...this.args).toPromise().then((response: HttpResponse<PagedResponse | any>) => {
      if (response.body.items) {
        if (this.page !== 1) {
          this.items = this.items.concat(response.body.items);
        }else {
          this.items = response.body.items;
        }
        this.totalItems = response.body.total_pages * this.PAGE_SIZE;
      } else {
        if (this.page !== 1) {
          this.items = this.items.concat(response.body);
        }else {
          this.items = response.body;
        }
      }
      this.loadingPage = false;
      this.loadingMore = false;
      if (this.items.length < this.page * this.PAGE_SIZE) {
        this.canLoadMore = false;
      }
      this.setupForms();
    }).catch((error) => {
      this.error = true;
      console.log(error);
      this.loadingPage = false;
    });
  }
  loadMoreItems() {
    interval(500).subscribe(() => {
      if (!this.loadingMore && this.canLoadMore) {
        if (this.infiniteScroll && this.loadMore) {
          const element = this.infiniteScroll.nativeElement;
          const loaderElement = this.loadMore.nativeElement;
          if (element.scrollTop + element.clientHeight > element.scrollHeight - loaderElement.clientHeight){
            this.loadingMore = true;
            this.page++;
            this.loadItems(this.page);
          }
        }
      }
    });
  }
  setupForms() {
    if (this.formGroup) {
      this.formArray = new FormArray([]);
      for (const i of this.items) {
        this.formArray.push(_.cloneDeep(this.formGroup));
      }
      this.formArray.patchValue(this.items);
    }
  }
  toggleEditMode(value) {
    this.matDialog.open(NgxCrudFormComponent, {data: {template: this.formTemplate, form: this.formGroup, value}})
      .afterClosed().toPromise().then((result: any) => {
        if (result) {
          this.updateItem(value, result);
        }
    });
  }
  toggleSaving(value) {
    value.saving = !value.saving;
  }
  toggleSave(value) {
    value.saved = true;
    setTimeout(() => {
      value.saved = false;
    }, 1000);
  }
  toggleError(value) {
    value.error = true;
    setTimeout(() => {
      value.error = false;
    }, 1000);
  }
  toggleDeleted(value) {
    value.deleted = !value.deleted;
  }
  addItem() {
    this.matDialog.open(NgxCrudFormComponent, {data: {template: this.formTemplate, form: this.formGroup}})
      .afterClosed().toPromise().then((value) => {
        if (value) {
          this.createItem(value);
        }
    });
  }
  createItem(value) {
    const index = this.items.push(value) - 1;
    const saveItem = _.cloneDeep(value);
    this.toggleSaving(this.items[index]);
    this.service.create(saveItem, ...this.args).toPromise().then((response: HttpResponse<any>) => {
      this.toggleSaving(this.items[index]);
      this.items[index] = response.body;
      this.toggleSave(this.items[index]);
    }).catch(() => {
      this.toggleSaving(this.items[index]);
      this.items[index].error = true;
    });
  }
  goBack() {
    this.back.emit();
  }
  destroyItem(value) {
    this.toggleSaving(value);
    this.service.destroy(value.id, ...this.args).toPromise().then(() => {
      this.toggleSaving(value);
      this.toggleDeleted(value);
      setTimeout(() => {
        this.items.splice(this.items.findIndex((i) => i.id === value.id), 1);
      }, 10000);
    }).catch((error) => {
      this.toggleSaving(value);
      this.toggleError(value);
    });
  }
  updateItem(value, formValue) {
    this.toggleSaving(value);
    this.service.update(value.id, formValue, ...this.args).toPromise().then((response: HttpResponse<any | any[]>) => {
      _.merge(value, response.body); // UPDATE VALUES
      this.toggleSaving(value);
      this.toggleSave(value);
    }).catch((error: HttpErrorResponse) => {
      this.toggleSaving(value);
      this.toggleError(value);
    });
  }
  cloneItem(value) {
    this.toggleSaving(value);
    const index = this.items.findIndex((i) => i.id === value.id) + 1;
    this.service.clone(value.id, ...this.args).toPromise().then((response: HttpResponse<any>) => {
      this.items.splice(index, 0, response.body);
      this.toggleSaving(value);
    }).catch((error) => {
      this.toggleSaving(value);
      this.toggleError(value);
    });
  }
  restoreItem(value) {
    this.toggleSaving(value);
    this.service.restore(value.id, ...this.args).toPromise().then(() => {
      this.toggleSaving(value);
      this.toggleDeleted(value);
      // this.items.splice(this.items.findidIndex((i) => i.id===value.id),1);
    }).catch((error) => {
      this.toggleSaving(value);
      this.toggleError(value);
    });
  }
  searchItem() {
    if (this.searchOBS) {
      this.searchOBS.unsubscribe();
      this.searchOBS = null;
    }
    this.searchOBS = interval(500).subscribe(() => {
      this.loadItems(1);
      this.searchOBS.unsubscribe();
      this.searchOBS = null;
    });
  }
  importDefaults() {
    this.loadingPage = true;
    this.service.import(null, ...this.args).toPromise().then((response: HttpResponse<any[]>) => {
      this.loadingPage = false;
      this.matDialog.open(NgxCrudImportComponent, {data: response.body}).afterClosed().pipe(first()).forEach((values) => {
        if (values && values.length !== 0) {
          this.service.import(values, ...this.args).toPromise().then((responseImport: HttpResponse<any[]>) => {
            this.importing = true;
          }).catch((error) => {
            this.loadingPage = false;
            this.error = true;
          });
        }else {
          this.loadingPage = false;
        }
      });
    }).catch((error) => {
      this.loadingPage = false;
      this.error = true;
    });
  }
  drop(event) {
    if (this.service.swap) {
      moveItemInArray(this.items, event.previousIndex, event.currentIndex);
      const sendOrder = this.items.map((value, index) => [value.id, index]);
      this.service.swap(sendOrder).toPromise().then((response: HttpResponse<any[]>) => {
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  ngOnDestroy() {
    if (this.formSearchSub) {
      this.formSearchSub.unsubscribe();
    }
  }
}
