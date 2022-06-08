import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInProgressComponent } from './page-in-progress.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../../../../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('PageInProgressComponent', () => {
  let component: PageInProgressComponent;
  let fixture: ComponentFixture<PageInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          defaultLanguage: 'fr',
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
          isolate: true,
        }),
        HttpClientModule,
      ],
      declarations: [PageInProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
