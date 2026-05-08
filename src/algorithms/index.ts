import { bubbleSort } from "./bubbleSort";
import { insertionSort } from "./insertionSort";
import { selectionSort } from "./selectionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";
import { heapSort } from "./heapSort";
import { radixSort } from "./radixSort";
import { shellSort } from "./shellSort";
import { cocktailSort } from "./cocktailSort";
import { bogoSort } from "./bogoSort";
import type { AlgorithmId, AlgorithmOption, SortEvent } from "../types/general";

export const algorithmOptions: AlgorithmOption[] = [
	{ id: "bubble", label: "Bubble Sort" },
	{ id: "selection", label: "Selection Sort" },
	{ id: "insertion", label: "Insertion Sort" },
	{ id: "merge", label: "Merge Sort" },
	{ id: "quick", label: "Quick Sort" },
	{ id: "heap", label: "Heap Sort" },
	{ id: "radix", label: "Radix Sort" },
	{ id: "shell", label: "Shell Sort" },
	{ id: "cocktail", label: "Cocktail Sort" },
	{ id: "bogo", label: "Bogo Sort" },
];

export const algorithms: Record<AlgorithmId, (arr: number[]) => SortEvent[]> = {
	bubble: bubbleSort,
	selection: selectionSort,
	insertion: insertionSort,
	merge: mergeSort,
	quick: quickSort,
	heap: heapSort,
	radix: radixSort,
	shell: shellSort,
	cocktail: cocktailSort,
	bogo: bogoSort,
};
