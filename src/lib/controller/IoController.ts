import {get} from "../../deps.ts";
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

    async loadMd(files: FileList, cc: boolean, type: string) {
        const loaded: StoryCard[] = [];
        for (const file of files) {
            const md = (await file.text()).trim();
            const name = file.name.split('.').slice(0, -1).join('.').trim();
            loaded.push({
                title: name,
                value: md,
                type: type,
                keys: name,
                useForCharacterCreation: cc,
                description: md
            });
        }
        cards.update(c => [...loaded, ...c]);
        if (get(filter).types.indexOf(type) < 0)
            filter.update(filter => {
                filter.types.push(type);
                return filter;
            });
    }

    async loadJson(files: FileList, mode: LoadMode) {
        const loaded: StoryCard[] = [];
        for (const file of files) {
            await file.text()
                .then((t: string) => JSON.parse(t))
                .then((cards: StoryCard[]) => loaded.push(...cards));
        }
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