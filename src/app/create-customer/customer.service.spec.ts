import { TestBed, inject }  from '@angular/core/testing';
import { HttpModule }       from '@angular/http'
import { CustomerService }  from './customer.service';

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));
});
