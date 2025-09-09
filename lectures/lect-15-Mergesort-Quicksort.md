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

## Merge Sort: Overview

* A sorting algorithm based on the divide-and-conquer paradigm.
* **Key Characteristics:**
    * Achieves $O(n\log n)$ running time (like Heap Sort).
    * Does not require an auxiliary priority queue (unlike Heap Sort).
    * Accesses data sequentially, making it suitable for sorting large datasets that might reside on disk.  
* **Divide-and-Conquer Strategy**
    * A general algorithm design approach:
        1.  **Divide:** Split the input data `S` into two (or more) disjoint subsets, `S₁` and `S₂`.
        2.  **Recur:** Solve the subproblems associated with `S₁` and `S₂` recursively.
        3.  **Conquer:** Combine the solutions for `S₁` and `S₂` to form the final solution for `S`.
    * **Base Case:** The recursion stops when subproblems reach a trivial size (e.g., 0 or 1 element).


---
layout: two-cols
---

## Merge Sort: Algorithm Steps

1.  **Divide:** If the input sequence `S` has 0 or 1 element, it's already sorted (base case). Otherwise, split `S` into two sequences, `S₁` and `S₂`, of roughly equal size (n/2 elements each).
2.  **Recur:** Recursively sort `S₁` and `S₂`.
3.  **Conquer:** Merge the two sorted sequences `S₁` and `S₂` back into a single sorted sequence `S`.

:: right ::

```mermaid {scale: 0.52}
graph TD
    %% --- Top Level ---
    A0("S = [0, 10, 2, 8, 3, 1, 7]")

    %% --- Divide Phase (Downward Arrows) ---
    subgraph "Divide Phase (Splitting)"
        direction TB
        A0 -- "Divide" --> A1_R("[0, 10, 2]")
        A0 -- "Divide" --> A1_L("[8, 3, 1, 7]")
        
        A1_L -- "Divide" --> A2_L1("[8, 3]")
        A1_L -- "Divide" --> A2_R1("[1, 7]")
        A1_R -- "Divide" --> A2_L2("[0, 10]")
        A1_R -- "Divide" --> A2_R2("[2]")

        A2_L1 -- "Divide" --> A3_L1("[8]")
        A2_L1 -- "Divide" --> A3_R1("[3]")
        A2_R1 -- "Divide" --> A3_L2("[1]")
        A2_R1 -- "Divide" --> A3_R2("[7]")
        A2_L2 -- "Divide" --> A3_L3("[0]")
        A2_L2 -- "Divide" --> A3_R3("[10]")
    end

    %% --- Conquer Phase (Upward Arrows) ---
    subgraph "Conquer Phase (Merging)"
        direction TB
        M2_L1("[3, 8]"); M2_R1("[1, 7]"); M2_L2("[0, 10]")
        M1_L("[1, 3, 7, 8]"); M1_R("[0, 2, 10]")
        M0("[0, 1, 2, 3, 7, 8, 10]")
        A3_R1 -- "Merge" --> M2_L1; A3_L1 -- "Merge" --> M2_L1
        A3_R2 -- "Merge" --> M2_R1; A3_L2 -- "Merge" --> M2_R1
        A3_R3 -- "Merge" --> M2_L2; A3_L3 -- "Merge" --> M2_L2
        M2_R1 -- "Merge" --> M1_L; M2_L1 -- "Merge" --> M1_L
        A2_R2 -- "Merge" --> M1_R; M2_L2 -- "Merge" --> M1_R
        M1_R -- "Merge" --> M0; M1_L -- "Merge" --> M0
    end

    linkStyle 0,1,2,3,4,5,6,7,8,9,10,11 stroke:indianred,stroke-width:2px,stroke-dasharray: 5 5; linkStyle 12,13,14,15,16,17,18,19,20,21,22,23 stroke:forestgreen,stroke-width:2px
    classDef initial fill:#lightblue, stroke:#333; 
    classDef divide fill:#ffcccb,stroke:#333; 
    classDef merge fill:#90ee90,stroke:#333; 
    class A0 initial; 
    class A1_L,A1_R,A2_L1,A2_R1,A2_L2,A2_R2,A3_L1,A3_R1,A3_L2,A3_R2,A3_L3,A3_R3 divide; 
    class M0,M1_L,M1_R,M2_L1,M2_R1,M2_L2 merge
```

---


## Merging Two Sorted Sequences

<div class="grid grid-cols-10 gap-2 items-start">

<div class="col-span-7">

* The core "conquer" step involves merging two already sorted sequences, `A` and `B`, into a single sorted sequence `S`.
* **Algorithm:**
    1. Use pointers (or indices) `i` for `A` and `j` for `B`, both starting at the beginning.
    2. While both `A` and `B` have elements remaining:
        * Compare `A[i]` and `B[j]`.
        * Copy the smaller element to the next position in the sequence `S`.
        * Advance the pointer (`i` or `j`) corresponding to the sequence from which the element was copied.
    3. Once one sequence is exhausted, copy all remaining elements from the other sequence into `S`.
* This merge process takes **$O(n₁ + n₂)$** time, where `n₁` and `n₂` are the lengths of `A` and `B`.

</div>


<div>
```mermaid {scale: 0.4}
graph TD
    subgraph IS["Initial State"]
        style A1 fill:#e6f2ff,stroke:#333
        style B1 fill:#e6f2ff,stroke:#333
        style S1 fill:#fff0e6,stroke:#333
        A1["A: [<b>3</b>, 8, 12]<br/>i=0"]
        B1["B: [<b>5</b>, 7]<br/>j=0"]
        S1["S: [ ]"]
    end

    IS -- "Compare A[i] and B[j]<br/>3 < 5, so move A[i] to S" --> ST2

    subgraph ST2["Step 2"]
        style A2 fill:#e6f2ff,stroke:#333
        style B2 fill:#e6f2ff,stroke:#333
        style S2 fill:#fff0e6,stroke:#333
        S2["S: [3]"]
        A2["A: [3, <b>8</b>, 12]<br/>i=1"]
        B2["B: [<b>5</b>, 7]<br/>j=0"]
    end

    ST2 -- "Compare A[i] and B[j]<br/>5 < 8, so move B[j] to S" --> ST3

    subgraph ST3["Step 3"]
        style A3 fill:#e6f2ff,stroke:#333
        style B3 fill:#e6f2ff,stroke:#333
        style S3 fill:#fff0e6,stroke:#333
        S3["S: [3, 5]"]
        A3["A: [3, <b>8</b>, 12]<br/>i=1"]
        B3["B: [5, <b>7</b>]<br/>j=1"]
    end

    ST3 -- "Compare A[i] and B[j]<br/>7 < 8, so move B[j] to S" --> ST4

    subgraph ST4["Step 4"]
        style A4 fill:#e6f2ff,stroke:#333
        style B4 fill:#e6f2ff,stroke:#333
        style S4 fill:#fff0e6,stroke:#333
        S4["S: [3, 5, 7]"]
        A4["A: [3, <b>8</b>, 12]<br/>i=1"]
        B4["B: [5, 7]<br/>j=2 (exhausted)"]
    end

    ST4 -- "List B is exhausted.<br/>Copy all remaining elements from A." --> ST5

    subgraph ST5["Step 5: Final Result"]
        style S5 fill:#d4edda,stroke:#155724
        S5["S: [3, 5, 7, 8, 12]"]
    end

```

</div>

</div>

---
hide: true
---

## Merge Sort: Tree Representation

<div class="grid grid-cols-2 gap-2 items-start">
<div>

* The execution of merge sort can be visualized as a binary tree.
* Each node represents a recursive call and the sequence it processes.
* The leaves represent the base cases (sequences of size 0 or 1).
* The merging step corresponds to combining results from child nodes.

</div>
<div>
```mermaid {scale: 0.4}
graph TD 
    subgraph "Execution Flow"
        A0("S = [8, 3, 10, 1, 7, 2]"):::initial
        
        A0 -- "Divide" --> A1_L("[8, 3, 10]"):::divide
        A0 -- "Divide" --> A1_R("[1, 7, 2]"):::divide

        A1_L -- "Divide" --> A2_L("[8, 3]"):::divide
        A1_L -- "Divide" --> A2_R("[10]"):::leaf

        A1_R -- "Divide" --> A3_L("[1, 7]"):::divide
        A1_R -- "Divide" --> A3_R("[2]"):::leaf

        A2_L -- "Divide" --> A4_L("[8]"):::leaf
        A2_L -- "Divide" --> A4_R("[3]"):::leaf

        A3_L -- "Divide" --> A5_L("[1]"):::leaf
        A3_L -- "Divide" --> A5_R("[7]"):::leaf

        A4_L -- "Merge" --> M1("[3, 8]"):::merge
        A4_R -- "Merge" --> M1

        A5_L -- "Merge" --> M2("[1, 7]"):::merge
        A5_R -- "Merge" --> M2

        M1 -- "Merge" --> M3("[3, 8, 10]"):::merge
        A2_R -- "Merge" --> M3

        M2 -- "Merge" --> M4("[1, 2, 7]"):::merge
        A3_R -- "Merge" --> M4

        M3 -- "Merge" --> M_Final("[1, 2, 3, 7, 8, 10]"):::final
        M4 -- "Merge" --> M_Final
    end


    classDef initial fill:#cde4ff,stroke:#333,stroke-width:2px
    classDef divide fill:#fff0e6,stroke:#333,stroke-width:1px
    classDef leaf fill:#e6f2ff,stroke:#333,stroke-width:1px
    classDef merge fill:#d4edda,stroke:#155724,stroke-width:2px
    classDef final fill:#d4edda,stroke:#155724,stroke-width:3px

```
</div>
</div>


---

## Merge Sort: Performance Analysis

* Let $T(n)$ be the running time for sorting $n$ elements.
* **Recurrence Relation:**
    * $T(n) = 2 * T(n/2) + cn$ (if $n$ > 1)
    * $T(n) = b$ (if n <= 1)
    * Where $cn$ represents the time for dividing and merging (linear time).
* **Solving the Recurrence:** By analyzing the execution tree:
    * The height of the tree is $O(\log n)$.
    * The total work done at each level $i$ is $O(n)$.
    * Total time = Sum of work at all levels = $O(n\log n)$.
* **Conclusion:** Merge sort has a time complexity of **$O(n \log n)$**.

---

## Quick Sort: Overview

* Another sorting algorithm based on the divide-and-conquer strategy.
* Often faster in practice than Merge Sort, though its worst-case performance is $O(n²)$.
* **Key Characteristics:**
    * Sorts "in-place" (modifies the input array directly, minimal extra space).
    * Uses randomization to improve the likelihood of good performance.

---
layout: two-cols
---

## Quick Sort: Algorithm Steps

1.  **Divide:**
    * Choose a random element `x` from the input sequence `S`, called the **pivot**.
    * Partition `S` into three subsequences:
        * `L`: Elements less than `x`.
        * `E`: Elements equal to `x`.
        * `G`: Elements greater than `x`.
2.  **Recur:** Recursively sort sequences `L` and `G`.
3.  **Conquer:** Combine the sorted `L`, `E`, and `G` sequences back together. (This step is trivial as they are already in the correct relative order).

:: right ::

```mermaid
graph TD
    A["<b>Input Sequence S</b><br/>[7, 2, 9, 2, 5, 3, 8, 5]"] -- "Step 1: Choose pivot <b>x = 5</b>" --> B
    
    subgraph B [Step 2: Partition S]
        direction TB
        L["<b>L (elements < 5)</b><br/>[2, 2, 3]"] 
        E["<b>E (elements = 5)</b><br/>[5, 5]"]
        G["<b>G (elements > 5)</b><br/>[7, 9, 8]"]
    end

    B -. "Step 3: Recur on L & G, then combine" .-> C("<b>Final Result after recursion</b><br/>[2, 2, 3, 5, 5, 7, 8, 9]")

    classDef initial fill:#cde4ff,stroke:#333;
    classDef partition fill:#fff0e6,stroke:#333;
    classDef final fill:#d4edda,stroke:#155724;
    class A initial; class L,E,G partition; class C final;
```

---

## Quick Sort: Partitioning

* The core step is partitioning the sequence `S` based on the chosen pivot `x`.
* **Goal:** Rearrange `S` so all elements `< x` come first, followed by elements `= x`, followed by elements `> x`.
* This can be done in **$O(n)$** time by scanning the sequence.

```mermaid
graph TD
    A["<b>Input Sequence S</b><br/>[7, 2, 9, 2, 5, 3, 8, 5]"] -- "Step 1: Choose pivot <b>x = 5</b>" --> B
    
    subgraph B [Step 2: Partition S]
        direction TB
        L["<b>L (elements < 5)</b><br/>[2, 2, 3]"] 
        E["<b>E (elements = 5)</b><br/>[5, 5]"]
        G["<b>G (elements > 5)</b><br/>[7, 9, 8]"]
    end

    classDef initial fill:#cde4ff,stroke:#333;
    classDef partition fill:#fff0e6,stroke:#333;
    classDef final fill:#d4edda,stroke:#155724;
    class A initial; class L,E,G partition; class C final;
```

---

## Quick Sort: Tree Representation

* Similar to Merge Sort, the execution can be visualized as a tree.
* Each node represents a recursive call on a subsequence.
* The choice of pivot determines how the sequence is split at each node.

```mermaid {scale: 0.7}
graph TD
    A("<b>quickSort([7, 2, 9, 5, 3, 8, 4])</b><br/>pivot = 5"):::recursiveCall

    subgraph "Partition of A"
        direction LR
        L1("L = [2, 3, 4]"):::partition
        E1("E = [5]"):::base
        G1("G = [7, 9, 8]"):::partition
    end

    A -- "Recur on L" --> L1_call("<b>quickSort([2, 3, 4])</b><br/>pivot = 3"):::recursiveCall
    A -- "Combine with E" --> E1
    A -- "Recur on G" --> G1_call("<b>quickSort([7, 9, 8])</b><br/>pivot = 8"):::recursiveCall

    subgraph "Partition of L1"
        direction LR
        L2("L = [2]"):::base
        E2("E = [3]"):::base
        G2("G = [4]"):::base
    end

    subgraph "Partition of G1"
        direction LR
        L3("L = [7]"):::base
        E3("E = [8]"):::base
        G3("G = [9]"):::base
    end

    L1_call --> L2 & E2 & G2
    G1_call --> L3 & E3 & G3

    classDef recursiveCall fill:#cde4ff,stroke:#333,stroke-width:2px;
    classDef partition fill:#fff0e6,stroke:#333,stroke-width:1px;
    classDef base fill:#d4edda,stroke:#155724,stroke-width:2px;
```

---

## Quick Sort: Worst-Case Scenario

* Occurs when the chosen pivot consistently results in highly unbalanced partitions (e.g., always picking the smallest or largest element).
* One subproblem might have size `n-1` and the other size 0.
* **Recurrence Relation:** $T(n) = T(n-1) + T(0) + cn ≈ T(n-1) + cn$.
* This leads to a total time complexity of **$O(n²)$**.
<br><br>
```mermaid
graph LR

    A("<b>quickSort([1, 2, 3, 4, 5, 6])</b><br/>pivot = 6"):::recursiveCall
    
    subgraph PA ["Partition of A"]
        direction TB
        L1("L = [1, 2, 3, 4, 5]"):::large_partition
        E1("E = [6]"):::base
        G1("G = []"):::empty_partition
    end

    A -- "Recur on L (size n-1)" --> B("<b>quickSort([1, 2, 3, 4, 5])</b><br/>pivot = 5"):::recursiveCall
    A -.- PA
    subgraph PB ["Partition of B"]
        direction TB
        L2("L = [1, 2, 3, 4]"):::large_partition
        E2("E = [5]"):::base
        G2("G = []"):::empty_partition
    end

    B -- "Recur on L (size n-2)" --> C("...")
    B -.- PB
    

    classDef recursiveCall fill:#f8d7da,stroke:#721c24,stroke-width:2px;
    classDef large_partition fill:#fff3cd,stroke:#856404;
    classDef base fill:#d4edda,stroke:#155724;
    classDef empty_partition fill:#e2e3e5,stroke:#383d41;
```

---

## Quick Sort: Expected Performance

* **Randomization:** Choosing the pivot randomly makes the worst-case scenario very unlikely.
* **Expected Running Time:** With randomized pivots, the expected time complexity of Quick Sort is **$O(n \log n)$**.
* **Intuition:** On average, a random pivot will split the sequence into reasonably balanced subsequences (e.g., roughly 1/4 and 3/4), leading to logarithmic depth in the execution tree.
* The total expected work across all levels remains $O(n \log n)$.

---


<div class="grid grid-cols-10 gap-2 items-start">

<div class="col-span-8">

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
</div>

<div>

```mermaid {scale: 0.57}
graph TD
    A["<b>Initial State: pivot = 5</b><br/>S = [<b>7</b>, 2, 9, 3, 8, 5, <b>4</b>] j=0, k=6"]:::initial
    
    A -- "Scan j finds 7 (>=5)<br/>Scan k finds 4 (<=5)<br/>j < k, so swap S[j] and S[k]" --> B

    B["<b>After 1st Swap</b><br/>S = [4, <b>2</b>, 9, 3, 8, <b>5</b>, 7]<br/>j=1, k=5"]:::step
    
    B -- "Scan j finds 9 (>=5)<br/>Scan k finds 5 (<=5)<br/>j < k, so swap S[j] and S[k]" --> C

    C["<b>After 2nd Swap</b><br/>S = [4, 2, 5, <b>3</b>, <b>8</b>, 9, 7]<br/>j=3, k=4"]:::step

    C -- "Scan j finds 8 (>=5)<br/>Scan k finds 3 (<=5)<br/>j > k, pointers have crossed. Stop." --> D

    D["<b>Final Partitioned State</b><br/>S = [4, 2, 5, 3 | 8, 9, 7]<br/>Partition is between index 3 and 4"]:::final

    classDef initial fill:#cde4ff,stroke:#333;
    classDef step fill:#fff0e6,stroke:#333;
    classDef final fill:#d4edda,stroke:#155724;
```
</div>

</div>

---
layout: two-cols-header
---

## Summary: Merge Sort vs. Quick Sort

:: left ::

### Merge Sort

*   **Time Complexity:** **$O(n \log n)$** in all cases (worst, average, best).
*   **Space Complexity:** **$O(n)$** for the auxiliary array needed for merging.
*   **In-place:** No, the standard algorithm is not in-place.
*   **Stability:** Stable (maintains relative order of equal elements).
*   **Key Idea:** Always divides the array in half, does the main work in the "conquer" (merge) step.
*   **Use Case:** Excellent for external sorting (data on disk) and when worst-case guarantees are essential.

:: right ::

### Quick Sort

*   **Time Complexity:**
    *   **$O(n \log n)$** on average and in the best case.
    *   **$O(n^2)$** in the worst case (rare with random pivot).
*   **Space Complexity:** **$O(\log n)$** for the recursion stack in the in-place version.
*   **In-place:** Yes, common implementations.
*   **Stability:** Not stable.
*   **Key Idea:** Divides the array based on a pivot, does the main work in the "divide" (partition) step.
*   **Use Case:** Generally faster in practice for in-memory arrays due to better cache performance and lower constant factors.
