import { of } from "rxjs"

export const NgxIndexedDBServiceMock = {
    add: (_storeName : string, value: any) => of(value),
    getByIndex: (_storeName : string, _indexName : string, key: string) => of({ 'id': key }),
    updateByKey: (_storeName : string, value: any, _key: any) => of(value),
    update: (_storeName : string, value: any) => of([]),
    getAll: () => of([]),
    deleteByKey: (_storeName : string, key: string) => of({ key })
}

export const LogTemplateServiceMock = {
    createLogTemplate: (value: any) => of(value),
    updateLogTemplate: (value: any) => of(value),
    loadLogTemplates: () => of([]),
    loadLogTemplate: (id: string) => of({ id }),
    deleteLogTemplate: (value: any) => of(value)
}

export const LogServiceMock = {
    createLog: (value: any) => of(value),
    updateLog: (value: any) => of(value),
    loadLogs: () => of([]),
    loadLog: (id: string) => of({ id }),
    deleteLog: (value: any) => of(value)
}

export const RouterMock = {
    navigate: (value: any) => new Promise(value)
}