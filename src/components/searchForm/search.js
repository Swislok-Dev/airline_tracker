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
