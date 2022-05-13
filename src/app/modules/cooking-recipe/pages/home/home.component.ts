import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SassHelperComponent } from '../../../../core/utils/components/sass-helper/sass-helper.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild(SassHelperComponent) appSassHelper!: SassHelperComponent;

  ngAfterViewInit() {
    if (this.appSassHelper) {
      console.log(this.appSassHelper.readProperty('primary--background'));
    }
  }
}
