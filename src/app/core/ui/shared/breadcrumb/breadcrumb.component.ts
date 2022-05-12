import { Component } from '@angular/core';
import { Breadcrumb } from '../../interfaces/breadcrumb';
import { Observable } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass'],
})
export class BreadcrumbComponent {
  public breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly _breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = _breadcrumbService.breadcrumbs$;
  }
}
