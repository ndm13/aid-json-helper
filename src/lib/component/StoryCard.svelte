<script lang="ts">
    import type {StoryCard} from "../model/StoryCard.ts";

    export let card: StoryCard;

    let editingTriggers = false;
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

    header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        column-gap: 1em;
    }

    h3, h4 {
        margin: 0;
    }

    [contenteditable] {
        min-width: 1ex;
        display: inline-block;
        padding: 0.25ex 0.5ex;
        border-radius: 0.125ex;
        background-color: rgba(0,0,0,0.25);
        border: 1px dotted rgba(127,127,127,0.75);
    }

    [contenteditable]:hover, [contenteditable]:focus {
        background-color: rgba(127,127,127,0.25);
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
    }

    .is_cc {
        background-color: #f8ae2c;
    }
</style>

<section>
    <header>
        <button class:is_cc={card.useForCharacterCreation}
                title="Use for Character Creator [currently {card.useForCharacterCreation}]"
                on:click={() => {card.useForCharacterCreation = !card.useForCharacterCreation}}>✨
        </button>
        <h3 contenteditable="true" class="title" bind:innerText={card.title}>Placeholder Title</h3>
        <span contenteditable="true" class="type" bind:innerText={card.type}>Placeholder Type</span>
    </header>
    <textarea class="value" bind:value={card.value}></textarea>
    <div class="triggers">
        <h4>Triggers:</h4>
        {#if editingTriggers}
            <input type="text" bind:value={card.keys}/>
        {:else if (card.keys.length === 0)}<em>No Triggers!</em>{:else}
            {#each card.keys.split(',') as key}
                <kbd>{key}</kbd>
            {/each}
        {/if}
        <button on:click={() => {editingTriggers = !editingTriggers;}}>{!editingTriggers ? '✎' : '✔'}</button>
    </div>
</section>