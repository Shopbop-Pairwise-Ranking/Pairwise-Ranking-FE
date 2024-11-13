import { TestBed } from '@angular/core/testing';

import { ProductRankingService } from './product-ranking.service';

describe('ProductRankingService', () => {
  let service: ProductRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});