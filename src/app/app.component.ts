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
  keys = {
    themeID: 'app-theme',
    settingsItemID: 'settingsItem',
    themesItemID: 'themesItem',
    themes : {
      lightID: 'light',
      mediumID: 'medium',
      darkID: 'dark'
    }
  }

  navitems: MenuItem[] = [
    { label: 'Logs', icon: PrimeIcons.FILE, routerLink: ['/logs'] },
    { label: 'Templates', icon: PrimeIcons.LIST, routerLink: ['/templates'] },
    { label: 'Settings',
      id: this.keys.settingsItemID,
      icon: PrimeIcons.COG,
      items: [
        { label: 'Device Settings', icon: PrimeIcons.MOBILE, routerLink: ['/settings'] },
        { id: this.keys.themesItemID, label: 'Themes', icon: PrimeIcons.PALETTE, items: [
          { id: this.keys.themes.lightID, label: 'Light', icon: 'far fa-circle', command: (event: any) => this.switchTheme(event.item.id) },
          { id: this.keys.themes.mediumID, label: 'Medium', icon: 'fas fa-adjust', command: (event: any) => this.switchTheme(event.item.id) },
          { id: this.keys.themes.darkID, label: 'Dark', icon: 'fas fa-circle', command: (event: any) => this.switchTheme(event.item.id) }
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

  switchTheme(theme = localStorage.getItem(this.keys.themeID) || this.keys.themes.lightID) {
    localStorage.setItem(this.keys.themeID, theme);
    const htmlLinkTheme = this.document.getElementById(this.keys.themeID) as HTMLLinkElement;
    const htmlMetaTheme = this.document.getElementsByName('theme-color')?.[0] as HTMLMetaElement;
    htmlLinkTheme.href = `${theme}.css`;
    this.navitems.find(item => item.id === this.keys.settingsItemID).items.find(item => item.id === this.keys.themesItemID).items.forEach(item => {
      item.styleClass = item.id === theme ? 'bg-primary' : undefined
    });
    switch(theme) {
      case this.keys.themes.lightID:
        htmlMetaTheme.content = '#f8f9fa';
        break;
      case this.keys.themes.mediumID:
        htmlMetaTheme.content = '#343e4d';
        break;
      case this.keys.themes.darkID:
        htmlMetaTheme.content = '#1e1e1e';
        break;
    }
  }

}
