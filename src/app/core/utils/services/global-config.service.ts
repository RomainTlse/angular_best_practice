import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config, SiteUrl } from '../interfaces/config';

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public config!: Config;

  constructor(private _http: HttpClient) {
    this._http.get<Config>('assets/configs/angular-best-practice.config.json', this.httpOptions).subscribe(data => {
      this.config = data;
    });
  }

  public getSiteUrl(name: string): string {
    if (this.config != undefined) {
      return this.config.siteUrl[name as keyof SiteUrl];
    }
    return '';
  }
}
