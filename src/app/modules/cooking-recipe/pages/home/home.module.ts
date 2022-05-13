import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '../../../../core/utils/utils.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, TranslateModule, UtilsModule],
})
export class HomeModule {}
