import { TestBed } from '@angular/core/testing';

import { CookingResolver } from './cooking.resolver';
import { HttpClientModule } from '@angular/common/http';

describe('CookingResolver', () => {
  let resolver: CookingResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    resolver = TestBed.inject(CookingResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
