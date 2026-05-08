import type { SortEvent } from "../types/general";

export function heapSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	function heapify(n: number, i: number): void {
		let largest = i;
		const left = 2 * i + 1;
		const right = 2 * i + 2;

		if (left < n) {
			events.push({ type: "compare", a: left, b: largest });
			if (a[left] > a[largest]) {
				largest = left;
			}
		}

		if (right < n) {
			events.push({ type: "compare", a: right, b: largest });
			if (a[right] > a[largest]) {
				largest = right;
			}
		}

		if (largest !== i) {
			[a[i], a[largest]] = [a[largest], a[i]];
			events.push({ type: "swap", a: i, b: largest });
			heapify(n, largest);
		}
	}

	// Build max heap
	for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
		heapify(a.length, i);
	}

	// Extract elements from heap
	for (let i = a.length - 1; i > 0; i--) {
		[a[0], a[i]] = [a[i], a[0]];
		events.push({ type: "swap", a: 0, b: i });
		events.push({ type: "markSorted", index: i });
		heapify(i, 0);
	}

	events.push({ type: "markSorted", index: 0 });
	return events;
}
