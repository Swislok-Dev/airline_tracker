export function load({ url }) {
	const ident = url.searchParams.get('ident');
	console.log('+page.server.js 2:', ident);

	return {
		props: { ident }
	};
}
