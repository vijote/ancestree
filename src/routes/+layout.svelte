<nav>
    Digyvira
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
</style>