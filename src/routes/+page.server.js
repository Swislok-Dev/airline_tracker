// export function load({ url }) {
// 	const ident = url.searchParams.get('ident');
// 	console.log('/routes/+page.server.js 1:', ident);
//
// 	return {
// 		props: { ident }
// 	};
// }

export async function getFlights(ident) {
	console.log('calling getFlights');
	const response = await fetch(`api/flight/${ident}`);

	if (!response.ok) {
		throw new Error(
			`API call failed with status ${response.status}`
		);
	} else {
		console.log('API cleared');
	}

	return response.json();
}
