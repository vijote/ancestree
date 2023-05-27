<script lang="ts">
    import Circle from "./icons/circle.svelte";
    import Triangle from "./icons/triangle.svelte";
    import { MemberType } from "../entities/Member";

    // Props
    export let type: MemberType = MemberType.Male;
    export let changeType: (evt: MouseEvent) => void;
    export let addToTheRight: (evt: MouseEvent) => void;
    export let addParents: (evt: MouseEvent) => void;
</script>

<div class="member-container">
    {#if type === MemberType.Male}
        <Triangle />
    {:else}
        <Circle />
    {/if}
    <div class="type-switch-container">
        <button on:click={addParents} class="type-switch">Agregar padres</button>
        <button on:click={changeType} class="type-switch">Cambiar tipo</button>
        <button on:click={addToTheRight} class="type-switch">Agregar a la derecha</button>
    </div>
</div>

<style>
    .member-container {
        height: 200px;
        position: absolute;
        left: var(--x-coord);
        top: var(--y-coord);
    }

    .type-switch-container {
        display: none;
    }

    .type-switch {
        all: unset;
        cursor: pointer;

        margin-top: auto;
        margin-left: auto;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        background-color: aquamarine;
    }

    .type-switch:focus {
        outline: orange 5px auto;
    }

    .member-container:hover > .type-switch-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: absolute;
        top: 0%;
        left: 0%;
        right: 0%;
    }
</style>
