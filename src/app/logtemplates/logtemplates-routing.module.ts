import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogTemplateComponent } from './components/logtemplate/logtemplate.component';
import { LogTemplatesComponent } from './components/logtemplates/logtemplates.component';

const routes: Routes = [
  {
    path: '',
    component: LogTemplatesComponent
  },
  {
    path: ':logTemplateId',
    component: LogTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogTemplatesRoutingModule { }
