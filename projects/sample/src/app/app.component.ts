import { Component } from '@angular/core';
import {ItemService} from './item.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  constructor(
    public itemService: ItemService
  ) {

  }
}
