import {ChangeDetectorRef, Component, HostListener, Inject, OnInit, TemplateRef} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-crud-manager-form',
  templateUrl: './ngx-crud-form.component.html',
  styleUrls: ['./ngx-crud-form.component.styl']
})
export class NgxCrudForm implements OnInit {
  formTemplate: TemplateRef<any>;
  formGroup: FormGroup;
  formValue: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private matDialogRef: MatDialogRef<NgxCrudForm>,
    private change: ChangeDetectorRef
  ) {
    this.formGroup = _.cloneDeep(data.form);
    this.formTemplate = data.template;
    this.formValue = data.value;
  }
  ngOnInit() {
    if (this.formValue && this.formGroup){
      this.formGroup.patchValue(this.formValue);
    }
    this.change.detectChanges();
  }
  sendForm(){
    if (this.formGroup && this.formGroup.valid){
      this.matDialogRef.close(this.formGroup.value);
    }
  }
  @HostListener('keydown', ['$event'])
  enterButton(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendForm();
    }
  }

}
