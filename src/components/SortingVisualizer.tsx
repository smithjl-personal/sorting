import type { SortEvent } from "../types/general";

type Props = {
	values: number[];
	activeEvent: SortEvent | null;
	sortedIndices: number[];
};

const colorForIndex = (index: number, activeEvent: SortEvent | null, sortedIndices: number[]) => {
	if (sortedIndices.includes(index)) {
		return "bg-emerald-500";
	}

	if (!activeEvent) {
		return "bg-zinc-300 dark:bg-zinc-600";
	}

	let activeIndices: number[] = [];
	if (activeEvent.type === "compare" || activeEvent.type === "swap") {
		activeIndices = [activeEvent.a, activeEvent.b];
	} else {
		activeIndices = [activeEvent.index];
	}

	if (activeIndices.includes(index)) {
		if (activeEvent.type === "swap") return "bg-cyan-500";
		if (activeEvent.type === "compare") return "bg-amber-500";
		return "bg-indigo-500";
	}

	return "bg-zinc-300 dark:bg-zinc-600";
};

export default function SortingVisualizer({ values, activeEvent, sortedIndices }: Props) {
	const maxValue = Math.max(...values, 1);
	const barWidth = Math.max(4, Math.floor(1000 / values.length));

	return (
		<div className="rounded-3xl bg-zinc-100 p-4 shadow-sm dark:bg-zinc-950">
			<div className="relative h-[360px] overflow-hidden rounded-3xl bg-white/80 p-3 shadow-inner ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
				<div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-zinc-100 to-transparent dark:from-zinc-950" />
				<div className="flex h-full items-end justify-center gap-[2px]">
					{values.map((value, index) => {
						const height = Math.max(4, Math.round((value / maxValue) * 100));
						const colorClass = colorForIndex(index, activeEvent, sortedIndices);
						return (
							<div
								key={index}
								className={`${colorClass} rounded-t-xl transition-all duration-200`}
								style={{
									height: `${height}%`,
									width: `${barWidth}px`,
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
