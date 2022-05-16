import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageInProgressComponent } from './core/ui/pages/page-in-progress/page-in-progress.component';
import { PageErrorComponent } from './core/ui/pages/page-error/page-error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cookingrecipe',
  },
  {
    path: 'pageinprogress',
    loadChildren: () => import('./core/ui/pages/page-in-progress/page-in-progress.module').then(m => m.PageInProgressModule),
    component: PageInProgressComponent,
  },
  {
    path: 'error-server',
    loadChildren: () => import('./core/ui/pages/page-error/page-error.module').then(m => m.PageErrorModule),
    component: PageErrorComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
