import { bubbleSort } from "./bubbleSort";
import { insertionSort } from "./insertionSort";
import { selectionSort } from "./selectionSort";
import type { AlgorithmId, AlgorithmOption, SortEvent } from "../types/general";

export const algorithmOptions: AlgorithmOption[] = [
	{ id: "bubble", label: "Bubble Sort" },
	{ id: "selection", label: "Selection Sort" },
	{ id: "insertion", label: "Insertion Sort" },
];

export const algorithms: Record<AlgorithmId, (arr: number[]) => SortEvent[]> = {
	bubble: bubbleSort,
	selection: selectionSort,
	insertion: insertionSort,
};
