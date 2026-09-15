'use strict';

/**
 * Hand-rolled binary min-heap priority queue, keyed by a numeric priority.
 * Used by Dijkstra instead of any built-in/library priority queue, per the
 * assignment's constraint that the algorithm and its supporting data
 * structures must be implemented, not imported.
 *
 * Uses lazy deletion for "decrease-key": instead of relocating an existing
 * entry, we simply insert a fresh (priority, value) pair and skip any
 * entry popped later whose priority is stale (checked by the caller via a
 * "best known distance" map before acting on a popped entry).
 */
class MinPriorityQueue {
  constructor() {
    this._heap = []; // array of { priority, value }
  }

  get size() {
    return this._heap.length;
  }

  isEmpty() {
    return this._heap.length === 0;
  }

  insert(priority, value) {
    this._heap.push({ priority, value });
    this._siftUp(this._heap.length - 1);
  }

  extractMin() {
    if (this._heap.length === 0) return undefined;
    const min = this._heap[0];
    const last = this._heap.pop();
    if (this._heap.length > 0) {
      this._heap[0] = last;
      this._siftDown(0);
    }
    return min;
  }

  _siftUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this._heap[parent].priority <= this._heap[i].priority) break;
      [this._heap[parent], this._heap[i]] = [this._heap[i], this._heap[parent]];
      i = parent;
    }
  }

  _siftDown(i) {
    const n = this._heap.length;
    for (;;) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;
      if (left < n && this._heap[left].priority < this._heap[smallest].priority) smallest = left;
      if (right < n && this._heap[right].priority < this._heap[smallest].priority) smallest = right;
      if (smallest === i) break;
      [this._heap[smallest], this._heap[i]] = [this._heap[i], this._heap[smallest]];
      i = smallest;
    }
  }
}

module.exports = { MinPriorityQueue };
