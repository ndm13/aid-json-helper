<script lang="ts">
    import {derived, writable} from 'svelte/store';
    import resettable from "./lib/util/resettable.ts";
    import type {StoryCard as StoryCardType} from "./lib/model/StoryCard.ts";
    import StoryCard from "./lib/component/StoryCard.svelte";
    import Help from "./lib/component/Help.svelte";
    import Filter from "./lib/component/Filter.svelte";
    import {newCard, newFilterSupplier} from "./lib/util/suppliers.ts";

    const cards = writable<StoryCardType>([]);
    const types = derived(cards, cards => [...new Set(cards.map(c => c.type))]);

    const filter = resettable(newFilterSupplier(types));

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

    let files: FileList;

    async function fileUpdate() {
        if (files) {
            await files[0].text()
                .then(t => JSON.parse(t))
                .then(c => {
                    $cards = c;
                    filter.reset();
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

    header .io {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1ex;
        align-items: center;
        justify-content: space-around;
    }
</style>
<header>
    <h2>Story Card Viewer/Editor</h2>
    <span class="helpbox">
        <Help/>
    </span>
    <section class="io">
        <button on:click={() => {$cards = [newCard(), ...$cards]; $filter.types.indexOf("placeholder") > -1 || ($filter.types = ["placeholder", ...$filter.types]);}}>
            Add Card
        </button>
        <input accept="application/json,text/json,.json" type="file" bind:files={files} on:change={fileUpdate}/>
        <button on:click={download}>Save</button>
    </section>
    <em>Showing {$filtered.length} entries out of {$cards.length}</em>
</header>
<Filter cards={cards} types={types} filter={filter}/>
<main>
    <!-- Ensure internal changes refresh parent store -->
    {#each $filtered as card}
        <StoryCard card={card}
                   on:update={() => cards.update(c => c)}
                   on:delete={() => cards.update(c => c.filter(c => c !== card))}/>
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