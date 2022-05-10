import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { UiModule } from './ui/ui.module';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, UiModule, UtilsModule],
})
export class CoreModule {}
