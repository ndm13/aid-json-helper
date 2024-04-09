import {derived} from 'svelte/store';
import {cards} from "../stores.ts";
import {emptyTriggers, WHITESPACE} from "../util/FilterLogic.ts";

type TempTriggerData = {count:number,key?:string,overlap?:number};
export type TriggerData = {count:number,key:string,overlap:number};

export default class FilterController {
    readonly triggers = derived(cards, cards => {
        const triggers = cards
            .map(card => card.keys.split(','))
            .reduce((triggers: Record<string,TempTriggerData>, keys) => {
                keys.forEach(trigger => triggers[trigger] ? triggers[trigger].count++ : triggers[trigger] = {count: 1});
                return triggers;
            }, {});
        const keys = Object.keys(triggers);
        keys.forEach(t => triggers[t].overlap = keys.filter(k => k.indexOf(t) > -1 && t !== k).length);
        return Object.entries(triggers).map(([k, v]: [string, TempTriggerData]) => {
            v.key = k;
            return v;
        }) as TriggerData[];
    });

    readonly cardsWithEmptyTriggers = derived(cards, cards => cards.filter(emptyTriggers));

    removeEmptyTriggers() {
        cards.update(c => c.map(card => {
            card.keys = card.keys
                .split(',')
                .filter(s => !WHITESPACE.test(s))
                .join(",");
            return card;
        }));
    }
}