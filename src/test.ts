// // TODO: Delete this file once we have actual tests

import { getByUrl } from '.';

describe('getByUrl', () => {
	it('should do something', () => {
		const url = 'https://www.vox.com/23022693/war-ukraine-shipping-food-hunger';
		const result = getByUrl(url);
		console.log(result);
	});
});

// import { google } from 'googleapis';
// import { albumSearch } from '.';
// import dotenv from 'dotenv';
// dotenv.config();

// (async () => {
// 	const youtube = google.youtube({
// 		version: 'v3',
// 		auth: process.env.YOUTUBE_API_KEY,
// 	});

// 	// console.log(await albumSearch('converge jane doe', youtube));
// 	// console.log(await albumSearch('five star hotel gray data', youtube));
// 	console.log(await albumSearch('five star hotel grey data', youtube));
// 	// console.log(await albumSearch('black sabbath black sabbath', youtube));
// 	// console.log(await albumSearch('iron maiden iron maiden', youtube));
// 	// console.log(await albumSearch('megadeth peace sells', youtube));
// 	// console.log(await albumSearch("megadeth peace sells... but who's buying?", youtube));
// 	// console.log(await albumSearch('nirvana nevermind', youtube));
// })();
