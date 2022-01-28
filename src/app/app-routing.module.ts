import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./logtemplates/logtemplates.module').then(m => m.LogTemplatesModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
