export type Filter = {
    title: string,
    value: string,
    key: string,
    types: string[],
    empty: boolean,
    noDescription: boolean,
    sort: {
        mode: string,
        asc: boolean
    }
}