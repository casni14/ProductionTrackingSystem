import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http'
import { ViewOrderService } from './view-order.service';

describe('ViewOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewOrderService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([ViewOrderService], (service: ViewOrderService) => {
    expect(service).toBeTruthy();
  }));
});
