import { TestBed } from '@angular/core/testing';

import { ConnexionUtilisateurService } from './connexion-utilisateur.service';

describe('ConnexionUtilisateurService', () => {
  let service: ConnexionUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnexionUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
