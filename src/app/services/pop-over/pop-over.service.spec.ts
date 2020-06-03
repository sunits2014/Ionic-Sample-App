import { TestBed } from '@angular/core/testing';

import { PopOverService } from './pop-over.service';

describe('PopOverService', () => {
  let service: PopOverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopOverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
