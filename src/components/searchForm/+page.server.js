export async function load({ fetch, url }) {
	const fetchFlights = async () => {
		const ident = String(url.searchParams.get('ident'));

		const res = await fetch(`/api/flight/${ident}`);
		const data = await res.json();
		console.table('from +page.js', ident);
	};

	return {
		ident: fetchFlights(),
		// flightData: data
	};
}
