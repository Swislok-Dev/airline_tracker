<script>
	import FlightCard from './flightCard.svelte';
	import { Icon } from 'svelte-fontawesome';
	import {
		faArrowCircleRight,
		faArrowCircleLeft
	} from '@fortawesome/free-solid-svg-icons';
  import {searchStore} from '../../stores.js'
</script>

{#if $searchStore} 
	<section id="flight-ticket">
		<div class="outbound flight">
			<div id="flight-status" class="scheduled">
				<h2>Status</h2>
				<span
					id="status"
					title="this is an internal reference number and may differ from your input"
					>status for currentFLight.ident</span
				>
			</div>
		</div>
		<div id="progress" style="color: white">
			<h2 title="origin.code_iata">ORI</h2>
			<div id="progress-bar">
				<span style:visibility="visible" style:width="25%"
					>progress</span
				>
			</div>
			<h2 title="origin.code_iata">DES</h2>
		</div>

		<div id="flight-selector">
			<button><Icon icon={faArrowCircleLeft} /> </button>
			<button>current flight</button>
			<button><Icon icon={faArrowCircleRight} /></button>
		</div>

		<div class="inbound flight"></div>

		<FlightCard departureOrArrival="Departure" />
		<FlightCard departureOrArrival="Arrival" />
	</section>
{/if}

<style>
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

	button {
		border: none;
		font-size: 38px;
		background: none;
		color: white;
		cursor: pointer;
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
