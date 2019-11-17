import {ComponentFactoryResolver, ModuleWithProviders, NgModule} from '@angular/core';
import { NgxCrudComponent } from './ngx-crud.component';
import {MatButtonModule, MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule, MatTooltipModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxCrudForm} from './ngx-crud-form/ngx-crud-form';
import {NgxCrudImportComponent} from './ngx-crud-import/ngx-crud-import.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    NgxCrudComponent,
    NgxCrudForm,
    NgxCrudImportComponent
  ],
  entryComponents: [
    NgxCrudForm,
    NgxCrudImportComponent
  ],
  imports: [
    MatDialogModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    DragDropModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // COMPONENTS
    NgxCrudComponent,
    NgxCrudForm,
    NgxCrudImportComponent
  ]
})
export class NgxCrudModule {

}
