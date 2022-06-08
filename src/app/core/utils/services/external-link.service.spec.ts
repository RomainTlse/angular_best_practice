import { TestBed } from '@angular/core/testing';

import { ExternalLinkService } from './external-link.service';
import { HttpClientModule } from '@angular/common/http';

describe('ExternalLinkService', () => {
  let service: ExternalLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ExternalLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
