import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SassHelperComponent } from './components/sass-helper/sass-helper.component';

@NgModule({
  declarations: [SassHelperComponent],
  imports: [CommonModule],
  exports: [SassHelperComponent],
})
export class UtilsModule {}
