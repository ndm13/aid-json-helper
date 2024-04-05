import {get} from 'svelte/store';
import type {StoryCard} from "../model/StoryCard.ts";
import {cards, filter, filtered} from "../stores.ts";
import {newCard} from "../util/suppliers.ts";

export enum LoadMode { APPEND, REPLACE }

export enum DownloadType { ALL, FILTERED }

export default class IoController {
    fileName: string;
    addCard() {
        cards.update(c => [newCard(), ...c]);
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
                    if (mode === LoadMode.REPLACE)
                        cards.set(loaded);
                    else // append
                        cards.update(c => [...loaded, ...c]);
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
        helper.download = this.fileName ? this.fileName : `storycards-${data.length}.json`;
        helper.href = url;
        helper.click();
        URL.revokeObjectURL(url);
    }
}