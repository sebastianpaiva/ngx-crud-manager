import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxCrudComponent} from './admin-lists.component';

describe('AdminListsComponent', () => {
  let component: NgxCrudComponent;
  let fixture: ComponentFixture<NgxCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
