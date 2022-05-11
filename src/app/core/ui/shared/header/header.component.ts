import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDrawer } from '@angular/material/sidenav';
import { ExternalLinkService } from '../../../utils/services/external-link.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Input() drawer!: MatDrawer;
  constructor(public externalLinkService: ExternalLinkService, private _iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer) {
    _iconRegistry.addSvgIcon('github', _sanitizer.bypassSecurityTrustResourceUrl('assets/images/icones/github.svg'));
  }
}
