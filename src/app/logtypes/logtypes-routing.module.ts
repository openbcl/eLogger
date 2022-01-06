import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogTypesComponent } from './components/logtypes/logtypes.component';

const routes: Routes = [
  {
    path: '',
    component: LogTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogTypesRoutingModule { }
