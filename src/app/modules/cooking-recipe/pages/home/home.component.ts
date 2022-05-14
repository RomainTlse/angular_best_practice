import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SassHelperComponent } from '../../../../core/utils/components/sass-helper/sass-helper.component';
import { HttpRequestService } from '../../../../core/utils/services/http-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(SassHelperComponent) appSassHelper!: SassHelperComponent;

  constructor(private _httpRequestService: HttpRequestService) {}

  ngOnInit() {
    this._httpRequestService.getDatas('assets/documents/cooking.json').subscribe(datas => {
      console.log(datas);
    });
  }

  ngAfterViewInit() {
    if (this.appSassHelper) {
      console.log(this.appSassHelper.readProperty('primary--background'));
    }
  }
}
