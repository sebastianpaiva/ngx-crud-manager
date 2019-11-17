import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxCrudImportComponent} from './admin-list-selector.component';

describe('AdminListSelectorComponent', () => {
  let component: NgxCrudImportComponent;
  let fixture: ComponentFixture<NgxCrudImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCrudImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCrudImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
