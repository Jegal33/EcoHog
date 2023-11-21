import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule),
    canActivate:[NoAuthGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/pages/main/main.module').then( m => m.MainPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'licenses',
    loadChildren: () => import('./pages/licenses/licenses.module').then( m => m.LicensesPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'data-controls',
    loadChildren: () => import('./pages/data-controls/data-controls.module').then( m => m.DataControlsPageModule),
    canActivate:[AuthGuard]
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
