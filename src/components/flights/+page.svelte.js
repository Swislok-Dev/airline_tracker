const flightScheduled = [
	'Scheduled',
	'Scheduled / Delayed',
	'Delayed',
	'En Route / Delayed',
	'En Route / On Time',
	'Taxiing',
	'Taxiing / Delayed',
	'En Route'
];

const nextScheduledFlight = (currentFlight, prevFlight) => {
	console.log(new Date().toISOString());
	console.log({ currentFlight, prevFlight });

	if (
		prevFlight.actual_off == null &&
		!prevFlight.status.includes('Cancelled')
	) {
		return false;
	}
	if (
		prevFlight.actual_off != null &&
		flightScheduled.includes(prevFlight.status)
	) {
		return false;
	}
	console.log('Previous flight status:', prevFlight.status);
	console.log(
		'Current flight status:',
		currentFlight.status
	);

	return true;
};

export const findCurrentFlight = (flightsArray) => {
	const flights = flightsArray['flights'];

	for (let i = 0; i < flights.length; i++) {
		let prevFlight = flights[i + 1];
		let currentFlight = flights[i];

		if (nextScheduledFlight(currentFlight, prevFlight)) {
			return currentFlight;
		}
	}
};

const dateString = (date) => {
	return new Date(date);
};

export const getTime = (date) => {
	const time = dateString(date).toLocaleTimeString();
	return time;
};

export const getDate = (date) => {
	if (date) {
		return dateString(date).toDateString();
	}
};
