import {writable, derived, get} from "../deps.ts";
import resettable from "./util/resettable.ts";
import type {StoryCard} from "./model/StoryCard.ts";
import type {Filter} from "./model/Filter.ts";
import {FilterSortMode} from "./model/Filter.ts";
import * as FilterLogic from "./util/FilterLogic.ts";

export const autosave = writable<boolean>(localStorage.getItem('autosave') !== null);
function getStoryCards() {
    if (get(autosave)) {
        const ls = localStorage.getItem('cards');
        if (ls) return JSON.parse(ls);
    }
    return [];
}
function getFilters() {
    if (get(autosave)) {
        const ls = localStorage.getItem('filters');
        if (ls) return JSON.parse(ls);
    }
    return structuredClone({
        title: "",
        value: "",
        key: "",
        types: get(types),
        missing: false,
        noEntryText: false,
        duplicateImport: false,
        emptyTriggers: false,
        noDescription: false,
        sort: {
            mode: FilterSortMode.NONE,
            asc: true
        }
    });
}
export const cards = writable<StoryCard[]>(getStoryCards());
export const types = derived(cards, cards => [...new Set(cards.map(c => c.type))]);
export const filter = resettable<Filter>(getFilters);

let autosaveSub = () => {};
autosave.subscribe(a => {
    if (a) {
        if (localStorage.getItem('autosave')) {
            const ls = localStorage.getItem('cards');
            if (ls) cards.update(_ => JSON.parse(ls));
        } else {
            localStorage.setItem('autosave', 'true');
            localStorage.setItem('cards', JSON.stringify(get(cards)));
            localStorage.setItem('filters', JSON.stringify(get(filter)));
        }
        const cardSub = cards.subscribe(c => localStorage.setItem('cards', JSON.stringify(c)));
        const filterSub = filter.subscribe(f => localStorage.setItem('filters', JSON.stringify(f)));
        autosaveSub = () => {
            cardSub();
            filterSub();
        };
    }
});
autosave.subscribe(a => {
    if (!a) {
        localStorage.clear();
        autosaveSub();
    }
})

export const filtered = derived([cards, filter], ([cards, filter]) => {
    const filtered = cards
        .filter(card =>
            filter.types.indexOf(card.type) > -1 &&
            FilterLogic.titleContains(card, filter.title) &&
            FilterLogic.valueContains(card, filter.value) &&
            FilterLogic.keysContain(card, filter.key) &&
            (
                (
                    !filter.missing &&
                    !filter.noEntryText &&
                    !filter.emptyTriggers &&
                    !filter.noDescription &&
                    !filter.duplicateImport
                ) ||
                (filter.missing && card.keys.length === 0) ||
                (filter.noEntryText && card.value.length === 0) ||
                (filter.duplicateImport && FilterLogic.duplicateImport(card, cards)) ||
                (filter.emptyTriggers && FilterLogic.emptyTriggers(card)) ||
                (filter.noDescription && FilterLogic.noDescription(card))
            )
        );
    return filter.sort.mode === FilterSortMode.NONE ? filtered : filtered
        .sort((a, b) => {
            switch (filter.sort.mode) {
                case FilterSortMode.ALPHA:
                    return FilterLogic.titleCompare(filter.sort.asc, a, b);
                case FilterSortMode.TYPE:
                    return FilterLogic.typeCompare(filter.sort.asc, a, b);
                case FilterSortMode.LENGTH:
                    return FilterLogic.lengthCompare(filter.sort.asc, a, b);
                default:
                    // Should be unreachable
                    console.error("Invalid sort mode:", filter.sort.mode);
                    return 0;
            }
        });
});