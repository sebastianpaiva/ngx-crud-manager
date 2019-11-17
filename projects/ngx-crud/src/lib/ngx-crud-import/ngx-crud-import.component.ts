import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-crud-manager-import',
  templateUrl: './ngx-crud-import.component.html',
  styleUrls: ['./ngx-crud-import.component.styl']
})
export class NgxCrudImportComponent implements OnInit {
  roles = [];
  items = [];
  selectedItems = [];
  constructor(
    private matDialogRef: MatDialogRef<NgxCrudImportComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {

  }

  ngOnInit() {
    if (this.data) {
      this.items = this.data;
    }
  }
  import() {
    this.matDialogRef.close(this.selectedItems);
  }
  itemSelected(item) {
    const index = this.selectedItems.findIndex((r) => r === item.id);
    return index >= 0;
  }
  setItem(item) {
    const index = this.selectedItems.findIndex((r) => r === item.id);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }else {
      this.selectedItems.push(item.id);
    }
  }

}
