<script>
	import { searchStore } from '../../stores';
	let flightArray = $state();

	let { ident } = $props();

	async function handleSubmit(ident) {
		console.log('handleSubmit ident:', { ident });
		flightArray = await fetch(`api/flight/${ident}`, {});
		const flightData = await flightArray.json();

		searchStore.set({ flightData });

		console.log('from searchForm/+page.svelte:', {
			flightData
		});
		return {
			state: { flightData }
		};
	}
</script>

<!-- <section id="search-form"> -->
<form
	onsubmit={() => handleSubmit(ident)}
	class="form-control"
	method="GET"
	action="?/submitData"
>
	<label for="ident">Please enter a flight number</label>
	<div id="search-input">
		<input
			type="text"
			name="ident"
			placeholder="ua3"
			bind:value={ident}
		/>
		<button
			id="search-button"
			type="submit"
			value="Find Flight"
		>
			Search
		</button>
	</div>
</form>

<!-- </section> -->

<style>
	.form-control {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto;
		width: 100%;
		gap: 1rem;
	}
	form {
		padding: 0 0.5rem;
		width: 95%;
		max-width: 28rem;
	}

	#search-input {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 5px;
		width: 100%;
	}

	@media (max-width: 450px) {
		#search-input {
			flex-direction: column;
			align-items: center;
		}
	}

	input {
		font-size: 1rem;
		flex-grow: 3;
		width: 75%;
		margin: auto;
		padding: 5px;
		text-align: center;
		text-transform: uppercase;
		border-color: red;
		border-radius: 0.25rem;
	}

	input::placeholder {
		opacity: 30%;
	}

	button {
		padding: 5px;
		flex-shrink: 4;
		width: 75%;
		border: none;
		background-color: red;
		color: white;
		border-radius: 0.25rem;
		font-size: 100%;
		cursor: pointer;
	}

	label {
		color: white;
	}
</style>
