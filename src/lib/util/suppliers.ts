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