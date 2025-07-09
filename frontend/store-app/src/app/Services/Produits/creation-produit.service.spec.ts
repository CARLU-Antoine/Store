import { TestBed } from '@angular/core/testing';

import { CreationProduitService } from './creation-produit.service';

describe('CreationProduitService', () => {
  let service: CreationProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
