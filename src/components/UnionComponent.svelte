<script lang="ts">
    // Types
    import { UnionType } from "../entities/Union";

    // Svelte components
    import FreeUnion from "./icons/FreeUnion.svelte";
    import LoversUnion from "./icons/LoversUnion.svelte";
    import MarriageUnion from "./icons/MarriageUnion.svelte";

    // Props
    export let type: UnionType;

    const UnionDictionary = {
        [UnionType.Free]: FreeUnion,
        [UnionType.Lovers]: LoversUnion,
        [UnionType.Marriage]: MarriageUnion,
    };
</script>

<svelte:component this={UnionDictionary[type]} />
