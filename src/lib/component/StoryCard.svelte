<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type {StoryCard} from "../model/StoryCard.ts";

    const dispatch = createEventDispatcher();
    export let card: StoryCard;

    let editingTriggers = false;
    let showDescription = false;
    let fullScreen = false;
</script>

<style>
    section {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        gap: 1ex;
        padding: 1em;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
    }

    section.fullScreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.9);
    }

    header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        column-gap: 1em;
    }

    header h3 {
        flex-grow: 1;
    }

    h3, h4 {
        margin: 0;
    }

    [contenteditable] {
        min-width: 1ex;
        display: inline-block;
        padding: 0.25ex 0.5ex;
        border-radius: 0.125ex;
        background-color: rgba(0, 0, 0, 0.25);
        border: 1px dotted rgba(127, 127, 127, 0.75);
    }

    [contenteditable]:hover, [contenteditable]:focus {
        background-color: rgba(127, 127, 127, 0.25);
    }

    .type {
        font-style: italic;
    }

    textarea {
        display: block;
        width: 100%;
        height: 6em;
        font-family: sans-serif;
        font-size: smaller;
    }
    section.fullScreen textarea {
        height: auto;
        flex-grow: 1;
    }

    .triggers {
        display: flex;
        gap: 1ex;
        flex-wrap: wrap;
        align-items: center;
    }

    .triggers input {
        flex-grow: 1;
    }

    .triggers kbd {
        white-space: pre;
        padding: 0.5ex;
        border-radius: 0.5ex;
        background-color: rgba(127, 127, 127, 0.5);
    }

    .triggers button:last-child {
        margin-left: auto;
    }

    .is_cc {
        background-color: #f8ae2c;
    }
</style>

<section class:fullScreen>
    <header>
        <button class:is_cc={card.useForCharacterCreation}
                title="Use for Character Creator [currently {card.useForCharacterCreation}]"
                on:click={() => {card.useForCharacterCreation = !card.useForCharacterCreation}}>✨
        </button>
        <h3 contenteditable="true" class="title" bind:innerText={card.title} on:focusout={() => dispatch("update")}>Placeholder Title</h3>
        <span contenteditable="true" class="type" bind:innerText={card.type} on:focusout={() => dispatch("update")}>Placeholder Type</span>
        <button on:click={() => {fullScreen = !fullScreen;}}>{!fullScreen ? '↗' : '↙'}</button>
    </header>
    <textarea class="value" bind:value={card.value} on:focusout={() => dispatch("update")}></textarea>
    <small>{card.value.length} character{card.value.length === 1 ? "" : "s"}</small>
    <div class="triggers">
        <h4>Triggers:</h4>
        {#if editingTriggers}
            <input type="text" bind:value={card.keys} on:focusout={() => dispatch("update")}/>
        {:else if (card.keys.length === 0)}<em>No Triggers!</em>{:else}
            {#each card.keys.split(',') as key}
                <kbd>{key}</kbd>
            {/each}
        {/if}
        <button on:click={() => {editingTriggers = !editingTriggers;}}>{!editingTriggers ? '✎' : '✔'}</button>
        <button on:click={() => {showDescription = !showDescription;}}>{!showDescription ? 'Show' : 'Hide'} Description</button>
    </div>
    {#if showDescription}
        <textarea class="description" bind:value={card.description} on:focusout={() => dispatch("update")}></textarea>
        <small>{card.description.length} character{card.description.length === 1 ? "" : "s"}</small>
    {/if}
</section>