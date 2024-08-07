<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import type {StoryCard} from "../model/StoryCard.ts";
    import Modal from "./Modal.svelte";
    import StoryCardController from "../controller/StoryCardController.ts";
    import {cards} from "../stores";

    const dispatch = createEventDispatcher();
    export let card: StoryCard;
    let index = $cards.findIndex(c => c === card) + 1;
    let newIndex = index;

    $: controller = new StoryCardController(card);

    let actionMenu = false;
    let editingTriggers = false;
    let showDescription = false;
    let fullScreen = false;
    let deleting = false;

    function reorder() {
        if (newIndex > $cards.length) newIndex = $cards.length;
        if (newIndex < 1) newIndex = 0;
        if (newIndex !== index) {
            dispatch("reorder", {
                old: index - 1,
                current: newIndex - 1
            });
            newIndex = index;
            actionMenu = !actionMenu;
        }
    }
</script>

<style>
    section {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        gap: 1ex;
        padding: 1em;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(1ex);
        width: 100%;
        border-radius: 1ex;
    }

    section.fullScreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 100;
    }

    header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        column-gap: 1em;
    }

    header.actionMenu {
        justify-content: flex-start;
        align-items: flex-start;
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
        background-color: var(--color-highlight);
        color: black;
    }

    .reorder input {
        border-radius: 1ex 0 0 1ex;
        line-height: 1.5em;
        padding: 1ex 0 1ex 1ex;
        margin-right: 0;
        border: 1px solid var(--color-light);;
    }

    .reorder button {
        border-radius: 0 1ex 1ex 0;
        margin-left: 0;
    }
</style>

<section class:fullScreen>
    <header class:actionMenu>
        <button title="Toggle actions" on:click={() => actionMenu = !actionMenu}>⋯</button>
        {#if actionMenu}
            <span class="reorder">
                <input type="number" min="1" max="{$cards.length + 1}"
                       bind:value={newIndex}
                       on:keyup={e => {if (e.key === "Enter") reorder()}}/>
                <button on:click={reorder}>Reorder</button>
            </span>
            <button on:click={() => {deleting = true; actionMenu = !actionMenu;}}>Delete</button>
            <button on:click={() => {controller.copyJson(); actionMenu = !actionMenu;}}>Copy JSON</button>
            <button on:click={() => {controller.copyMarkdown(); actionMenu = !actionMenu;}}>Copy Markdown</button>
        {:else}
            <button class:is_cc={card.useForCharacterCreation}
                    title="Use for Character Creator [currently {card.useForCharacterCreation}]"
                    on:click={() => {card.useForCharacterCreation = !card.useForCharacterCreation}}>✨
            </button>
            <h3 contenteditable="true" class="title" bind:innerText={card.title} on:focusout={() => dispatch("update")}>
                Placeholder Title</h3>
            <span contenteditable="true" class="type" bind:innerText={card.type} on:focusout={() => dispatch("update")}>
                Placeholder Type</span>
            <button on:click={() => {fullScreen = !fullScreen;}}>{!fullScreen ? '↗' : '↙'}</button>
        {/if}
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
        <button on:click={() => {showDescription = !showDescription;}}>{!showDescription ? 'Show' : 'Hide'}
            Description
        </button>
    </div>
    {#if showDescription}
        <textarea class="description" bind:value={card.description} on:focusout={() => dispatch("update")}></textarea>
        <small>{card.description.length} character{card.description.length === 1 ? "" : "s"}</small>
    {/if}
</section>
{#if deleting}
    <Modal title="Delete card '{card.title}'?"
           options={["Yes","No"]}
           on:optionYes={() => {dispatch("delete"); deleting = false;}}
           on:optionNo={() => deleting = false}
           on:close={() => deleting = false}>
        <p>Are you sure you want to delete this card?</p>
    </Modal>
{/if}