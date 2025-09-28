---
# Frontmatter for Slidev configuration
title: 'Course Summary'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Appendix A: Course Summary
## {{ $slidev.configs.subject }}
### Semester {{ $slidev.configs.semester }}
<br>

### Presented by {{ $slidev.configs.presenter }}

---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2" columns="2"/>

---

## Introduction to Java

*   **Core Concepts:** JVM, automatic garbage collection, and a strong OOP focus.
*   **Key for ADS:** Master classes, objects, interfaces, inheritance, and the Collections Framework.
*   **Generics:** Ensure type safety in data structures.
*   **References:** Crucial for understanding linked structures like lists and trees.

---

## Algorithm Analysis

*   **Asymptotic Analysis:** Focuses on growth rates for large inputs.
*   **Big-Oh ($O$) Notation:** Provides an upper bound (worst-case) on performance.
*   **Growth Rates:** Understanding the difference between $O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, and $O(n^2)$ is crucial for choosing efficient algorithms.

---

## Arrays and Lists

*   **Arrays:** Fixed-size containers with $O(1)$ access but $O(n)$ for insertions/deletions.
*   **Dynamic Arrays (`ArrayList`):** Use a resizing strategy (doubling capacity) to provide amortized $O(1)$ for adding to the end.
*   **Singly Linked Lists:** Excel at $O(1)$ insertions/deletions at the head.
*   **Doubly Linked Lists:** Allow $O(1)$ insertions/deletions at both ends and at any known position.

---

## Stacks

*   **Principle:** Last-In, First-Out (LIFO).
*   **Operations:** `push`, `pop`, `top`.
*   **Implementations:**
    *   **Array-Based:** Simple and fast ($O(1)$), but fixed capacity.
    *   **Linked-List-Based:** Dynamic and also $O(1)$.
*   **Applications:** Managing function calls, undo/redo, expression evaluation.

---

## Queues and Deques

*   **Queue Principle:** First-In, First-Out (FIFO).
*   **Queue Operations:** `enqueue`, `dequeue`, `first`.
*   **Deque (Double-Ended Queue):** A generalization that allows insertion/deletion at both ends.
*   **Implementations:**
    *   **Circular Array:** Efficient ($O(1)$) but fixed size.
    *   **Doubly Linked List:** Ideal for Deques, providing $O(1)$ for all operations with dynamic size.

---

## Trees

*   **Concept:** A hierarchical data structure with a root, parents, and children.
*   **Traversals:**
    *   **Preorder:** Root -> Left -> Right
    *   **Inorder:** Left -> Root -> Right
    *   **Postorder:** Left -> Right -> Root
*   **Binary Trees:** Each node has at most two children.

---

## Priority Queues and Heaps

*   **Priority Queue:** An ADT where elements have priorities; `removeMin` returns the element with the highest priority.
*   **Heap:** A complete binary tree that satisfies the heap-order property. The ideal data structure for a priority queue.
*   **Performance:** Heaps provide $O(\log n)$ for `insert` and `removeMin`.
*   **Heap Sort:** An efficient $O(n \log n)$ sorting algorithm.

---

## Maps and Hash Tables

*   **Map ADT:** A collection of key-value pairs with unique keys.
*   **Hash Table:** A data structure that provides $O(1)$ average-case time for `get`, `put`, and `remove`.
*   **Hash Function:** Maps keys to indices in an array.
*   **Collision Handling:**
    *   **Separate Chaining:** Each bucket is a list of entries.
    *   **Open Addressing:** Probe for the next available slot.

---

## Binary Search Trees (BST)

*   **Property:** For any node, all keys in the left subtree are smaller, and all keys in the right subtree are larger.
*   **Performance:** Operations are $O(h)$, where $h$ is the height of the tree.
    *   **Balanced Tree:** $h \approx \log n$, leading to $O(\log n)$ performance.
    *   **Skewed Tree:** $h \approx n$, leading to $O(n)$ performance.
*   **Advantage:** Maintains order, allowing for efficient range queries.

---

## Sorting Algorithms

*   **Merge Sort:**
    *   **Principle:** Divide-and-conquer.
    *   **Performance:** Guaranteed $O(n \log n)$.
    *   **Space:** $O(n)$ auxiliary space.
*   **Quick Sort:**
    *   **Principle:** Divide-and-conquer with a pivot.
    *   **Performance:** $O(n \log n)$ on average, but $O(n^2)$ in the worst case.
    *   **Space:** $O(\log n)$ for the recursion stack (in-place versions).

---

## Graphs

*   **Concept:** A set of vertices connected by edges.
*   **Representations:**
    *   **Adjacency List:** Best for sparse graphs.
    *   **Adjacency Matrix:** Best for dense graphs.
*   **Traversals:**
    *   **Depth-First Search (DFS):** Explores as deeply as possible. Uses a stack (often implicitly via recursion).
    *   **Breadth-First Search (BFS):** Explores layer by layer. Uses a queue. Finds shortest paths in unweighted graphs.

---

## Shortest Paths

*   **Problem:** Find the path with the minimum total weight between vertices in a weighted graph.
*   **Dijkstra's Algorithm:**
    *   **Principle:** A greedy algorithm that finds the shortest paths from a single source to all other vertices in a graph with non-negative edge weights.
    *   **Data Structures:** Uses a priority queue to efficiently select the next closest vertex.
    *   **Performance:** $O(m \log n)$ with a heap-based priority queue.

---
layout: center
---

## Keep Exploring!<br><br>

### The Journey in Algorithms and Data Structures Never Ends.<br><br>

#### Continue to:
*   **Practice:** Implement, debug, and optimize.
*   **Explore:** Discover advanced data structures and algorithms.
*   **Innovate:** Apply these concepts to solve real-world problems.<br><br>

### Your understanding of ADS is a superpower in the world of computing.<br><br>

#### Good luck on your future endeavors!

