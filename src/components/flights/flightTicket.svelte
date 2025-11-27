<script>
	import { get } from 'svelte/store';
	import { searchStore } from '../../stores.js';
	import { page } from '$app/stores';
	import { findCurrentFlight } from './+page.svelte';

	import FlightCard from './flightCard.svelte';
	import { Icon } from 'svelte-fontawesome';
	import {
		faArrowCircleRight,
		faArrowCircleLeft
	} from '@fortawesome/free-solid-svg-icons';

	let currentFlight = $state();
	let flightArray = $state();
	let ident = $state('');

	if ($page?.url?.searchParams) {
		ident = $page.url.searchParams.get('ident');
	}

	async function handleSubmit() {
		flightArray = await fetch(`api/flight/${ident}`, {});
		const flightData = await flightArray.json();

		searchStore.set({ flightData });

		currentFlight = findCurrentFlight(flightData);

		searchStore.set({ currentFlight });

		return {
			props: { currentFlight }
		};
	}
</script>

<form
	onsubmit={() => handleSubmit()}
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

{#if $searchStore}
	<section id="flight-ticket">
		<div class="outbound flight">
			<div
				id="flight-status"
				class={currentFlight.status.toLowerCase()}
			>
				<h2>{currentFlight.status}</h2>
				<span
					id="status"
					title="this is an internal reference number and may differ from your input"
				></span>
			</div>
		</div>
		<div id="progress" style="color: white">
			<h2 title="origin.code_iata">
				{currentFlight.origin.code_iata}
			</h2>
			<div id="progress-bar">
				<span
					style:width={String(
						currentFlight.progress_percent
					) + '%'}
					style:visibility="visible"
				></span>
			</div>
			<h2 title="origin.code_iata">
				{currentFlight.destination.code_iata}
			</h2>
		</div>

		<div id="flight-selector">
			<button><Icon icon={faArrowCircleLeft} /> </button>
			<button>current flight</button>
			<button><Icon icon={faArrowCircleRight} /></button>
		</div>

		<div class="inbound flight"></div>

		<FlightCard
			departureOrArrival="Departure"
			details={currentFlight.origin}
			{currentFlight}
		/>
		<FlightCard
			departureOrArrival="Arrival"
			details={currentFlight.destination}
			{currentFlight}
		/>
	</section>
{/if}

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
		border: none;
		font-size: 38px;
		background: none;
		color: white;
		cursor: pointer;
	}

	form button {
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
	:root {
		--taxiing: rgb(250, 164, 43);
		--scheduled: rgb(43, 206, 251);
		--on-time: rgb(43, 251, 43);
		--delayed: rgb(247, 251, 43);
		--cancelled: rgb(251, 43, 43);
		--landed-arrived: rgb(71, 43, 251);
	}

	#progress {
		display: flex;
		justify-content: center;
		gap: 5px;
		align-items: center;
		margin-top: 25px;
	}

	#progress-bar {
		color: white;
		width: 50%;
		align-self: center;
		background-color: gray;
		height: 0.25em;
	}

	#progress-bar > span {
		position: relative;
		display: flex;
		align-self: center;
		background-color: greenyellow;
		visibility: hidden;
		overflow: hidden;
		z-index: 1;
		height: 0.25em;
	}

	#flight-ticket {
		background-color: rgba(1, 1, 1, 0.4);
		margin: 25px auto;
		padding-bottom: 10px;
		max-width: 768px;
	}

	@media screen and (max-width: 740px) {
		#flight-ticket {
			margin-bottom: 0;
		}
	}

	#flight-status {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px;
		color: white;
	}

	#flight-status h3 {
		display: flex;
		flex-wrap: nowrap;
		flex-basis: 80%;
		font-size: 1.2em;
		font-weight: 500;
	}

	#flight-status.taxiing {
		background-color: var(--taxiing);
		color: black;
	}

	#flight-status.taxiing.delayed {
		background-color: var(--taxiing);
		background-image: linear-gradient(
			130deg,
			var(--taxiing) 70%,
			var(--delayed) 30%
		);
	}

	#flight-status.delayed {
		background-color: var(--delayed);
		color: black;
	}

	#flight-status.scheduled {
		background-color: var(--scheduled);
		color: black;
	}
	.flight-status.scheduled.delayed {
		background-color: var(--scheduled);
		background-image: linear-gradient(
			130deg,
			var(--scheduled) 70%,
			var(--delayed) 30%
		);
		color: black;
	}
	#flight-status.enroute.on-time {
		background-color: var(--on-time);
		color: black;
	}
	#flight-status.enroute.delayed {
		background-color: var(--on-time);
		background-image: linear-gradient(
			130deg,
			var(--on-time) 70%,
			var(--delayed) 30%
		);
		color: black;
	}
	#flight-status.arrived {
		background-color: rgb(71, 43, 251);
		color: white;
	}
	#flight-status.arrived.delayed {
		background-color: var(--landed-arrived);
		background-image: linear-gradient(
			130deg,
			var(--landed-arrived) 70%,
			var(--delayed) 30%
		);
		color: white;
	}
	#flight-status.cancelled {
		background-color: rgb(251, 43, 43);
	}

	#flight-selector {
		margin: 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
