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

export const RecordServiceMock = {
    createRecord: (_eventTemplate: any, logId: string, date: Date, text?: string) => of({ logId, text }),
    loadRecords: (_logId: string) => of([]),
    loadAllRecords: () => of([]),
    countTotalRecords: () => of(0),
    revokeRecord: (logId: string) => of(logId),
    deleteRecords: (logId: string) => of(logId),
}

export const RouterMock = {
    navigate: (value: any) => new Promise(value)
}

export const StoreMock = {
    pipe: (..._operations: OperatorFunction<any, any>[]) => of<any>({}),
    dispatch: (_action: any): void => null
}