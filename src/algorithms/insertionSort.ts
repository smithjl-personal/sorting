import type { SortEvent } from "../types/general";

export function insertionSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	for (let i = 1; i < a.length; i++) {
		let j = i;

		while (j > 0) {
			events.push({ type: "compare", a: j - 1, b: j });
			if (a[j] < a[j - 1]) {
				[a[j], a[j - 1]] = [a[j - 1], a[j]];
				events.push({ type: "swap", a: j - 1, b: j });
			} else {
				break;
			}
			j -= 1;
		}
	}

	return events;
}
