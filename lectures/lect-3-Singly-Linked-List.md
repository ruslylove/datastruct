---
title: 'Singly Linked Lists'
transition: fade
theme: seriph
layout: cover
background: https://cover.sli.dev

# Based on Presentation for use with the textbook Data Structures and Algorithms in Java, 6th edition, by M. T. Goodrich, R. Tamassia, and M. H. Goldwasser, Wiley, 2014
---

# Singly Linked List
### Algorithm and Data Structures
### Semester 1/2025
### Dr. Ruslee Sutthaweekul

---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2"/>
---

## Singly Linked Lists: Introduction

A singly linked list is a data structure built from a sequence of nodes.

* It starts with a reference called the **head**.
* Each **node** contains:
    * An **element** (the data stored).
    * A **next** reference (or link) pointing to the subsequent node in the sequence.
* The last node's `next` reference points to `null`.

<img src="./img/slinkedlist.png" style="height:200px"/>




---

## Implementing Nodes: A Nested Class

We often define the `Node` structure as a private static nested class within the linked list class itself. This encapsulates the node's details.

```java {*}{maxHeight:'350px',lines:true}
// Outer SinglyLinkedList class declaration
public class SinglyLinkedList<E> {

    //----- nested Node class -----
    private static class Node<E> {
        private E element;         // Data stored in this node
        private Node<E> next;      // Reference to the next node

        // Constructor for Node
        public Node(E e, Node<E> n) {
            element = e;
            next = n;
        }

        // Accessor methods for Node fields
        public E getElement() { return element; }
        public Node<E> getNext() { return next; }

        // Modifier method for the next reference
        public void setNext(Node<E> n) { next = n; }
    } //----------- end of nested Node class -----------

    // Remainder of the SinglyLinkedList class implementation follows...
}
```

---

## SinglyLinkedList Class Structure

The main `SinglyLinkedList` class manages the nodes.

```java {*}{maxHeight:'380px',lines:true}
public class SinglyLinkedList<E> {
    // (Nested Node class defined here previously)

    // Instance variables for the list
    private Node<E> head = null;   // Reference to the first node (null if empty)
    private Node<E> tail = null;   // Reference to the last node (null if empty)
    private int size = 0;          // Count of nodes in the list

    // Constructor for an empty list
    public SinglyLinkedList() { }

    // Basic accessor methods
    public int size() { return size; }
    public boolean isEmpty() { return size == 0; }

    /** Returns the first element without removing it. */
    public E first() {
        if (isEmpty()) return null;
        return head.getElement();
    }

    /** Returns the last element without removing it. */
    public E last() {
        if (isEmpty()) return null;
        return tail.getElement();
    }

    // Update methods (addFirst, addLast, removeFirst) will follow...
}
```

---
layout: two-cols
---
## Adding an Element to the Front (Head)

1.  **Allocate:** Create a new node containing the element.
2.  **Link New Node:** Set the `next` reference of the new node to point to the current `head`.
3.  **Update Head:** Change the list's `head` reference to point to the newly created node.

:: right ::

<img src="./img/linkedlist_1.png" />

---
layout: two-cols
---

## Adding an Element to the End (Tail)

1.  **Allocate:** Create a new node with the element and its `next` reference set to `null`.
2.  **Link Old Tail:** Set the `next` reference of the current `tail` node to point to the new node. (Handle the case where the list was initially empty).
3.  **Update Tail:** Change the list's `tail` reference to point to the newly added node.

:: right ::

<img src="./img/linkedlist_3.png" />

---

## Java Implementation: `addFirst` and `addLast`

```java {*}{maxHeight:'400px'}
public class SinglyLinkedList<E> {
    // ... (Node class, head, tail, size, constructor, accessors) ...

    /** Adds element e to the front of the list. */
    public void addFirst(E e) {
        head = new Node<>(e, head); // Create new node pointing to old head
        if (size == 0) {
            tail = head;           // If list was empty, new node is also the tail
        }
        size++;
    }

    /** Adds element e to the end of the list. */
    public void addLast(E e) {
        Node<E> newest = new Node<>(e, null); // New node will be the tail
        if (isEmpty()) {
            head = newest;         // If list was empty, new node is also the head
        } else {
            tail.setNext(newest);  // Link the previous tail to the new node
        }
        tail = newest;             // Update the list's tail reference
        size++;
    }

    // ... (removeFirst method) ...
}
```

---
layout: two-cols
---

## Removing the First Element (Head)

1.  **Target:** Identify the node currently pointed to by `head`.
2.  **Update Head:** Change the `head` reference to point to the *next* node in the sequence (`head.next()`).
3.  **Cleanup:** The original head node is now unreferenced and can be garbage collected. (Handle the case where the list becomes empty).

:: right ::

<img src="./img/linkedlist_2.png" />
---

## Java Implementation: `removeFirst`

```java
public class SinglyLinkedList<E> {
    // ... (Node class, head, tail, size, constructor, accessors, add methods) ...

    /** Removes and returns the first element of the list. */
    public E removeFirst() {
        if (isEmpty()) {
            return null; // Nothing to remove
        }
        E removedElement = head.getElement(); // Get data from the first node
        head = head.getNext();                // Update head to the next node
        size--;
        if (size == 0) {
            tail = null; // Special case: list is now empty, update tail
        }
        return removedElement; // Return the data that was removed
    }
} // End of SinglyLinkedList class
```

---

## Challenge: Removing from the Tail

* Removing the last element efficiently in a *singly* linked list is problematic.
* To update the `tail` reference correctly, you need access to the node *before* the current tail.
* There's no direct way to get the previous node without traversing the list from the `head`.
* This traversal takes time proportional to the list's length, making tail removal inefficient (not constant time).<br><br>
<img src="./img/linkedlist_4.png" />

---

## `Basic Arrays` vs. `ArrayList` vs. `Singly Linked List`

<transform scale="0.9">

| **Feature** | Basic Array | `ArrayList` | Singly Linked List |
| :--- | :--- | :--- | :--- |
| **Size** | Fixed at creation | Dynamic, resizable | Dynamic, node-based |
| **Type** | Primitives or Objects | Objects only | Objects only |
| **Flexibility** | Low (manual resizing, shifting) | High (built-in methods) | High (pointer manipulation) |
| **Performance (get/set by index)**| O(1) | O(1) | O(n) (requires traversal) |
| **Performance (add at front)** | O(n) (manual shift) | O(n) (automatic shift) | O(1) |
| **Performance (remove at front)** | O(n) (manual shift) | O(n) (automatic shift) | O(1) |

</transform>

---

<transform scale="0.9">

| **Feature** | Basic Array | `ArrayList` | Singly Linked List |
| :--- | :--- | :--- | :--- |
| **Performance (add at end)** | N/A (fixed size) | Amortized O(1) | O(1) (with tail pointer) |
| **Performance (remove at end)**| N/A (fixed size) | O(1) | O(n) (needs traversal for previous node) |
| **Performance (add/remove in middle)**| O(n) (shift) | O(n) (shift) | O(n) (traversal) |
| **Memory** | Low overhead | Moderate overhead (unused capacity)| High overhead (pointer per node) |
| **Usage**| Fixed-size collections, performance-critical access | General-purpose dynamic lists | Frequent insertions/deletions at the start; implementing queues/stacks |

`ArrayList` is generally preferred when you need a dynamic array with fast index-based access.<br> 
`LinkedList` excels when you have frequent additions and removals at the beginning of the list.
</transform>



