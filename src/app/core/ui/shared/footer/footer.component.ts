import { Component } from '@angular/core';
import { ExternalLinkService } from '../../../utils/services/external-link.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import packagejson from '../../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
  public version: string;
  public author: string;

  constructor(public externalLinkService: ExternalLinkService, private _iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) {
    _iconRegistry.addSvgIcon('angular', _sanitizer.bypassSecurityTrustResourceUrl('assets/images/icones/angular-white-transparent.svg'));

    this.version = packagejson.version;
    this.author = packagejson.author;
  }
}
