import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'angular_best_practice';

  constructor(private _translate: TranslateService) {
    _translate.setDefaultLang('fr');
    _translate.use('fr');
  }
}
