// https://raw.githubusercontent.com/drmikecrowe/mbfcext/71f548eade5f13b148485be66eaa01c073e0f95c/docs/v3/combined.json

import { aliases, biases, sources } from './mbfc-data.json';

type BiasShort = 'L' | 'LC' | 'C' | 'RC' | 'R' | 'PS' | 'CP' | 'S' | 'FN';
type CredibilityShort = 'L' | 'M' | 'H' | 'NA';
type ReportingShort = 'VH' | 'H' | 'MF' | 'M' | 'L' | 'VL';

const reportingScale = {
	VH: 'Very High',
	H: 'High',
	MF: 'Mostly Factual',
	M: 'Mixed',
	L: 'Low',
	VL: 'Very Low',
};

// const biasScale = {
//   L: 'Left Bias',
//   LC: 'Left-Center Bias',
//   C: 'Least Biased (Center)',
//   RC: 'Right-Center Bias',
//   R: 'Right Bias',
//   PS: 'Pro-Science',
//   CP: 'Conspiracy-Pseudoscience',
//   S: 'Satire',
//   FN: 'Questionable Sources',
// };

const biasInfo: Record<BiasShort, Bias> = {
	L: biases['left'],
	LC: biases['left-center'],
	C: biases['center'],
	RC: biases['right-center'],
	R: biases['right'],
	PS: biases['pro-science'],
	CP: biases['conspiracy'],
	S: biases['satire'],
	FN: biases['fake-news'],
};

interface Alias {}

interface Bias {
	name: string;
	description: string;
	url: string;
	pretty: string;
}

interface Source {
	b: BiasShort;
	d: string;
	f: string;
	n: string;
	u: string;
	P: number;
	r: ReportingShort;
	c: CredibilityShort;
	a: string;
}

export const formatSource = (source: Source) => ({
	name: source.n,
	factualReporting: reportingScale[source.r],
});

export function getByUrl(input) {
	// TODO: handle aliases

	if (!input) {
		throw 'No input given';
	}

	input = input.toLowerCase().trim();

	for (let [alias, entryUrl] of Object.entries(aliases)) {
		if (input.indexOf(alias) !== -1) {
			input = entryUrl;
		}
	}

	const mbfcEntry = Object.values(sources).find((entry) => {
		return (
			entry.d === input ||
			input.startsWith(`https://${entry.d}`) ||
			input.startsWith(`https://www.${entry.d}`) ||
			input.startsWith(`http://${entry.d}`) ||
			input.startsWith(`http://www.${entry.d}`) ||
			input.startsWith(entry.d) ||
			entry.f === input ||
			String(entry.n).toLowerCase() === input ||
			`the ${String(entry.n).toLowerCase()}` === input ||
			entry.u === input ||
			String(entry.u).replace('-', '') === input ||
			String(entry.u).replace('-', ' ') === input
		);
	});
	if (mbfcEntry !== undefined) {
		return mbfcEntry;
	}
	throw 'No MBFC result found';
}
