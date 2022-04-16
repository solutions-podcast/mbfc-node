import p from 'phin';

(async () => {
	const mbfcDataUrl = 'https://raw.githubusercontent.com/drmikecrowe/mbfcext/main/docs/v3/combined.json';
	const mbfcDataResponse = await p({ url: mbfcDataUrl, parse: 'json' });
	console.log((mbfcDataResponse.body as any).credibility);
})();
