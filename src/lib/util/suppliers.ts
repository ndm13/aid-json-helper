import {get} from 'svelte/store';
import type {StoryCard} from "../model/StoryCard.ts";

export function newCard(): StoryCard {
    return {
        keys: "",
        value: "",
        type: "placeholder",
        description: "",
        useForCharacterCreation: true,
        title: "New Card"
    };
}

export function newFilterSupplier(types) {
    return () => {
        return {
            title: "",
            value: "",
            key: "",
            types: get(types),
            empty: false,
            noDescription: false,
            sort: {
                mode: "default",
                asc: true
            }
        };
    };
}