type VisualizerState = {
	array: number[];
	activeIndices: number[];
	sortedIndices: number[];
	speed: number;
	playing: boolean;
	currentAlgorithm: string;
};

type SortEvent =
	| { type: "compare"; a: number; b: number }
	| { type: "swap"; a: number; b: number }
	| { type: "overwrite"; index: number; value: number };
