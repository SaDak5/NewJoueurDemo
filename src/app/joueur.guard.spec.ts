import { TestBed } from '@angular/core/testing';


import { JoueurGuard } from './joueur.guard';

describe('joueurGuard', () => {
   let guard:JoueurGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
