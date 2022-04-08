import { Component } from '@angular/core';
import { version, branch, commit } from '../../../environments/build'

@Component({
  selector: 'el-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  version = version;
  branch = branch;
  commit = commit;

  constructor() { }
}
