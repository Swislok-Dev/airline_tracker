export function load({ url }) {
	const ident = url.searchParams.get('ident');
	console.log('/routes/+page.server.js 1:', ident);

	return {
		props: ident
	};
}
