<script lang="ts">
    import { writable, derived } from 'svelte/store';
    import type {StoryCard as StoryCardType} from "./lib/model/StoryCard.ts";
    import StoryCard from "./lib/component/StoryCard.svelte";
    import Help from "./lib/component/Help.svelte";

    function getEmptyFilter() {
        return structuredClone({
            title: "",
            value: "",
            key: "",
            types: $types,
            empty: false,
            noDescription: false,
            sort: {
                mode: "default",
                asc: true
            }
        });
    }

    export const cards = writable<StoryCardType>([]);

    const triggers = derived(cards, cards => {
        const triggers = cards
            .map(c => c.keys.split(','))
            .reduce((a, v) => {
                v.forEach(t => a[t] ? a[t].count++ : a[t] = {count: 1});
                return a;
            }, {});
        const keys = Object.keys(triggers);
        keys.forEach(t => triggers[t].overlap = keys.filter(k => k.indexOf(t) > -1 && t !== k).length);
        return Object.entries(triggers).map(([k,v]) => { v.key = k; return v; });
    });

    const types = derived(cards, cards => [...new Set(cards.map(c => c.type))]);

    const filter = writable(getEmptyFilter());

    const filtered = derived([cards, filter], ([cards, filter]) => {
        let filtered = cards
            .filter(c =>
                filter.types.indexOf(c.type) > -1 &&
                c.title.toLowerCase().indexOf(filter.title.toLowerCase()) > -1 &&
                c.value.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 &&
                c.keys.split(',').filter(s => s.toLowerCase().indexOf(filter.key.toLowerCase()) > -1).length > 0)
            .filter(c =>
                (!filter.empty && !filter.noDescription) ||
                (filter.empty && c.keys.split(',').filter(s => /^\s*$/gm.test(s)).length > 0) ||
                (filter.noDescription && (c.useForCharacterCreation == true && /^(\s*|Notes go here.)$/gm.test(c.description))));
        return filter.sort.mode === "default" ? filtered : filtered
            .sort((a, b) => {
                switch (filter.sort.mode) {
                    case "alpha":
                        return (filter.sort.asc ? a.title.toLowerCase() < b.title.toLowerCase() : b.title.toLowerCase() < a.title.toLowerCase()) ? 1 : -1;
                    case "type":
                        return (filter.sort.asc ? a.type.toLowerCase() < b.type.toLowerCase() : b.type.toLowerCase() < a.type.toLowerCase()) ? 1 : -1;
                    case "length":
                        return !filter.sort.asc ? a.value.length - b.value.length : b.value.length - a.value.length;
                }
            });
    });

    let showTriggers = false;

    let files: FileList;

    async function fileUpdate() {
        if (files) {
            await files[0].text()
                .then(t => JSON.parse(t))
                .then(c => {
                    $cards = c;
                    $filter = getEmptyFilter();
                    if ($cards.length === 0)
                        alert("This file doesn't contain any story cards!  Make sure you have the right file.");
                })
                .catch(e => {
                    // Destroy the current session anyway to keep from saving under the wrong name
                    $cards = [];
                    alert("There was an error trying to load this file.  Are you sure it's valid?");
                    console.error("Caught error when updating file", e);
                });
        }
    }

    function download() {
        const helper = document.createElement('a') as HTMLAnchorElement;
        const url = URL.createObjectURL(new Blob([JSON.stringify($cards)], {type: "application/json"}));
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

    header, .helpbox {
        margin: 1em;
        display: block;
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

    nav .sort, nav .issues {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1ex;
        justify-content: center;
    }

    nav .sort > span, nav .issues > span {
        display: inline-block;
        white-space: nowrap;
        flex-wrap: wrap;
    }

    .triggers {
        display: flex;
        gap: 1ex;
        flex-wrap: wrap;
        align-items: center;
    }

    .triggers kbd {
        white-space: pre;
        padding: 0.5ex;
        border-radius: 0.5ex;
        background-color: rgba(127, 127, 127, 0.5);
        cursor: pointer;
    }

    .triggers kbd.plural {
        background-color: rgba(255, 127, 127, 0.5);
    }

    .triggers kbd.overlap {
        background-color: rgba(255, 191, 127, 0.5);
    }
</style>
<header>
    <h2>Story Card Viewer/Editor</h2>
    <span class="helpbox">
        <Help/>
    </span>
    <section class="io">
        <input accept="application/json,text/json,.json" type="file" bind:files={files} on:change={fileUpdate}/>
        <button on:click={download}>Save</button>
    </section>
</header>
<nav>
    <em>Showing {$filtered.length} entries out of {$cards.length}</em>
    <section class="filter">
        <fieldset class="searchWithin">
            <label for="title">Title:</label>
            <input name="title" id="title" bind:value={$filter.title}/>
            <label for="entry">Entry:</label>
            <input name="entry" id="entry" bind:value={$filter.value}/>
            <label for="triggers">Trigger:</label>
            <input name="triggers" id="triggers" bind:value={$filter.key}/>
        </fieldset>
        <fieldset class="type">
            <label for="type">Type:</label>
            <select name="type" multiple bind:value={$filter.types}>
                {#each $types as t}
                    <option selected>{t}</option>
                {/each}
            </select>
            <button on:click={() => $filter.types.length = 0}>Clear Types</button>
        </fieldset>
        <button on:click={() => $filter = getEmptyFilter()}>Clear Filters</button>
    </section>
    <small>Sort:</small>
    <section class="sort">
        <span>
            <input type="radio" id="alpha" name="sort" value="alpha" bind:group={$filter.sort.mode}/>
            <label for="alpha">Alphabetically</label>
        </span>
        <span>
            <input type="radio" id="type" name="sort" value="type" bind:group={$filter.sort.mode}/>
            <label for="type">By type</label>
        </span>
        <span>
            <input type="radio" id="length" name="sort" value="length" bind:group={$filter.sort.mode}/>
            <label for="length">By entry length</label>
        </span>
        <button on:click={() => $filter.sort.asc = !$filter.sort.asc}>
            Sort {$filter.sort.asc ? "Descending" : "Ascending"}</button>
    </section>
    <small>Common Errors:</small>
    <section class="issues">
        <span>
            <input title="Shows cards with empty or missing triggers. Empty triggers will cause cards to trigger constantly, while missing triggers will cause them to never trigger."
                   type="checkbox" id="empty" name="empty" bind:checked={$filter.empty}/>
            <label for="empty">Empty triggers</label>
        </span>
        <span>
            <input title="Shows cards that are shown in character creator, but have no description. This only applies if you use character creator!"
                   type="checkbox" id="noDescription" name="noDescription" bind:checked={$filter.noDescription}/>
            <label for="noDescription">No Character Creator description</label>
        </span>
    </section>
    <small>Triggers:</small>
    <section class="triggers">
        {#if showTriggers}
            {#each $triggers as trigger}
                <kbd on:click={() => {$filter = getEmptyFilter(); trigger.key === "" ? $filter.empty = true : $filter.key = trigger.key;}}
                     class:plural={trigger.count > 1}
                     class:overlap={trigger.overlap > 0}>
                    {trigger.key}{trigger.count > 1 ? " x" + trigger.count : ""}{trigger.overlap > 0 ? " +" + trigger.overlap : ""}</kbd>
            {/each}
        {/if}
    </section>
    <span>
        <button on:click={() => showTriggers = !showTriggers}>
            {showTriggers ? "Hide" : "Show"} Triggers ({Object.keys($triggers).length})
        </button>
    </span>
</nav>
<main>
    {#each $filtered as card}
        <StoryCard card={card}/>
    {:else}
        {#if $cards.length === 0}
            <p>
                Load some story cards to get started! Open a scenario or adventure, go to Edit > Details > Story Card
                Management, and export your story cards! When you're done editing, you can save them here and import
                them again in the same section.
            </p>
        {:else if $filter.empty || $filter.noDescription}
            <p>No errors found! You're good!</p>
        {:else}
            <p>You've filtered everything out! To reset, click the "Clear Filters" button!</p>
        {/if}
    {/each}
</main>