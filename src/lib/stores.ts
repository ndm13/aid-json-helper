import {writable, derived, get} from 'svelte/store';
import resettable from "./util/resettable.ts";
import type {StoryCard} from "./model/StoryCard.ts";
import type {Filter} from "./model/Filter.ts";
import {FilterSortMode} from "./model/Filter.ts";

export const cards = writable<StoryCard[]>([]);
export const types = derived(cards, cards => [...new Set(cards.map(c => c.type))]);
export const filter = resettable<Filter>(() => {
    return structuredClone({
        title: "",
        value: "",
        key: "",
        types: get(types),
        empty: false,
        noDescription: false,
        sort: {
            mode: FilterSortMode.NONE,
            asc: true
        }
    });
});
export const filtered = derived([cards, filter], ([cards, filter]) => {
    const filtered = cards
        .filter(card =>
            filter.types.indexOf(card.type) > -1 &&
            card.title.toLowerCase().indexOf(filter.title.toLowerCase()) > -1 &&
            card.value.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 &&
            card.keys.split(',').filter(s => s.toLowerCase().indexOf(filter.key.toLowerCase()) > -1).length > 0)
        .filter(card =>
            (!filter.empty && !filter.noDescription) ||
            (filter.empty && card.keys.split(',').filter(s => /^\s*$/gm.test(s)).length > 0) ||
            (filter.noDescription && (card.useForCharacterCreation == true && /^(\s*|Notes go here.)$/gm.test(card.description))));
    return filter.sort.mode === FilterSortMode.NONE ? filtered : filtered
        .sort((a, b) => {
            switch (filter.sort.mode) {
                case FilterSortMode.ALPHA:
                    return (filter.sort.asc ? a.title.toLowerCase() > b.title.toLowerCase() : b.title.toLowerCase() > a.title.toLowerCase()) ? 1 : -1;
                case FilterSortMode.TYPE:
                    return (filter.sort.asc ? a.type.toLowerCase() > b.type.toLowerCase() : b.type.toLowerCase() > a.type.toLowerCase()) ? 1 : -1;
                case FilterSortMode.LENGTH:
                    return filter.sort.asc ? a.value.length - b.value.length : b.value.length - a.value.length;
                default:
                    // Should be unreachable
                    console.error("Invalid sort mode:", filter.sort.mode);
                    return 0;
            }
        });
});