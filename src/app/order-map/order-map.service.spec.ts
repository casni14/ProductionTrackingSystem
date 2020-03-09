import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http'
import { OrderMapService } from './order-map.service';

describe('OrderMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderMapService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([OrderMapService], (service: OrderMapService) => {
    expect(service).toBeTruthy();
  }));
});
