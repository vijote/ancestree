<script>
    import Member from "../components/member.svelte";
    import { MemberType } from "../types/types";
</script>

<svelte:head>
    <title>Digyvira | Construye tu arbol familiar</title>
    <meta
        name="description"
        content="Sitio web para armar tu arbol genealogico"
    />
    <meta
        name="keywords"
        content="transgeneracional, arbol, digyvira, ancestros, familia, sistema"
    />
    <meta name="author" content="vijote" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="container">
    <Member
        type={MemberType.Female}
        --y-coord="0%"
        --x-coord="50%"
    />
    <Member type={MemberType.Male} />
</div>

<style>
    .container {
        position: relative;
        height: 100%;
        min-height: 400px;
    }
</style>
