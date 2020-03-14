import { TestBed } from '@angular/core/testing';

import { BackendapiService } from './backendapi.service';

describe('BackendapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendapiService = TestBed.get(BackendapiService);
    expect(service).toBeTruthy();
  });
});
