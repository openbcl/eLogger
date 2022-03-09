import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { select, Store } from '@ngrx/store';
import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { loadLogs } from './store/log.actions';
import { logsSelector } from './store/log.selectors';
import { loadLogTemplates } from './store/logtemplate.actions';
import { logTemplatesSelector } from './store/logtemplate.selectors';

@Component({
  selector: 'el-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eLogger';
  keys = {
    themeID: 'app-theme',
    settingsID: 'settings',
    exportID: 'export',
    exports : {
      logTemplatesID: 'logTemplates',
      logsID: 'logs',
    },
    themesID: 'themes',
    themes : {
      lightID: 'light',
      mediumID: 'medium',
      darkID: 'dark'
    }
  }

  displayExportLogTemplatesDialog = false;
  displayExportLogsDialog = false;
  displayImportDialog = false;

  navitems: MenuItem[] = [
    { label: 'Logs', icon: PrimeIcons.FILE, routerLink: ['/logs'] },
    { label: 'Templates', icon: PrimeIcons.LIST, routerLink: ['/templates'] },
    { label: 'Settings', id: this.keys.settingsID, icon: PrimeIcons.COG, items: [
      { label: 'Device Settings', icon: PrimeIcons.MOBILE, routerLink: ['/settings'] },
      { label: 'Import Configuration', icon: 'fas fa-file-import', command: () => this.displayImportDialog = true },
      { id: this.keys.exportID, label: 'Export Configuration', icon: 'fas fa-file-export', disabled: true, items: [
        { id: this.keys.exports.logsID, label: 'Logs', disabled: true, icon: 'fas fa-file-upload', command: () => this.displayExportLogsDialog = true },
        { id: this.keys.exports.logTemplatesID, label: 'Log Templates', disabled: true, icon: 'fas fa-file-upload', command: () => this.displayExportLogTemplatesDialog = true },
      ]},
      { id: this.keys.themesID, label: 'Themes', icon: PrimeIcons.PALETTE, items: [
        { id: this.keys.themes.lightID, label: 'Light', icon: 'far fa-circle', command: (event: any) => this.switchTheme(event.item.id) },
        { id: this.keys.themes.mediumID, label: 'Medium', icon: 'fas fa-adjust', command: (event: any) => this.switchTheme(event.item.id) },
        { id: this.keys.themes.darkID, label: 'Dark', icon: 'fas fa-circle', command: (event: any) => this.switchTheme(event.item.id) }
      ]}
    ]
  }];

  logData$ = combineLatest([this.store.pipe(select(logTemplatesSelector)), this.store.pipe(select(logsSelector))]).pipe(tap(logData => {
    const exportItem = this.navitems.find(item => item.id === this.keys.settingsID).items.find(item => item.id === this.keys.exportID);
    exportItem.disabled = !logData?.[0]?.length && !logData?.[1]?.length;
    exportItem.items.find(item => item.id === this.keys.exports.logTemplatesID).disabled = !logData?.[0]?.length;
    exportItem.items.find(item => item.id === this.keys.exports.logsID).disabled = !logData?.[1]?.length;
  }))

  logTemplates$ = this.logData$.pipe(map(logData => logData[0]), filter(logTemplates => !!logTemplates));
  logs$ = this.logData$.pipe(map(logData => logData[1]), filter(logs => !!logs));

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private swUpdate: SwUpdate,
    private primengConfig: PrimeNGConfig,
    private store: Store
  ){ }

  ngOnInit(): void {
    this.switchTheme();
    this.primengConfig.ripple = true;
    this.store.dispatch(loadLogTemplates());
    this.store.dispatch(loadLogs());
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
    this.navitems.find(item => item.id === this.keys.settingsID).items.find(item => item.id === this.keys.themesID).items.forEach(item => {
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
