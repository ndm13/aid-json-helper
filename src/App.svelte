<script lang="ts">
    import type {StoryCard as StoryCardType} from "./lib/model/StoryCard.ts";
    import StoryCard from "./lib/component/StoryCard.svelte";

    const data: StoryCardType[] = [];

    $: allTypes = [];
    let types: string[] = [];
    let titleContains: string = "";
    let valueContains: string = "";
    let keyContains: string = "";
    let empty: boolean = false;
    let noDescription = false;

    $: filtered = data
        .filter(c =>
            types.indexOf(c.type) > -1 &&
            c.title.toLowerCase().indexOf(titleContains.toLowerCase()) > -1 &&
            c.value.toLowerCase().indexOf(valueContains.toLowerCase()) > -1 &&
            c.keys.split(',').filter(s => s.toLowerCase().indexOf(keyContains.toLowerCase()) > -1).length > 0)
        .filter(c =>
            (!empty && !noDescription) ||
            (empty && c.keys.split(',').filter(s => /^\s*$/gm.test(s)).length > 0) ||
            (noDescription && (c.useForCharacterCreation == true && /^(\s*|Notes go here.)$/gm.test(c.description))));

    function resetFilter() {
        titleContains = valueContains = keyContains = "";
        types.length = 0;
        types.push(...allTypes);
    }

    let files: FileList;

    async function fileUpdate() {
        if (files) {
            await files[0].text()
                .then(t => JSON.parse(t))
                .then(c => {
                    data.length = 0;
                    data.push(...c);
                    allTypes.length = 0;
                    allTypes.push(...new Set(data.map(c => c.type)));
                    resetFilter();
                    if (data.length === 0)
                        alert("This file doesn't contain any story cards!  Make sure you have the right file.");
                })
                .catch(e => {
                    // Destroy the current session anyway to keep from saving under the wrong name
                    data.length = 0;
                    resetFilter();
                    alert("There was an error trying to load this file.  Are you sure it's valid?");
                    console.error("Caught error when updating file", e);
                });
        }
    }

    function download() {
        const helper = document.createElement('a') as HTMLAnchorElement;
        const url = URL.createObjectURL(new Blob([JSON.stringify(data)], {type: "application/json"}));
        helper.download = files ? files[0].name : "cards.json";
        helper.href = url;
        helper.click();
        URL.revokeObjectURL(url);
    }
</script>

<style>
    main {
        display: flex;
        flex-flow: column wrap;
        gap: 1ex;
        width: 100%;
    }

    header {
        margin: 1em;
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: 1ex;
        margin: 1em;
    }

    header .io, nav .filter, nav .type {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1ex;
        align-items: center;
        justify-content: space-around;
    }

    nav .searchWithin {
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: max-content max-content;
        grid-auto-rows: max-content;
        gap: 1ex;
    }

    nav .searchWithin label {
        place-self: end;
    }
</style>
<header>
    <h2>Story Card Viewer/Editor</h2>
    <section class="io">
        <input accept="application/json,text/json,.json" type="file" bind:files={files} on:change={fileUpdate}/>
        <button on:click={download}>Save</button>
    </section>
</header>
<nav>
    <em>Showing {filtered.length} entries out of {data.length}</em>
    <section class="filter">
        <fieldset class="searchWithin">
            <label for="title">Title:</label>
            <input name="title" id="title" bind:value={titleContains}/>
            <label for="entry">Entry:</label>
            <input name="entry" id="entry" bind:value={valueContains}/>
            <label for="triggers">Trigger:</label>
            <input name="triggers" id="triggers" bind:value={keyContains}/>
        </fieldset>
        <fieldset class="type">
            <label for="type">Type:</label>
            <select name="type" multiple bind:value={types}>
                {#each allTypes as t}
                    <option selected>{t}</option>
                {/each}
            </select>
            <button on:click={()=>types.length = 0}>Clear Types</button>
        </fieldset>
        <button on:click={resetFilter}>Clear Filters</button>
    </section>
    <small>Common Errors:</small>
    <section class="issues">
        <span>
            <input title="Shows cards with empty or missing triggers. Empty triggers will cause cards to trigger constantly, while missing triggers will cause them to never trigger."
                   type="checkbox" id="empty" name="empty" bind:checked={empty}/>
            <label for="empty">Empty triggers</label>
        </span>
        <span>
            <input title="Shows cards that are shown in character creator, but have no description. This only applies if you use character creator!"
                   type="checkbox" id="noDescription" name="noDescription" bind:checked={noDescription}/>
            <label for="noDescription">No Character Creator description</label>
        </span>
    </section>
</nav>
<main>
    {#each filtered as card}
        <StoryCard card={card}/>
    {:else}
        {#if data.length === 0}
            <p>
                Load some story cards to get started! Open a scenario or adventure, go to Edit > Details > Story Card
                Management, and export your story cards! When you're done editing, you can save them here and import
                them again in the same section.
            </p>
        {:else if empty || noDescription}
            <p>No errors found! You're good!</p>
        {:else}
            <p>You've filtered everything out! To reset, click the "Clear Filters" button!</p>
        {/if}
    {/each}
</main>