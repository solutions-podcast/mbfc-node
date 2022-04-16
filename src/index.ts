import p from 'phin';
import { Bias, BiasShort, CredibilityShort, MBFCData, Reporting, ReportingShort, Result, Source } from './interfaces';

const biasInfo = (mbfcData: MBFCData): Record<BiasShort, Bias> => {
	const { biases } = mbfcData;
	return {
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
};

const reportingInfo = (mbfcData: MBFCData): Record<ReportingShort, Reporting> => {
	const { reporting } = mbfcData;
	return {
		VH: reporting['VERY HIGH'],
		H: reporting['HIGH'],
		MF: reporting['MOSTLY FACTUAL'],
		M: reporting['MIXED'],
		L: reporting['LOW'],
		VL: reporting['VERY LOW'],
	};
};

const formatSource = (source: Source, mbfcData: MBFCData): Result => ({
	name: source.n,
	factualReporting: reportingInfo(mbfcData)[source.r].pretty,
	bias: biasInfo(mbfcData)[source.b].name,
	url: source.u,
	credibility: mbfcData.credibility[source.c],
});

const fetchData = async () => {
	const mbfcDataUrl = 'https://raw.githubusercontent.com/drmikecrowe/mbfcext/main/docs/v3/combined.json';
	const mbfcDataResponse = await p({ url: mbfcDataUrl, parse: 'json' });
	return mbfcDataResponse.body as MBFCData;
};

export function getByUrl(input: string, mbfcData: MBFCData): Result {
	const { sources } = mbfcData;

	input = input.toLowerCase().trim();
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

	if (mbfcEntry) {
		return formatSource(mbfcEntry, mbfcData);
	} else {
		throw new Error(`No MBFC entry found for ${input}`);
	}
}
