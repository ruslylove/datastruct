---
# Frontmatter for Slidev configuration
title: 'Queues'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Queues
### Algorithm and Data Structures
### semester 1/2025
### Dr. Ruslee Sutthaweekul

---

## The Queue Abstract Data Type (ADT)

* A **Queue** stores a collection of arbitrary objects.
* It follows a **First-In, First-Out (FIFO)** principle. Think of a waiting line.
* Insertions happen at the **rear** (end), and removals occur at the **front**.
* **Core Operations:**
    * `enqueue(object)`: Inserts an element at the rear of the queue.
    * `dequeue()`: Removes and returns the element from the front of the queue.
* **Helper Operations:**
    * `first()`: Returns the front element without removing it.
    * `size()`: Returns the number of elements currently in the queue.
    * `isEmpty()`: Checks if the queue contains any elements.
* **Boundary Cases:** Attempting `dequeue()` or `first()` on an empty queue returns `null` (in this specific ADT definition).

---
layout: two-cols
---

## Queue Operation Example

| Method Call | Return Value | Queue Contents (Front to Rear) |
| :---------- | :----------- | :----------------------------- |
| enqueue(5)  |              | (5)                            |
| enqueue(3)  |              | (5, 3)                         |
| dequeue()   | 5            | (3)                            |
| enqueue(7)  |              | (3, 7)                         |
| dequeue()   | 3            | (7)                            |
| first()     | 7            | (7)                            |
| dequeue()   | 7            | ()                             |
| dequeue()   | null         | ()                             |

:: right ::
| Method Call | Return Value | Queue Contents (Front to Rear) |
| :---------- | :----------- | :----------------------------- |
| isEmpty()   | true         | ()                             |
| enqueue(9)  |              | (9)                            |
| enqueue(7)  |              | (9, 7)                         |
| size()      | 2            | (9, 7)                         |
| enqueue(3)  |              | (9, 7, 3)                      |
| enqueue(5)  |              | (9, 7, 3, 5)                   |
| dequeue()   | 9            | (7, 3, 5)                      |

---

## Applications of Queues

* **Direct Uses:**
    * Managing waiting lists (e.g., customer service).
    * Handling access to shared resources like printers (print queues).
    * Scheduling tasks in operating systems (multiprogramming).
* **Indirect Uses:**
    * As an auxiliary data structure within various algorithms (e.g., Breadth-First Search).
    * As a component for building more complex data structures.

---

## Array-Based Queue Implementation

* Uses a fixed-size array (`N`) in a **circular** manner to store elements.
* Two key variables:
    * `f`: Index of the front element.
    * `sz`: Current number of elements stored in the queue.
* The position immediately after the rear element (where the next enqueue would occur) is calculated as `r = (f + sz) % N`. The modulo operator (`%`) handles the wrap-around.

(Conceptual diagrams showing 'normal' and 'wrapped-around' configurations in a circular array)

---

## Array-Based Queue: Basic Operations

Using the `f` (front index) and `sz` (size) variables:

```text
Algorithm size():
  return sz

Algorithm isEmpty():
  return (sz == 0)
```

(Conceptual diagrams showing 'f' and 'r' pointers in a circular array)

---

## Array-Based Queue: Enqueue Operation

Adds an element `o` to the rear.

```text
Algorithm enqueue(o):
  // Check if the array is full (size equals capacity)
  if size() == N then // N is the array capacity
    throw IllegalStateException("Queue is full")
  else
    // Calculate rear index using modulo arithmetic
    r = (f + sz) % N
    Q[r] = o // Place the new element at the rear
    sz = sz + 1 // Increment the size
```

* Throws an exception if the queue is full (cannot add more elements). The specific exception depends on the implementation.

(Conceptual diagrams showing 'f' and 'r' pointers in a circular array)

---

## Array-Based Queue: Dequeue Operation

Removes and returns the element from the front.

```text
Algorithm dequeue():
  if isEmpty() then
    return null // Or throw an exception, depending on design
  else
    o = Q[f] // Get the element at the front index
    f = (f + 1) % N // Move front index forward (circularly)
    sz = sz - 1 // Decrement the size
    return o // Return the removed element
```

* Returns `null` if the queue was empty (as per our ADT definition).

(Conceptual diagrams showing 'f' and 'r' pointers in a circular array)

---

## Queue Interface Definition in Java

This interface formalizes the Queue ADT in Java.

```java
public interface Queue<E> {
  /** Returns the number of elements in the queue. */
  int size();

  /** Tests whether the queue is empty. */
  boolean isEmpty();

  /** Returns, but does not remove, the element at the front of the queue. */
  E first(); // Returns null if empty

  /** Inserts an element at the rear of the queue. */
  void enqueue(E e);

  /** Removes and returns the element at the front of the queue. */
  E dequeue(); // Returns null if empty
}
```

* Consistent with our ADT definition where `first()` and `dequeue()` return `null` on an empty queue.

---

## Array-Based Queue Implementation (Java Snippet)

```java {*}{maxHeight:'380px',lines:true}
/** Implementation of the Queue ADT using a fixed-length circular array. */
public class ArrayQueue<E> implements Queue<E> {

    // Default capacity if none specified
    public static final int CAPACITY = 1000;

    // Instance variables
    private E[] data;       // Generic array for storage
    private int f = 0;      // Index of the front element
    private int sz = 0;     // Current number of elements

    // Constructors
    public ArrayQueue() { this(CAPACITY); } // Default capacity

    public ArrayQueue(int capacity) {        // Given capacity
        data = (E[]) new Object[capacity]; // Create array (unsafe cast needed)
    }

    // Methods from Queue interface
    @Override
    public int size() { return sz; }

    @Override
    public boolean isEmpty() { return (sz == 0); }

    // enqueue, dequeue, first methods would follow...
}
```

*(Note: Only shows basic structure and some methods for brevity)*

---

## Array-Based Queue: Enqueue/Dequeue (Java Snippet)

```java {*}{maxHeight:'380px',lines:true}
// Continuing ArrayQueue<E> class...

@Override
public void enqueue(E e) throws IllegalStateException {
    if (sz == data.length) throw new IllegalStateException("Queue is full");
    int avail = (f + sz) % data.length; // Calculate index for new element
    data[avail] = e;
    sz++;
}

@Override
public E first() {
    if (isEmpty()) return null;
    return data[f];
}

@Override
public E dequeue() {
    if (isEmpty()) return null;
    E answer = data[f];
    data[f] = null; // Help garbage collection
    f = (f + 1) % data.length; // Move front index circularly
    sz--;
    return answer;
}
```

*(Note: Includes the remaining core methods)*

---

## Comparison with `java.util.Queue`

Java's standard library also provides a `java.util.Queue` interface. It has similar concepts but often different method names and behaviors (especially regarding error handling - often throwing exceptions instead of returning null/false).

| Our `Queue<E>` Method | `java.util.Queue<E>` Method (Throws Exception) | `java.util.Queue<E>` Method (Returns Special Value) |
| :-------------------- | :--------------------------------------------- | :-------------------------------------------------- |
| `enqueue(e)`          | `add(e)`                                       | `offer(e)` (returns false if full)                  |
| `dequeue()`           | `remove()`                                     | `poll()` (returns null if empty)                    |
| `first()`             | `element()`                                    | `peek()` (returns null if empty)                    |
| `size()`              | `size()`                                       | `size()`                                            |
| `isEmpty()`           | `isEmpty()`                                    | `isEmpty()`                                         |

---

## Application: Round Robin Schedulers

* A common scheduling algorithm where processes are given a fixed time slice (quantum) of CPU time in a circular order.
* A queue is a natural fit for managing the processes waiting for their turn.
* **Algorithm:**
    1.  `e = Q.dequeue()` (Get the next process from the front).
    2.  Service element `e` (Let it run for its time slice).
    3.  `Q.enqueue(e)` (Put the process back at the end of the queue).
* Repeat these steps.

(Diagram showing a queue feeding into a shared service and elements being enqueued back after service)
