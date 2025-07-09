import { TestBed } from '@angular/core/testing';

import { ListeProduitsService } from './liste-produits.service';

describe('ListeProduitsService', () => {
  let service: ListeProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
