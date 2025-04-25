---
# Frontmatter for Slidev configuration
title: 'Heaps'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Heaps
### Algorithm and Data Structures
### Semester 1/2025
### Dr. Ruslee Sutthaweekul

---

## Recall: Priority Queue ADT

* Stores entries as `(key, value)` pairs.
* **Main Operations:**
    * `insert(k, v)`: Adds an entry.
    * `removeMin()`: Removes and returns the entry with the smallest key.
* **Other Operations:** `min()`, `size()`, `isEmpty()`.
* **Applications:** Standby lists, auctions, stock markets.

---

## Recall: PQ Sorting

* Use a priority queue `P` to sort a sequence `S`.
* **Phase 1:** Insert all elements from `S` into `P`.
* **Phase 2:** Repeatedly call `removeMin()` on `P` and place results back into `S` in order.
* **Efficiency depends on P's implementation:**
    * Unsorted sequence -> O(n²) (Selection Sort)
    * Sorted sequence -> O(n²) (Insertion Sort)
* **Question:** Can we achieve better sorting performance using a more efficient priority queue implementation?

---

## What is a Heap?

* A **heap** is a binary tree structure (`T`) storing key-value entries at its nodes, satisfying two key properties:
    1.  **Heap-Order Property:** For every node `p` (other than the root), the key stored at `p` is *greater than or equal to* the key stored at its parent. This implies the smallest key is always at the root.
    2.  **Complete Binary Tree Property:** The tree `T` is a **complete binary tree**. This means the tree is perfectly balanced, and all levels are filled except possibly the last level, which is filled from left to right.

(Diagram showing a heap with keys satisfying heap-order and the complete binary tree structure)

---

## Heap Height

* A heap `T` storing `n` entries has a height `h`.
* **Theorem:** The height `h` of a heap with `n` entries is **O(log n)**.
* **Proof Idea:**
    * A complete binary tree of height `h` has at least `1 + 2 + 4 + ... + 2^(h-1) + 1 = 2^h` nodes at levels 0 to h-1.
    * So, `n >= 2^h`. Taking `log₂` of both sides gives `log₂ n >= h`.
    * Thus, `h <= log₂ n`, meaning `h` is O(log n).

(Diagram illustrating levels of a complete binary tree and the number of nodes at each level)

---

## Heap Implementation: Array-Based List

* We can represent a complete binary tree (like a heap) efficiently using an array-based list (e.g., `ArrayList`).
* Map tree nodes to array indices:
    * Root is at index 0.
    * For a node at index `i`:
        * Its left child is at index `2i + 1`.
        * Its right child is at index `2i + 2`.
        * Its parent is at index `floor((i - 1) / 2)`.
* This allows direct index calculations to navigate between parent and children, without needing explicit node objects with links.

(Diagram showing a heap tree and its corresponding array representation with index mapping)

---

## Heap Operations: Insertion (`insert`)

* **Goal:** Add a new entry `(k, v)` while maintaining heap properties.
* **Method (Upheap Bubbling):**
    1.  Add the new entry to the *next available slot* at the end of the array representation (maintaining completeness). Let this position be `p`.
    2.  **Upheap:** While `p` is not the root and the key at `p` is *less than* the key at its parent:
        * Swap the entry at `p` with the entry at its parent.
        * Update `p` to be the position of its parent.
    3.  Repeat the upheap process until the heap-order property is restored.

(Diagram illustrating the insertion of key '2' and the subsequent upheap swaps)

---

## Heap Operations: Removal (`removeMin`)

* **Goal:** Remove the entry with the minimum key (always at the root) while maintaining heap properties.
* **Method (Downheap Bubbling):**
    1.  Save the root entry (this is the minimum to be returned).
    2.  Move the *last* entry in the array representation to the root position (index 0). This maintains completeness but likely violates heap-order.
    3.  Remove the last entry's original position (decrease size).
    4.  **Downheap:** Let `p` be the root position (index 0). While `p` has at least one child:
        * Find the child `c` of `p` with the *smaller* key.
        * If the key at `p` is *greater than* the key at `c`:
            * Swap the entries at `p` and `c`.
            * Update `p` to be the position `c`.
        * Else (heap-order is locally satisfied): Break the loop.
    5.  Return the saved minimum entry.

(Diagram illustrating the removal of the root '4' and the subsequent downheap swaps starting with '20' moved to the root)

---

## Heap Performance Analysis

* The array-based list representation uses O(n) space.
* **Upheap (`insert`):** The number of swaps is at most the height of the heap, `h`. Since `h` is O(log n), `insert` takes **O(log n)** time.
* **Downheap (`removeMin`):** The number of swaps is at most the height `h`. `removeMin` takes **O(log n)** time.
* **Other operations:** `size()`, `isEmpty()`, `min()` take **O(1)** time.

---

## Heap Sort

* Uses the heap data structure to sort a sequence `S`.
* **Algorithm:**
    1.  **Phase 1 (Heap Construction):** Insert all elements from `S` into an initially empty heap `P`.
    2.  **Phase 2 (Extraction):** Repeatedly call `P.removeMin()` and place the returned elements back into `S` in sorted order.
* **Performance:**
    * Phase 1 (n inserts): O(n log n) time.
    * Phase 2 (n removeMins): O(n log n) time.
    * Total Heap Sort time: **O(n log n)**.

(Diagram illustrating the two phases of Heap Sort)

---

## Bottom-Up Heap Construction (Optimization)

* We can build a heap from an initial array of `n` keys more efficiently than `n` individual insertions.
* **Idea:** Start from the bottom level and work upwards, enforcing the heap property locally.
* **Algorithm:**
    1.  Represent the `n` keys as a complete binary tree (in an array).
    2.  Iterate backwards from the index of the *last internal node* (`floor(n/2) - 1`) down to the root (index 0).
    3.  For each node `p` in this iteration, perform a **downheap** operation starting from `p` to fix the heap property within the subtree rooted at `p`.

(Diagram showing an initial unsorted array and the state after downheap is applied to nodes progressively from right-to-left, bottom-up)

---

## Bottom-Up Heap Construction: Analysis

* **Observation:** In the bottom-up approach, elements tend to perform fewer swaps during downheap compared to the upheap process in repeated insertions. Many elements near the bottom levels don't move far, or at all.
* **Theorem:** Building a heap of `n` keys using the bottom-up construction method takes **O(n)** time.
* **Implication for Heap Sort:** If we use bottom-up construction (O(n)) followed by `n` `removeMin` operations (O(n log n)), the overall Heap Sort time complexity remains **O(n log n)**, but the constant factors involved in the construction phase are improved.

---

## Merging Two Heaps (Conceptual)

* **Problem:** Combine two heaps, `H₁` and `H₂`, into a single valid heap `H`.
* **Simple Approach:** Create a new heap `H`. Insert all elements from `H₁` into `H`, then insert all elements from `H₂` into `H`.
* **Complexity:** If `n₁` and `n₂` are the sizes, this takes O(n₁ log(n₁+n₂) + n₂ log(n₁+n₂)) time, roughly O(n log n) where `n = n₁ + n₂`.
* **Alternative (using bottom-up):** Concatenate the array representations of `H₁` and `H₂`. Then, apply the O(n) bottom-up heap construction algorithm to the combined array. This is more efficient.

(Diagram showing two heaps being merged conceptually)

---

## Bottom-Up Heap Construction Example Trace

(Series of diagrams showing the initial array [16, 15, 4, 12, 6, 7, 23, 20] and the state of the heap after downheap is applied starting from index 3 (value 12), then index 2 (value 4), index 1 (value 15), and finally index 0 (value 16), resulting in the final heap structure.)
