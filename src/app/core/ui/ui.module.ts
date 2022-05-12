import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [LoaderComponent, MessageComponent, BreadcrumbComponent, FooterComponent, HeaderComponent, MenuComponent],
  imports: [CommonModule, MatIconModule, TranslateModule, MatSidenavModule, RouterModule, MatButtonModule, MatToolbarModule],
  exports: [LoaderComponent, MessageComponent, MenuComponent, BreadcrumbComponent],
})
export class UiModule {}
