import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingpageGuard } from './shared/utils/landingpage.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [LandingpageGuard]
  },
  {
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
