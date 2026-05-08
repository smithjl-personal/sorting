import type { SortEvent } from "../types/general";

export function bogoSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	function isSorted(): boolean {
		for (let i = 0; i < a.length - 1; i++) {
			if (a[i] > a[i + 1]) {
				return false;
			}
		}
		return true;
	}

	function shuffle(): void {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
			events.push({ type: "swap", a: i, b: j });
		}
	}

	// Limit iterations to prevent infinite loops in visualization
	const maxIterations = 100000;
	let iterations = 0;

	while (!isSorted() && iterations < maxIterations) {
		shuffle();
		iterations++;
	}

	return events;
}
