import { TestBed } from '@angular/core/testing';

import { SearchQuizeService } from './search-quize.service';

describe('SearchQuizeService', () => {
  let service: SearchQuizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchQuizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
