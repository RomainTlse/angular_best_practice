import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from '../../core/ui/pages/page-not-found/page-not-found.component';

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
      },
    ],
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
