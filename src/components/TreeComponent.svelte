<script lang="ts">
    // Lifecycle methods
    import { onDestroy } from "svelte";

    // Entities
    import Tree from "../entities/Tree";
    import { zoom } from "../stores/zoomStore";

    // Svelte components
    import MemberComponent from "./MemberComponent.svelte";

    // State getter
    let tree = Tree.initializeTree();

    // Store getter
    let zoomValue: number;

	const unsubscribe = zoom.subscribe(value => {
		zoomValue = value;
	});

    onDestroy(unsubscribe);

    // State setter
    const setTree = (stateModifier: Function) => (_evt: MouseEvent) => {
        stateModifier();        
        tree = tree;
    };
</script>

<div class="container">
    {#each tree.levels as level}
        {#each [...level.children] as [_childKey, child]}
            <MemberComponent
                changeType={setTree(child.changeType)}
                addToTheRight={setTree(
                    level.addChildToTheRight(child.buildSiblingToTheRight())
                )}
                addParents={setTree(
                    tree.addLevelUpwards(child.x)
                )}
                type={child.type}
                --icon-size={`${child.icon_size * (zoomValue / 100)}%`}
                --y-coord={level.y}
                --x-coord={child.formatted_x}
            />
        {/each}
    {/each}
</div>

<style>
    .container {
        position: relative;
        height: 100%;
        min-height: 400px;
    }
</style>
