<script>
	import {
		getTime,
		getDate,
		checkNullValue
	} from './+page.svelte';

	let { currentFlight, departureOrArrival, details } =
		$props();
</script>

<section id="flight-cards">
	<div class="card">
		<h2 title="origin.code_iata" class="iata-code">
			{departureOrArrival}
		</h2>
		<span class="airport-name">{details.name}</span>
		{#if departureOrArrival == 'Departure'}
			<h3>Departure Times</h3>
			<span>{getDate(currentFlight.scheduled_off)}</span>
		{:else}
			<h3>Arrival Times</h3>
			<span>{getDate(currentFlight.scheduled_on)}</span>
		{/if}

		<div class="flight-times">
			{#if departureOrArrival == 'Departure'}
				<div>
					<h3>Scheduled</h3>
					<span>{getTime(currentFlight.scheduled_off)}</span
					>
				</div>
				<div>
					{#if currentFlight.actual_off == null}
						<h3>Estimated</h3>
						<span
							>{getTime(currentFlight.estimated_off)}</span
						>
					{:else}
						<h3>Actual</h3>
						<span>{getTime(currentFlight.actual_off)}</span>
					{/if}
				</div>
			{:else}
				<div>
					<h3>Scheduled</h3>
					<span>{getTime(currentFlight.scheduled_on)}</span>
				</div>
				<div>
					{#if currentFlight.actual_on == null}
						<h3>Estimated</h3>
						<span
							>{getTime(currentFlight.estimated_on)}</span
						>
					{:else}
						<h3>Actual</h3>
						<span>{getTime(currentFlight.actual_on)}</span>
					{/if}
				</div>
			{/if}
		</div>

		<!-- {#if currentFlight.origin.gate} -->
		<div class="terminal-info">
			<div class="terminal">
				<h3>Terminal</h3>
				{#if departureOrArrival == 'Departure'}
					<span
						>{checkNullValue(
							currentFlight.terminal_origin
						)}</span
					>
				{:else}
					<span
						>{checkNullValue(
							currentFlight.terminal_destination
						)}</span
					>
				{/if}
			</div>
			<div class="gate">
				<h3>Gate</h3>
				{#if departureOrArrival == 'Departure'}
					<span
						>{checkNullValue(
							currentFlight.gate_origin
						)}</span
					>
				{:else}
					<span
						>{checkNullValue(
							currentFlight.gate_destination
						)}
					</span>
				{/if}
			</div>
			{#if departureOrArrival == 'Arrival' && currentFlight.baggage_claim}
				<div class="baggage">
					<h3>Baggage</h3>
					<span>{currentFlight.baggage_claim}</span>
				</div>
			{/if}
		</div>
		<!-- {/if} -->
	</div>
</section>

<style>
	#flight-cards {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		background-color: #dff;
		filter: blur(50%);
		margin: 25px 10px;
		border-radius: 5px;
	}

	.card > h3 {
		text-decoration: underline;
		/* max-width: 75%; */
	}

	.iata-code {
		margin: 1rem 0;
		font-size: 26px;
	}

	/* Cards */

	.flight-times {
		display: flex;
		margin: 10px 0;
		justify-content: space-around;
	}

	.flight-times span {
		font-weight: 500;
	}

	.flight-times h3 {
		font-weight: 300;
	}

	.terminal-info {
		display: flex;
		outline: none;
		justify-content: space-around;
		border-top: 1px solid black;
		margin: 10px 0;
	}

	.terminal-info h3 {
		font-weight: 300;
	}

	.terminal-info span {
		font-weight: 600;
	}
</style>
