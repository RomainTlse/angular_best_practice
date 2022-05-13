import { TestBed } from '@angular/core/testing';

import { RedirectToProgressPageGuard } from './redirect-to-progress-page.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('RedirectToProgressPageGuard', () => {
  let guard: RedirectToProgressPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(RedirectToProgressPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
