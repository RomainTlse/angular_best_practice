import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SassHelperComponent } from './components/sass-helper/sass-helper.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

@NgModule({
  declarations: [SassHelperComponent],
  imports: [CommonModule],
  exports: [SassHelperComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],
})
export class UtilsModule {}
