import type { SortEvent } from "../types/general";

export function quickSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	function partition(low: number, high: number): number {
		const pivot = a[high];
		let i = low - 1;

		for (let j = low; j < high; j++) {
			events.push({ type: "compare", a: j, b: high });

			if (a[j] < pivot) {
				i++;
				[a[i], a[j]] = [a[j], a[i]];
				events.push({ type: "swap", a: i, b: j });
			}
		}

		[a[i + 1], a[high]] = [a[high], a[i + 1]];
		events.push({ type: "swap", a: i + 1, b: high });
		return i + 1;
	}

	function sort(low: number, high: number): void {
		if (low < high) {
			const pi = partition(low, high);
			sort(low, pi - 1);
			sort(pi + 1, high);
		}
	}

	sort(0, a.length - 1);
	return events;
}
