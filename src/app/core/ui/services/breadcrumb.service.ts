import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../interfaces/breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private _router: Router) {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      // Construct the breadcrumb hierarchy
      const root = this._router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this._createBreadcrumbs(root, [], breadcrumbs);

      // Emit the new hierarchy
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  private _createBreadcrumbs(activedRoute: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[] = []): void {
    if (activedRoute) {
      // Construct the route URL
      const routeUrl = parentUrl.concat(activedRoute.url.map(url => url.path));

      // Add an element for the current route part
      if (activedRoute.data && activedRoute.data['breadcrumb']) {
        const breadcrumb = {
          label: activedRoute.data['breadcrumb'],
          url: '/' + routeUrl.join('/'),
        };
        breadcrumbs.push(breadcrumb);
      }

      if (activedRoute.firstChild) {
        // Add another element for the next route part
        this._createBreadcrumbs(activedRoute.firstChild, routeUrl, breadcrumbs);
      }
    }
  }
}
