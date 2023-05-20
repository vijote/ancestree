<script lang="ts">
    import { MemberType } from "../types/types";

    import Circle from "../icons/circle.svelte";
    import Triangle from "../icons/triangle.svelte";

    export let type: MemberType = MemberType.Male;

    function switchType() {
        type = type === MemberType.Female ? MemberType.Male : MemberType.Female
    }
</script>

<div class="member-container">
    {#if type === MemberType.Male}
        <Triangle />
    {:else}
        <Circle />
    {/if}
    <div class="type-switch-container">
        <button on:click={switchType} class="type-switch">Cambiar tipo</button>
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
        height: 100%;
        position: absolute;
        top: 0%;
        left: 0%;
        right: 0%;
    }
</style>
