import { TestBed, inject } from '@angular/core/testing';
import { HttpModule  }      from '@angular/http'
import { StatisticsService } from './statistics.service';

describe('StatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [StatisticsService]
    });
  });

  it('should ...', inject([StatisticsService], (service: StatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
