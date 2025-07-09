import { TestBed } from '@angular/core/testing';

import { CreationUtilisateurService } from './creation-utilisateur.service';

describe('CreationUtilisateurService', () => {
  let service: CreationUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
