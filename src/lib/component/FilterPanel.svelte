<script lang="ts">
    import {cards, filter, types} from "../stores.ts";
    import {FilterSortMode} from "../model/Filter.ts";
    import Modal from "./Modal.svelte";
    import FilterController from "../controller/FilterController.ts";

    const controller = new FilterController();
    const {triggers, cardsWithOfficialCleanupFail, cardsWithEmptyTriggers} = controller;

    enum Tab { FILTER, SORT, ERROR, TRIGGER }

    let tab = Tab.FILTER;
    let removeTriggers = false;
    let aidCleanup = false;
</script>

<style>
    nav {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .filter, .type {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1ex;
        align-items: center;
        justify-content: space-around;
    }

    .searchWithin {
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: max-content max-content;
        grid-auto-rows: max-content;
        gap: 1ex;
    }

    .searchWithin label {
        place-self: end;
    }

    .sort, .issues {
        display: flex;
        flex-direction: column;
        gap: 1ex;
        align-items: center;
    }

    .rowflow {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1ex;
        justify-content: center;
    }

    .rowflow > * {
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
        background-color: var(--color-dark);
        cursor: pointer;
    }

    .triggers kbd.plural {
        background-color: #800;
    }

    .triggers kbd.overlap {
        background-color: #840;
    }

    .triggers p {
        text-align: center;
        width: 100%;
    }

    .tabs {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 1ex;
    }

    .tabs span {
        display: inline-block;
        background-color: var(--color-dark);
        border-radius: 1ex 1ex 0 0;
        border: 1px solid var(--color-light);
        padding: 1ex 1em 2ex;
        margin-bottom: -1ex;
        cursor: pointer;
        user-select: none;
    }

    .tabs span.focus, nav > section {
        background-color: var(--color-light);
    }

    nav > section {
        padding: 1ex 1em;
        border-radius: 0 1ex 1ex 1ex;
    }

    ul {
        text-align: left;
    }
</style>

<nav>
    <div class="tabs">
        <span class:focus={tab === Tab.FILTER}
              on:click={() => tab = Tab.FILTER}>Filter</span>
        <span class:focus={tab === Tab.SORT}
              on:click={() => tab = Tab.SORT}>Sort</span>
        <span class:focus={tab === Tab.ERROR}
              on:click={() => tab = Tab.ERROR}>Fix Common Errors</span>
        <span class:focus={tab === Tab.TRIGGER}
              on:click={() => tab = Tab.TRIGGER}>Triggers ({Object.keys($triggers).length})</span>
    </div>
    {#if tab === Tab.FILTER}
        <section class="filter">
            {#if $cards.length === 0}
                <p>No cards loaded: nothing to filter!</p>
            {:else}
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
                    {#if $filter.types.length === 0 && $types.length > 0}
                        <button on:click={() => $filter.types = $types}>Select All Types</button>
                    {:else}
                        <button on:click={() => $filter.types = []}>Clear Types</button>
                    {/if}
                </fieldset>
                <button on:click={() => filter.reset()}>Clear Filters</button>
            {/if}
        </section>
    {:else if tab === Tab.SORT}
        <section class="sort">
            <small>Sorting type:</small>
            <div class="rowflow">
                <span>
                    <input type="radio" id="alpha" name="sort" value={FilterSortMode.ALPHA}
                           bind:group={$filter.sort.mode}/>
                    <label for="alpha">Alphabetically</label>
                </span>
                <span>
                    <input type="radio" id="type" name="sort" value={FilterSortMode.TYPE}
                           bind:group={$filter.sort.mode}/>
                    <label for="type">By type</label>
                </span>
                <span>
                    <input type="radio" id="length" name="sort" value={FilterSortMode.LENGTH}
                           bind:group={$filter.sort.mode}/>
                    <label for="length">By entry length</label>
                </span>
            </div>
            <button on:click={() => $filter.sort.asc = !$filter.sort.asc}>
                Sort {$filter.sort.asc ? "Descending" : "Ascending"}</button>
        </section>
    {:else if tab === Tab.ERROR}
        <section class="issues">
            <small>Show cards that match:</small>
            <div class="rowflow">
                <span>
                    <input title="Shows cards with empty. Empty triggers will cause cards to trigger constantly."
                           type="checkbox" id="empty" name="empty" bind:checked={$filter.empty}/>
                    <label for="empty">Empty triggers</label>
                </span>
                <span>
                    <input title="Shows cards with missing triggers. Missing triggers will cause cards to never trigger."
                           type="checkbox" id="missing" name="missing" bind:checked={$filter.missing}/>
                    <label for="missing">Missing triggers</label>
                </span>
                <span>
                    <input title="Shows cards that are shown in character creator, but have no description. This only applies if you use character creator!"
                           type="checkbox" id="noDescription" name="noDescription"
                           bind:checked={$filter.noDescription}/>
                    <label for="noDescription">No Character Creator description</label>
                </span>
            </div>
            <small>Automatically fix:</small>
            <div class="rowflow">
                <button on:click={() => removeTriggers = true} disabled={$cardsWithEmptyTriggers.length === 0}>
                    Remove All Empty Triggers ({$cardsWithEmptyTriggers.length})
                </button>
                <button on:click={() => aidCleanup = true} disabled={$cardsWithOfficialCleanupFail.length === 0}>
                    Apply Official Cleanup Fix ({$cardsWithOfficialCleanupFail.length})
                </button>
            </div>
        </section>
    {:else}
        <section class="triggers">
            {#each $triggers as trigger}
                <kbd on:click={() => {filter.reset(); trigger.key === "" ? $filter.empty = true : $filter.key = trigger.key;}}
                     class:plural={trigger.count > 1}
                     class:overlap={trigger.overlap > 0}>{trigger.key}{trigger.count > 1 ? " x" + trigger.count : ""}{trigger.overlap > 0 ? " +" + trigger.overlap : ""}</kbd>
            {:else}
                <p>No triggers loaded!</p>
            {/each}
        </section>
    {/if}
</nav>
{#if removeTriggers}
    <Modal title={`Remove empty triggers from ${$cardsWithEmptyTriggers.length} card${$cardsWithEmptyTriggers.length === 1 ? "" : "s"}?`}
           options={["Yes","No"]}
           on:optionYes={() => {removeTriggers = false; controller.removeEmptyTriggers();}}
           on:optionNo={() => removeTriggers = false}
           on:close={() => removeTriggers = false}>
        <p>Are you sure you want to remove empty triggers from ALL cards?</p>
        <p>The following cards will be affected:</p>
        <ul>
            {#each $cardsWithEmptyTriggers as card}
                <li><strong>{card.title}</strong> <em>{card.type}</em></li>
            {/each}
        </ul>
        <em>Hint: to remove an empty trigger from a specific card, you can edit its trigger list.</em>
    </Modal>
{/if}
{#if aidCleanup}
    <Modal title={`Apply cleanup fix to ${$cardsWithOfficialCleanupFail.length} card${$cardsWithOfficialCleanupFail.length === 1 ? "" : "s"}?`}
           options={["Yes","No"]}
           on:optionYes={() => {aidCleanup = false; controller.applyCleanupFix();}}
           on:optionNo={() => aidCleanup = false}
           on:close={() => aidCleanup = false}>
        <p>
            Latitude recently rolled out a fix for some trigger-related bugs intended to catch dangling commas and
            whitespace. This fix is automatically applied when saving story cards, but does not affect imported or
            existing cards. You should apply this fix to prevent unexpected behavior in the future. Note that this
            doesn't remove ALL empty triggers:
            <a href="https://discord.com/channels/903327676884979802/1231032986414092318/1231367605470625823">this is
            intentional</a>.
        </p>
        <p>
            <strong>
                If you need empty trigger behavior, include it via <kbd>, ,</kbd> or <kbd> ,</kbd> at the start of
                your list of keys!
            </strong>
        </p>
        <p>The following cards will be affected:</p>
        <ul>
            {#each $cardsWithOfficialCleanupFail as card}
                <li><strong>{card.title}</strong> <em>{card.type}</em></li>
            {/each}
        </ul>
        <em>Hint: to remove an empty trigger from a specific card, you can edit its trigger list.</em>
    </Modal>
{/if}