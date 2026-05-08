A sorting visualizer is a good project because it touches UI design, animation timing, algorithms, performance, and user interaction without requiring backend infrastructure.

A good approach is to treat it as two separate systems:

1. A pure “sorting engine” that emits operations/events
2. A visualization layer that animates those events

That separation makes the app much easier to expand later.

# High-Level Architecture

```text
UI Controls
    ↓
Visualization Controller
    ↓
Sorting Engine
    ↓
Operation Stream
    ↓
Renderer / Animator
```

The key idea:

- The sorting algorithms should NOT directly manipulate the DOM/UI.
- Instead, algorithms emit actions like:
    - compare(i, j)
    - swap(i, j)
    - overwrite(i, value)
    - markSorted(i)

The visualizer consumes those actions and animates them.

---

# Recommended Tech Stack

For a modern implementation:

- Frontend:
    - React + TypeScript

- Styling:
    - Tailwind CSS

- Rendering:
    - HTML/CSS div bars initially
    - optionally Canvas later for performance

- State:
    - React state or Zustand

- Animation:
    - requestAnimationFrame
    - or Framer Motion for simpler animations

If you want maximum simplicity:

- Vanilla JS + Canvas also works very well.

For a portfolio-quality project:

- React + TypeScript is probably the best choice.

---

# Core Features (MVP)

Start with these first.

## 1. Array Visualization

Represent an array as vertical bars.

Each value:

- determines height
- may determine color

Example:

```text
| |
| |     |
| |  |  |
| |  |  |
```

### Recommended Visual States

Colors should indicate:

- Default
- Comparing
- Swapping
- Sorted
- Pivot (for quicksort)

---

## 2. Random Array Generator

Controls:

- Array size
- Randomize button

Example settings:

- 10–300 elements

Important:

- More elements means faster animations required.

---

## 3. Playback Controls

Include:

- Start
- Pause
- Resume
- Reset
- Step Forward
- Speed slider

Speed control is very important.

---

## 4. Sorting Algorithms

Start with:

### Beginner Tier

- Bubble Sort
- Selection Sort
- Insertion Sort

### Intermediate Tier

- Merge Sort
- Quick Sort
- Heap Sort

### Advanced/Fun Tier

- Radix Sort
- Shell Sort
- Cocktail Sort
- Bogo Sort (for humor)

---

# The Most Important Design Decision

Do NOT directly animate inside the sorting functions.

Instead:

## Bad

```ts
async function bubbleSort(arr) {
  await animateSwap(...)
}
```

This tightly couples logic and rendering.

---

## Good

Generate operations:

```ts
type SortEvent =
	| { type: "compare"; a: number; b: number }
	| { type: "swap"; a: number; b: number }
	| { type: "overwrite"; index: number; value: number };
```

Then:

```ts
const events = bubbleSort(array);
play(events);
```

This gives you:

- replay support
- pause support
- step-through debugging
- export/import
- benchmarking
- easier testing

---

# Example Algorithm Structure

Bubble sort example:

```ts
function bubbleSort(arr: number[]): SortEvent[] {
	const events: SortEvent[] = [];
	const a = [...arr];

	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < a.length - i - 1; j++) {
			events.push({
				type: "compare",
				a: j,
				b: j + 1,
			});

			if (a[j] > a[j + 1]) {
				[a[j], a[j + 1]] = [a[j + 1], a[j]];

				events.push({
					type: "swap",
					a: j,
					b: j + 1,
				});
			}
		}
	}

	return events;
}
```

---

# Animation Strategy

Avoid using `setInterval`.

Use:

```ts
requestAnimationFrame();
```

or an async loop:

```ts
while (playing) {
	processNextEvent();
	await sleep(speed);
}
```

---

# State You’ll Need

```ts
type VisualizerState = {
	array: number[];
	activeIndices: number[];
	sortedIndices: number[];
	speed: number;
	playing: boolean;
	currentAlgorithm: string;
};
```

---

# Recommended Project Structure

```text
src/
  algorithms/
    bubbleSort.ts
    mergeSort.ts
    quickSort.ts

  components/
    ArrayBars.tsx
    Controls.tsx
    StatsPanel.tsx

  engine/
    animationPlayer.ts
    eventTypes.ts

  hooks/
    useVisualizer.ts

  utils/
    randomArray.ts
```

---

# Nice Features After MVP

## Complexity Display

Show:

- Best case
- Average case
- Worst case
- Space complexity

Example:

| Algorithm | Best | Avg   | Worst |
| --------- | ---- | ----- | ----- |
| Bubble    | O(n) | O(n²) | O(n²) |

You can even highlight comparisons/swaps live.

---

## Live Statistics

Track:

- comparisons
- swaps
- elapsed time

---

## Audio

Generate tones during swaps/comparisons.

This is surprisingly engaging.

---

## Different Input Types

Generate:

- random
- nearly sorted
- reverse sorted
- few unique values

This helps demonstrate algorithm behavior.

---

## Algorithm Explanations

Small side panel:

- how it works
- why it’s efficient
- stability
- in-place vs not

---

# Performance Considerations

Important once arrays get large.

## DOM Rendering Limits

Rendering 1000+ divs becomes expensive.

If you want:

- very large arrays
- smooth 60fps

Switch to:

- HTML5 Canvas
- or WebGL later

But divs are perfect for MVP.

---

# Suggested Development Order

## Phase 1 — Foundation

- Setup React/TypeScript
- Render bars
- Generate random arrays

## Phase 2 — Playback System

- Event queue
- Animation loop
- Speed control

## Phase 3 — Simple Algorithms

- Bubble sort
- Selection sort
- Insertion sort

## Phase 4 — Advanced Algorithms

- Merge sort
- Quick sort
- Heap sort

## Phase 5 — UX Improvements

- Statistics
- Themes
- Responsive layout
- Audio

## Phase 6 — Advanced Rendering

Optional:

- Canvas renderer
- Massive arrays
- Benchmark mode

---

# One Important Recommendation

Keep the sorting algorithms PURE.

Meaning:

- no UI code
- no timing code
- no React state
- no DOM access

This will make the project dramatically easier to maintain.

---

# Optional Stretch Goals

## Compare Two Algorithms Side-by-Side

Very impressive portfolio feature.

Example:

- Bubble Sort vs Quick Sort
- same input array
- synchronized playback

---

## Educational Mode

Pause automatically and explain:

- pivot selection
- partitioning
- recursion

---

## Save/Share Configurations

Encode:

- algorithm
- speed
- array size

into URL params.

---

# Recommended MVP Scope

If you want a clean, achievable first version:

Build:

- array bars
- randomize
- speed control
- play/pause
- bubble sort
- insertion sort
- merge sort

That is enough to already feel polished and complete.

After that, iterate.
