<script lang="ts">
    // Lifecycle methods
    import { onDestroy } from "svelte";

    // Entities
    import Tree from "../entities/Tree";
    import Member from "../entities/Member";

    // Svelte Stores
    import { zoom } from "../stores/zoomStore";

    // Svelte components
    import MemberComponent from "./MemberComponent.svelte";
    import UnionComponent from "./UnionComponent.svelte";
    import type { Dependencies } from "../entities/Dependencies";

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
        <!-- Unions -->
        {#each generation.unions as union}
            {union.startingPoint} - {union.endingPoint}
            <UnionComponent
                type={union.type}
                --y-coord={`${((generation.height + 1) * Member.icon_size) + Member.margin + 2.5}%`}
                --starting-point={union.startingPoint}
                --ending-point={union.endingPoint}
            />
        {/each}

        <!-- Members -->
        {#each [...generation.members] as [_key, member]}
            <MemberComponent
                changeType={setTree(member.changeType)}
                addToTheRight={setTree(
                    generation.addMember(member.buildSiblingToTheRight())
                )}
                addParents={setTree(tree.addParents(member))}
                type={member.type}
                --icon-size={`${Member.icon_size * (zoomValue / 100)}%`}
                --y-coord={generation.y}
                --x-coord={member.formatted_x}
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
