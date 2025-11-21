import { VITE_AEROAPI_KEY } from '$env/static/private';

export async function GET({ params }) {
	console.log('calling api');
	const aeroapiURI = `https://aeroapi.flightaware.com/aeroapi/flights/${params.ident}`;

  // return new Response(JSON.stringify({message: "You got it"}))
	console.log('api called');

	const res = await fetch(aeroapiURI, {
		// mode: 'no-cors',
		headers: {
			'x-apikey': VITE_AEROAPI_KEY
		}
	});

	if (!res.ok) {
    console.log("GET method failed", res)
		return new Response(
			JSON.stringify({ message: 'Not OK', status: 400 })
		);
	}

	const data = await res.json();
  if (res.ok) {
    console.log("Data has been secured!")
  }

	return new Response(JSON.stringify(data), {
		status: 200
	});
}
