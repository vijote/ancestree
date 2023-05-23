<script lang="ts">
    import Member from "../components/member.svelte";
    import Ancestor from "../types/Ancestor";
    import { MemberType, type AncestorLevel, type UUID } from "../types/types";

    // State getter
    let ancestors = initializeAncestorsState();

    // State initializer
    function initializeAncestorsState() {
        const id = crypto.randomUUID();
        const level: AncestorLevel = new Map([
            [
                crypto.randomUUID(),
                new Ancestor(MemberType.Female, 25, 0, id),
            ],
        ]);

        return new Map([[id, level]]);
    }

    // State setter
    const updateAncestors =
        (changeTypeMethod: Function) => (_evt: MouseEvent) => {
            changeTypeMethod();
            ancestors = ancestors;
        };

    const addHorizontally = (levelId: UUID, newAncestor: Ancestor) => () => {
        ancestors.get(levelId)?.set(crypto.randomUUID(), newAncestor)
    };
</script>

<div class="container">
    {#each [...ancestors] as [_levelId, level]}
        {#each [...level] as [_levelKey, member]}
            <Member
                changeType={updateAncestors(member.changeType)}
                addToTheRight={updateAncestors(
                    addHorizontally(
                        member.levelId,
                        member.buildSiblingToTheRight()
                    )
                )}
                type={member.type}
                --y-coord={member.y}
                --x-coord={member.x}
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
