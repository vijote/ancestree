<script>
    import Circle from "../icons/circle.svelte";
    import Triangle from "../icons/triangle.svelte";

</script>
<svelte:head>
    <title>Digyvira | Construye tu arbol familiar</title>
    <meta name="description" content="Sitio web para armar tu arbol genealogico">
    <meta name="keywords" content="transgeneracional, arbol, digyvira, ancestros, familia, sistema">
    <meta name="author" content="John Doe">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<h1>Bienvenido a Digyvira</h1>
<div class="container">
    <Circle/>
    <Triangle/>
</div>

<style>
    .container {
        height: 200px;
        display: flex;
    }
</style>