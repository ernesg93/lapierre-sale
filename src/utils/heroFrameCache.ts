export const MAX_CACHE_FRAMES = 7;

const WINDOW_RADIUS = 2;
const LOOKAHEAD_DISTANCE = 3;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function toFrameIndex(progress: number, totalFrames: number) {
  if (totalFrames <= 0) return 0;

  const boundedProgress = clamp(progress, 0, 1);
  const maxIndex = totalFrames - 1;

  return Math.floor(boundedProgress * maxIndex);
}

export function buildProgressiveWindow({
  currentIndex,
  totalFrames,
  direction,
}: {
  currentIndex: number;
  totalFrames: number;
  direction: -1 | 1;
}) {
  if (totalFrames <= 0) return [];

  const target = clamp(currentIndex, 0, totalFrames - 1);
  const values = new Set<number>();

  for (let index = target - WINDOW_RADIUS; index <= target + WINDOW_RADIUS; index += 1) {
    if (index >= 0 && index < totalFrames) values.add(index);
  }

  for (let distance = 1; distance <= LOOKAHEAD_DISTANCE; distance += 1) {
    const lookaheadIndex = target + direction * distance;
    if (lookaheadIndex >= 0 && lookaheadIndex < totalFrames) values.add(lookaheadIndex);
  }

  return Array.from(values).sort((a, b) => a - b);
}

export function buildProgressiveLoadQueue(input: { currentIndex: number; totalFrames: number; direction: -1 | 1 }) {
  const windowIndexes = buildProgressiveWindow(input);
  const uniqueOrdered = [input.currentIndex, ...windowIndexes];

  return uniqueOrdered.filter((index, position) => {
    if (index < 0 || index >= input.totalFrames) return false;
    return uniqueOrdered.indexOf(index) === position;
  });
}

export function getNearestLoadedFrameIndex(targetIndex: number, loadedIndexes: number[]) {
  if (loadedIndexes.length === 0) return null;
  if (loadedIndexes.includes(targetIndex)) return targetIndex;

  let nearest = loadedIndexes[0];
  let nearestDistance = Math.abs(targetIndex - nearest);

  for (const candidate of loadedIndexes) {
    const distance = Math.abs(targetIndex - candidate);
    if (distance < nearestDistance) {
      nearest = candidate;
      nearestDistance = distance;
    }
  }

  return nearest;
}

export function evictDistantFrameIndexes({
  loadedIndexes,
  keepIndexes,
  maxFrames = MAX_CACHE_FRAMES,
}: {
  loadedIndexes: number[];
  keepIndexes: number[];
  maxFrames?: number;
}) {
  if (loadedIndexes.length <= maxFrames) return [];

  const protectedIndexes = new Set(keepIndexes);
  const evicted: number[] = [];
  const survivors = new Set(loadedIndexes);

  const score = (index: number) => {
    if (protectedIndexes.has(index)) return Number.NEGATIVE_INFINITY;

    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const keepIndex of protectedIndexes) {
      nearestDistance = Math.min(nearestDistance, Math.abs(index - keepIndex));
    }

    return nearestDistance;
  };

  const sortedByDistance = [...loadedIndexes].sort((a, b) => score(b) - score(a));

  for (const candidate of sortedByDistance) {
    if (survivors.size <= maxFrames) break;
    if (protectedIndexes.has(candidate)) continue;

    survivors.delete(candidate);
    evicted.push(candidate);
  }

  return evicted;
}
