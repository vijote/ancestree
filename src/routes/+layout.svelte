<script lang="ts">
    import { onDestroy } from "svelte";
    import { zoom, actions } from "../stores/zoomStore";

    let zoomValue: number;

	const unsubscribe = zoom.subscribe(value => {
		zoomValue = value;
	});

    onDestroy(unsubscribe);
</script>

<nav class="navbar">
    <span>Digyvira</span>
    <div>
        <button on:click={actions.increment}>+</button>
        <span>Zoom {zoomValue}%</span>
        <button on:click={actions.decrement}>-</button>
    </div>
</nav>
<main>
    <slot />
</main>
<footer>
    Copyright {new Date().getFullYear()}
</footer>

<style>
    :global(body) {
        height: 100%;
    }

    :global(html) {
        height: 100%;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
    }
</style>
