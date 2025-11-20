<script>
	import { resolve } from '$app/paths';
	import FlightTicket from '../components/flights/flightTicket.svelte';
	import SearchForm from '../components/searchForm/+page.svelte';
	let { ident } = $props();
</script>

<header>
	<nav>
		<h1>
			<a href={resolve('/')}>Flight Tracker</a>
		</h1>
	</nav>
</header>

<main>
	<div>
		<SearchForm {ident} />
		<FlightTicket />
	</div>
</main>

<style>
	header {
		padding: 1rem 0;
		text-align: center;
		margin-bottom: 1rem;
		color: white;
	}

	main {
		margin: auto;
		width: 100%;
		max-width: 768px;
	}

	h1 {
		font-size: 1.875rem;
		line-height: 2.25rem;
		font-weight: 700;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
