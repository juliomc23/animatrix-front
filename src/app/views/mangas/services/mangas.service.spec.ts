import { TestBed } from '@angular/core/testing';

import { MangasService } from './mangas.service';

describe('GetMangasService', () => {
  let service: MangasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
