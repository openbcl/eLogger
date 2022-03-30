import { of, OperatorFunction } from "rxjs"

export const NgxIndexedDBServiceMock = {
    add: (_storeName : string, value: any) => of(value),
    getByIndex: (_storeName : string, _indexName : string, key: string) => of({ 'id': key }),
    getAllByIndex: (_storeName : string, _indexName : string, _keyRange: IDBKeyRange) => of([]),
    updateByKey: (_storeName : string, value: any, _key: any) => of(value),
    update: (_storeName : string, _value: any) => of([]),
    getAll: () => of([]),
    count: () => 0,
    deleteByKey: (_storeName : string, key: string) => of({ key }),
    bulkDelete: (_storeName : string, _keys: string[]) => of(true),
}

export const TemplateServiceMock = {
    createTemplate: (value: any) => of(value),
    updateTemplate: (value: any) => of(value),
    loadTemplates: () => of([]),
    loadTemplate: (id: string) => of({ id }),
    deleteTemplate: (value: any) => of(value)
}

export const LogServiceMock = {
    createLog: (value: any) => of(value),
    updateLog: (value: any) => of(value),
    loadLogs: () => of([]),
    loadLog: (id: string) => of({ id }),
    deleteLog: (value: any) => of(value)
}

export const RecordServiceMock = {
    createRecord: (_eventTemplate: any, logId: string, _date: Date, data?: string) => of({ logId, data }),
    loadRecords: (_logId: string) => of([]),
    loadAllRecords: () => of([]),
    countTotalRecords: () => of(0),
    revokeRecord: (logId: string) => of(logId),
    deleteRecords: (logId: string) => of(logId),
}

export const SettingServiceMock = {
    loadTheme: () => 'light',
    setTheme: (theme: string) => theme,
    loadSeperator: () => ';',
    setSeperator: (seperator: string) => seperator,
    loadLanguage: () => '',
    setLanguage: (language: string) => language,
    loadBeep: () => false,
    setBeep: (beep: boolean) => beep,
    resetDB: () => true,
}

export const ExportServiceMock = {
    shareLogs: (_logs: any[], _templates: any, _seperator: string): void => null,
    shareRecords: (_records: any[], _log: any, _seperator: string): void => null
}


export const RouterMock = {
    navigate: (value: any) => new Promise(value)
}

export const StoreMock = {
    pipe: (..._operations: OperatorFunction<any, any>[]) => of<any>({}),
    dispatch: (_action: any): void => null
}

export const MessageServiceMock = {
    add: (_value: any): void => null
}

export const PipeMock = {
    transform: (..._values: any[]) => {}
}