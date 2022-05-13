import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageInProgressComponent } from './page-in-progress.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PageInProgressComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class PageInProgressModule {}
