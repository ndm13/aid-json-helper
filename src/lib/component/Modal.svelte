<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    export let title: string;
    export let options: string[] = [];
</script>

<style>
main {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
header, footer {
    display: flex;
    flex-direction: row;
    padding: 2ex;
    place-items: center;
    gap: 1ex;
}
header {
    justify-content: space-between;
}
footer {
    justify-content: flex-end;
}
main > * {
    width: 80ex;
    max-width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 3ex;
}

h3 {
    padding: 0;
    margin: 0;
}
</style>

<main>
    <header>
        <h3>{title}</h3>
        <button on:click={() => dispatch("close")}>🗙</button>
    </header>
    <section>
        <slot>
        </slot>
    </section>
    <footer>
        {#each options as option}
            <button on:click={() => dispatch("option" + option.replace(" ", ""))}>{option}</button>
        {/each}
    </footer>
</main>