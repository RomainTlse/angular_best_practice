import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageErrorComponent } from './page-error.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PageErrorComponent],
  imports: [CommonModule, TranslateModule],
})
export class PageErrorModule {}
