import {StoryCard} from "../model/StoryCard.ts";

export const WHITESPACE = /^\s*$/gm;

export function emptyTriggers(card: StoryCard): boolean {
    return card.keys.length > 0 &&
        keys(card).filter(s => WHITESPACE.test(s)).length > 0;
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
    return keys(card).filter(key => caseInsensitiveContains(key, needle)).length > 0;
}

export function titleCompare(asc: boolean, a: StoryCard, b: StoryCard): number {
    return caseInsensitiveCompare(asc, a.title, b.title) ? 1 : -1;
}

export function typeCompare(asc: boolean, a: StoryCard, b: StoryCard): number {
    return caseInsensitiveCompare(asc, a.type, b.type) ? 1 : -1;
}

export function lengthCompare(asc: boolean, a: StoryCard, b: StoryCard): number {
    return asc ? a.value.length - b.value.length : b.value.length - a.value.length;
}

function caseInsensitiveContains(haystack: string, needle: string) {
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
}

function caseInsensitiveCompare(asc: boolean, a: string, b: string): boolean {
    return asc ? a.toLowerCase() > b.toLowerCase() : b.toLowerCase() > a.toLowerCase();
}

function keys(card: StoryCard): string[] {
    return card.keys.split(',');
}