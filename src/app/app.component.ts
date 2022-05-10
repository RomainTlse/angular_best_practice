import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Angular Best Practice';

  constructor(private _titleService: Title, private _translate: TranslateService) {
    this._titleService.setTitle(this.title);
    _translate.setDefaultLang('fr');
    _translate.use('fr');
  }
}
