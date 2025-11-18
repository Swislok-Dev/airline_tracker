import { VITE_AEROAPI_KEY } from '$env/static/private';

export const GET = async ({ request, url }) => {
  console.log("from /api/flights/")
  return
	const aeroapiURI =
		'https://aeroapi.flightaware.com/aeroapi/';

	const ident = String(url.searchParams.get('ident'));
	const shortURI = `https://aeroapi.flightaware.com/aeroapi/flights/${ident}`;
	console.log(ident);
	console.log(shortURI);

	// const res = await fetch(aeroapiURI + 'flights/ua3');
	const res = await fetch(shortURI, {
		// mode: 'no-cors',
		headers: {
			'x-apikey': VITE_AEROAPI_KEY
		}
	});

	if (!res.ok) {
		return new Response(
			JSON.stringify({ message: 'Not OK', status: 400 })
		);
	}
	const data = await res.json();
	console.log(data['flights'][0]);

	return new Response(JSON.stringify(data), {
		status: 200
	});
};
