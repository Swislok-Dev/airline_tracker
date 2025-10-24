<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/globals.css';

	import { page } from '$app/stores';

	let { children } = $props();
	function capRouteName(routeName) {
		return routeName.charAt(0).toUpperCase() + routeName.slice(1);
	}
</script>

<svelte:head>
	{#if $page.url.pathname == '/'}
		<title>Airline Tracker</title>
	{:else}
		<title>{capRouteName($page.url.pathname.slice(1))}</title>
	{/if}

	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
