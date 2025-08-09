---
# Frontmatter for Slidev configuration
title: 'Merge Sort and Quick Sort'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Merge Sort and Quick Sort
## {{ $slidev.configs.subject }}
### Semester {{ $slidev.configs.semester }}
<br>

### Presented by {{ $slidev.configs.presenter }}

---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2" columns="1"/>


---

## Divide-and-Conquer Strategy

* A general algorithm design approach:
    1.  **Divide:** Split the input data `S` into two (or more) disjoint subsets, `S₁` and `S₂`.
    2.  **Recur:** Solve the subproblems associated with `S₁` and `S₂` recursively.
    3.  **Conquer:** Combine the solutions for `S₁` and `S₂` to form the final solution for `S`.
* **Base Case:** The recursion stops when subproblems reach a trivial size (e.g., 0 or 1 element).

---

## Merge Sort: Overview

* A sorting algorithm based on the divide-and-conquer paradigm.
* **Key Characteristics:**
    * Achieves O(n log n) running time (like Heap Sort).
    * Does not require an auxiliary priority queue (unlike Heap Sort).
    * Accesses data sequentially, making it suitable for sorting large datasets that might reside on disk.

---

## Merge Sort: Algorithm Steps

1.  **Divide:** If the input sequence `S` has 0 or 1 element, it's already sorted (base case). Otherwise, split `S` into two sequences, `S₁` and `S₂`, of roughly equal size (n/2 elements each).
2.  **Recur:** Recursively sort `S₁` and `S₂`.
3.  **Conquer:** Merge the two sorted sequences `S₁` and `S₂` back into a single sorted sequence `S`.

(Diagram illustrating the recursive splitting and merging phases of Merge Sort)

---

## Merging Two Sorted Sequences

* The core "conquer" step involves merging two already sorted sequences, `A` and `B`, into a single sorted sequence `S`.
* **Algorithm:**
    1. Use pointers (or indices) `i` for `A` and `j` for `B`, both starting at the beginning.
    2. While both `A` and `B` have elements remaining:
        * Compare `A[i]` and `B[j]`.
        * Copy the smaller element to the next position in the output sequence `S`.
        * Advance the pointer (`i` or `j`) corresponding to the sequence from which the element was copied.
    3. Once one sequence is exhausted, copy all remaining elements from the other sequence into `S`.
* This merge process takes **O(n₁ + n₂)** time, where `n₁` and `n₂` are the lengths of `A` and `B`.

(Diagram showing two sorted lists A and B being merged into list S step-by-step)

---

## Merge Sort: Tree Representation

* The execution of merge sort can be visualized as a binary tree.
* Each node represents a recursive call and the sequence it processes.
* The leaves represent the base cases (sequences of size 0 or 1).
* The merging step corresponds to combining results from child nodes.

(Diagram of the merge sort execution tree for an example sequence)

---

## Merge Sort: Performance Analysis

* Let `T(n)` be the running time for sorting `n` elements.
* **Recurrence Relation:**
    * `T(n) = 2 * T(n/2) + cn` (if n > 1)
    * `T(n) = b` (if n <= 1)
    * Where `cn` represents the time for dividing and merging (linear time).
* **Solving the Recurrence:** By analyzing the execution tree:
    * The height of the tree is O(log n).
    * The total work done at each level `i` is O(n).
    * Total time = Sum of work at all levels = O(n log n).
* **Conclusion:** Merge sort has a time complexity of **O(n log n)**.

---

## Quick Sort: Overview

* Another sorting algorithm based on the divide-and-conquer strategy.
* Often faster in practice than Merge Sort, though its worst-case performance is O(n²).
* **Key Characteristics:**
    * Sorts "in-place" (modifies the input array directly, minimal extra space).
    * Uses randomization to improve the likelihood of good performance.

---

## Quick Sort: High-Level Steps

1.  **Divide:**
    * Choose a random element `x` from the input sequence `S`, called the **pivot**.
    * Partition `S` into three subsequences:
        * `L`: Elements less than `x`.
        * `E`: Elements equal to `x`.
        * `G`: Elements greater than `x`.
2.  **Recur:** Recursively sort sequences `L` and `G`.
3.  **Conquer:** Combine the sorted `L`, `E`, and `G` sequences back together. (This step is trivial as they are already in the correct relative order).

(Diagram illustrating the partitioning step with pivot x)

---

## Quick Sort: Partitioning

* The core step is partitioning the sequence `S` based on the chosen pivot `x`.
* **Goal:** Rearrange `S` so all elements `< x` come first, followed by elements `= x`, followed by elements `> x`.
* This can be done in **O(n)** time by scanning the sequence.

---

## Quick Sort: Tree Representation

* Similar to Merge Sort, the execution can be visualized as a tree.
* Each node represents a recursive call on a subsequence.
* The choice of pivot determines how the sequence is split at each node.

(Diagram of a quick sort execution tree, showing subsequences L, E, G)

---

## Quick Sort: Worst-Case Scenario

* Occurs when the chosen pivot consistently results in highly unbalanced partitions (e.g., always picking the smallest or largest element).
* One subproblem might have size `n-1` and the other size 0.
* **Recurrence Relation:** `T(n) = T(n-1) + T(0) + cn` ≈ `T(n-1) + cn`.
* This leads to a total time complexity of **O(n²)**.

(Diagram showing a skewed quick sort execution tree representing the worst case)

---

## Quick Sort: Expected Performance

* **Randomization:** Choosing the pivot randomly makes the worst-case scenario very unlikely.
* **Expected Running Time:** With randomized pivots, the expected time complexity of Quick Sort is **O(n log n)**.
* **Intuition:** On average, a random pivot will split the sequence into reasonably balanced subsequences (e.g., roughly 1/4 and 3/4), leading to logarithmic depth in the execution tree.
* The total expected work across all levels remains O(n log n).

---

## In-Place Quick Sort

* A variation that modifies the input array directly, using O(1) extra space (excluding the recursion stack).
* **In-Place Partitioning:** A clever technique to partition the subarray `S[l...r]` around a pivot `x` without using auxiliary arrays.
    * Uses two indices, `j` starting from `l` and `k` starting from `r`.
    * Scan `j` rightwards until `S[j] >= x`.
    * Scan `k` leftwards until `S[k] <= x`.
    * If `j < k`, swap `S[j]` and `S[k]`.
    * Repeat until `j` and `k` cross.
    * This partitions the array into elements `<= x` and elements `>= x`. (A further step can separate the `= x` elements if needed).
* **Recursive Calls:** Recurse on the subarrays corresponding to `L` and `G`.

(Diagram illustrating the in-place partitioning scan and swap process)
