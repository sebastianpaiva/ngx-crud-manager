import {NgModule} from '@angular/core';
import { NgxCrudComponent } from './ngx-crud.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxCrudFormComponent} from './ngx-crud-form/ngx-crud-form.component';
import {NgxCrudImportComponent} from './ngx-crud-import/ngx-crud-import.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    NgxCrudComponent,
    NgxCrudFormComponent,
    NgxCrudImportComponent
  ],
  entryComponents: [
    NgxCrudFormComponent,
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
    ReactiveFormsModule
  ],
  exports: [
    // COMPONENTS
    NgxCrudComponent,
    NgxCrudFormComponent,
    NgxCrudImportComponent
  ]
})
export class NgxCrudModule {

}
