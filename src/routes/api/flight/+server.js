import { VITE_AEROAPI_KEY } from '$env/static/private';

export const GET = async ({ params,url }) => {
	console.log('from /api/flights/');
  const ident = url.searchParams.get("ident")
  console.log({ident})

  return new Response(JSON.stringify({message: "early return"}))
	// const ident = String(url.searchParams.get('ident'));
	const shortURI = `https://aeroapi.flightaware.com/aeroapi/flights/${params.ident}`;
	// console.log({ ident });
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
