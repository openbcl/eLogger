import { of } from "rxjs"

export const SwUpdateStub = {
    isEnabled: false
}

export const NgxIndexedDBServiceStub = {
    add: (_storeName : string, value: any) => of(value),
    getByIndex: (_storeName : string, _indexName : string, key: string) => of({ 'id': key }),
    updateByKey: (_storeName : string, value: any, _key: any) => of(value),
    getAll: () => of([]),
    deleteByKey: (_storeName : string, key: string) => of({ key })
}