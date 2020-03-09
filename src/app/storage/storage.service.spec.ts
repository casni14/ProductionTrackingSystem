import { TestBed, inject } from '@angular/core/testing';
import { HttpModule }               from '@angular/http';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
      imports: [ HttpModule]
    });
  });

  it('should ...', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
});
