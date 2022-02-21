import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './components/log/log.component';
import { LogsComponent } from './components/logs/logs.component';
import { RecordComponent } from './components/record/record.component';

const routes: Routes = [
  {
    path: '',
    component: LogsComponent
  },
  {
    path: ':id',
    children: [{
      path: '',
      component: LogComponent,
    }, {
      path: 'record',
      component: RecordComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
