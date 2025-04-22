---
# Frontmatter for Slidev configuration
title: 'Priority Queues'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Priority Queues
### Algorithm and Data Structures
### semester 1/2025
### Dr. Ruslee Sutthaweekul

---

## Priority Queue Abstract Data Type (ADT)

* A **Priority Queue** stores a collection of entries.
* Each entry is a pair: `(key, value)`. Keys represent priority and must be comparable.
* **Core Operations:**
    * `insert(k, v)`: Adds an entry with key `k` and value `v`.
    * `removeMin()`: Removes and returns the entry with the *smallest* key (highest priority). Returns `null` if the queue is empty.
* **Helper Operations:**
    * `min()`: Returns, without removing, the entry with the smallest key. Returns `null` if the queue is empty.
    * `size()`: Returns the number of entries.
    * `isEmpty()`: Checks if the queue is empty.
* **Applications:** Managing standby lists, auctions, stock market orders (prioritizing by price/time).

---
layout: two-cols
---

## Priority Queue Example

<transform scale="0.8">

| Method Call    | Return Value | Priority Queue Contents (Key, Value pairs) |
| :------------- | :----------- | :----------------------------------------- |
| `insert(5, A)` |              | `{(5, A)}`                                  |
| `insert(9, C)` |              | `{(5, A), (9, C)}`                           |
| `insert(3, B)` |              | `{(3, B), (5, A), (9, C)}`                   |
| `min()`        | (3, B)       | `{(3, B), (5, A), (9, C)}`                   |
| `removeMin()`  | (3, B)       | `{(5, A), (9, C)}`                           |
| `insert(7, D)` |              | `{(5, A), (9, C), (7, D)}`                   |

</transform>

:: right ::

<transform scale="0.8">


| Method Call    | Return Value | Priority Queue Contents (Key, Value pairs) |
| :------------- | :----------- | :----------------------------------------- |
| `min()`        | (5, A)       | `{(5, A), (9, C), (7, D)}`                   |
| `removeMin()`  | (5, A)       | `{(7, D), (9, C)}`                           |
| `removeMin()`  | (7, D)       | `{(9, C)}`                                   |
| `removeMin()`  | (9, C)       | `{}`                                         |
| `removeMin()`  | null         | `{}`                                         |

*(Note: Internal order might vary depending on implementation, but `min`/`removeMin` always targets the smallest key.)*

</transform>



---

## Keys and Comparators

* To determine the "smallest" key, we need a way to compare keys.
* **Options:**
    1.  Keys come from a domain with a **natural ordering** (e.g., integers, strings). The key type should implement the `Comparable` interface in Java.
    2.  Provide a custom **Comparator** object. A comparator defines how to compare two keys. It's useful when the natural ordering isn't desired or doesn't exist.
* The `java.util.Comparator` interface has one primary method:
    * `compare(a, b)`: Returns `< 0` if `a < b`, `0` if `a == b`, `> 0` if `a > b`.

---

## Default Comparator

* If no custom comparator is provided, the priority queue typically relies on the keys' natural ordering.
* Assumes keys implement `java.lang.Comparable`.
* The `compareTo` method of the key type is used implicitly.

```java
import java.util.Comparator;

/** Comparator based on the natural ordering of keys. */
public class DefaultComparator<E extends Comparable<E>> implements Comparator<E> {
    /** Compares two elements according to their natural ordering. */
    public int compare(E a, E b) throws ClassCastException {
        return a.compareTo(b);
    }
}

```

---

## The Entry ADT

* Represents the `(key, value)` pair stored within the priority queue.
* A simple interface defining methods to access the key and value.

```java
/** Interface for a key-value pair. */
public interface Entry<K, V> {
    /** Returns the key stored in this entry. */
    K getKey();

    /** Returns the value stored in this entry. */
    V getValue();
}

```

* Concrete implementations of this interface would hold the actual key and value data.

---

## Priority Queue Sorting

* We can use a priority queue to sort a sequence `S`.
* **Algorithm (PQ-Sort):**
    1.  **Phase 1:** Insert each element `e` from `S` into an initially empty priority queue `P` using `P.insert(e, e)` (using the element itself as both key and value).
    2.  **Phase 2:** Repeatedly call `P.removeMin()` and add the returned element (the value part) back into `S` in order, until `P` is empty.
* The efficiency depends entirely on the underlying implementation of the priority queue `P`.

---

## PQ-Sort Example

**Input Sequence S:** (7, 4, 8, 2, 5, 3, 9)

**Phase 1: Insertion**
(Each element inserted into Priority Queue P)
... After all insertions, P contains {(2,2), (3,3), (4,4), (5,5), (7,7), (8,8), (9,9)} (conceptual view, order depends on implementation)

**Phase 2: Removal**
1. removeMin() -> (2,2). S becomes (2)
2. removeMin() -> (3,3). S becomes (2, 3)
3. removeMin() -> (4,4). S becomes (2, 3, 4)
... and so on ...
Final S: (2, 3, 4, 5, 7, 8, 9)

---

## Implementation: Unsorted Sequence

* Store entries in an unsorted list or array-based sequence.
* **Performance:**
    * `insert`: O(1) time (just add to the end).
    * `min`/`removeMin`: O(n) time (must scan the entire sequence to find the minimum key).
* **PQ-Sort using Unsorted Sequence:**
    * Phase 1 (n inserts): O(n) total time.
    * Phase 2 (n removeMins): O(n * n) = O(n²) total time.
    * Overall PQ-Sort time: O(n²). This is equivalent to **Selection Sort**.

---

## Selection Sort Example (using Unsorted PQ)

**Sequence S:** (7, 4, 8, 2, 5, 3, 9)
**Priority Queue P (unsorted list):** ()

**Phase 1 (Insertions - O(n)):**
insert(7,7) -> P: [(7,7)]
insert(4,4) -> P: [(7,7), (4,4)]
...
insert(9,9) -> P: [(7,7), (4,4), (8,8), (2,2), (5,5), (3,3), (9,9)]

**Phase 2 (Removals - O(n²)):**
1. Scan P, find min (2,2). removeMin() -> (2,2). S: (2). P: [(7,7), (4,4), (8,8), (5,5), (3,3), (9,9)]
2. Scan P, find min (3,3). removeMin() -> (3,3). S: (2, 3). P: [(7,7), (4,4), (8,8), (5,5), (9,9)]
... and so on ...

---

## Implementation: Sorted Sequence

* Store entries in a sequence sorted by key (e.g., using a sorted array or sorted list).
* **Performance:**
    * `insert`: O(n) time (must find the correct position and potentially shift elements).
    * `min`/`removeMin`: O(1) time (minimum is always at the beginning).
* **PQ-Sort using Sorted Sequence:**
    * Phase 1 (n inserts): O(1 + 2 + ... + n) = O(n²) total time.
    * Phase 2 (n removeMins): O(n) total time.
    * Overall PQ-Sort time: O(n²). This is equivalent to **Insertion Sort**.

---

## Insertion Sort Example (using Sorted PQ)

**Sequence S:** (7, 4, 8, 2, 5, 3, 9)
**Priority Queue P (sorted list):** ()

**Phase 1 (Insertions - O(n²)):**
insert(7,7) -> P: [(7,7)]
insert(4,4) -> P: [(4,4), (7,7)] (insert 4 before 7)
insert(8,8) -> P: [(4,4), (7,7), (8,8)] (insert 8 after 7)
insert(2,2) -> P: [(2,2), (4,4), (7,7), (8,8)] (insert 2 at beginning)
...
insert(9,9) -> P: [(2,2), (3,3), (4,4), (5,5), (7,7), (8,8), (9,9)]

**Phase 2 (Removals - O(n)):**
1. removeMin() -> (2,2). S: (2). P: [(3,3), (4,4), (5,5), (7,7), (8,8), (9,9)]
2. removeMin() -> (3,3). S: (2, 3). P: [(4,4), (5,5), (7,7), (8,8), (9,9)]
... and so on ...
