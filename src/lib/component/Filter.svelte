<script lang="ts">
    import {derived} from 'svelte/store';
    import {cards, filter, types} from "../stores.ts";

    const triggers = derived(cards, cards => {
        const triggers = cards
            .map(c => c.keys.split(','))
            .reduce((a, v) => {
                v.forEach(t => a[t] ? a[t].count++ : a[t] = {count: 1});
                return a;
            }, {});
        const keys = Object.keys(triggers);
        keys.forEach(t => triggers[t].overlap = keys.filter(k => k.indexOf(t) > -1 && t !== k).length);
        return Object.entries(triggers).map(([k, v]) => {
            v.key = k;
            return v;
        });
    });

    let tab = "filter";
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

    .sort {
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

    #tabbar {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 1ex;
    }

    #tabbar span {
        display: inline-block;
        background-color: var(--color-dark);
        border-radius: 1ex 1ex 0 0;
        border: 1px solid var(--color-light);
        padding: 1ex 1em 2ex;
        margin-bottom: -1ex;
        cursor: pointer;
        user-select: none;
    }

    #tabbar span.focus, nav > section {
        background-color: var(--color-light);
    }

    nav > section {
        padding: 1ex 1em;
        border-radius: 0 1ex 1ex 1ex;
    }
</style>

<nav>
    <div id="tabbar">
        <span class:focus={tab === "filter"} on:click={() => tab = "filter"}>Filter</span>
        <span class:focus={tab === "sort"} on:click={() => tab = "sort"}>Sort</span>
        <span class:focus={tab === "error"} on:click={() => tab = "error"}>Fix Common Errors</span>
        <span class:focus={tab === "trigger"}
              on:click={() => tab = "trigger"}>Triggers ({Object.keys($triggers).length})</span>
    </div>
    {#if tab === "filter"}
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
            <button on:click={() => filter.reset()}>Clear Filters</button>
        </section>
    {:else if tab === "sort"}
        <section class="sort">
            <div class="rowflow">
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
            </div>
            <button on:click={() => $filter.sort.asc = !$filter.sort.asc}>
                Sort {$filter.sort.asc ? "Descending" : "Ascending"}</button>
        </section>
    {:else if tab === "error"}
        <section class="issues rowflow">
                <span>
                    <input title="Shows cards with empty or missing triggers. Empty triggers will cause cards to trigger constantly, while missing triggers will cause them to never trigger."
                           type="checkbox" id="empty" name="empty" bind:checked={$filter.empty}/>
                    <label for="empty">Empty triggers</label>
                </span>
            <span>
                    <input title="Shows cards that are shown in character creator, but have no description. This only applies if you use character creator!"
                           type="checkbox" id="noDescription" name="noDescription"
                           bind:checked={$filter.noDescription}/>
                    <label for="noDescription">No Character Creator description</label>
                </span>
        </section>
    {:else}
        <section class="triggers">
            {#each $triggers as trigger}
                <kbd on:click={() => {filter.reset(); trigger.key === "" ? $filter.empty = true : $filter.key = trigger.key;}}
                     class:plural={trigger.count > 1}
                     class:overlap={trigger.overlap > 0}>
                    {trigger.key}{trigger.count > 1 ? " x" + trigger.count : ""}{trigger.overlap > 0 ? " +" + trigger.overlap : ""}</kbd>
            {:else}
                <p>No triggers loaded!</p>
            {/each}
        </section>
    {/if}
</nav>