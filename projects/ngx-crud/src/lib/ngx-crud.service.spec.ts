import { TestBed } from '@angular/core/testing';

import { NgxCrudService } from './ngx-crud.service';

describe('NgxCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxCrudService = TestBed.get(NgxCrudService);
    expect(service).toBeTruthy();
  });
});
