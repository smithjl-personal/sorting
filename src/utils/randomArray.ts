type MakeRandomArrayArgs = {
	arraySize: number;
	maxValue: number;
};

function makeRandomArray(options: MakeRandomArrayArgs): Array<number> {
	const arr = [];

	for (let i = 0; i < options.arraySize; i++) {
		let initialValue = Math.random() * options.maxValue;
		let value = Math.floor(initialValue);
		arr.push(value);
	}

	return arr;
}
