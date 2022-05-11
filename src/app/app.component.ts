import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { LoaderService } from './core/ui/services/loader.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Angular Best Practice';

  constructor(private _titleService: Title, private _translate: TranslateService, private _loaderService: LoaderService, private _router: Router) {
    this._titleService.setTitle(this.title);
    _translate.setDefaultLang('fr');
    _translate.use('fr');
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this._loaderService.show();
      } else if (event instanceof NavigationEnd) {
        // this._loaderService.hide();
      }
    });
  }
}
