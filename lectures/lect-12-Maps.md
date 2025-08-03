
---
# Frontmatter for Slidev configuration
title: 'Maps'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Maps
## {{ $slidev.configs.subject }}
### Presented by {{ $slidev.configs.presenter }}
### Semester {{ $slidev.configs.semester }}

---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2" columns="1"/>


---

## Maps: Introduction

* A **map** (also known as a dictionary or associative array) models a searchable collection of **key-value** entries.
* Each key within a map must be unique.
* **Core Operations:** Searching for, inserting, and deleting items based on their keys.
* **Applications:**
    * Address books (name -> phone number/address).
    * Student databases (student ID -> student record).
    * Dictionaries (word -> definition).

---

## The Map Abstract Data Type (ADT)

Defines the fundamental operations for a map structure:

* **`get(k)`:** If an entry with key `k` exists, return its associated value; otherwise, return `null`.
* **`put(k, v)`:** Insert entry `(k, v)`. If key `k` already exists, replace its value with `v` and return the *old* value; otherwise, return `null`.
* **`remove(k)`:** If an entry with key `k` exists, remove it and return its associated value; otherwise, return `null`.
* **`size()`:** Returns the number of entries in the map.
* **`isEmpty()`:** Returns `true` if the map is empty, `false` otherwise.
* **`entrySet()`:** Returns an iterable collection of all `(key, value)` entries.
* **`keySet()`:** Returns an iterable collection of all unique keys.
* **`values()`:** Returns an iterable collection (may contain duplicates) of all values.

---

## Map Operation Example

| Operation     | Output | Map Contents             |
| :------------ | :----- | :----------------------- |
| `isEmpty()`   | true   | `{}`                       |
| `put(5, A)`   | null   | `{(5, A)}`                 |
| `put(7, B)`   | null   | `{(5, A), (7, B)}`         |
| `put(2, C)`   | null   | `{(5, A), (7, B), (2, C)}` |
| `put(8, D)`   | null   | `{(5, A), (7, B), (2, C), (8, D)}` |
| `put(2, E)`   | C      | `{(5, A), (7, B), (2, E), (8, D)}` |
| `get(7)`      | B      | `{(5, A), (7, B), (2, E), (8, D)}` |
| `get(4)`      | null   | `{(5, A), (7, B), (2, E), (8, D)}` |
| `get(2)`      | E      | `{(5, A), (7, B), (2, E), (8, D)}` |
| `size()`      | 4      | `{(5, A), (7, B), (2, E), (8, D)}` |
| `remove(5)`   | A      | `{(7, B), (2, E), (8, D)}` |
| `remove(2)`   | E      | `{(7, B), (8, D)}`         |
| `get(2)`      | null   | `{(7, B), (8, D)}`         |
| `isEmpty()`   | false  | `{(7, B), (8, D)}`         |

---

## Simple List-Based Map Implementation

* A straightforward approach using an underlying list (e.g., `ArrayList` or `LinkedList`) to store the `(key, value)` entries.
* We can use the `PositionalList` ADT concept for this.

---

## List-Based Map: `get(k)` Algorithm

To find the value associated with key `k`:

```text
Algorithm get(k):
  // Iterate through all positions (nodes) in the underlying list S
  B = S.positions()
  while B.hasNext() do
    p = B.next() // Get the next position
    // Check if the key at this position matches the target key k
    if p.getElement().getKey() == k then
      return p.getElement().getValue() // Return the associated value

  // If the loop finishes without finding the key
  return null // Key k not found in the map

```

---

## List-Based Map: `put(k, v)` Algorithm

To insert or update an entry `(k, v)`:

```text
Algorithm put(k, v):
  // Iterate through all positions in the list S
  B = S.positions()
  while B.hasNext() do
    p = B.next()
    // Check if the key at this position matches k
    if p.getElement().getKey() == k then
      oldValue = p.getElement().getValue()
      // Update the value at this position
      S.set(p, new Entry(k, v))
      return oldValue // Return the replaced value

  // If key k was not found, add a new entry
  S.addLast(new Entry(k, v))
  // Increment the size counter (assuming 'n' tracks size)
  n = n + 1
  return null // Indicate that a new entry was added

```

---

## List-Based Map: `remove(k)` Algorithm

To remove the entry associated with key `k`:

```text
Algorithm remove(k):
  // Iterate through all positions in the list S
  B = S.positions()
  while B.hasNext() do
    p = B.next()
    // Check if the key at this position matches k
    if p.getElement().getKey() == k then
      removedValue = p.getElement().getValue()
      // Remove the entry at this position from the list
      S.remove(p)
      // Decrement the size counter
      n = n - 1
      return removedValue // Return the value of the removed entry

  // If the loop finishes without finding the key
  return null // Key k not found

```

---

## Performance of List-Based Map

* Assume the underlying list `S` is implemented using a Doubly Linked List.
* Let `n` be the number of entries in the map.
* **`get(k)`, `put(k, v)`, `remove(k)`:**
    * These operations involve searching through the list.
    * In the worst case, the entire list of `n` entries needs to be scanned.
    * Therefore, these operations take **O(n)** time.
* **`size()`, `isEmpty()`:** These typically take **O(1)** time.
* **`entrySet()`, `keySet()`, `values()`:** These involve iterating through the list, taking **O(n)** time to produce the iterable collection.

* **Conclusion:** While simple, the list-based implementation is inefficient for large maps due to the linear time complexity of the core operations. More advanced structures (like hash tables or search trees) are needed for better performance.
