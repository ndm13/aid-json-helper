import {get} from 'svelte/store';
import type {StoryCard} from "../model/StoryCard.ts";
import {cards, filter, filtered} from "../stores.ts";

export enum LoadMode { APPEND, REPLACE }

export enum DownloadType { ALL, FILTERED }

export default class IoController {
    fileName: string | undefined;

    addCard() {
        const currentFilter = get(filter);
        const singleType = currentFilter.types.length === 1;
        let card = IoController.newCard();
        if (singleType)
            card.type = currentFilter.types[0];

        cards.update(c => [card, ...c]);

        if (!singleType)
            filter.update(filter => {
                if (filter.types.indexOf("placeholder") < 0)
                    filter.types = ["placeholder", ...filter.types];
                return filter;
            });
    }

    async load(files: FileList, mode: LoadMode) {
        await files[0].text()
            .then((t: string) => JSON.parse(t))
            .then((loaded: StoryCard[]) => {
                if (loaded.length === 0) {
                    alert("This file doesn't contain any story cards!  Make sure you have the right file.");
                    return;
                } else {
                    switch (mode) {
                        case LoadMode.REPLACE:
                            cards.set(loaded);
                            break;
                        case LoadMode.APPEND:
                            cards.update(c => [...loaded, ...c]);
                            break;
                    }
                    filter.reset();
                    this.fileName = files[0].name;
                }
            })
            .catch((e: any) => {
                alert("There was an error trying to load this file.  Are you sure it's valid?");
                console.error("Caught error when loading file", e);
            });
    }

    download(type: DownloadType) {
        let data: StoryCard[];
        switch (type) {
            case DownloadType.ALL:
                data = get(cards);
                break;
            case DownloadType.FILTERED:
                data = get(filtered);
                break;
        }

        const helper = document.createElement('a') as HTMLAnchorElement;
        const url = URL.createObjectURL(new Blob([JSON.stringify(data)], {type: "application/json"}));
        helper.download = this.fileName ?? `storycards-${data.length}.json`;
        helper.href = url;
        helper.click();
        URL.revokeObjectURL(url);
    }

    static newCard(): StoryCard {
        return {
            keys: "",
            value: "",
            type: "placeholder",
            description: "",
            useForCharacterCreation: true,
            title: "New Card"
        };
    }
}