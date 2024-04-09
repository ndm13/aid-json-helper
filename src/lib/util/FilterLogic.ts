import {StoryCard} from "../model/StoryCard.ts";

const whitespace = /^\s*$/gm;
export function emptyTriggers(card: StoryCard): boolean {
    return card.keys.length > 0 &&
        card.keys.split(',').filter(s => whitespace.test(s)).length > 0;
}

export function noDescription(card: StoryCard): boolean {
    return card.useForCharacterCreation == true &&
        /^(\s*|Notes go here.)$/gm.test(card.description);
}

export function titleContains(card: StoryCard, needle: string): boolean {
    return caseInsensitiveContains(card.title, needle);
}

export function valueContains(card: StoryCard, needle: string): boolean {
    return caseInsensitiveContains(card.value, needle);
}

export function keysContain(card: StoryCard, needle: string): boolean {
    return card.keys.split(',').filter(key => caseInsensitiveContains(key, needle)).length > 0;
}

function caseInsensitiveContains(haystack: string, needle: string) {
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
}