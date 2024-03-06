<script lang="ts">
    import type {StoryCard as StoryCardType} from "./lib/model/StoryCard.ts";
    import StoryCard from "./lib/component/StoryCard.svelte";

    const data: StoryCardType[] = [];

    $: allTypes = [];
    let types: string[] = [];
    let titleContains: string = "";
    let valueContains: string = "";
    let keyContains: string = "";

    $: filtered = data.filter(c =>
        types.indexOf(c.type) > -1 &&
        c.title.indexOf(titleContains) > -1 &&
        c.value.indexOf(valueContains) > -1 &&
        c.keys.split(',').filter(s => s.toLowerCase().indexOf(keyContains) > -1).length > 0);

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
            <input name="title" bind:value={titleContains}/>
            <label for="value">Value:</label>
            <input name="value" bind:value={valueContains}/>
            <label for="tags">Tags:</label>
            <input name="tags" bind:value={keyContains}/>
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
</nav>
<main>
    {#each filtered as card}
        <StoryCard card={card}/>
    {/each}
</main>