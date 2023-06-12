<script lang="ts">
    // Lifecycle methods
    import { onDestroy } from "svelte";

    // Entities
    import Tree from "../entities/Tree";
    import Member from "../entities/Member";
    import Dimensions from "../entities/Dimensions";

    // Svelte Stores
    import { zoom } from "../stores/zoomStore";

    // Svelte components
    import MemberComponent from "./MemberComponent.svelte";
    import UnionComponent from "./UnionComponent.svelte";
    import type { Dependencies } from "../entities/Dependencies";
    import GenerationComponent from "./GenerationComponent.svelte";

    // Props
    export let getDependencies: () => Dependencies;

    // State getter
    let tree: Tree = Tree.initializeTree(getDependencies());

    // Store getter
    let zoomValue: number;

    const unsubscribe = zoom.subscribe((value) => {
        zoomValue = value;
    });

    onDestroy(unsubscribe);

    // State setter
    const setTree = (stateModifier: Function) => (_evt: MouseEvent) => {
        stateModifier();
        tree = tree;
    };
</script>

<div data-testid="tree" class="container">
    {#each tree.generations as generation}
        <GenerationComponent
            {setTree}
            zoom={zoomValue}
            {generation}
            addParents={tree.addParents}
        />
        
    {/each}
</div>

<style>
    .container {
        position: relative;
        height: 100%;
        min-height: 400px;
    }
</style>
