import type { SortEvent } from "../types/general";

export function mergeSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	function merge(left: number, mid: number, right: number): void {
		const leftArr = a.slice(left, mid + 1);
		const rightArr = a.slice(mid + 1, right + 1);
		let i = 0;
		let j = 0;
		let k = left;

		while (i < leftArr.length && j < rightArr.length) {
			events.push({ type: "compare", a: left + i, b: mid + 1 + j });

			if (leftArr[i] <= rightArr[j]) {
				a[k] = leftArr[i];
				events.push({ type: "overwrite", index: k, value: leftArr[i] });
				i++;
			} else {
				a[k] = rightArr[j];
				events.push({ type: "overwrite", index: k, value: rightArr[j] });
				j++;
			}
			k++;
		}

		while (i < leftArr.length) {
			a[k] = leftArr[i];
			events.push({ type: "overwrite", index: k, value: leftArr[i] });
			i++;
			k++;
		}

		while (j < rightArr.length) {
			a[k] = rightArr[j];
			events.push({ type: "overwrite", index: k, value: rightArr[j] });
			j++;
			k++;
		}
	}

	function sort(left: number, right: number): void {
		if (left < right) {
			const mid = Math.floor((left + right) / 2);
			sort(left, mid);
			sort(mid + 1, right);
			merge(left, mid, right);
		}
	}

	sort(0, a.length - 1);
	return events;
}
