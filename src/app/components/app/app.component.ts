import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { select, Store } from '@ngrx/store';
import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { loadBeep, loadQuality, loadSeperator, loadTheme, setTheme } from '../../store/setting.actions';
import { themeSelector } from '../../store/setting.selectors';
import { loadLogs } from '../../store/log.actions';
import { logsSelector } from '../../store/log.selectors';
import { loadTemplates } from '../../store/template.actions';
import { templatesSelector } from '../../store/template.selectors';
import { downloadingSelector } from '../../store/share.selectors';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'el-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eLogger';
  keys = {
    settingsID: 'settings',
    exportID: 'export',
    exports : {
      templatesID: 'templates',
      logsID: 'logs',
    },
    themesID: 'themes',
    themes : {
      lightID: 'light',
      mediumID: 'medium',
      darkID: 'dark'
    }
  }

  displayExportTemplatesDialog = false;
  displayExportLogsDialog = false;
  displayImportDialog = false;
  navigations = -1;
  navigating = false;

  navitems: MenuItem[] = [
    { label: $localize`:MenuBar Item (Logs)@@AppComponent\:menuBarLogs:Logs`, icon: PrimeIcons.FILE, routerLink: ['/logs'] },
    { label: $localize`:MenuBar Item (Templates)@@AppComponent\:menuBarTemplates:Templates`, icon: PrimeIcons.LIST, routerLink: ['/templates'] },
    { label: $localize`:MenuBar Item (Info)@@AppComponent\:menuBarInfo:Info`, icon: PrimeIcons.INFO_CIRCLE, routerLink: ['/info'] },
    { label: $localize`:MenuBar Item (Settings)@@AppComponent\:menuBarSettings:Settings`, id: this.keys.settingsID, icon: PrimeIcons.COG, items: [
      { label: $localize`:MenuBar Item (App Settings)@@AppComponent\:menuBarAppSettings:App Settings`, icon: PrimeIcons.MOBILE, routerLink: ['/settings'] },
      { label: $localize`:MenuBar Item (Import Configuration)@@AppComponent\:menuBarImportConfiguration:Import Configuration`, icon: 'fas fa-file-import', command: () => this.displayImportDialog = true },
      { id: this.keys.exportID, label: $localize`:MenuBar Item (Export Configuration)@@AppComponent\:menuBarExportConfiguration:Export Configuration`, icon: 'fas fa-file-export', disabled: true, items: [
        { id: this.keys.exports.logsID, label: $localize`:MenuBar Item (Export Configuration Logs)@@AppComponent\:menuBarExportLogs:Logs`, disabled: true, icon: 'fas fa-file-upload', command: () => this.displayExportLogsDialog = true },
        { id: this.keys.exports.templatesID, label: $localize`:MenuBar Item (Export Configuration Templates)@@AppComponent\:menuBarExportTemplates:Templates`, disabled: true, icon: 'fas fa-file-upload', command: () => this.displayExportTemplatesDialog = true },
      ]},
      { id: this.keys.themesID, label: $localize`:MenuBar Item (Themes)@@AppComponent\:menuBarThemes:Themes`, icon: PrimeIcons.PALETTE, items: [
        { id: this.keys.themes.lightID, label: $localize`:MenuBar Item (Theme Light)@@AppComponent\:menuBarThemeLight:Light`, icon: 'far fa-circle', command: (event: any) => this.store.dispatch(setTheme({ theme: event.item.id})) },
        { id: this.keys.themes.mediumID, label: $localize`:MenuBar Item (ThemeMedium)@@AppComponent\:menuBarThemeMedium:Medium`, icon: 'fas fa-adjust', command: (event: any) => this.store.dispatch(setTheme({ theme: event.item.id})) },
        { id: this.keys.themes.darkID, label: $localize`:MenuBar Item (ThemeDark)@@AppComponent\:menuBarThemeDark:Dark`, icon: 'fas fa-circle', command: (event: any) => this.store.dispatch(setTheme({ theme: event.item.id})) }
      ]}
    ]}
  ];

  logData$ = combineLatest([this.store.pipe(select(templatesSelector)), this.store.pipe(select(logsSelector))]).pipe(tap(logData => {
    const exportItem = this.navitems.find(item => item.id === this.keys.settingsID).items.find(item => item.id === this.keys.exportID);
    exportItem.disabled = !logData?.[0]?.length && !logData?.[1]?.length;
    exportItem.items.find(item => item.id === this.keys.exports.templatesID).disabled = !logData?.[0]?.length;
    exportItem.items.find(item => item.id === this.keys.exports.logsID).disabled = !logData?.[1]?.length;
  }))

  templates$ = this.logData$.pipe(map(logData => logData[0]), filter(templates => !!templates));
  logs$ = this.logData$.pipe(map(logData => logData[1]), filter(logs => !!logs));
  downloading$ = this.store.pipe(select(downloadingSelector));

  theme$ = this.store.pipe(select(themeSelector), filter(theme => !!theme), tap(theme => {
    const htmlLinkTheme = this.document.getElementById('app-theme') as HTMLLinkElement;
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
  }))

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private swUpdate: SwUpdate,
    private primengConfig: PrimeNGConfig,
    private store: Store,
    private location: Location,
    private router: Router,
  ){
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.navigations++;
      this.navigating = false;
    });
  }

  navigateBack(): void {
    this.navigations = this.navigations - 2;
    this.navigating = true;
    this.location.back();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.store.dispatch(loadTheme()),
    this.store.dispatch(loadTemplates());
    this.store.dispatch(loadLogs());
    this.store.dispatch(loadSeperator());
    this.store.dispatch(loadBeep());
    this.store.dispatch(loadQuality());
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      ).subscribe(() => window.location.reload());
    }
  }

}
