import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview'

const modules = [
  ReactiveFormsModule,
  TabViewModule,
  MenubarModule
]

@NgModule({
  declarations: [],
  imports: [ CommonModule, ...modules ],
  exports: [ ...modules ]
})
export class UiModule { }
