<script lang="ts">
    import Modal from "./Modal.svelte";
    import {cards} from "../stores.ts";
    import IoController, {DownloadType, LoadMode} from "../controller/IoController.ts";

    const controller = new IoController();

    let loadedFiles: FileList, addedFiles: FileList;

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
    <button on:click={() => controller.addCard()}>New Card</button>
    <input id="add-file"
           accept="application/json,text/json,.json"
           type="file" bind:files={addedFiles}
           on:change={() => controller.load(addedFiles, LoadMode.APPEND)}/>
    <button on:click={() => document.getElementById("add-file").click()}>Import File</button>
    <input id="load-file"
           accept="application/json,text/json,.json"
           type="file" bind:files={loadedFiles}
           on:change={() => controller.load(loadedFiles, LoadMode.REPLACE)}/>
    <button on:click={() => $cards.length === 0 ? document.getElementById("load-file").click() : openWarn = true}>Open
        File
    </button>
    <button disabled={$cards.length === 0}
            on:click={() => controller.download(DownloadType.ALL)}>Save All Cards</button>
    <button disabled={$cards.length === 0}
            on:click={() => controller.download(DownloadType.FILTERED)}>Save Filtered Cards</button>
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