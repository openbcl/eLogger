import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './components/template/template.component';
import { TemplatesComponent } from './components/templates/templates.component';

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent
  },
  {
    path: ':templateId',
    component: TemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
