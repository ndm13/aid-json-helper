import {derived} from 'svelte/store';
import {cards} from "../stores.ts";
import {emptyTriggers} from "../util/FilterLogic.ts";

export default class FilterController {
    readonly triggers = derived(cards, cards => {
        const triggers = cards
            .map(card => card.keys.split(','))
            .reduce((keys, triggers) => {
                triggers.forEach(trigger => keys[trigger] ? keys[trigger].count++ : keys[trigger] = {count: 1});
                return keys;
            }, {});
        const keys = Object.keys(triggers);
        keys.forEach(t => triggers[t].overlap = keys.filter(k => k.indexOf(t) > -1 && t !== k).length);
        return Object.entries(triggers).map(([k, v]) => {
            v.key = k;
            return v;
        }) as {count:number,key:string}[];
    });

    readonly cardsWithEmptyTriggers = derived(cards, cards => cards.filter(emptyTriggers));

    removeEmptyTriggers() {
        cards.update(c => c.map(card => {
            card.keys = card.keys
                .split(',')
                .filter(s => !/^\s*$/gm.test(s))
                .join(",");
            return card;
        }));
    }
}