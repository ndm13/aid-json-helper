export type Filter = {
    title: string,
    value: string,
    key: string,
    types: string[],
    missing: boolean,
    noEntryText: boolean,
    duplicateImport: boolean,
    emptyTriggers: boolean,
    noDescription: boolean,
    sort: {
        mode: FilterSortMode,
        asc: boolean
    }
}

export enum FilterSortMode { ALPHA, TYPE, LENGTH, NONE }