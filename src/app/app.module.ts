import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { GraphicalCharterModule } from './modules/graphical-charter/graphical-charter.module';
import { CookingRecipeModule } from './modules/cooking-recipe/cooking-recipe.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CoreModule, GraphicalCharterModule, CookingRecipeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
