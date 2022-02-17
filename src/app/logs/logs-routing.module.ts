import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './components/log/log.component';
import { LogsComponent } from './components/logs/logs.component';

const routes: Routes = [
  {
    path: '',
    component: LogsComponent
  },
  {
    path: ':id',
    component: LogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
