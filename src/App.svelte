<script lang="ts">
    import {derived, writable} from 'svelte/store';
    import resettable from "./lib/util/resettable.ts";
    import type {StoryCard as StoryCardType} from "./lib/model/StoryCard.ts";
    import StoryCard from "./lib/component/StoryCard.svelte";
    import Help from "./lib/component/Help.svelte";
    import Filter from "./lib/component/Filter.svelte";
    import IoPanel from "./lib/component/IoPanel.svelte";

    const cards = writable<StoryCardType>([]);
    const types = derived(cards, cards => [...new Set(cards.map(c => c.type))]);

    const filter = resettable(() => {
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
    });

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
                        return (filter.sort.asc ? a.title.toLowerCase() > b.title.toLowerCase() : b.title.toLowerCase() > a.title.toLowerCase()) ? 1 : -1;
                    case "type":
                        return (filter.sort.asc ? a.type.toLowerCase() > b.type.toLowerCase() : b.type.toLowerCase() > a.type.toLowerCase()) ? 1 : -1;
                    case "length":
                        return filter.sort.asc ? a.value.length - b.value.length : b.value.length - a.value.length;
                }
            });
    });
</script>

<style>
    main {
        display: flex;
        flex-flow: column wrap;
        gap: 1ex;
        width: 100%;
    }

    main > p {
        width: 100ex;
        max-width: 100%;
        margin: auto;
    }

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        margin: 1em;
    }

    h2 {
        margin: 0;
        padding: 0;
    }
</style>
<header>
    <h2>Story Card Viewer/Editor</h2>
    <Help/>
    <IoPanel cards={cards} filter={filter} filtered={filtered}/>
</header>
<Filter cards={cards} types={types} filter={filter}/>
<main>
    <em>Showing {$filtered.length} entries out of {$cards.length}</em>
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