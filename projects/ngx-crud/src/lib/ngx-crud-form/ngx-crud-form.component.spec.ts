import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxCrudForm} from './admin-lists-form.component';

describe('AdminListsFormComponent', () => {
  let component: NgxCrudForm;
  let fixture: ComponentFixture<NgxCrudForm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCrudForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCrudForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
