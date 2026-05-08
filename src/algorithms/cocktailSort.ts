import type { SortEvent } from "../types/general";

export function cocktailSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];
	let swapped = true;
	let start = 0;
	let end = a.length - 1;

	while (swapped) {
		swapped = false;

		// Forward pass (left to right)
		for (let i = start; i < end; i++) {
			events.push({ type: "compare", a: i, b: i + 1 });

			if (a[i] > a[i + 1]) {
				[a[i], a[i + 1]] = [a[i + 1], a[i]];
				events.push({ type: "swap", a: i, b: i + 1 });
				swapped = true;
			}
		}

		if (!swapped) break;

		end--;

		// Backward pass (right to left)
		for (let i = end - 1; i >= start; i--) {
			events.push({ type: "compare", a: i, b: i + 1 });

			if (a[i] > a[i + 1]) {
				[a[i], a[i + 1]] = [a[i + 1], a[i]];
				events.push({ type: "swap", a: i, b: i + 1 });
				swapped = true;
			}
		}

		start++;
	}

	return events;
}
