import { TestBed } from '@angular/core/testing';

import { AuthrequestService } from './authrequest.service';

describe('AuthrequestService', () => {
  let service: AuthrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
