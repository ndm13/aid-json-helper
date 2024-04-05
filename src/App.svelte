<script lang="ts">
    import StoryCard from "./lib/component/StoryCard.svelte";
    import Help from "./lib/component/Help.svelte";
    import Filter from "./lib/component/Filter.svelte";
    import IoPanel from "./lib/component/IoPanel.svelte";
    import {cards, filter, filtered} from "./lib/stores.ts";
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
    <IoPanel/>
</header>
<Filter/>
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