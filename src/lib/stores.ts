import {writable, derived, get} from "../deps.ts";
import resettable from "./util/resettable.ts";
import type {StoryCard} from "./model/StoryCard.ts";
import type {Filter} from "./model/Filter.ts";
import {FilterSortMode} from "./model/Filter.ts";
import * as FilterLogic from "./util/FilterLogic.ts";

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
        duplicateImport: false,
        missing: false,
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
            FilterLogic.titleContains(card, filter.title) &&
            FilterLogic.valueContains(card, filter.value) &&
            FilterLogic.keysContain(card, filter.key) &&
            (
                (!filter.missing && !filter.empty && !filter.noDescription && !filter.duplicateImport) ||
                (filter.missing && card.keys.length === 0) ||
                (filter.empty && FilterLogic.emptyTriggers(card)) ||
                (filter.noDescription && FilterLogic.noDescription(card)) ||
                (filter.duplicateImport && FilterLogic.duplicateImport(card, cards))
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