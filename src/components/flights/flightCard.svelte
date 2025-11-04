<script>
	let { departureOrArrival } = $props();
</script>

<section id="flight-cards">
	<div class="card">
		<h2 title="origin.code_iata" class="iata-code">
			{departureOrArrival}
		</h2>
		<span class="airport-name">origin.name</span>
		<h3>Departure Times</h3>
		<span>scheduled_datetime</span>
		<div class="flight-times">
			<div>
				<h3>Scheduled</h3>
				<span>toggle_times</span>
			</div>
			<div>
				<h3>Estimated/Actual</h3>
				<span>toggle_times</span>
			</div>
		</div>

		<div class="terminal-info">
			<div class="terminal">
				<h3>Terminal</h3>
				<span>2</span>
			</div>
			<div class="gate">
				<h3>Gate</h3>
				<span>42A</span>
			</div>
			{#if departureOrArrival == 'Arrival'}
				<div class="baggage">
					<h3>Baggage</h3>
					<span>F4</span>
				</div>
			{/if}
		</div>
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
