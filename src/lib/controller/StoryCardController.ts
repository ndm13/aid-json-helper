import {StoryCard} from "../model/StoryCard.ts";

export default class StoryCardController {
    readonly card: StoryCard;

    constructor(card: StoryCard) {
        this.card = card;
    }

    copyJson() {
        navigator.clipboard.writeText(JSON.stringify(this.card, null, 4));
    }

    copyMarkdown() {
        const markdown = `## ${this.card.title}\n\n${this.card.value}\n\n**Tags:** ${this.card.keys}`;
        navigator.clipboard.writeText(markdown);
    }
}