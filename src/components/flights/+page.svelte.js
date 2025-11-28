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
	console.log({ currentFlight, nextFlight });
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
	console.log('findCurrentFlight()', flightsArray);
	const flights = flightsArray['flights'];

	for (let i = 0; i < flights.length; i++) {
		let nextFlight = flights[i + 1];
		let currentFlight = flights[i];

		if (nextScheduledFlight(currentFlight, nextFlight)) {
			return currentFlight;
		}
	}
}


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
