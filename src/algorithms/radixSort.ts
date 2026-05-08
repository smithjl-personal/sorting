import type { SortEvent } from "../types/general";

export function radixSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	// Normalize to non-negative integers for radix sort
	const min = Math.min(...a);
	const offset = min < 0 ? Math.abs(min) : 0;
	const normalized = a.map((x) => x + offset);

	const max = Math.max(...normalized);
	const maxDigits = String(max).length;

	for (let digit = 0; digit < maxDigits; digit++) {
		const buckets: number[][] = Array.from({ length: 10 }, () => []);
		const divisor = Math.pow(10, digit);

		// Place numbers into buckets based on digit
		for (let i = 0; i < normalized.length; i++) {
			const digitValue = Math.floor((normalized[i] / divisor) % 10);
			buckets[digitValue].push(normalized[i]);
			events.push({ type: "compare", a: i, b: digitValue });
		}

		// Reconstruct array from buckets
		let index = 0;
		for (let bucket = 0; bucket < 10; bucket++) {
			for (const num of buckets[bucket]) {
				a[index] = num - offset;
				normalized[index] = num;
				events.push({ type: "overwrite", index, value: num });
				index++;
			}
		}
	}

	return events;
}
