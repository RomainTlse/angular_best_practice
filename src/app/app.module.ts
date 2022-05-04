import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
