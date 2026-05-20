import { describe, expect, it } from "vitest";
import {
  MAX_CACHE_FRAMES,
  buildProgressiveWindow,
  buildProgressiveLoadQueue,
  evictDistantFrameIndexes,
  getNearestLoadedFrameIndex,
  toFrameIndex,
} from "../heroFrameCache";

describe("heroFrameCache", () => {
  describe("toFrameIndex", () => {
    it("maps progress to bounded frame indexes", () => {
      expect(toFrameIndex(0, 10)).toBe(0);
      expect(toFrameIndex(0.49, 10)).toBe(4);
      expect(toFrameIndex(1, 10)).toBe(9);
    });

    it("handles invalid totals and clamps out-of-range progress", () => {
      expect(toFrameIndex(0.5, 0)).toBe(0);
      expect(toFrameIndex(-1, 10)).toBe(0);
      expect(toFrameIndex(3, 10)).toBe(9);
    });
  });

  describe("buildProgressiveWindow", () => {
    it("builds current ±2 plus directional lookahead window", () => {
      expect(buildProgressiveWindow({ currentIndex: 5, totalFrames: 20, direction: 1 })).toEqual([3, 4, 5, 6, 7, 8]);
      expect(buildProgressiveWindow({ currentIndex: 5, totalFrames: 20, direction: -1 })).toEqual([2, 3, 4, 5, 6, 7]);
    });

    it("keeps window bounded at sequence edges", () => {
      expect(buildProgressiveWindow({ currentIndex: 0, totalFrames: 5, direction: -1 })).toEqual([0, 1, 2]);
      expect(buildProgressiveWindow({ currentIndex: 4, totalFrames: 5, direction: 1 })).toEqual([2, 3, 4]);
    });
  });

  describe("buildProgressiveLoadQueue", () => {
    it("prioritizes current frame as the first load", () => {
      expect(buildProgressiveLoadQueue({ currentIndex: 5, totalFrames: 20, direction: 1 })[0]).toBe(5);
    });

    it("keeps queue unique and bounded to valid frame indexes", () => {
      expect(buildProgressiveLoadQueue({ currentIndex: 0, totalFrames: 3, direction: -1 })).toEqual([0, 1, 2]);
    });
  });

  describe("getNearestLoadedFrameIndex", () => {
    it("returns exact frame when loaded", () => {
      expect(getNearestLoadedFrameIndex(7, [2, 7, 9])).toBe(7);
    });

    it("returns nearest loaded fallback when exact frame is missing", () => {
      expect(getNearestLoadedFrameIndex(7, [2, 6, 9])).toBe(6);
      expect(getNearestLoadedFrameIndex(7, [2, 8, 12])).toBe(8);
    });
  });

  describe("evictDistantFrameIndexes", () => {
    it("never keeps more than MAX_CACHE_FRAMES entries", () => {
      const loaded = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const keep = [3, 4, 5, 6, 7, 8];
      const evicted = evictDistantFrameIndexes({ loadedIndexes: loaded, keepIndexes: keep, maxFrames: MAX_CACHE_FRAMES });

      const survivors = loaded.filter((index) => !evicted.includes(index));
      expect(survivors.length).toBeLessThanOrEqual(MAX_CACHE_FRAMES);
      expect(survivors).toEqual([3, 4, 5, 6, 7, 8, 9]);
    });

    it("does not evict when cache is already within limit", () => {
      const loaded = [3, 4, 5, 6, 7];
      const keep = [4, 5, 6];

      expect(evictDistantFrameIndexes({ loadedIndexes: loaded, keepIndexes: keep, maxFrames: MAX_CACHE_FRAMES })).toEqual([]);
    });
  });
});
