import { TestBed } from '@angular/core/testing';

import { MytoastService } from './mytoast.service';

describe('MytoastService', () => {
  let service: MytoastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MytoastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
