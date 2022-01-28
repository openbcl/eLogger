import { Component } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'el-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eLogger';

  navitems: MenuItem[] = [{
    label: 'Logs',
    items: [
      { label: 'List Logs', icon: PrimeIcons.LIST, routerLink: ['/logs'] },
      { label: 'New Log',  icon: PrimeIcons.PLUS }
    ]
  }, {
    label: 'Settings',
    icon: PrimeIcons.COG,
    items: [
      { label: 'Manage Log Templates', icon: PrimeIcons.LIST, routerLink: ['/templates'] },
      { label: 'Device Settings', icon: PrimeIcons.MOBILE, routerLink: ['/settings'] }
    ]
  }];

  constructor(
    private swUpdate: SwUpdate,
    private primengConfig: PrimeNGConfig
  ){ }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      ).subscribe(() => window.location.reload());
    }
  }

}
