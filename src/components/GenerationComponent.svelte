<script lang="ts">
    import Dimensions from "../entities/Dimensions";
    import type Generation from "../entities/Generation";
    import MemberComponent from "./MemberComponent.svelte";

    export let generation: Generation;
    export let zoom: number;
    export let setTree: (callback: Function) => (evt: MouseEvent) => void;
    export let addParents: Function;
</script>

<div data-testid="generation" class="generation-container">    
    <!-- Members -->
    {#each [...generation.members] as member}
        <MemberComponent
            changeType={setTree(member.changeType)}
            addToTheRight={setTree(generation.addMember)}
            addParents={setTree(addParents(member))}
            type={member.type}
            --icon-size={Dimensions.Member.calculateIconSize({
                iconSize: Dimensions.Member.iconSize,
                zoomValue: zoom,
            })}
        />
    {/each}
</div>

<style>
    .generation-container {
        display: flex;
    }
</style>
