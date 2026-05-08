import type { SortEvent } from "../types/general";

export function bubbleSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < a.length - i - 1; j++) {
			events.push({ type: "compare", a: j, b: j + 1 });

			if (a[j] > a[j + 1]) {
				[a[j], a[j + 1]] = [a[j + 1], a[j]];
				events.push({ type: "swap", a: j, b: j + 1 });
			}
		}
	}

	return events;
}
