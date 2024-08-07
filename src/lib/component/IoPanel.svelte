<script lang="ts">
    import Modal from "./Modal.svelte";
    import {autosave, cards, filter, filtered} from "../stores.ts";
    import IoController, {DownloadType, LoadMode} from "../controller/IoController.ts";
    import type {StoryCard} from "../model/StoryCard";

    const controller = new IoController();

    let loadedFiles: FileList, addedFiles: FileList;

    let dropdown;

    let openWarn = false;
    let clearWarn = false;
    let saveMode = null;
    let saveModeWarn = false, saveProblems: { dropped: StoryCard[]; dupe: StoryCard[] } = {dropped: [], dupe: []};
    let mdImport = false;
    let mdCC = true, mdType = "Markdown";

    $: if (saveMode !== null) {
        saveProblems = controller.checkProblemCards(saveMode);
        saveModeWarn = saveProblems.dropped.length > 0 || saveProblems.dupe.length > 0;
        if (!saveModeWarn) {
            controller.download(saveMode);
            saveMode = undefined;
        }
    }

    filter.subscribe(filter => {
        if (filter.types.length === 1)
            mdType = filter.types[0];
    })
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

    section button {
        border-radius: 1ex;
    }

    input[type=file] {
        display: none;
    }

    .toggle:after {
        content: '>';
        display: inline-block;
        margin-left: 1ex;
        transform: rotate(90deg);
    }

    .toggle.open:after {
        transform: rotate(-90deg);
    }

    .open {
        background-color: var(--color-light);
    }

    section.menu {
        padding: 1ex;
        border-radius: 1ex;
        overflow: hidden;
    }

    section.menu:not(.open) {
        display: none;
    }

    ul {
        text-align: left;
    }
</style>
<section>
    <button on:click={() => controller.addCard()}>New Card</button>
    <button class="toggle" class:open={dropdown === "from-file"}
            on:click={() => dropdown = dropdown === "from-file" ? undefined : "from-file"}>
        From File
    </button>
    <button class="toggle" class:open={dropdown === "save"} disabled={$cards.length === 0 && dropdown !== "save"}
            on:click={() => dropdown = dropdown === "save" ? undefined : "save"}>
        Save
    </button>
    <button disabled={$cards.length === 0}
            on:click={() => clearWarn = true}>
        Clear Cards
    </button>
    <button on:click={() => $autosave = !$autosave}>
        {$autosave ? "Disable" : "Enable"} Autosave
    </button>
</section>
<section class="menu" class:open={dropdown === "from-file"}>
    <input id="add-file" multiple
           accept="application/json,text/json,.json"
           type="file" bind:files={addedFiles}
           on:change={() => controller.loadJson(addedFiles, LoadMode.APPEND)}/>
    <button on:click={() => document.getElementById("add-file").click()}>Import JSON</button>
    <input id="add-md" multiple
           accept="text/markdown,text/x-markdown,.md"
           type="file" bind:files={addedFiles}
           on:change={() => controller.loadMd(addedFiles, mdCC, mdType)}/>
    <button on:click={() => mdImport = true}>Import Markdown...</button>
    <input id="load-file"
           accept="application/json,text/json,.json"
           type="file" bind:files={loadedFiles}
           on:change={() => controller.loadJson(loadedFiles, LoadMode.REPLACE)}/>
    <button on:click={() => $cards.length === 0 ? document.getElementById("load-file").click() : openWarn = true}>Open
        File
    </button>
</section>
<section class="menu" class:open={dropdown === "save"}>
    <button disabled={$cards.length === 0}
            on:click={() => saveMode = DownloadType.ALL}>
        Save All Cards
    </button>
    <button disabled={$filtered.length === 0}
            on:click={() => saveMode = DownloadType.FILTERED}>
        Save Filtered Cards
    </button>
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
{#if saveModeWarn}
    <Modal title="Save incompatible cards?"
           options={["Yes","No"]}
           on:optionYes={() => {controller.download(saveMode); saveMode = null; saveModeWarn = false}}
           on:optionNo={() => {saveMode = null; saveModeWarn = false}}
           on:close={() => {saveMode = null; saveModeWarn = false}}>
        <p>Errors were detected in these cards that will affect import into AI Dungeon.</p>
        {#if saveProblems.dropped.length > 0}
            <p>The following cards will fail to import:</p>
            <ul>
                {#each saveProblems.dropped as card}
                    <li><strong>{card.title}</strong> <em>{card.type}</em></li>
                {/each}
            </ul>
        {/if}
        {#if saveProblems.dupe.length > 0}
            <p>The following cards will be considered duplicates - only one will load:</p>
            <ul>
                {#each saveProblems.dupe as card}
                    <li><strong>{card.title}</strong> <em>{card.type}</em></li>
                {/each}
            </ul>
        {/if}
        <p>Cards exported this way will load as expected in this tool, but not in AI Dungeon. Really export?</p>
    </Modal>
{/if}
{#if mdImport}
    <Modal title="Import Markdown files"
           options={["Select Files","Cancel"]}
           on:optionSelectFiles={() => {mdImport = false; document.getElementById("add-md").click();}}
           on:optionCancel={() => mdImport = false}
           on:close={() => mdImport = false}>
        <p>
            <a href="https://obsidian.md/" target="_blank">Obsidian</a> is a text-based note taking app with
            lots of
            features for managing relationships between documents, known as cards within the app. These cards
            are stored
            as Markdown (.md) files with a file name that reflects that card's title. We can try to load these
            cards as
            AI Dungeon story cards by mapping the file name to the card name and the file contents to the card
            entry and
            description.
        </p>
        <p>
            Note that any Markdown/Obsidian features such as links and tags will render as plain text and will
            need to
            be edited to avoid confusing the AI.
        </p>
        <p>
            <input type="checkbox" name="cc" id="cc" bind:checked={mdCC}/>
            <label for="cc">Use these cards for character creation</label>
        </p>
        <p>
            <label for="type">Imported cards will have this type:</label>
            <input type="text" name="type" id="type" bind:value={mdType}/>
        </p>
    </Modal>
{/if}