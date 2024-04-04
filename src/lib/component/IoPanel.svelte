<script lang="ts">
    import {newCard} from "../util/suppliers.ts";
    import type {StoryCard} from "../model/StoryCard.ts";
    import Modal from "./Modal.svelte";

    export let cards, filter, filtered;

    function addCard() {
        $cards = [newCard(), ...$cards];
        $filter.types.indexOf("placeholder") > -1 || ($filter.types = ["placeholder", ...$filter.types]);
    }

    let loadedFiles: FileList, addedFiles: FileList;
    let fileName: string;

    async function loadFile() {
        if (loadedFiles) {
            await loadedFiles[0].text()
                .then(t => JSON.parse(t))
                .then(c => {
                    $cards = c;
                    filter.reset();
                    if ($cards.length === 0)
                        alert("This file doesn't contain any story cards!  Make sure you have the right file.");
                    else
                        fileName = loadedFiles[0].name;
                })
                .catch(e => {
                    // Destroy the current session anyway to keep from saving under the wrong name
                    $cards = [];
                    fileName = "";
                    alert("There was an error trying to load this file.  Are you sure it's valid?");
                    console.error("Caught error when loading file", e);
                });
        }
    }

    async function addFile() {
        if (addedFiles) {
            await addedFiles[0].text()
                .then(t => JSON.parse(t))
                .then(c => {
                    if (c.length === 0) {
                        alert("This file doesn't contain any story cards!  Make sure you have the right file.");
                    } else {
                        $cards = [...c, ...$cards];
                        filter.reset();
                    }
                })
                .catch(e => {
                    alert("There was an error trying to load this file.  Are you sure it's valid?");
                    console.error("Caught error when adding file", e);
                });
        }
    }

    enum DownloadType { ALL, FILTERED }

    function download(type: DownloadType) {
        let data: StoryCard[];
        switch (type) {
            case DownloadType.ALL:
                data = $cards;
                break;
            case DownloadType.FILTERED:
                data = $filtered;
                break;
        }

        const helper = document.createElement('a') as HTMLAnchorElement;
        const url = URL.createObjectURL(new Blob([JSON.stringify(data)], {type: "application/json"}));
        helper.download = fileName ? fileName : `storycards-${data.length}.json`;
        helper.href = url;
        helper.click();
        URL.revokeObjectURL(url);
    }

    let openWarn = false;
    let clearWarn = false;
</script>

<style>
    section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1ex;
        align-items: center;
        justify-content: space-around;
    }

    input[type=file] {
        display: none;
    }
</style>

<section>
    <button on:click={addCard}>New Card</button>
    <input id="add-file"
           accept="application/json,text/json,.json"
           type="file" bind:files={addedFiles}
           on:change={addFile}/>
    <button on:click={() => document.getElementById("add-file").click()}>Import File</button>
    <input id="load-file"
           accept="application/json,text/json,.json"
           type="file" bind:files={loadedFiles}
           on:change={loadFile}/>
    <button on:click={() => $cards.length === 0 ? document.getElementById("load-file").click() : openWarn = true}>Open
        File
    </button>
    <button disabled={$cards.length === 0}
            on:click={() => download(DownloadType.ALL)}>Save All Cards</button>
    <button disabled={$cards.length === 0}
            on:click={() => download(DownloadType.FILTERED)}>Save Filtered Cards</button>
    <button disabled={$cards.length === 0}
            on:click={() => clearWarn = true}>Clear Cards</button>
</section>
{#if openWarn}
    <Modal title="Replace all cards?"
           options={["Yes","No"]}
           on:optionYes={() => {openWarn = false; document.getElementById("load-file").click()}}
           on:optionNo={() => openWarn = false}
           on:close={() => openWarn = false}>
        <p>Are you sure you want to open a new file? This will overwrite any loaded cards.</p>
        <em>Hint: to add cards instead, use "Import File".</em>
    </Modal>
{/if}
{#if clearWarn}
    <Modal title="Delete all cards?"
           options={["Yes","No"]}
           on:optionYes={() => {clearWarn = false; $cards = []}}
           on:optionNo={() => clearWarn = false}
           on:close={() => clearWarn = false}>
        <p>Are you sure you want to clear all cards? This cannot be undone.</p>
        <em>Hint: to remove a specific card, use the icon in the top-left corner of the card.</em>
    </Modal>
{/if}