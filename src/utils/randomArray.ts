type MakeRandomArrayArgs = {
	arraySize: number;
	maxValue: number;
};

export function makeRandomArray(options: MakeRandomArrayArgs): number[] {
	const arr: number[] = [];

	for (let i = 0; i < options.arraySize; i++) {
		const value = Math.floor(Math.random() * options.maxValue) + 1;
		arr.push(value);
	}

	return arr;
}
