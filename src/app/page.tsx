"use client";

import { useEffect, useRef, useState } from "react";
import SortingVisualizer from "../components/SortingVisualizer";
import { algorithms, algorithmOptions } from "../algorithms";
import { makeRandomArray } from "../utils/randomArray";
import type { AlgorithmId, SortEvent } from "../types/general";

const DEFAULT_SIZE = 40;
const MAX_VALUE = 200;
const DEFAULT_SPEED = 6;

function applyEvent(array: number[], event: SortEvent): number[] {
	const next = [...array];

	if (event.type === "swap") {
		[next[event.a], next[event.b]] = [next[event.b], next[event.a]];
	}

	if (event.type === "overwrite") {
		next[event.index] = event.value;
	}

	return next;
}

export default function Home() {
	const [initialValues, setInitialValues] = useState<number[]>(() =>
		makeRandomArray({ arraySize: DEFAULT_SIZE, maxValue: MAX_VALUE }),
	);
	const [displayValues, setDisplayValues] = useState<number[]>(initialValues);
	const [events, setEvents] = useState<SortEvent[]>([]);
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmId>("bubble");
	const [size, setSize] = useState(DEFAULT_SIZE);
	const [speed, setSpeed] = useState(DEFAULT_SPEED);
	const [isPlaying, setIsPlaying] = useState(false);
	const [activeEvent, setActiveEvent] = useState<SortEvent | null>(null);
	const [sortedIndices, setSortedIndices] = useState<number[]>([]);
	const [statusText, setStatusText] = useState("Ready");
	const timeoutRef = useRef<number | null>(null);

	const resetPlayback = () => {
		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const initializeArray = (newSize: number) => {
		const nextArray = makeRandomArray({ arraySize: newSize, maxValue: MAX_VALUE });
		setInitialValues(nextArray);
		setDisplayValues(nextArray);
		setEvents([]);
		setCurrentStep(0);
		setActiveEvent(null);
		setSortedIndices([]);
		setIsPlaying(false);
		setStatusText("Array randomized");
	};

	useEffect(() => {
		initializeArray(DEFAULT_SIZE);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (currentStep >= events.length && events.length > 0) {
			setSortedIndices(initialValues.map((_, index) => index));
			setActiveEvent(null);
			setIsPlaying(false);
			setStatusText("Sorted");
		}
	}, [currentStep, events.length, initialValues]);

	useEffect(() => {
		if (!isPlaying || currentStep >= events.length) return;

		const delay = Math.max(30, 450 / speed);
		timeoutRef.current = window.setTimeout(() => {
			const event = events[currentStep];
			setDisplayValues((prev) => applyEvent(prev, event));
			setActiveEvent(event);
			setCurrentStep((previous) => previous + 1);
		}, delay);

		return () => resetPlayback();
	}, [currentStep, events, isPlaying, speed]);

	const startSorting = () => {
		if (events.length === 0 || currentStep >= events.length) {
			const nextEvents = algorithms[selectedAlgorithm](initialValues);
			setEvents(nextEvents);
			setDisplayValues(initialValues);
			setCurrentStep(0);
			setSortedIndices([]);
			setActiveEvent(null);
			setStatusText("Sorting...");
		}

		setIsPlaying(true);
	};

	const pauseSorting = () => {
		resetPlayback();
		setIsPlaying(false);
		setStatusText("Paused");
	};

	const resetSorting = () => {
		resetPlayback();
		setDisplayValues(initialValues);
		setEvents([]);
		setCurrentStep(0);
		setIsPlaying(false);
		setActiveEvent(null);
		setSortedIndices([]);
		setStatusText("Ready");
	};

	const stepForward = () => {
		if (isPlaying) {
			resetPlayback();
			setIsPlaying(false);
		}

		const nextEvents =
			events.length > 0 ? events : algorithms[selectedAlgorithm](initialValues);

		if (events.length === 0) {
			setEvents(nextEvents);
			setDisplayValues(initialValues);
			setCurrentStep(0);
			setSortedIndices([]);
			setActiveEvent(null);
			setStatusText("Stepping...");
		}

		if (currentStep < nextEvents.length) {
			const event = nextEvents[currentStep];
			setDisplayValues((prev) => applyEvent(prev, event));
			setActiveEvent(event);
			setCurrentStep((previous) => previous + 1);
			setStatusText("Step forward");
		}
	};

	const handleSizeChange = (value: number) => {
		setSize(value);
		initializeArray(value);
	};

	const handleAlgorithmChange = (value: AlgorithmId) => {
		resetSorting();
		setSelectedAlgorithm(value);
		setStatusText(
			`Algorithm selected: ${algorithmOptions.find((option) => option.id === value)?.label}`,
		);
	};

	return (
		<div className="min-h-screen bg-zinc-50 px-4 py-6 text-zinc-900 dark:bg-black dark:text-zinc-100 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 sm:p-8">
					<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-3xl font-semibold tracking-tight">
								Sorting Visualizer
							</h1>
							<p className="mt-2 text-zinc-600 dark:text-zinc-400">
								Visualize sorting algorithms with step controls, speed, and array
								size settings.
							</p>
						</div>
						<div className="grid gap-2 sm:flex sm:items-center">
							<button
								type="button"
								onClick={() => initializeArray(size)}
								className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
							>
								Randomize
							</button>
						</div>
					</div>

					<div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
						<SortingVisualizer
							values={displayValues}
							activeEvent={activeEvent}
							sortedIndices={sortedIndices}
						/>

						<div className="space-y-6 rounded-3xl bg-zinc-100 p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
							<div className="space-y-3">
								<label className="block text-sm font-medium">Algorithm</label>
								<select
									value={selectedAlgorithm}
									onChange={(event) =>
										handleAlgorithmChange(event.target.value as AlgorithmId)
									}
									className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
								>
									{algorithmOptions.map((option) => (
										<option key={option.id} value={option.id}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
									<span>Array size</span>
									<span>{size}</span>
								</div>
								<input
									type="range"
									min={10}
									max={120}
									value={size}
									onChange={(event) =>
										handleSizeChange(Number(event.target.value))
									}
									className="w-full cursor-pointer"
								/>
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
									<span>Speed</span>
									<span>{speed}</span>
								</div>
								<input
									type="range"
									min={1}
									max={20}
									value={speed}
									onChange={(event) => setSpeed(Number(event.target.value))}
									className="w-full cursor-pointer"
								/>
							</div>

							<div className="space-y-3">
								<div className="grid gap-3 sm:grid-cols-2">
									<button
										type="button"
										onClick={startSorting}
										className="rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
									>
										{isPlaying ? "Playing" : "Start"}
									</button>
									<button
										type="button"
										onClick={pauseSorting}
										className="rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-950 dark:hover:bg-zinc-300"
									>
										Pause
									</button>
								</div>
								<div className="grid gap-3 sm:grid-cols-2">
									<button
										type="button"
										onClick={stepForward}
										className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
									>
										Step
									</button>
									<button
										type="button"
										onClick={resetSorting}
										className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
									>
										Reset
									</button>
								</div>
							</div>

							<div className="rounded-3xl bg-white/80 p-4 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-200 dark:ring-zinc-800">
								<p className="font-semibold">Status</p>
								<p className="mt-2 text-sm leading-6">{statusText}</p>
								<p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
									Active values are highlighted during compare and swap events.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
