const flightScheduled = {
	Scheduled: 'scheduled',
	'Scheduled / Delayed': 'scheduled delayed',
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
