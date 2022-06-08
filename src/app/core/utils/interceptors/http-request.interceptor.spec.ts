import { TestBed } from '@angular/core/testing';

import { HttpRequestInterceptor } from './http-request.interceptor';
import { RouterTestingModule } from '@angular/router/testing';

describe('HttpRequestInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpRequestInterceptor],
      imports: [RouterTestingModule],
    })
  );

  it('should be created', () => {
    const interceptor: HttpRequestInterceptor = TestBed.inject(HttpRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
