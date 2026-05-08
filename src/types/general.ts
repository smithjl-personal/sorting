export type SortEvent =
	| { type: "compare"; a: number; b: number }
	| { type: "swap"; a: number; b: number }
	| { type: "overwrite"; index: number; value: number }
	| { type: "markSorted"; index: number };

export type AlgorithmId = "bubble" | "selection" | "insertion";

export type AlgorithmOption = {
	id: AlgorithmId;
	label: string;
};
