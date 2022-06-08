import { Injectable } from '@angular/core';
import { GlobalConfigService } from './global-config.service';

@Injectable({
  providedIn: 'root',
})
export class ExternalLinkService {
  constructor(private _globalConfigService: GlobalConfigService) {}

  public getSiteUrl(externalLink: string): string {
    return this._globalConfigService.getSiteUrl(externalLink);
  }
}
