export type Filter = {
    title: string,
    value: string,
    key: string,
    types: string[],
    empty: boolean,
    missing: boolean,
    noDescription: boolean,
    sort: {
        mode: FilterSortMode,
        asc: boolean
    }
}

export enum FilterSortMode { ALPHA, TYPE, LENGTH, NONE }