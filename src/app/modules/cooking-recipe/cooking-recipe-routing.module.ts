import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from '../../core/ui/pages/page-not-found/page-not-found.component';
import { PageInProgressComponent } from '../../core/ui/pages/page-in-progress/page-in-progress.component';
import { RedirectToProgressPageGuard } from './guards/redirect-to-progress-page.guard';
import { CookingResolver } from './resolvers/cooking.resolver';

const routes: Routes = [
  {
    path: 'cookingrecipe',
    data: {
      breadcrumb: 'Home',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        component: HomeComponent,
        resolve: {
          cooking: CookingResolver,
        },
      },
      {
        path: 'list',
        component: PageInProgressComponent,
        canActivate: [RedirectToProgressPageGuard],
        data: {
          date: '05/13/2022 21:36',
        },
      },
    ],
  },
  {
    path: 'pageinprogress',
    loadChildren: () => import('../../core/ui/pages/page-in-progress/page-in-progress.module').then(m => m.PageInProgressModule),
    component: PageInProgressComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('../../core/ui/pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookingRecipeRoutingModule {}
