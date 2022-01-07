import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogTypeComponent } from './components/logtype/logtype.component';
import { LogTypesComponent } from './components/logtypes/logtypes.component';

const routes: Routes = [
  {
    path: '',
    component: LogTypesComponent
  },
  {
    path: ':id',
    component: LogTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogTypesRoutingModule { }
