export type BiasShort = 'L' | 'LC' | 'C' | 'RC' | 'R' | 'PS' | 'CP' | 'S' | 'FN';
export type CredibilityShort = 'L' | 'M' | 'H' | 'NA';
export type ReportingShort = 'VH' | 'H' | 'MF' | 'M' | 'L' | 'VL';
export type TrafficShort = 'N' | 'L' | 'M' | 'H';

export interface Bias {
	name: string;
	description: string;
	url: string;
	pretty: string;
}

export interface Reporting {
	pretty: string;
}

export interface Source {
	b: BiasShort;
	d: string; // site URL
	f: string; // site URL without TLD
	n: string; // site name
	u: string; // MBFC URL
	P: number;
	r: ReportingShort;
	c: CredibilityShort;
	a: string;
}

export interface MBFCData {
	version: number;
	date: string;
	aliases: Record<string, string>;
	biases: Record<string, Bias>;
	reporting: Record<string, Reporting>;
	sources: Record<string, Source>;
	traffic: Record<TrafficShort, string>;
	credibility: Record<CredibilityShort, string>;
}

export interface Result {
	name: string;
	factualReporting: string;
	bias: string;
	url: string;
	credibility: string;
}
