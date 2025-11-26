export async function getFlightData(ident) {
	console.log('calling getFlightData');
	const response = await fetch(`api/flight/${ident}`);

	if (!response.ok) {
		throw new Error({
			message: 'getFlightData fetch failed'
		});
	}

	console.log( response );
	console.log('finished calling getFlightData');

	const flightData = await response.json();
	return new Response(flightData);
}
const flightScheduled = {
	Scheduled: 'Scheduled',
	'Scheduled / Delayed': 'Scheduled delayed',
	Delayed: 'delayed',
	'En Route / Delayed': 'enroute delayed',
	'En Route / On Time': 'enroute on-time',
	Taxiing: 'taxiing',
	'Taxiing / Delayed': 'taxiingin delayed',
	'En Route': 'enroute'
};

export function getFlightStatus(status) {
	for (const key in flightScheduled) {
		if (status.contains(key)) {
			console.log(key);
		}
	}
}

const nextScheduledFlight = (currentFlight, nextFlight) => {
	console.log('nextScheduledFlight()');
	if (
		nextFlight.actuall_off === null &&
		!nextFlight.status.includes('Cancelled')
	) {
		return false;
	}
	if (
		nextFlight.actual_off !== null &&
		flightScheduled.includes(nextFlight.status)
	) {
		return false;
	}
	return true;
};

export function findCurrentFlight(flightsArray) {
	console.log('findCurrentFlight()');
	const flights = flightsArray['flights'];

	for (let i = 0; i < flights.length; i++) {
		let nextFlight = flights[i + 1];
		let currentFlight = flights[i];

		if (nextScheduledFlight(currentFlight, nextFlight)) {
			return currentFlight;
		}
	}
}
