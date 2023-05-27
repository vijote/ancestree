<script lang="ts">
    // Entities
    import Tree from "../entities/Tree";

    // Svelte components
    import MemberComponent from "./MemberComponent.svelte";

    // State getter
    let tree = Tree.initializeTree();

    // State setter
    const setTree = (stateModifier: Function) => (_evt: MouseEvent) => {
        stateModifier();
        tree = tree;
    };
</script>

<div class="container">
    {#each tree.levels as level}
        {level.y}
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
