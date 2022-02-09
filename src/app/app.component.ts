import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
  themeID = 'app-theme';

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
      { label: 'Device Settings', icon: PrimeIcons.MOBILE, routerLink: ['/settings'] },
      { label: 'Themes', icon: 'fas fa-palette', items: [
        { label: 'Light', icon: 'far fa-circle', command: () => this.switchTheme('light') },
        { label: 'Medium', icon: 'fas fa-adjust', command: () => this.switchTheme('medium') },
        { label: 'Dark', icon: 'fas fa-circle', command: () => this.switchTheme('dark') }
      ]}
    ]
  }];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private swUpdate: SwUpdate,
    private primengConfig: PrimeNGConfig
  ){ }

  ngOnInit(): void {
    this.switchTheme();
    this.primengConfig.ripple = true;
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      ).subscribe(() => window.location.reload());
    }
  }

  switchTheme(theme = localStorage.getItem(this.themeID) || 'light') {
    localStorage.setItem(this.themeID, theme);
    (this.document.getElementById(this.themeID) as HTMLLinkElement).href = `${theme}.css`
  }

}
