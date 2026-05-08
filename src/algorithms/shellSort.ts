import type { SortEvent } from "../types/general";

export function shellSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	let gap = Math.floor(a.length / 2);

	while (gap > 0) {
		for (let i = gap; i < a.length; i++) {
			const temp = a[i];
			let j = i;

			while (j >= gap) {
				events.push({ type: "compare", a: j - gap, b: j });

				if (a[j - gap] > temp) {
					a[j] = a[j - gap];
					events.push({ type: "overwrite", index: j, value: a[j - gap] });
					j -= gap;
				} else {
					break;
				}
			}

			if (j !== i) {
				a[j] = temp;
				events.push({ type: "overwrite", index: j, value: temp });
			}
		}

		gap = Math.floor(gap / 2);
	}

	return events;
}
