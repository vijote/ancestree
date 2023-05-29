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

    // State getter
    let tree = Tree.initializeTree();

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

<div class="container">
    {#each tree.levels as level}
        <!-- Unions -->
        {#each level.unions as union}
            {union.startingPoint} - {union.endingPoint}
            <UnionComponent
                type={union.type}
                --y-coord={`${((level.height + 1) * Member.icon_size) + Member.margin + 2.5}%`}
                --starting-point={union.startingPoint}
                --ending-point={union.endingPoint}
            />
        {/each}

        <!-- Members -->
        {#each [...level.members] as [_key, member]}
            <MemberComponent
                changeType={setTree(member.changeType)}
                addToTheRight={setTree(
                    level.addMember(member.buildSiblingToTheRight())
                )}
                addParents={setTree(tree.addParents(member))}
                type={member.type}
                --icon-size={`${Member.icon_size * (zoomValue / 100)}%`}
                --y-coord={level.y}
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
