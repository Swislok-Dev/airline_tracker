import { VITE_AEROAPI_KEY } from '$env/static/private';

export async function GET({ params }) {
	const aeroapiURI = `https://aeroapi.flightaware.com/aeroapi/flights/${params.ident}`;

	const res = await fetch(aeroapiURI, {
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
}
