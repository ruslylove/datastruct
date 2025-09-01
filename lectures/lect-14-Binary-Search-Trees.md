---
# Frontmatter for Slidev configuration
title: 'Binary Search Trees'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Binary Search Trees
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

## Ordered Maps

* In ordered maps, keys are assumed to have a **total order** (they can be compared).
* Entries are stored based on the order of their keys.
* This structure allows for efficient **nearest neighbor queries**:
    * Finding the entry with the largest key less than or equal to a target `k`.
    * Finding the entry with the smallest key greater than or equal to a target `k`.

---

## Binary Search (Review)

* An efficient algorithm for searching in a *sorted* array (or list).
* **Process:**
    1. Compare the target key `k` with the middle element.
    2. If it's a match, we're done.
    3. If `k` is smaller, search the left half.
    4. If `k` is larger, search the right half.
* Each step halves the number of potential candidates.
* Time complexity: **$O(log n)$**.

```mermaid
graph TD
    subgraph "Sorted Array A"
        direction LR
        A0["A[0]: 2"]
        A1["A[1]: 5"]
        A2["A[2]: 8"]
        A3["A[3]: 12"]
        A4["A[4]: 16"]:::right
        A5["A[5]: 23"]:::right
        A6["A[6]: 38"]:::right
        A7["A[7]: 56"]:::right
    end

    subgraph "Search for k=23"
        L1["low=0"] ==> A0
        H1["high=7"] ==> A7
        M1["mid=3"] ==> A3
        %% C1["Compare k=23 with A[mid]=12.<br/>Since 23 > 12, the new search range is [mid+1...high]."]
    end
    
    %% M1 -- "k > A[mid]" %% --- C1

    classDef right fill:orange

```

---
layout: two-cols
---

## Binary Search Trees (BST)

* A **binary search tree** is a binary tree where entries `(key, value)` are stored at the internal nodes.
* It satisfies the **Binary Search Tree Property:** For any node `p`:
    * Keys in the *left* subtree of `p` are *less than or equal to* the key at `p`.
    * Keys in the *right* subtree of `p` are *greater than or equal to* the key at `p`.
* External nodes (leaves) typically don't store entries (they act as placeholders).
* An **inorder traversal** of a BST visits the keys in non-decreasing order.

:: right ::

```mermaid 
graph TD
    direction LR
    R(17)

        L(8)
        L_L(4)
        L_R(11)

        R_R(25)
        R_L(20)
        R_R_R(( ))



    R --- L; R --- R_R;
    L --- L_L; L --- L_R;
    R_R --- R_L;
    R_R -.- R_R_R
    L_L -.- leaf1(( )) & leaf2(( ))
    L_R -.- leaf3(( )) & leaf4(( ))
    R_L -.- leaf5(( )) & leaf6(( ))


    classDef invisible fill-opacity:0, stroke-opacity:0,color:#0000;
    
```

---
layout: two-cols
---

## Searching in a BST

* **Goal:** Find an entry with key `k`.
* **Algorithm `TreeSearch(k, p)`:** (`p` = root)

```java
Algorithm TreeSearch(k, p):
  if p is an external node then
    return p // Key k not found, reached a leaf placeholder

  if k == key(p) then
    return p // Found key k at position p

  else if k < key(p) then // Recurse on the left child
    return TreeSearch(k, leftChild(p))

  else // k > key(p) // Recurse on the right child
    return TreeSearch(k, rightChild(p))

```

* The search path follows a single path down from the root.
* Time complexity: $O(h)$, where `h` is the height of the tree.

:: right ::

```mermaid {scale:0.75}
graph TD
    subgraph A["Search Path for k=7"]
        R(17):::path
        L(8):::path
        LL(4):::path
        LR(11)
        RR(25)
        RRL(20)
        LLL(emp)
        
        R -- "7 < 17, go left" --- L
        L -- "7 < 8, go left" --- LL
        LL -.- LLL(( ))
        LL -- "7 > 4, go right<br/>(path ends, k not found)" --- LEAF(( ))
        
        
        
        R --- RR
        L --- LR
        LR -.- leaf3(( )) & leaf4(( ))

        RR --- RRL
        RR -.- RRR(( ))
        RRL -.- leaf1(( )) & leaf2(( ))
        
        linkStyle 0 stroke:red,stroke-width:2px
        linkStyle 1 stroke:red,stroke-width:2px
        linkStyle 3 stroke:red,stroke-width:2px,stroke-dasharray: 5 5
        classDef path fill:#f9f,stroke:#333,stroke-width:2px
        classDef invisible fill-opacity:0, stroke-opacity:0,color:#0000;
        style A fill-opacity:0, stroke-opacity:0;



    end
```

---
layout: two-cols
---

## Insertion into a BST

* **Goal:** Insert a new entry `(k, v)` while maintaining the BST property.
* **Algorithm:**
    1. Search for key `k` using `TreeSearch`. Let `w` be the leaf node reached.
    2. If `w` is an external node (placeholder):
        * Replace `w` with a new internal node storing `(k, v)`.
        * Add two new external nodes as children of this new node.
    3. If `w` is an internal node:
        * Update the value at `w` to `v`.
* Time complexity: $O(h)$.

:: right ::

```mermaid {scale:0.7}
graph TD
    subgraph A["Insertion of k=5"]
        R(17):::path
        L(8):::path
        LL(4):::path
        LR(11)
        RR(25)
        RRL(20)
        
        LLR(5):::inserted
        
        R -- "5 < 17" --- L
        L -- "5 < 8" --- LL
        LL -.- LLL(( ))
        LL -- "5 > 4, insert here" --- LLR
        
        R --- RR; L --- LR; RR --- RRL;
        LR -.- leaf3(( )) & leaf4(( ))
        RR -.- RRR(( ))
        RRL -.- leaf1(( )) & leaf2(( ))
        LLR -. new child .- leaf5(( )) & leaf6(( ))

        linkStyle 0 stroke:red,stroke-width:2px; linkStyle 1 stroke:red,stroke-width:2px; linkStyle 3 stroke:red,stroke-width:2px;
        
        classDef path fill:#f9f,stroke:#333,stroke-width:2px
        classDef inserted fill:lightgreen,stroke:green,stroke-width:2px
        classDef invisible fill-opacity:0, stroke-opacity:0,color:#0000;
        style A fill-opacity:0, stroke-opacity:0;

    end
```

---
layout: two-cols
---

## Deletion from a BST (Case 1: Leaf Child)

* **Goal:** Remove the entry with key `k`.
* **Algorithm Step 1:** Search for `k`. Let `v` be the node storing `k`.
* **Case 1:** If node `v` has at least one child `w` that is an external node (leaf):
    1. Remove `v` and its leaf child `w` from the tree.
    2. Promote the *other* child of `v` (which could be internal or external) to take `v`'s place in the tree (connect it to `v`'s parent).
* Time complexity: $O(h)$.

:: right ::

```mermaid
graph TD


    subgraph "After: Node 5 is promoted"
        R2(17)
        L2(8)
        LR2(11)
        LL2(5):::promoted
        
        R2 --- L2; R2 --- RR2(25)
        L2 -- "Parent bypasses 4" --- LL2; L2 --- LR2
    end

    subgraph "Before: Remove k=4"
        R1(17)
        L1(8)
        LL1(4):::deleted
        LR1(11)
        LLR1(5):::promoted
        
        R1 --- L1; R1 --- RR1(25)
        L1 --- LL1; L1 --- LR1
        LL1 -. "leaf child" .- LLEAF(( ))
        LL1 -- "internal child" --- LLR1
    end

    classDef deleted fill:tomato,stroke:red,stroke-width:2px
    classDef promoted fill:lightgreen,stroke:green,stroke-width:2px
```

---
layout: two-cols
---

## Deletion from a BST (Case 2: Two Internal Children)

* **Case 2:** If the node `v` (storing key `k` to be removed) has two *internal* children:
    1. Find the node `w` that immediately *follows* `v` in an inorder traversal. Node `w` will be the leftmost node in `v`'s right subtree and is guaranteed to have at most one internal child.
    2. Copy the entry `(key(w), value(w))` from node `w` into node `v`.
    3. Remove node `w` using the logic from Case 1 (since `w` has at least one leaf child).
* Time complexity: $O(h)$.

:: right ::

```mermaid
graph TD

    subgraph RT[" "]
        RR1(25)
        RRL1(20)
        C
    end

    subgraph G["**Remove k=8**"]
        R1(17)
        L1(8):::deleted
        LL1(4)
        LLR1(5)
        
        RR1(25)
        RRL1(20)
        
        %% Right subtree of 8, to find successor
        LR1(11)
        LR1_L(10)
        LR1_R(15)
        LR1_L_L(9):::successor
        LR1_L_R(( ))
        
        R1 --- L1; R1 --- RR1
        L1 --- LL1; L1 --- LR1
        
        LL1 --- LLR1
        RR1 --- RRL1
        
        LR1 --- LR1_L; LR1 --- LR1_R
        LR1_L --- LR1_L_L
        LR1_L -.- LR1_L_R
        
        LR1_L_L e1@-- "Inorder successor of 8" --> L1
        LR1_R -.- A(( )) & B(( ))
        RR1 -.- C(( ))

    end

    e1@{animate: true}

    classDef deleted fill:tomato,stroke:red,stroke-width:2px
    classDef successor fill:lightgreen,stroke:green,stroke-width:2px
    classDef invisible fill-opacity:0, stroke-opacity:0;
    class RT,G invisible

```

---

## Performance of Binary Search Trees

* A BST with `n` entries has height `h`.
* **Space:** $O(n)$.
* **`get`, `put`, `remove`:** $O(h)$ time complexity.
* **Crucial Point:** The height `h` depends on the shape of the tree!
    * **Best Case (Balanced Tree):** `h` is $O(\log n)$. Operations are efficient.
    * **Worst Case (Skewed Tree):** `h` can be $O(n)$ (like a linked list). Operations degrade to $O(n)$.
* **Conclusion:** Standard BSTs work well on average if keys are inserted randomly, but performance can be poor for certain insertion sequences. **Balanced** search trees (like AVL trees, Red-Black trees) are needed to guarantee O(log n) worst-case performance.

---

## Map Implementation Comparison

| Implementation | `get`/`put`/`remove` (Avg) | `get`/`put`/`remove` (Worst) | Ordered Operations? | When to Use? |
| :--- | :---: | :---: | :---: | :--- |
| **Unsorted List** | $O(n)$ | $O(n)$ | No | Simple, for very small datasets. |
| **Hash Table** | **$O(1)$** | $O(n)$ | No | **Fastest access.** When order doesn't matter. |
| **Binary Search Tree** | $O(\log n)$ | $O(n)$ | **Yes** | When order is needed, and data is expected to be random. |

*   **Hash Tables** offer the best average-case performance but provide no key ordering.
*   **Binary Search Tree** provide a great compromise: very good performance ($O(\log n)$) and ordered key traversal.
