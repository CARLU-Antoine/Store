import { TestBed } from '@angular/core/testing';

import { CreationCommandeService } from './creation-commande.service';

describe('CreationCommandeService', () => {
  let service: CreationCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
