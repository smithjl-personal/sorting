import type { SortEvent } from "../types/general";

export function selectionSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	for (let i = 0; i < a.length - 1; i++) {
		let minIndex = i;

		for (let j = i + 1; j < a.length; j++) {
			events.push({ type: "compare", a: minIndex, b: j });

			if (a[j] < a[minIndex]) {
				minIndex = j;
			}
		}

		if (minIndex !== i) {
			[a[i], a[minIndex]] = [a[minIndex], a[i]];
			events.push({ type: "swap", a: i, b: minIndex });
		}
	}

	return events;
}
