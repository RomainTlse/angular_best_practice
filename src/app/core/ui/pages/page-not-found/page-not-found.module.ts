import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class PageNotFoundModule {}
