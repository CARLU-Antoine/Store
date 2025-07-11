import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationProduitComponent } from './creation-produit.component';

describe('CreationProduitComponent', () => {
  let component: CreationProduitComponent;
  let fixture: ComponentFixture<CreationProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationProduitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
