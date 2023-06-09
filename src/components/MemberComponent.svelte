<script lang="ts">
    import FemaleIcon from "./icons/FemaleMember.svelte";
    import MaleIcon from "./icons/MaleMember.svelte";
    import { MemberType } from "../entities/Member";

    // Props
    export let type: MemberType = MemberType.Male;
    export let changeType: (evt: MouseEvent) => void;
    export let addToTheRight: (evt: MouseEvent) => void;
    export let addParents: (evt: MouseEvent) => void;

    const MemberDictionary = {
        [MemberType.Male]: MaleIcon,
        [MemberType.Female]: FemaleIcon
    }
</script>

<div class="member-container" data-testid="member" tabindex="-1">
    <svelte:component this={MemberDictionary[type]}/>

    <div class="type-switch-container">
        <button data-testid="add-parents-button" on:click={addParents} class="type-switch">P</button>
        <button data-testid="change-type-button" on:click={changeType} class="type-switch">G</button>
        <button data-testid="add-to-the-right-button" on:click={addToTheRight} class="type-switch">H</button>
    </div>
</div>

<style>
    .member-container {
        height: var(--icon-size);
        width: var(--icon-size);
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

        padding: 0.5rem;
        background-color: aquamarine;
    }

    .type-switch:focus {
        outline: orange 5px auto;
    }

    .member-container:hover > .type-switch-container {
        display: flex;
        position: absolute;
        justify-content: space-between;
        top: -30%;
        left: 0%;
        right: 0%;
    }
</style>
